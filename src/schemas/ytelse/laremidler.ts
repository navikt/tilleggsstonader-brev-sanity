import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const laremidler = () => {
  const malForStønad = mal(Ytelse.LAREMIDLER);

  return [
    malForStønad(Resultat.INNVILGET),
    malForStønad(Resultat.AVSLAG),
    malForStønad(Resultat.FRITTSTAENDE),
    malForStønad(Resultat.REVURDERING),
    malForStønad(Resultat.OPPHOR),
  ];
};
