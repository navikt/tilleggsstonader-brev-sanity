export enum DokumentNavn {
  DELMAL = 'delmal',
  FRITEKST = 'fritekst',
  MAL = 'mal',
  TEKST = 'tekst',
  VALGFELT = 'valgfelt',
  VARIABEL = 'variabel',
}

export enum FeltNavn {
  API_NAVN = 'apiNavn',
}

export enum SanityTyper {
  STRING = 'string',
  REFERENCE = 'reference',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
  BLOCK = 'block',
  DOCUMENT = 'document',
}

export enum Ytelse {
  BARNETILSYN = 'BARNETILSYN',
}

export const ytelseTittel: Record<Ytelse, string> = {
  BARNETILSYN: 'Barnetilsyn',
};

export enum Resultat {
  INNVILGET = 'INNVILGET',
  AVSLAG = 'AVSLAG',
}

export const ResultatTittel: Record<Resultat, string> = {
  INNVILGET: 'Invilgelse',
  AVSLAG: 'Avslag',
};
