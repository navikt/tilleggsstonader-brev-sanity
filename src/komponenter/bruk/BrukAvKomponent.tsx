import * as React from 'react';
import { useMemo } from 'react';

import { Stack, Text } from '@sanity/ui';
import { ObjectInputProps } from 'sanity';

import {
  BrukAvDelmal,
  brukAvSanityQuery,
  BrukAvSanityQueryResult,
  BrukAvTekst,
  BrukAvValgReferanseEllerVariabel,
  SanityItem,
} from './brukAvSanityQuery';
import { Lenke } from './Lenker';
import { ResultatTittel, ytelseTittel } from '../../typer';
import { useSanityQuery } from '../../utils/sanity';
import { camelCaseErstattÅæø } from '../../utils/tekst';

/**
 * Grupperer alle id'n og hvor de blir brukt
 */
type Referanser = Record<string, Referanse[]>;
type Referanse = {
  id: string;
  type: string;
  visningsnavn: string;
  path: string;
};

export const BrukAvKomponent = (props: ObjectInputProps) => {
  const { data, error } = useSanityQuery(brukAvSanityQuery);
  const referanser = useMemo(() => {
    return data ? finnReferanserTilId(data as BrukAvSanityQueryResult[]) : {};
  }, [data]);

  return (
    <>
      {props.renderDefault(props)}
      <Stack paddingTop={6} space={3}>
        <Text weight={'bold'}>Denne er brukt i følgende komponenter:</Text>
        {error ? <Text>Fikk ikke hentet referanser til dette objektet</Text> : null}
        <ListeReferanser referanser={referanser} id={props.value?._id} />
      </Stack>
    </>
  );
};

const ListeReferanser = ({ referanser, id }: { referanser: Referanser; id: string }) => {
  const verdier = referanser[id];
  if (!verdier) {
    return null;
  }
  return (
    <Stack paddingLeft={4} space={2}>
      {verdier.map((verdi, index) => (
        <Stack key={index} paddingTop={1} space={1}>
          <Text size={2}>
            <Lenke path={verdi.path}>
              {verdi.visningsnavn} ({verdi.type})
            </Lenke>
          </Text>
          <ListeReferanser referanser={referanser} id={verdi.id} />
        </Stack>
      ))}
    </Stack>
  );
};

/**
 * Grupperer bruket av valgfelt, tekst og delmal og hvor de blir brukt
 * returnerer en map av typen {[id til valgfelt]: [{referanse som bruker valgfelt}]}
 */
const finnReferanserTilId = (items: BrukAvSanityQueryResult[]) => {
  const referanser = {} as Referanser;
  items.forEach((curr) => {
    switch (curr._type) {
      case 'valgfelt':
        leggTilReferanserFraValgfelt(referanser, curr);
        break;
      case 'delmal':
      case 'tekst':
        leggTilReferanserFraDelmalEllerTekst(referanser, curr);
        break;
      default:
        leggTilReferanserFraMal(referanser, curr);
        break;
    }
  });
  return referanser;
};

const leggTilReferanserFraValgfelt = (referanser: Referanser, item: SanityItem & BrukAvTekst) =>
  item.valg.forEach((valg) =>
    leggTilReferanse(referanser, valg._ref, lagBruktAv('valgfelt', item)),
  );

const leggTilReferanserFraDelmalEllerTekst = (
  referanser: Referanser,
  item: SanityItem & BrukAvValgReferanseEllerVariabel,
) => {
  item.nb.forEach((nb) => {
    switch (nb._type) {
      case 'valgfeltReferanse':
        leggTilReferanse(referanser, nb.valgfelt._ref, lagBruktAv('delmal', item));
        break;
      case 'block':
        nb.markDefs.forEach((markDef) => {
          leggTilReferanse(
            referanser,
            markDef.variabelreferanse._ref,
            lagBruktAv(item._type, item),
          );
        });
        break;
    }
  });
};

const leggTilReferanserFraMal = (referanser: Referanser, item: SanityItem & BrukAvDelmal) => {
  item.delmaler.forEach((delmal) => {
    leggTilReferanse(
      referanser,
      delmal.delmalReferanse._ref,
      lagBruktAv(
        `mal - ${ytelseTittel[item.ytelse]} ${ResultatTittel[item.resultat]}`,
        item,
        `${camelCaseErstattÅæø(ytelseTittel[item.ytelse])};${camelCaseErstattÅæø(ResultatTittel[item.resultat])}`,
      ),
    );
  });
};

const leggTilReferanse = (referanser: Referanser, id: string, referanse: Referanse) => {
  const referanserForId = referanser[id] || [];
  referanserForId.push(referanse);
  referanser[id] = referanserForId;
};

/**
 *
 * @param type vises innen parentes i lenken
 * @param sanityItem
 * @param lenkPathFn for 'mal' er det ønskelig å overstyre path på lenk då den ikke bruker typen men /<stønad>;<resultat>;<id>
 */
const lagBruktAv = (type: string, sanityItem: SanityItem, lenkePath?: string): Referanse => ({
  type: type,
  id: sanityItem._id,
  visningsnavn: sanityItem.visningsnavn,
  path: `${lenkePath ? lenkePath : type};${sanityItem._id}`,
});
