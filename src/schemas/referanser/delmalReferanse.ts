import { defineField } from 'sanity';

import DelmalReferansePreview from '../../komponenter/DelmalReferansePreview';
import { DokumentNavn, FeltNavn } from '../../typer';

const delmalReferanse = defineField({
  name: DokumentNavn.DELMAL_REFERANSE,
  title: 'Delmal referanse',
  type: 'object',
  components: { preview: DelmalReferansePreview },
  preview: {
    select: {
      visningsnavn: `${DokumentNavn.DELMAL_REFERANSE}.${FeltNavn.VISNINGSNAVN}`,
      skalAlltidMed: 'visningsdetaljer.skalAlltidMed',
      skalVisesIBrevmeny: 'visningsdetaljer.skalVisesIBrevmeny',
    },
  },
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
        defineField({
          title: 'Påkrevde valgfelt',
          name: 'pakrevdeValgfelt',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'valgfelt',
                  type: 'reference',
                  to: [{ type: DokumentNavn.VALGFELT }],
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'valgfelt.visningsnavn',
                },
                prepare(selection) {
                  return {
                    title: selection.title,
                  };
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
});

export default delmalReferanse;
