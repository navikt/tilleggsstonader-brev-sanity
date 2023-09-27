import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

const barnetilsyn = () => {
  const barnetilsynMal = mal(Ytelse.BARNETILSYN);

  return [barnetilsynMal(Resultat.INNVILGET), barnetilsynMal(Resultat.AVSLAG)];
};

export default barnetilsyn;
