import { useEffect, useState } from 'react';

import { createClient } from '@sanity/client';

import { DATASETT, erProduksjonsdatasett, PROSJEKT_ID } from './datasett';

export const client = (brukCache: boolean) => {
  return createClient({
    projectId: PROSJEKT_ID,
    dataset: DATASETT,
    // Utviklingsdatasettet er privat, så det leses direkte fra API-et.
    useCdn: brukCache && erProduksjonsdatasett,
    withCredentials: true,
  });
};

export async function hentFraSanity(
  query: string,
  brukCache: boolean = true,
  brukSessionStorage: boolean = true,
) {
  const key = DATASETT + ';' + query;
  const cachedHits = sessionStorage.getItem(key);

  if (cachedHits && brukSessionStorage) {
    return JSON.parse(cachedHits);
  } else {
    const response = await client(brukCache).fetch(query);
    sessionStorage.setItem(key, JSON.stringify(response));
    return response;
  }
}

export function useSanityQuery(
  query: string,
  brukCache: boolean = true,
  brukSessionStorage: boolean = true,
) {
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    hentFraSanity(query, brukCache, brukSessionStorage)
      .then((response) => setData(response))
      .catch((error) => setError(error));
  }, [query, brukCache, brukSessionStorage]);

  return { data, error };
}
