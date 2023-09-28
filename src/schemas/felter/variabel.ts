import { defineField, defineType } from 'sanity';

import { DokumentNavn } from '../../typer';

const Variabel = defineType({
  title: 'Variabel',
  name: DokumentNavn.VARIABEL,
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
      title: 'Skal variabelen erstattes med HTML-kode?',
      name: 'erHtml',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

export default Variabel;
