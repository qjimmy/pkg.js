import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SkeletonText,
  useColorMode,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { SearchEntry } from 'src/types/entities';
import { clientService } from 'src/services/client.service';
import { Search2Icon } from '@chakra-ui/icons';
import { InfiniteLoadResults } from 'src/components/InfiniteLoadResults';
import { DEBOUNCE_DELAY, MINIMUM_QUERY_LENGTH } from 'src/types/constants';
import { DarkModeBtn } from 'src/components/DarkModeBtn';
import { SearchSkeleton } from 'src/components/SearchSkeleton';

export default function Home() {
  const [typeahead, setTypeahead] = useState<Array<SearchEntry>>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [subject$, setSubject] = useState<BehaviorSubject<string> | null>(null);

  useEffect(() => {
    if (subject$ === null) {
      const bs = new BehaviorSubject<string>('');
      setSubject(bs);
    } else {
      subject$
        .pipe(
          map((s) => s.trim()),
          filter((s) => s.length >= MINIMUM_QUERY_LENGTH),
          debounceTime(DEBOUNCE_DELAY),
          distinctUntilChanged(),
          tap(() => {
            setLoading(true);
          }),
          switchMap((text) =>
            merge(of(null), clientService.search({ text, size: 10 }))
          )
        )
        .subscribe((result) => {
          setTypeahead(result?.objects ?? null);
          if (result) {
            setTotal(result.total);
            setLoading(false);
          }
        });
    }

    return () => {
      subject$?.unsubscribe();
    };
  }, [subject$]);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (subject$) {
        return subject$.next(event.target.value);
      }
    },
    [subject$]
  );

  return (
    <>
      <Head>
        <title>Package JS</title>
        <meta name='description' content='Data about npm packages' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Flex as='section' p={4} w='100%' alignItems='center' flexDir='column'>
        <Flex w='100%' justifyContent='center'>
          <Flex flex={1}></Flex>

          <Flex flex={1} p={2} m={2} justifyContent='center'>
            <Image
              height='100'
              width='100'
              objectFit='contain'
              src='/logo.png'
              alt='pkg.js'
            />
            <Flex m={3} flexDir='column' justifyContent='center'>
              <Heading>pkg.js</Heading>
            </Flex>
          </Flex>

          <Flex flex={1} mx={5} alignItems='center' justifyContent='flex-end'>
            <DarkModeBtn h='50%' />
          </Flex>
        </Flex>

        <InputGroup w={['100%', '80%', '50%']}>
          <label htmlFor='package'></label>
          <InputLeftElement pointerEvents='none'>
            {<Search2Icon />}
          </InputLeftElement>
          <Input
            id='package'
            onChange={onChange}
            placeholder='Enter a package name'
          />
        </InputGroup>

        {typeahead && subject$?.value.length >= MINIMUM_QUERY_LENGTH && (
          <InfiniteLoadResults
            w={['100%', '80%', '50%']}
            typeahead={typeahead}
            query={subject$.value}
            total={total}
          />
        )}

        {loading && (
          <SearchSkeleton m={2} w={['100%', '80%', '50%']} padding='6' />
        )}
      </Flex>
    </>
  );
}
