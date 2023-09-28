import Delmal from './delmal';
import Fritekstområde from './felter/fritekst';
import Variabel from './felter/variabel';
import Tekst from './tekst';
import Valgfelt from './valgfelt';
import barnetilsyn from './ytelse/barnetilsyn';

export const schemaTypes = [...barnetilsyn(), Delmal, Fritekstområde, Tekst, Variabel, Valgfelt];
