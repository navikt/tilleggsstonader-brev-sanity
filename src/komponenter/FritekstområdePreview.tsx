import React from 'react';

import { Stack, Card, Flex, Text } from '@sanity/ui';

const FritekstPreview: React.FC = () => (
  <Stack>
    <Card padding={3} tone={'caution'}>
      <Flex justify="center">
        <Text>Fritekstområde</Text>
      </Flex>
    </Card>
  </Stack>
);

export default FritekstPreview;
