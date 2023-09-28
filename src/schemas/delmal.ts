import { defineField, defineType } from 'sanity';

import blockEditor from './blockEditor';
import { DokumentNavn, FeltNavn, SanityTyper } from '../typer';

const Delmal = defineType({
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: 'document',
  fields: [
    defineField({
      title: 'Visningsdetaljer',
      name: 'visningsdetaljer',
      type: 'object',
      fields: [
        defineField({
          title: 'Skal delmalen alltid være med?',
          name: 'skalAlltidMed',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          title: 'Skal delmalen vises i brevmenyen?',
          name: 'skalVisesIBrevmeny',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    {
      title: 'API-navn',
      name: FeltNavn.API_NAVN,
      type: SanityTyper.STRING,
    },
    blockEditor('nb', 'Bokmål'),
  ],
});

export default Delmal;
