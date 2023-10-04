import * as React from 'react';

import { Badge, Box, Flex, Heading, Stack } from '@sanity/ui';
import { PreviewProps } from 'sanity';

import FritekstPreview from './FritekstområdePreview';
import TekstPreview from './TekstPreview';

type Props = PreviewProps & {
  valg?: { _type: string; _ref: string }[];
};

const ValgReferansePreview = (props: PreviewProps) => {
  const castProps = props as Props;
  const { valg } = castProps;

  return (
    <Stack space={3} padding={2}>
      <Box>
        <Badge tone="primary">Valgfelt</Badge>
      </Box>
      <Heading size={1}>{props.renderDefault(props)}</Heading>
      {valg?.map((v, indeks) => (
        <Flex padding={2} gap={2} direction="column">
          <Heading size={0}>Valg {indeks + 1}:</Heading>
          {v._type === 'reference' && <TekstPreview id={v._ref} />}
          {v._type === 'fritekst' && <FritekstPreview />}
        </Flex>
      ))}
    </Stack>
  );
};

export default ValgReferansePreview;
