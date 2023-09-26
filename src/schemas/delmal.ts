import blockEditor from './blockEditor';
import { DokumentNavn, FeltNavn, SanityTyper } from '../typer';

const Delmal = {
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'API-navn',
      name: FeltNavn.API_NAVN,
      type: SanityTyper.STRING,
    },
    blockEditor('nb', 'Bokmål'),
  ],
};

export default Delmal;
