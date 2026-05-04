import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const reiseTilSamlingTSO = () => {
  const malForStønad = mal(Ytelse.REISE_TIL_SAMLING_TSO);

  return [
    malForStønad(Resultat.INNVILGET),
    malForStønad(Resultat.AVSLAG),
    malForStønad(Resultat.FRITTSTAENDE),
    malForStønad(Resultat.REVURDERING),
    malForStønad(Resultat.OPPHOR),
  ];
};
