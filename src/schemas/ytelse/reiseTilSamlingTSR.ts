import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const reiseTilSamlingTSR = () => {
  const malForStønad = mal(Ytelse.REISE_TIL_SAMLING_TSR);

  return [
    malForStønad(Resultat.INNVILGET),
    malForStønad(Resultat.AVSLAG),
    malForStønad(Resultat.FRITTSTAENDE),
    malForStønad(Resultat.REVURDERING),
    malForStønad(Resultat.OPPHOR),
  ];
};
