import * as React from 'react';

import { Link } from 'sanity/router';

import { isLocal } from '../../utils/env';

const host = () =>
  isLocal() ? 'http://localhost:3333' : 'https://tilleggsstonader-brev.sanity.studio';

export const Lenke = ({ path, children }: { path: string; children: React.ReactNode }) => {
  return <Link href={`${host()}/structure/${path}`}>{children}</Link>;
};
