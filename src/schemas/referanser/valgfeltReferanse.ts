import { defineField } from 'sanity';

import { DokumentNavn } from '../../typer';

const valgfeltReferanse = (erDelmal: boolean) =>
  defineField({
    name: DokumentNavn.VALGFELT_REFERANSE,
    title: 'Valgfelt referanse',
    type: 'object',
    hidden: !erDelmal,
    fields: [
      defineField({
        title: 'Valgfelt',
        name: 'valgfelt',
        type: 'reference',
        to: [{ type: DokumentNavn.VALGFELT }],
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

export default valgfeltReferanse;
