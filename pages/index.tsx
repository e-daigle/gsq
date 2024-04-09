import React, { useEffect } from "react";
import HomeCards from "../components/HomeCards";
import Hero from "../components/Hero";
import withLayout from "../layouts/withLayout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="Subaru, Québec, voiture, garage, communauté, entretien, modification, guide"
        />
        <meta
          name="description"
          content="Guide Subaru Québec est dédié à la communauté Subaru au Québec. Retrouvez des informations sur les garages spécialisés Subaru ainsi que des guides sur la modification et l'entretien de votre véhicule."
          key="description"
        />
        <meta
          property="og:title"
          content="Guide Subaru Québec"
          key="og:title"
        />
        <meta
          property="og:description"
          content="La source d'information pour les amateurs de Subaru du Québec."
          key="og:description"
        />
        <meta
          property="og:url"
          content="https://guidesubaruquebec.com"
          key="og:url"
        />
        <meta
          property="og:image"
          content="https://guidesubaruquebec.com/GSQ_OG.png"
        />
        <meta name="google" content="nositelinkssearchbox"/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addJsonLd()}
          key="jsonld"
        ></script>
      </Head>
      <section className="heroParallax">
        <Hero />
      </section>
      <section className="marginParallax">
        <HomeCards />
      </section>
    </>
  );
}

Home.getLayout = withLayout();

function addJsonLd() {
  return {
    __html: `{
      "@context": "https://schema.org/",
      "@type": "NewsArticle",
      "url": "https://guidesubaruquebec.com/",
      "name": "Guide Subaru Québec",
      "description": "Guide Subaru Québec est dédié à la communauté Subaru au Québec. Retrouvez des informations sur les garages spécialisés Subaru ainsi que des guides sur la modification et l'entretien de votre véhicule.",
      "alternateName": "GSQ",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://guidesubaruquebec.com/guides/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
`,
  };
}
