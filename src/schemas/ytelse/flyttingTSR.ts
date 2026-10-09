import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const flyttingTSR = () => {
  const malForStønad = mal(Ytelse.FLYTTING_TSR);

  return [
    malForStønad(Resultat.INNVILGET),
    malForStønad(Resultat.AVSLAG),
    malForStønad(Resultat.FRITTSTAENDE),
    malForStønad(Resultat.REVURDERING),
    malForStønad(Resultat.OPPHOR),
  ];
};
