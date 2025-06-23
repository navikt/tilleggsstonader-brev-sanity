import Delmal from './delmal';
import Fritekstområde from './felter/fritekst';
import Variabel from './felter/variabel';
import Tekst from './tekst';
import Valgfelt from './valgfelt';
import { barnetilsyn } from './ytelse/barnetilsyn';
import { boutgifter } from './ytelse/boutgifter';
import { dagligReise } from './ytelse/dagligReise';
import { laremidler } from './ytelse/laremidler';

export const schemaTypes = [
  ...barnetilsyn(),
  ...laremidler(),
  ...boutgifter(),
  ...dagligReise(),
  Delmal,
  Fritekstområde,
  Tekst,
  Variabel,
  Valgfelt,
];
