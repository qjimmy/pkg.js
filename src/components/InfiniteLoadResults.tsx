import { Box, BoxProps, Spinner, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { clientService } from 'src/services/client.service';
import type { SearchEntry } from 'src/types/entities';
import { SearchEntryBox } from './SearchEntryBox';
import { SearchSkeleton } from './SearchSkeleton';

interface Props extends BoxProps {
  typeahead: Array<SearchEntry>;
  query: string;
  total: number;
}

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const limit = 10;
let offset = 10;

export const InfiniteLoadResults = ({
  typeahead,
  query,
  total,
  ...boxProps
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [results, setResults] = useState<Array<SearchEntry>>(typeahead);
  const [noMoreResults, setNomoreResults] = useState<boolean>(false);

  useEffect(() => {
    // If query changes, set offset back to the limit
    offset = limit;
  }, [query]);

  const onIntersection = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.intersectionRatio > options.threshold) {
        try {
          const { objects } = await clientService.search({
            text: query,
            from: offset,
            size: limit,
          });

          if (objects.length < limit) {
            setNomoreResults(true);
          }

          offset += limit;
          setResults((results) => [...results, ...objects]);
        } catch (error) {
          // TODO: handle error
        }
      }
    },
    [query]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, options);
    const observed = containerRef.current;

    if (observed) {
      observer.observe(observed);
    }

    return () => {
      if (observed) {
        observer.unobserve(observed);
      }
    };
  }, [containerRef, onIntersection]);

  return (
    <Box {...boxProps}>
      <Box p={2}>
        {!!total && (
          <Text>
            Showing {results.length} results out of {total}
          </Text>
        )}
      </Box>

      {results.map<JSX.Element>((entry, index) => (
        <SearchEntryBox entry={entry} p={5} key={index} flexDir='column' />
      ))}

      {results.length >= limit && !noMoreResults && (
        <Box m={5} ref={containerRef}>
          <SearchSkeleton m={2} w='100%' padding='6' />
        </Box>
      )}
    </Box>
  );
};
