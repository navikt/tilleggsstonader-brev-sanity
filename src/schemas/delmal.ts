import { DokumentNavn, SanityTyper } from '../typer';
import blockEditor from './blockEditor';

const Delmal = {
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'API-navn',
      name: DokumentNavn.API_NAVN,
      type: SanityTyper.STRING,
    },
    blockEditor('nb', 'Bokmål'),
  ],
};

export default Delmal;
