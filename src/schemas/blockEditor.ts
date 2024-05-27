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
      type: 'block',
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
                to: [{ type: 'variabel' }],
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
