import { defineField, defineType } from 'sanity';

import { DokumentNavn, FeltNavn } from '../../typer';

const Variabel = defineType({
  title: 'Variabel',
  name: DokumentNavn.VARIABEL,
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
      title: 'Skal variabelen erstattes med HTML-kode?',
      name: 'erHtml',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

export default Variabel;
