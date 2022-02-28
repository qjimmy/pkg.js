import React from 'react';
import {
  Badge,
  Flex,
  Heading,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Divider,
  Icon,
} from '@chakra-ui/react';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { pkgService } from 'src/services/pkg.service';
import { PackageDetails } from 'src/types/entities';
import ReactMarkdown from 'react-markdown';
import { WithTopBar } from 'src/components/Layout';
import { componentsMapper } from 'src/types/constants';
import { PackageMetadata } from 'src/components/PackageMeta';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';

interface PackagePageProps {
  pkg: PackageDetails;
}

const PackagePage: NextPage<PackagePageProps> = ({ pkg }) => {
  return (
    <>
      <PackageMetadata pkg={pkg} />
      <WithTopBar>
        <Flex as='section' alignItems='center' flexDir='column' p={2}>
          <Flex as='article' flexDir='column' w={['100%', '80%', '80%', '65%']}>
            <Stack direction='row'>
              <Heading>{pkg.name || pkg._id}</Heading>
              <Flex alignItems='center'>
                <Badge height='50%' colorScheme='green'>
                  {pkg['dist-tags'].latest}
                </Badge>
              </Flex>
            </Stack>

            <Text m={3}>{pkg.description}</Text>

            <Tabs size='md' variant='enclosed'>
              <TabList>
                {pkg.readme && <Tab>README.md</Tab>}
                <Tab>Summary</Tab>
              </TabList>

              <TabPanels>
                {pkg.readme && (
                  <TabPanel>
                    <ReactMarkdown components={componentsMapper}>
                      {pkg.readme}
                    </ReactMarkdown>
                  </TabPanel>
                )}

                <TabPanel>
                  <Heading as='h2' m={4}>
                    Summary
                  </Heading>

                  {pkg.repository?.url && (
                    <Flex m={2}>
                      <Flex flexDir='column' justifyContent='center'>
                        <Icon as={AiFillGithub} />
                      </Flex>

                      <Link
                        href={pkg.repository.url.replace(/git\+/, '')}
                        passHref
                      >
                        <Text m={2} textDecor='underline' cursor='pointer'>
                          Source code
                        </Text>
                      </Link>
                    </Flex>
                  )}

                  {pkg.homepage && (
                    <Flex m={2}>
                      <Flex flexDir='column' justifyContent='center'>
                        <Icon as={BsGlobe} />
                      </Flex>

                      <Link href={pkg.homepage} passHref>
                        <Text m={2} textDecor='underline' cursor='pointer'>
                          Homepage
                        </Text>
                      </Link>
                    </Flex>
                  )}

                  <Divider borderWidth={2} />

                  <Heading as='h2' m={4}>
                    Keywords
                  </Heading>

                  {pkg.keywords &&
                    pkg.keywords.map((keyword) => (
                      <Badge m={1} key={keyword}>
                        {keyword}
                      </Badge>
                    ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </WithTopBar>
    </>
  );
};

export default PackagePage;

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<{
    packageName: string;
  }>
): Promise<GetServerSidePropsResult<PackagePageProps>> {
  const { packageName } = ctx.params;

  const pkg = await pkgService.getPackage(packageName);

  return {
    props: {
      pkg,
    },
  };
}
