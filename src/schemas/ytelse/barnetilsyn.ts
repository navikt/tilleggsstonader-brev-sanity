import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

const barnetilsyn = () => {
  const barnetilsynMal = mal(Ytelse.BARNETILSYN);

  return [
    barnetilsynMal(Resultat.INNVILGET),
    barnetilsynMal(Resultat.AVSLAG),
    barnetilsynMal(Resultat.FRITTSTAENDE),
  ];
};

export default barnetilsyn;
