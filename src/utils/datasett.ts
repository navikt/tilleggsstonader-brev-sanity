export const PROSJEKT_ID = 's0grjk9v';
export const PRODUKSJONSDATASETT = 'production';
export const UTVIKLINGSDATASETT = 'dev';

const gyldigeDatasett = [PRODUKSJONSDATASETT, UTVIKLINGSDATASETT] as const;
type Datasett = (typeof gyldigeDatasett)[number];

// Sanity bytter ut SANITY_STUDIO_* ved bygg. Uten verdi bruker Studio produksjon som før.
const valgtDatasett = process.env.SANITY_STUDIO_DATASET || PRODUKSJONSDATASETT;

if (!gyldigeDatasett.includes(valgtDatasett as Datasett)) {
  throw new Error(`Ukjent Sanity-datasett: ${valgtDatasett}`);
}

export const DATASETT = valgtDatasett as Datasett;
export const erProduksjonsdatasett = DATASETT === PRODUKSJONSDATASETT;
