import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const dagligreise = () => {
  const malForStønad = mal(Ytelse.DAGLIG_REISE);

  return [
    malForStønad(Resultat.INNVILGET),
    malForStønad(Resultat.AVSLAG),
    malForStønad(Resultat.FRITTSTAENDE),
    malForStønad(Resultat.REVURDERING),
    malForStønad(Resultat.OPPHOR),
  ];
};
