import { DokumentNavn, SanityTyper } from '../../typer';

const Variabel = {
  title: 'Variabel',
  name: DokumentNavn.VARIABEL,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'Visningsnavn',
      name: DokumentNavn.VISNINGSNAVN,
      type: SanityTyper.STRING,
    },
    {
      title: 'Publisert',
      name: DokumentNavn.PUBLISERT,
      description: 'Sett denne til publisert når brevmalen skal vises i saksbehandlingsløsningen.',
      type: 'boolean',
    },
    {
      title: 'API-navn',
      name: DokumentNavn.API_NAVN,
      type: SanityTyper.STRING,
    },
  ],
};

export default Variabel;
