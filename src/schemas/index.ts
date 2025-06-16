import Delmal from './delmal';
import Fritekstområde from './felter/fritekst';
import Variabel from './felter/variabel';
import Tekst from './tekst';
import Valgfelt from './valgfelt';
import { barnetilsyn } from './ytelse/barnetilsyn';
import { boutgifter } from './ytelse/boutgifter';
import { dagligreise } from './ytelse/dagligreise';
import { laremidler } from './ytelse/laremidler';

export const schemaTypes = [
  ...barnetilsyn(),
  ...laremidler(),
  ...boutgifter(),
  ...dagligreise(),
  Delmal,
  Fritekstområde,
  Tekst,
  Variabel,
  Valgfelt,
];
