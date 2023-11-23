import * as React from 'react';

import { PortableText } from '@portabletext/react';
import { Text, Card } from '@sanity/ui';

import { useSanityQuery } from '../utils/sanity';

interface Props {
  id: string;
}

const TekstPreview: React.FC<Props> = ({ id }) => {
  const query = `*[_id=="${id}"][0]`;

  const { data, error } = useSanityQuery(query);

  if (error) {
    return (
      <Card padding={3} tone="critical">
        <Text>Det skjedde en feil</Text>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card padding={3} tone="caution">
        <Text>Laster valg...</Text>
      </Card>
    );
  }

  const valg = data as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nb: any;
  };

  return (
    <Card border padding={2}>
      <PortableText value={valg.nb} />
    </Card>
  );
};

export default TekstPreview;
