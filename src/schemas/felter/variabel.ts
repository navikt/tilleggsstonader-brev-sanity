import { defineField, defineType } from 'sanity';

import { DokumentNavn, FeltNavn } from '../../typer';
import { tekniskNavnValideringer } from '../../utils/validering';

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
      validation: (rule) => tekniskNavnValideringer(rule, DokumentNavn.DELMAL),
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
