import { useEffect, useState } from 'react';

import { createClient } from '@sanity/client';

export const client = (brukCache: boolean) => {
  return createClient({
    projectId: 's0grjk9v',
    dataset: 'production',
    useCdn: brukCache,
    withCredentials: true,
  });
};

export async function hentFraSanity(
  query: string,
  brukCache: boolean = true,
  brukSessionStorage: boolean = true,
) {
  const datasett = window.location.pathname.split('/')[1];
  const key = datasett + ';' + query;
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
