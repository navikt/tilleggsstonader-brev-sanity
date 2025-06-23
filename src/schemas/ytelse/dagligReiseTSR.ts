import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const dagligReiseTSR = () => {
  const malForStønad = mal(Ytelse.DAGLIG_REISE_TSR);

  return [
    malForStønad(Resultat.INNVILGET),
    malForStønad(Resultat.AVSLAG),
    malForStønad(Resultat.FRITTSTAENDE),
    malForStønad(Resultat.REVURDERING),
    malForStønad(Resultat.OPPHOR),
  ];
};
