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
    {
      title: 'Publisert',
      name: FeltNavn.PUBLISERT,
      description: 'Sett denne til publisert når brevmalen skal vises i saksbehandlingsløsningen.',
      type: 'boolean',
    },
    {
      title: 'Ytelse',
      name: FeltNavn.YTELSE,
      type: SanityTyper.STRING,
      initialValue: ytelse,
      readOnly: true,
    },
    {
      title: 'Resultat',
      name: FeltNavn.RESULTAT,
      type: SanityTyper.STRING,
      initialValue: resultat,
      readOnly: true,
    },
    {
      title: 'Visningsnavn',
      name: FeltNavn.VISNINGSNAVN,
      type: SanityTyper.STRING,
    },
    {
      title: 'Brevtittel',
      name: 'brevtittel',
      type: SanityTyper.OBJECT,
      fields: [{ name: 'tittelNB', title: 'Bokmål', type: SanityTyper.STRING }],
    },
    {
      title: 'Delmaler',
      name: 'delmaler',
      type: SanityTyper.ARRAY,
      of: [{ type: 'reference', to: [{ type: DokumentNavn.DELMAL }] }],
    },
  ],
});

export default mal;
