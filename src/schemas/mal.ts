import Delmal from './delmal';
import { FeltNavn, SanityTyper, Resultat, Ytelse } from '../typer';

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
      title: 'Delmaler',
      name: 'delmaler',
      type: SanityTyper.ARRAY,
      of: [Delmal],
    },
  ],
});

export default mal;
