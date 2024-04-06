import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/*     <meta name="theme-color" content="#004488"/> */}
        <meta
          name="google-site-verification"
          content="teHhaBKz6mze-2mrl-RYhtu_rlf0drW6ny-aZiBg3VM"
        />

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://guidesubaruquebec.com/GSQ_OG.png"
        />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
