import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const flyttingTSO = () => {
  const malForStønad = mal(Ytelse.FLYTTING_TSO);

  return [
    malForStønad(Resultat.INNVILGET),
    malForStønad(Resultat.AVSLAG),
    malForStønad(Resultat.FRITTSTAENDE),
    malForStønad(Resultat.REVURDERING),
    malForStønad(Resultat.OPPHOR),
  ];
};
