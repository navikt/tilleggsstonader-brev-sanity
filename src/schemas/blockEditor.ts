import { defineField } from 'sanity';

import valgfeltReferanse from './referanser/valgfeltReferanse';
import { DokumentNavn, SanityTyper } from '../typer';

const blockEditor = (målform: string, tittel: string, erDelmal: boolean) => ({
  name: målform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    valgfeltReferanse(erDelmal),
    {
      type: DokumentNavn.FRITEKST,
      hidden: !erDelmal,
    },
    {
      type: SanityTyper.BLOCK,
      marks: {
        annotations: [
          defineField({
            name: 'variabel',
            type: 'object',
            title: 'Variabel',
            icon: () => 'V',
            fields: [
              {
                name: 'variabelreferanse',
                title: 'Variabel',
                type: 'reference',
                to: [{ type: DokumentNavn.VARIABEL }],
                validation: (rule) => rule.required(),
              },
            ],
          }),
        ],
      },
    },
  ],
});

export default blockEditor;
