import * as React from 'react';

import { Badge, Box, Heading, Stack } from '@sanity/ui';
import { PreviewProps } from 'sanity';

const ValgReferansePreview = (props: PreviewProps) => {
  return (
    <Stack space={3} padding={2}>
      <Box>
        <Badge tone="primary">Valgfelt</Badge>
      </Box>
      <Heading size={1}>{props.renderDefault(props)}</Heading>
    </Stack>
  );
};

export default ValgReferansePreview;
