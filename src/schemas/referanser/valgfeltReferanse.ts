import { defineField } from 'sanity';

import ValgReferansePreview from '../../komponenter/ValgReferansePreview';
import { DokumentNavn, FeltNavn } from '../../typer';

const valgfeltReferanse = (erDelmal: boolean) =>
  defineField({
    name: DokumentNavn.VALGFELT_REFERANSE,
    title: 'Valgfelt',
    type: 'object',
    hidden: !erDelmal,
    components: { preview: ValgReferansePreview },
    preview: {
      select: {
        title: `${DokumentNavn.VALGFELT}.${FeltNavn.VISNINGSNAVN}`,
      },
    },
    fields: [
      defineField({
        title: 'Valgfelt',
        name: DokumentNavn.VALGFELT,
        type: 'reference',
        to: [{ type: DokumentNavn.VALGFELT }],
      }),
      defineField({
        title: 'Visningsdetaljer',
        name: 'visningsdetaljer',
        type: 'object',
        fields: [
          defineField({
            title: 'Skal valgfeltet alltid være med?',
            name: 'skalAlltidMed',
            type: 'boolean',
            initialValue: false,
          }),
          defineField({
            title: 'Skal valgfeltet vises i brevmenyen?',
            name: 'skalVisesIBrevmeny',
            type: 'boolean',
            initialValue: false,
          }),
        ],
      }),
    ],
  });

export default valgfeltReferanse;
