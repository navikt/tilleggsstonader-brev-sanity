import { DokumentNavn, SanityTyper } from '../typer';
import Delmal from './delmal';

const Mal = {
  title: 'Mal',
  name: DokumentNavn.MAL,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'Delmaler',
      name: 'delmaler',
      type: SanityTyper.ARRAY,
      of: [Delmal],
    },
  ],
};

export default Mal;
