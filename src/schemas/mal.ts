import { defineField, defineType, StringRule } from 'sanity';

import { Resultat, Ytelse } from '../typer';
import delmalReferanse from './referanser/delmalReferanse';

const mal = (ytelse: Ytelse) => (resultat: Resultat) =>
  defineType({
    title: 'Mal',
    name: `${ytelse}_${resultat}`,
    type: 'document',
    preview: {
      select: {
        visningsnavn: 'visningsnavn',
        publisert: 'publisert',
      },
      prepare(selection) {
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
        description:
          'Sett denne til publisert når brevmalen skal vises i saksbehandlingsløsningen.',
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
            validation: (rule) => rule.required().error('Brevet må ha en tittel'),
          }),
        ],
        validation: (rule) =>
          rule.required().error('Brevet må ha en tittel på alle målformer/språk'),
      }),
      defineField({
        title: 'Delmaler',
        name: 'delmaler',
        type: 'array',
        of: [delmalReferanse],
      }),
    ],
  });

export default mal;
