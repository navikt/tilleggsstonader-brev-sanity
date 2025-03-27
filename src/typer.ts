export enum DokumentNavn {
  DELMAL = 'delmal',
  DELMAL_REFERANSE = 'delmalReferanse',
  FRITEKST = 'fritekst',
  MAL = 'mal',
  TEKST = 'tekst',
  VALGFELT = 'valgfelt',
  VALGFELT_REFERANSE = 'valgfeltReferanse',
  VARIABEL = 'variabel',
}

export enum FeltNavn {
  TEKNISK_NAVN = 'tekniskNavn',
  VISNINGSNAVN = 'visningsnavn',
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
  LAREMIDLER = 'LAREMIDLER',
  BOUTGIFTER = 'BOUTGIFTER',
}

export const ytelseTittel: Record<Ytelse, string> = {
  BARNETILSYN: 'Barnetilsyn',
  LAREMIDLER: 'Læremidler',
  BOUTGIFTER: 'Boutgifter',
};

export enum Resultat {
  INNVILGET = 'INNVILGET',
  AVSLAG = 'AVSLAG',
  FRITTSTAENDE = 'FRITTSTAENDE',
  REVURDERING = 'REVURDERING',
  OPPHOR = 'OPPHOR',
}

export const ResultatTittel: Record<Resultat, string> = {
  INNVILGET: 'Invilgelse',
  AVSLAG: 'Avslag',
  FRITTSTAENDE: 'Frittstående brev',
  REVURDERING: 'Revurdering',
  OPPHOR: 'Opphør',
};
