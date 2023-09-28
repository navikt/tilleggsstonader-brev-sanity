import {
  Divider,
  ListItem,
  ListItemBuilder,
  StructureBuilder,
  StructureResolverContext,
} from 'sanity/lib/exports/desk';

import { Resultat, Ytelse, ResultatTittel, ytelseTittel } from './src/typer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const structure = (S: StructureBuilder, _context: StructureResolverContext) => {
  const lagYtelsemappe = lagYtelseMappeFunksjon(S);
  const lagStegmappe = lagTypemappeFunksjon(S);

  return S.list()
    .title('Tilleggsstønader brev')
    .items([
      lagYtelsemappe(Ytelse.BARNETILSYN, [
        lagStegmappe(Ytelse.BARNETILSYN, Resultat.INNVILGET),
        lagStegmappe(Ytelse.BARNETILSYN, Resultat.AVSLAG),
      ]),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) =>
        ['delmal', 'variabel', 'valgfelt'].includes(listItem.getId() || ''),
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
