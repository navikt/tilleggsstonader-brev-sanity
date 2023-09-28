import { defineField, defineType } from 'sanity';

import blockEditor from './blockEditor';
import { DokumentNavn } from '../typer';

const Delmal = defineType({
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: 'document',
  fields: [
    defineField({
      title: 'Visningsnavn',
      name: 'visningsnavn',
      type: 'string',
    }),
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
    defineField({
      title: 'API-navn',
      name: 'apiNavn',
      type: 'string',
    }),
    blockEditor('nb', 'Bokmål'),
  ],
});

export default Delmal;
