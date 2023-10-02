import { defineField } from 'sanity';

import { DokumentNavn } from '../../typer';

const delmalReferanse = defineField({
  name: DokumentNavn.DELMAL_REFERANSE,
  title: 'Delmal referanse',
  type: 'object',
  fields: [
    defineField({
      title: 'Delmal',
      name: DokumentNavn.DELMAL_REFERANSE,
      type: 'reference',
      to: [{ type: DokumentNavn.DELMAL }],
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
  ],
});

export default delmalReferanse;
