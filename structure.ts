import {
  Divider,
  ListItem,
  ListItemBuilder,
  StructureBuilder,
  StructureResolverContext,
} from 'sanity/structure';

import { Resultat, Ytelse, ResultatTittel, ytelseTittel } from './src/typer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const structure = (S: StructureBuilder, _context: StructureResolverContext) => {
  const lagYtelsemappe = lagYtelseMappeFunksjon(S);
  const lagTypemappe = lagTypemappeFunksjon(S);

  return S.list()
    .title('Tilleggsstønader brev')
    .items([
      lagYtelsemappe(Ytelse.BARNETILSYN, [
        lagTypemappe(Ytelse.BARNETILSYN, Resultat.INNVILGET),
        lagTypemappe(Ytelse.BARNETILSYN, Resultat.AVSLAG),
        lagTypemappe(Ytelse.BARNETILSYN, Resultat.FRITTSTAENDE),
        lagTypemappe(Ytelse.BARNETILSYN, Resultat.REVURDERING),
        lagTypemappe(Ytelse.BARNETILSYN, Resultat.OPPHOR),
      ]),
      lagYtelsemappe(Ytelse.LAREMIDLER, [
        lagTypemappe(Ytelse.LAREMIDLER, Resultat.INNVILGET),
        lagTypemappe(Ytelse.LAREMIDLER, Resultat.AVSLAG),
        lagTypemappe(Ytelse.LAREMIDLER, Resultat.FRITTSTAENDE),
        lagTypemappe(Ytelse.LAREMIDLER, Resultat.REVURDERING),
        lagTypemappe(Ytelse.LAREMIDLER, Resultat.OPPHOR),
      ]),
      lagYtelsemappe(Ytelse.BOUTGIFTER, [
        lagTypemappe(Ytelse.BOUTGIFTER, Resultat.INNVILGET),
        lagTypemappe(Ytelse.BOUTGIFTER, Resultat.AVSLAG),
        lagTypemappe(Ytelse.BOUTGIFTER, Resultat.FRITTSTAENDE),
        lagTypemappe(Ytelse.BOUTGIFTER, Resultat.REVURDERING),
        lagTypemappe(Ytelse.BOUTGIFTER, Resultat.OPPHOR),
      ]),
      lagYtelsemappe(Ytelse.DAGLIG_REISE, [
        lagTypemappe(Ytelse.DAGLIG_REISE, Resultat.INNVILGET),
        lagTypemappe(Ytelse.DAGLIG_REISE, Resultat.AVSLAG),
        lagTypemappe(Ytelse.DAGLIG_REISE, Resultat.FRITTSTAENDE),
        lagTypemappe(Ytelse.DAGLIG_REISE, Resultat.REVURDERING),
        lagTypemappe(Ytelse.DAGLIG_REISE, Resultat.OPPHOR),
      ]),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) =>
        ['delmal', 'variabel', 'valgfelt', 'tekst'].includes(listItem.getId() || ''),
      ),
    ]);
};

const lagTypemappeFunksjon =
  (S: StructureBuilder) =>
  (ytelse: Ytelse, resultat: Resultat): ListItemBuilder =>
    S.listItem()
      .title(ResultatTittel[resultat])
      .child(S.documentTypeList(`${ytelse}_${resultat}`).title(ResultatTittel[resultat]));

const lagYtelseMappeFunksjon =
  (S: StructureBuilder) => (ytelse: Ytelse, items: (ListItemBuilder | ListItem | Divider)[]) =>
    S.listItem()
      .title(ytelseTittel[ytelse])
      .child(S.list().title(ytelseTittel[ytelse]).items(items));
