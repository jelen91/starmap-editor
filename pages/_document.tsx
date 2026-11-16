import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700&family=Anton&family=Dancing+Script:wght@400;500;600;700&family=Joan&family=Lobster&family=Oswald:wght@300&family=PT+Sans:wght@400;700&family=Pacifico&family=Roboto&family=Twinkle+Star&family=Ubuntu:ital,wght@1,300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
