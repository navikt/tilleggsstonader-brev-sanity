import { StringRule, defineField } from 'sanity';

import { FeltNavn, SanityTyper, Resultat, Ytelse, DokumentNavn } from '../typer';

const mal = (ytelse: Ytelse) => (resultat: Resultat) => ({
  title: 'Mal',
  name: `${ytelse}_${resultat}`,
  type: SanityTyper.DOCUMENT,
  preview: {
    select: {
      visningsnavn: FeltNavn.VISNINGSNAVN,
      publisert: FeltNavn.PUBLISERT,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare(selection: any) {
      const { visningsnavn, publisert } = selection;
      return {
        title: visningsnavn,
        subtitle: publisert && 'PUBLISERT',
      };
    },
  },
  fields: [
    defineField({
      title: 'Publisert',
      name: 'publisert',
      description: 'Sett denne til publisert når brevmalen skal vises i saksbehandlingsløsningen.',
      type: 'boolean',
    }),
    defineField({
      title: 'Ytelse',
      name: 'ytelse',
      type: 'string',
      initialValue: ytelse,
      readOnly: true,
    }),
    defineField({
      title: 'Resultat',
      name: 'resultat',
      type: 'string',
      initialValue: resultat,
      readOnly: true,
    }),
    defineField({
      title: 'Visningsnavn',
      name: 'visningsnavn',
      type: 'string',
      validation: (rule: StringRule) => rule.required().error('Brevet må ha et visningsnavn'),
    }),
    defineField({
      title: 'Brevtittel',
      name: 'brevtittel',
      type: 'object',
      fields: [
        defineField({
          name: 'tittelNB',
          title: 'Bokmål',
          type: 'string',
          validation: (rule) => rule.required().error('Brevet må ha en tittel på bokmål'),
        }),
      ],
    }),
    defineField({
      title: 'Delmaler',
      name: 'delmaler',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: DokumentNavn.DELMAL }] }],
    }),
  ],
});

export default mal;
