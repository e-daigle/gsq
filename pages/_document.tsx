import { Html, Head, Main, NextScript } from "next/document";

export function addJsonLd(name: string, description: string) {
  return {
    __html: `{
      "@context": "https://schema.org/",
      "@type": "NewsArticle",
      "url": "https://guidesubaruquebec.com/",
      "alternateName": "GSQ",
      "name": "${name}",
      "description": "${description}",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://guidesubaruquebec.com/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
`,
  };
}

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
        <meta property="og:site_name" content="Guide Subaru Québec" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
