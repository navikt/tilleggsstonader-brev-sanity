import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const barnetilsyn = () => {
  const malForStønad = mal(Ytelse.BARNETILSYN);

  return [
    malForStønad(Resultat.INNVILGET),
    malForStønad(Resultat.AVSLAG),
    malForStønad(Resultat.FRITTSTAENDE),
    malForStønad(Resultat.REVURDERING),
    malForStønad(Resultat.OPPHOR),
  ];
};
