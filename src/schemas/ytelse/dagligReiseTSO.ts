import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const dagligReiseTSO = () => {
  const malForStønad = mal(Ytelse.DAGLIG_REISE_TSO);

  return [
    malForStønad(Resultat.INNVILGET),
    malForStønad(Resultat.AVSLAG),
    malForStønad(Resultat.FRITTSTAENDE),
    malForStønad(Resultat.REVURDERING),
    malForStønad(Resultat.OPPHOR),
  ];
};
