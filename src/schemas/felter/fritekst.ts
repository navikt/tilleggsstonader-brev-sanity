import { DokumentNavn, SanityTyper } from '../../typer';

const Fritekst = {
  title: 'Fritekstområde',
  name: DokumentNavn.FRITEKST,
  type: SanityTyper.OBJECT,
  fields: [
    { name: 'dummyfelt', type: 'string', initialValue: 'dummyverdi', readOnly: true, hidden: true }, // Brukes ikke til noen ting. Lagt til fordi sanity krever minst et felt
  ],
};

export default Fritekst;
