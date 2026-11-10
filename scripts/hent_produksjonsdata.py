#!/usr/bin/env python3
"""Erstatter innholdet i Sanity-datasettet `dev` med en kopi av `production`.

Kun standardbiblioteket. Se scripts/README.md.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path

PROSJEKT_ID = "s0grjk9v"
KILDE = "production"
MÅL = "dev"

API_VERSJON = "v2021-06-07"
PROSJEKT_API = f"https://api.sanity.io/{API_VERSJON}/projects/{PROSJEKT_ID}"
DATA_API = f"https://{PROSJEKT_ID}.api.sanity.io/{API_VERSJON}/data"
EKSPORTMAPPE = Path(__file__).resolve().parent.parent / ".sanity-data"

MAKS_BATCH_BYTES = 200 * 1024
MAKS_BATCH_ANTALL = 100
PAUSE_SEKUNDER = 0.25
MAKS_FORSØK = 6


def hent_token():
    token = os.environ.get("SANITY_AUTH_TOKEN")
    if token:
        return token
    konfig = Path.home() / ".config" / "sanity" / "config.json"
    try:
        token = json.loads(konfig.read_text()).get("authToken")
    except (OSError, ValueError):
        token = None
    if not token:
        sys.exit(f"Fant ikke token. Kjør `yarn sanity login` eller sett SANITY_AUTH_TOKEN.")
    return token


TOKEN = hent_token()


def forespørsel(metode, url, data=None):
    """Sender en forespørsel og venter ved 429, serverfeil og nettverksfeil."""
    body = json.dumps(data).encode() if data is not None else None
    for forsøk in range(1, MAKS_FORSØK + 1):
        req = urllib.request.Request(url, data=body, method=metode)
        req.add_header("Authorization", f"Bearer {TOKEN}")
        if body is not None:
            req.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(req, timeout=300) as svar:
                return svar.read()
        except urllib.error.HTTPError as feil:
            kan_prøves_igjen = feil.code == 429 or feil.code >= 500
            if not kan_prøves_igjen or forsøk == MAKS_FORSØK:
                detaljer = feil.read().decode(errors="replace")[:500]
                raise RuntimeError(f"{metode} {url} feilet med {feil.code}: {detaljer}") from None
            ventetid = max(float(feil.headers.get("Retry-After") or 0), 2 ** (forsøk - 1))
            årsak = feil.code
        except urllib.error.URLError as feil:
            if forsøk == MAKS_FORSØK:
                raise
            ventetid, årsak = 2 ** (forsøk - 1), feil.reason
        print(f"  Venter {ventetid:.0f} s ({årsak}), forsøk {forsøk + 1}")
        time.sleep(ventetid)


def datasett_finnes(navn):
    return any(d["name"] == navn for d in json.loads(forespørsel("GET", f"{PROSJEKT_API}/datasets")))


def eksporter(datasett, fil):
    fil.write_bytes(forespørsel("GET", f"{DATA_API}/export/{datasett}"))
    dokumenter = [json.loads(linje) for linje in fil.read_text().splitlines() if linje.strip()]
    print(f"  {len(dokumenter)} dokumenter -> {fil}")
    return dokumenter


def har_referanser(verdi):
    if isinstance(verdi, list):
        return any(har_referanser(v) for v in verdi)
    if isinstance(verdi, dict):
        return isinstance(verdi.get("_ref"), str) or any(har_referanser(v) for v in verdi.values())
    return False


def med_svake_referanser(verdi):
    if isinstance(verdi, list):
        return [med_svake_referanser(v) for v in verdi]
    if isinstance(verdi, dict):
        kopi = {k: med_svake_referanser(v) for k, v in verdi.items()}
        if isinstance(kopi.get("_ref"), str):
            kopi["_weak"] = True
        return kopi
    return verdi


def del_i_batcher(dokumenter):
    batcher, gjeldende, størrelse = [], [], 0
    for dokument in dokumenter:
        byte = len(json.dumps(dokument).encode())
        if gjeldende and (størrelse + byte > MAKS_BATCH_BYTES or len(gjeldende) >= MAKS_BATCH_ANTALL):
            batcher.append(gjeldende)
            gjeldende, størrelse = [], 0
        gjeldende.append(dokument)
        størrelse += byte
    if gjeldende:
        batcher.append(gjeldende)
    return batcher


def skriv(dokumenter, steg):
    batcher = del_i_batcher(dokumenter)
    for nr, batch in enumerate(batcher, start=1):
        forespørsel(
            "POST",
            f"{DATA_API}/mutate/{MÅL}?visibility=async&tag=hent-produksjonsdata",
            {"mutations": [{"createOrReplace": d} for d in batch]},
        )
        print(f"  {steg}: {nr}/{len(batcher)}")
        time.sleep(PAUSE_SEKUNDER)


def opprett_mål():
    # Et nettopp slettet datasett kan bruke litt tid før navnet er ledig igjen.
    for forsøk in range(1, 11):
        try:
            forespørsel("PUT", f"{PROSJEKT_API}/datasets/{MÅL}", {"aclMode": "private"})
            return
        except RuntimeError as feil:
            if forsøk == 10:
                raise
            print(f"  Datasettet er ikke klart ennå, prøver igjen ({feil})")
            time.sleep(3)


def main():
    if not datasett_finnes(KILDE):
        sys.exit(f"Fant ikke «{KILDE}». Er du logget inn med riktig bruker?")
    mål_finnes = datasett_finnes(MÅL)

    print(f"\nProsjekt:  {PROSJEKT_ID}")
    print(f"Leser fra: {KILDE} (endres ikke)")
    print(f"Erstatter: {MÅL}{'' if mål_finnes else ' (opprettes)'}")
    print("Alle endringer i utviklingsdatasettet forkastes.\n")
    if input(f"Skriv «{MÅL}» for å fortsette: ").strip() != MÅL:
        print("Avbrutt. Ingenting er endret.")
        return

    EKSPORTMAPPE.mkdir(exist_ok=True)
    tidspunkt = datetime.now().strftime("%Y-%m-%dT%H-%M-%S")

    # Eksporter først. Feiler noe her, er dev-datasettet fortsatt urørt.
    print(f"\n1/4 Eksporterer {KILDE}")
    dokumenter = eksporter(KILDE, EKSPORTMAPPE / f"{KILDE}-{tidspunkt}.ndjson")
    # Systemdokumenter (_id som starter med «_.») hører til datasettet og importeres ikke.
    dokumenter = [d for d in dokumenter if not d["_id"].startswith("_.")]
    for d in dokumenter:
        d.pop("_rev", None)
    if any(d["_type"].startswith("sanity.") and d["_type"].endswith("Asset") for d in dokumenter):
        print("  Advarsel: eksporten inneholder bilder eller filer. Disse kopieres ikke.")

    if mål_finnes:
        print(f"\n2/4 Tar backup av {MÅL}")
        eksporter(MÅL, EKSPORTMAPPE / f"backup-{MÅL}-{tidspunkt}.ndjson")
        print(f"\n3/4 Sletter og oppretter {MÅL} på nytt")
        forespørsel("DELETE", f"{PROSJEKT_API}/datasets/{MÅL}")
    else:
        print(f"\n2/4 Ingen backup nødvendig\n\n3/4 Oppretter {MÅL}")
    opprett_mål()

    # Første runde med svake referanser, så rekkefølgen ikke spiller noen rolle.
    # Andre runde skriver originalene med sterke referanser når alle mål finnes.
    print(f"\n4/4 Importerer til {MÅL}")
    skriv([med_svake_referanser(d) for d in dokumenter], "Oppretter")
    skriv([d for d in dokumenter if har_referanser(d)], "Gjenoppretter sterke referanser")

    print("\nFerdig. Start Studio med: yarn dev:lokalt")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit("\nAvbrutt.")
    except Exception as feil:  # noqa: BLE001
        sys.exit(f"\nAvbrutt: {feil}")
