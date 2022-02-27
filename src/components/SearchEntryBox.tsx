import { Flex, FlexProps, Heading, Text, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { SearchEntry } from 'src/types/entities';

interface SearchEntryBoxProps extends FlexProps {
  entry: SearchEntry;
}

export const SearchEntryBox = ({ entry, ...boxProps }: SearchEntryBoxProps) => {
  const { colorMode } = useColorMode();

  return (
    <Link
      href={{
        pathname: '/package/[packageName]',
        query: { packageName: entry.package.name },
      }}
      passHref
      prefetch
    >
      <Flex
        {...boxProps}
        transition={'box-shadow .2s'}
        _hover={{
          cursor: 'pointer',
          boxShadow:
            colorMode === 'light'
              ? '0 0 11px rgba(33,33,33,.2)'
              : '0 0 11px rgba(222,222,222,.8)',
        }}
      >
        <Heading m={1} as='h3'>
          {entry.package.name}
        </Heading>

        <Heading m={1} as='h5' fontSize='0.875rem'>
          {entry.package.version}
        </Heading>

        <Text m={1}>{entry.package.description}</Text>
      </Flex>
    </Link>
  );
};
