import { Resultat, Ytelse } from '../../typer';
import mal from '../mal';

export const felles = () => {
  const malForStønad = mal(Ytelse.FELLES);

  return [malForStønad(Resultat.FRITTSTAENDE)];
};
