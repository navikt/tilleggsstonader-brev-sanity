import { DokumentNavn, FeltNavn, SanityTyper } from '../../typer';

const Variabel = {
  title: 'Variabel',
  name: DokumentNavn.VARIABEL,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'API-navn',
      name: FeltNavn.API_NAVN,
      type: SanityTyper.STRING,
    },
  ],
};

export default Variabel;
