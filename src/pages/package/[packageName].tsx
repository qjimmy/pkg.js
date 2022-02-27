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
} from '@chakra-ui/react';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import Head from 'next/head';
import { pkgService } from 'src/services/pkg.service';
import { PackageDetails } from 'src/types/entities';
import ReactMarkdown from 'react-markdown';
import { WithTopBar } from 'src/components/Layout';
import { componentsMapper } from 'src/types/constants';
import { DownloadsChart } from 'src/components/DownloadsChart';

interface PackagePageProps {
  pkg: PackageDetails;
}

const PackagePage: NextPage<PackagePageProps> = ({ pkg }) => {
  return (
    <WithTopBar>
      <Head>
        <title>{pkg._id.concat(' - Pkg.js')}</title>
        <meta
          property='description'
          content={pkg.description.concat(
            ` Latest version: ${pkg['dist-tags'].latest || ''}`
          )}
        />
        <meta
          name='og:description'
          content={pkg.description.concat(
            ` Latest version: ${pkg['dist-tags'].latest || ''}`
          )}
        />
        <meta name='og:title' content={pkg._id.concat(' - Pkg.js')} />
        <meta name='og:site_name' content={'pkg.js'} />
        {pkg.keywords && (
          <meta name='keywords' content={pkg.keywords.join(',')} />
        )}
        <meta name='twitter:card' content='summary' />
        <meta
          name='twitter:description'
          content={pkg.description.concat(
            ` Latest version: ${pkg['dist-tags'].latest || ''}`
          )}
        />
        <meta name='twitter:title' content={`pkg.js: ${pkg.name}`} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

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
                <Heading as='h2' m={4}></Heading>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </WithTopBar>
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
