import * as React from 'react';

import { Badge, Box, Flex, Inline } from '@sanity/ui';
import { PreviewProps } from 'sanity';

type Props = PreviewProps & {
  visningsnavn: string;
  skalAlltidMed?: boolean;
  skalVisesIBrevmeny?: boolean;
};

const DelmalReferansePreview = (props: PreviewProps) => {
  const castProps = props as Props;
  const { visningsnavn, skalAlltidMed, skalVisesIBrevmeny } = castProps;

  return (
    <Flex align="center">
      <Box flex={1}>{visningsnavn}</Box>
      <Inline space={2}>
        {skalAlltidMed && (
          <Badge mode="outline" tone="positive">
            Alltid med
          </Badge>
        )}
        {skalVisesIBrevmeny && (
          <Badge mode="outline" tone="positive">
            Vises i brevmeny
          </Badge>
        )}
      </Inline>
    </Flex>
  );
};

export default DelmalReferansePreview;
