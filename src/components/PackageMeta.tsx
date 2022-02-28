import Head from 'next/head';
import { PackageDetails } from 'src/types/entities';

interface PackageMetadataProps {
  pkg: PackageDetails;
}

export const PackageMetadata = ({ pkg }: PackageMetadataProps) => {
  return (
    <Head>
      <title>{(pkg._id || pkg.name).concat(' - Pkg.js')}</title>
      {pkg.description && (
        <>
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
          <meta
            name='twitter:description'
            content={pkg.description.concat(
              ` Latest version: ${pkg['dist-tags']?.latest || ''}`
            )}
          />
        </>
      )}
      <meta
        name='og:title'
        content={(pkg._id || pkg.name).concat(' - Pkg.js')}
      />
      <meta name='og:site_name' content={'pkg.js'} />
      {pkg.keywords && (
        <meta name='keywords' content={pkg.keywords.join(',')} />
      )}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={`pkg.js: ${pkg.name || pkg._id}`} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};
