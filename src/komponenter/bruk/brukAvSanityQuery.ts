import { Resultat, Ytelse } from '../../typer';

/**
 * Query som finner alle items som inneholder referanse til delmal, tekst, valgfelt eller variabel
 * En item kan være av typen mal, delmal, tekst eller valgfelt
 */
export const brukAvSanityQuery = `
    *[
  (length(delmaler) > 0) // delmal
  ||
  (_type=='valgfelt' && length(valg) > 0) // tekst
  ||
  (_type=='delmal' && "valgfeltReferanse" in nb[]._type) // valgfelt
  ||
  (_type in ["delmal", "tekst"] && "block" in nb[]._type && length(nb[].markDefs[].variabelreferanse._ref) > 0) // variabel
  ] | order(ytelse asc, visningsnavn asc) {
    _id,
     _type,
    visningsnavn,
    resultat,
    ytelse,
    // tekst
    valg[defined(_ref)]{
      _ref
    },
    // delmal
    delmaler[defined(delmalReferanse._ref)] {
      delmalReferanse{
        _ref
      }
    },
    nb[
      (_type == "valgfeltReferanse" && defined(valgfelt._ref)) // valgfelt
      ||
      (_type == "block" && length(markDefs[].variabelreferanse._ref) > 0) // variabel
      ] {
      _type,
      // valgfelt
      valgfelt { 
        _ref
      },
      // variabel
      markDefs[_type == "variabel" && defined(variabelreferanse._ref)]{
        _type,
        variabelreferanse {
          _ref
        }
      }
    }
  }
    `;

// Response fra sanity
export type BrukAvSanityQueryResult = SanityItem &
  (BrukAvDelmal | BrukAvTekst | BrukAvValgReferanseEllerVariabel);

export interface SanityItem {
  _id: string;
  visningsnavn: string;
}

export interface BrukAvDelmal {
  ytelse: Ytelse;
  resultat: Resultat;
  _type: `${Ytelse}_${Resultat}`;
  delmaler: {
    delmalReferanse: {
      _ref: string;
    };
  }[];
}

export interface BrukAvTekst {
  _type: 'valgfelt';
  valg: {
    _ref: string;
  }[];
}

export interface BrukAvValgReferanseEllerVariabel {
  _type: 'delmal' | 'tekst';
  nb: (NBBrukAvValgfeltReferanse | NBBrukAvVariabel)[];
}

interface NBBrukAvValgfeltReferanse {
  _type: 'valgfeltReferanse';
  valgfelt: {
    _ref: string;
  };
}

interface NBBrukAvVariabel {
  _type: 'block';
  markDefs: {
    variabelreferanse: {
      _ref: string;
    };
  }[];
}
