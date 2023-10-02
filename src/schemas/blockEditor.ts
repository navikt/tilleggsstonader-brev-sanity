import valgfeltReferanse from './referanser/valgfeltReferanse';
import { DokumentNavn, SanityTyper } from '../typer';

const blockEditor = (målform: string, tittel: string, erDelmal: boolean) => ({
  name: målform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    valgfeltReferanse(erDelmal),
    {
      type: DokumentNavn.FRITEKST,
      hidden: !erDelmal,
    },
    {
      type: SanityTyper.BLOCK,
      marks: {
        annotations: [
          {
            type: SanityTyper.REFERENCE,
            to: [{ type: DokumentNavn.VARIABEL }],
            icon: () => 'V',
          },
        ],
      },
    },
  ],
});

export default blockEditor;
