import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Otonom AI Blog Sistemi - Tamamen otomatik içerik üreten, SEO odaklı blog platformu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body style={{ margin: 0, padding: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
