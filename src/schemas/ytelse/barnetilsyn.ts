import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

const barnetilsyn = () => {
  const barnetilsynMal = mal(Ytelse.BARNETILSYN);

  return [
    barnetilsynMal(Resultat.INNVILGET),
    barnetilsynMal(Resultat.AVSLAG),
    barnetilsynMal(Resultat.FRITTSTAENDE),
    barnetilsynMal(Resultat.REVURDERING),
    barnetilsynMal(Resultat.OPPHØR),
  ];
};

export default barnetilsyn;
