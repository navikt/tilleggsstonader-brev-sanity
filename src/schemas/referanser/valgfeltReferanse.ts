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
        valg: `${DokumentNavn.VALGFELT}.valg`,
      },
    },
    fields: [
      defineField({
        title: 'Valgfelt',
        name: DokumentNavn.VALGFELT,
        type: 'reference',
        to: [{ type: DokumentNavn.VALGFELT }],
      }),
    ],
  });

export default valgfeltReferanse;
