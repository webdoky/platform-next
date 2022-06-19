import { Html, Head, Main, NextScript } from 'next/document';
import GaScript from '../components/gaScript';

export default function Document() {
  return (
    <Html lang="uk-UA">
      <Head>
        <GaScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
