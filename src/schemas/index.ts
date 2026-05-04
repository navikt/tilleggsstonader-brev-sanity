import Delmal from './delmal';
import Fritekstområde from './felter/fritekst';
import Variabel from './felter/variabel';
import Tekst from './tekst';
import Valgfelt from './valgfelt';
import { barnetilsyn } from './ytelse/barnetilsyn';
import { boutgifter } from './ytelse/boutgifter';
import { dagligReiseTSO } from './ytelse/dagligReiseTSO';
import { dagligReiseTSR } from './ytelse/dagligReiseTSR';
import { laremidler } from './ytelse/laremidler';
import { reiseTilSamlingTSO } from './ytelse/reiseTilSamlingTSO';

export const schemaTypes = [
  ...barnetilsyn(),
  ...laremidler(),
  ...boutgifter(),
  ...dagligReiseTSO(),
  ...dagligReiseTSR(),
  ...reiseTilSamlingTSO(),
  Delmal,
  Fritekstområde,
  Tekst,
  Variabel,
  Valgfelt,
];
