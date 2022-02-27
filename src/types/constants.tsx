import { Img, Heading, Text, Code } from '@chakra-ui/react';
import type { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import type { NormalComponents } from 'react-markdown/lib/complex-types';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export const MINIMUM_QUERY_LENGTH = 2;
export const DEBOUNCE_DELAY = 400;
export const componentsMapper: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  a: ({ node, ...props }) => (
    <a
      {...props}
      style={{
        textDecoration: 'underline',
        color: '#8080ff',
      }}
    />
  ),

  code: ({ node, inline, ...props }) => (
    <Code {...props} m={3} p={3} w='100%' overflow='scroll' />
  ),
  h1: ({ node, ...props }) => <Heading as='h1' {...props} m={3} />,
  h2: ({ node, ...props }) => <Heading as='h2' {...props} m={3} />,
  h3: ({ node, ...props }) => <Heading as='h3' {...props} m={3} />,
  h4: ({ node, ...props }) => <Heading as='h4' {...props} m={3} />,
  h5: ({ node, ...props }) => <Heading as='h5' {...props} m={3} />,
  h6: ({ node, ...props }) => <Heading as='h6' {...props} m={3} />,
  img: ({ node, ...props }) => <Img {...props} m={1} />,
  li: ({ node, ordered, ...props }) => (
    <li {...props} style={{ margin: '0.75rem' }} />
  ),
  p: ({ node, ...props }) => <Text {...props} m={3} />,
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({ config });
