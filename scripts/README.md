# Scripts

Verktøy for å jobbe mot en kopi av produksjonsdata i Sanity. Scriptene bruker bare Python 3 sitt standardbibliotek.

## Studio mot dev-datasettet

```sh
yarn dev:lokalt
```

Studio, forhåndsvisning og oppslag bruker da datasettet `dev`. Endringer her påvirker ikke `production`. Vanlig `yarn dev` og deploy bruker fortsatt `production`.

Datasettet ligger hos Sanity, ikke på maskinen din.

## Hente produksjonsdata

```sh
yarn sanity login
python3 scripts/hent_produksjonsdata.py
```

Scriptet erstatter innholdet i `dev` med en kopi av `production`:

1. Eksporterer `production` til `.sanity-data/`. Produksjon blir bare lest.
2. Tar backup av `dev` til `.sanity-data/`, hvis datasettet finnes.
3. Sletter `dev` og oppretter det på nytt som privat datasett.
4. Importerer dokumentene i to runder: først med svake referanser, deretter med de opprinnelige sterke referansene.

Du må skrive `dev` for å bekrefte. **Alt du har endret eller opprettet i `dev`, forsvinner.**

Retningen er fast i scriptet. Det kan ikke skrive til `production`.

### Innlogging

Scriptet bruker tokenet fra `yarn sanity login`, som ligger i `~/.config/sanity/config.json`. Du kan også sette `SANITY_AUTH_TOKEN` i miljøet.

### Rate limit

Scriptet sender én transaksjon om gangen, med opptil 100 dokumenter eller 200 KB i hver. Får det svar 429 eller en serverfeil, venter det og prøver igjen opptil seks ganger.

Feiler scriptet midt i importen, kan du kjøre det på nytt. Det tar da backup av det halvferdige `dev`-datasettet og starter på nytt.

### Begrensninger

- Bilder og filer kopieres ikke. Datasettet har ingen i dag, og scriptet varsler hvis det dukker opp.
- Dokumenthistorikk kopieres ikke.

### Gjenopprette en backup

Backupen er en NDJSON-fil som Sanity CLI-en kan importere:

```sh
yarn sanity datasets import .sanity-data/backup-dev-<tidspunkt>.ndjson --dataset dev --replace
```

`.sanity-data/` er ignorert av Git.
