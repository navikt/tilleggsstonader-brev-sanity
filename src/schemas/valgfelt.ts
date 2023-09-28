import { defineField, defineType } from 'sanity';

import Fritekst from './felter/fritekst';
import { DokumentNavn, FeltNavn } from '../typer';

const Valgfelt = defineType({
  title: 'Valgfelt',
  name: DokumentNavn.VALGFELT,
  type: 'document',
  fields: [
    defineField({
      title: 'Visningsnavn',
      name: FeltNavn.VISNINGSNAVN,
      type: 'string',
    }),
    defineField({
      title: 'Teknisk navn',
      name: FeltNavn.TEKNISK_NAVN,
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
