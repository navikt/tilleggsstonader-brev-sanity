import { DokumentNavn, SanityTyper } from '../typer';
import Variabel from './felter/variabel';

const blockEditor = (målform: string, tittel: string) => ({
  name: målform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    {
      type: SanityTyper.BLOCK,
      marks: {
        annotations: [
          {
            type: SanityTyper.REFERENCE,
            to: [{ type: DokumentNavn.VARIABEL }],
          },
        ],
      },
    },
  ],
});

export default blockEditor;
