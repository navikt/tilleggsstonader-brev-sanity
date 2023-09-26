import { DokumentNavn, SanityTyper } from '../typer';

const Tekst = {
  title: 'Tekst',
  name: DokumentNavn.TEKST,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'Bokmål',
      name: 'nb',
      type: SanityTyper.ARRAY,
      of: [{ type: SanityTyper.BLOCK }],
    },
    {
      title: 'Nynorsk',
      name: 'nn',
      type: SanityTyper.ARRAY,
      of: [{ type: SanityTyper.BLOCK }],
    },
    {
      title: 'Engelsk',
      name: 'en',
      type: SanityTyper.ARRAY,
      of: [{ type: SanityTyper.BLOCK }],
    },
  ],
};

export default Tekst;
