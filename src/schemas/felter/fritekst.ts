import { DokumentNavn } from '../../typer';

const Fritekst = {
  title: 'Fritekst',
  name: DokumentNavn.FRITEKST,
  type: 'document',
  fields: [
    { name: 'dummyfelt', type: 'string', initialValue: 'dummyverdi', readOnly: true, hidden: true }, // Brukes ikke til noen ting. Lagt til fordi sanity krever minst et felt
  ],
};

export default Fritekst;
