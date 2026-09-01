import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const reiseTilOppstartAvslutningHjemreiserTSR = () => {
  const malForStønad = mal(Ytelse.REISE_TIL_OPPSTART_AVSLUTNING_HJEMREISER_TSR);

  return [
    malForStønad(Resultat.INNVILGET),
    malForStønad(Resultat.AVSLAG),
    malForStønad(Resultat.FRITTSTAENDE),
    malForStønad(Resultat.REVURDERING),
    malForStønad(Resultat.OPPHOR),
  ];
};
