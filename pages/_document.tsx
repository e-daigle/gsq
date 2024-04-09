import { Html, Head, Main, NextScript } from "next/document";

export function addJsonLd(name: string, description: string) {
  return {
    __html: `{
      "@context": "https://schema.org/",
      "@type": "NewsArticle",
      "url": "https://guidesubaruquebec.com/",
      "name": "${name}",
      "description": "${description}"
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addJsonLd(
            "Guide Subaru Québec",
            "Guide Subaru Québec est dédié à la communauté Subaru au Québec. Retrouvez des informations sur les garages spécialisés Subaru ainsi que des guides sur la modification et l'entretien de votre véhicule."
          )}
          key="jsonld"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
