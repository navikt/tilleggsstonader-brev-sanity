import { defineField, defineType } from 'sanity';

import blockEditor from './blockEditor';
import { BrukAvKomponent } from '../komponenter/bruk/BrukAvKomponent';
import { DokumentNavn, FeltNavn } from '../typer';
import { tekniskNavnValideringer } from '../utils/validering';

const Delmal = defineType({
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: 'document',
  components: {
    input: BrukAvKomponent,
  },
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
    blockEditor('nb', 'Bokmål', true),
  ],
});

export default Delmal;
