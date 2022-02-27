import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FlexProps,
  Heading,
  Switch,
  useColorMode,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { DarkModeBtn } from './DarkModeBtn';

interface WithTopBarProps extends FlexProps {
  children?: React.ReactNode;
}

export const WithTopBar = ({ children, ...props }: WithTopBarProps) => {
  return (
    <>
      <Flex width='100%' flexDir='column' alignItems='center' {...props}>
        <Flex p={2} m={2} justifyContent='space-between' w='100%'>
          <Link href='/' passHref prefetch>
            <Flex
              _hover={{
                cursor: 'pointer',
              }}
            >
              <Image height='80' width='80' src='/logo.png' alt='pkg.js' />
              <Flex m={3} flexDir='column' justifyContent='center'>
                <Heading>pkg.js</Heading>
              </Flex>
            </Flex>
          </Link>
          <Flex flex='1' alignItems='center' ml={5}>
            <DarkModeBtn />
          </Flex>
        </Flex>
      </Flex>
      {children}
    </>
  );
};
