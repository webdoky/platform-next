import Head from 'next/head';
import GaScript from './gaScript';

interface Params {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  basePath: string;
  robots?: string;
}

export default function MetaHead(params: Params) {
  const { title, description, canonicalUrl, basePath, robots } = params;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OG */}
      <meta property="og:title" name="og:title" content={title} />
      <meta
        property="og:description"
        name="og:description"
        content={description}
      />
      <meta
        property="og:image"
        name="og:image"
        content={`${basePath}/logo.png`}
      />
      <meta property="og:locale" name="og:locale" content="uk-UA" />
      <meta property="og:url" name="og:url" content={canonicalUrl} />

      {/* Twitter card */}
      <meta property="twitter:title" name="twitter:title" content={title} />
      <meta
        property="twitter:description"
        name="twitter:description"
        content={description}
      />
      <meta
        property="twitter:image"
        name="twitter:image"
        content={`${basePath}/logo.png`}
      />

      {/* Favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      {/* Other */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {robots && <meta property="robots" name="robots" content={robots} />}

      <GaScript />
    </Head>
  );
}
