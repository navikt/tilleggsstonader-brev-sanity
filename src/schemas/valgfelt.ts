import { defineField, defineType } from 'sanity';

import Fritekst from './felter/fritekst';
import { DokumentNavn } from '../typer';

const Valgfelt = defineType({
  title: 'Valgfelt',
  name: DokumentNavn.VALGFELT,
  type: 'document',
  fields: [
    defineField({
      title: 'Visningsnavn',
      name: 'visningsnavn',
      type: 'string',
    }),
    defineField({
      title: 'API-navn',
      name: 'apiNavn',
      type: 'string',
    }),
    defineField({
      title: 'Valg',
      name: 'valg',
      type: 'array',
      of: [Fritekst],
    }),
  ],
});

export default Valgfelt;
