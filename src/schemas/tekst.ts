import { defineField, defineType } from 'sanity';

import blockEditor from './blockEditor';
import { DokumentNavn, FeltNavn } from '../typer';

const Tekst = defineType({
  title: 'Tekst',
  name: DokumentNavn.TEKST,
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
    blockEditor('nb', 'Bokmål', false),
  ],
});

export default Tekst;
