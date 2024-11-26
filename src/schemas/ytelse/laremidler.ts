import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

const laremidler = () => {
  const laremidlerMal = mal(Ytelse.LAREMIDLER);

  return [
    laremidlerMal(Resultat.INNVILGET),
    laremidlerMal(Resultat.AVSLAG),
    laremidlerMal(Resultat.FRITTSTAENDE),
    laremidlerMal(Resultat.REVURDERING),
    laremidlerMal(Resultat.OPPHOR),
  ];
};

export default laremidler;
