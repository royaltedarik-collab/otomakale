import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="AI araçları, teknoloji trendleri, verimlilik ipuçları ve otomasyon teknikleri hakkında güncel makaleler. Her gün yeni içeriklerle bilginizi güncel tutun." />
        <meta name="keywords" content="yapay zeka, ai araçları, chatgpt, verimlilik, otomasyon, dijital pazarlama, seo, teknoloji" />
        <meta name="author" content="TeknoVeAI" />
        <meta property="og:title" content="TeknoVeAI - AI, Teknoloji ve Verimlilik Blog" />
        <meta property="og:description" content="Yapay zeka araçları, otomasyon teknikleri ve dijital pazarlama stratejileri hakkında güncel içerikler" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>" />
      </Head>
      <body style={{ margin: 0, padding: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
