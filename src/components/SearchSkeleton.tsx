import { Box, BoxProps, SkeletonText, useColorMode } from '@chakra-ui/react';

interface SearchSkeletonProps extends BoxProps {}

const skeleton = new Array(3).fill(undefined);

export const SearchSkeleton = ({ ...props }: SearchSkeletonProps) => {
  const { colorMode } = useColorMode();

  return (
    <>
      {skeleton.map((_, index) => (
        <Box
          key={index}
          {...props}
          boxShadow={
            colorMode === 'light'
              ? '0 0 4px rgba(33,33,33,.2)'
              : '0 0 4px rgba(222,222,222,.8)'
          }
        >
          <SkeletonText
            mt='2'
            startColor='white'
            endColor='grey'
            noOfLines={2}
            spacing='2'
            w='25%'
          />
          <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </Box>
      ))}
    </>
  );
};
