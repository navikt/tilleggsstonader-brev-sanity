import { defineField, defineType } from 'sanity';

import Tekst from './tekst';
import { DokumentNavn, FeltNavn } from '../typer';
import { tekniskNavnValideringer } from '../utils/validering';

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
      validation: (rule) => tekniskNavnValideringer(rule, DokumentNavn.DELMAL),
    }),
    defineField({
      title: 'Valg',
      name: 'valg',
      type: 'array',
      of: [{ type: 'reference', to: Tekst }, { type: DokumentNavn.FRITEKST }],
    }),
  ],
});

export default Valgfelt;
