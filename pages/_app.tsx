import "../styles/globals.css";
import "@emile-daigle/d-dash/themes/default.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Head from "next/head";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const updateViewCount = async () => {
      const { data, error } = await supabaseClient.rpc("update_views");

      if (error) console.error(error);
    };
    updateViewCount();
  }, []);
  return (
    <>
      <Head>
        <title>Guide Subaru Québec</title>
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
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://guidesubaruquebec.com"
          key="og:url"
        />
        <meta
          property="og:image"
          content="https://guidesubaruquebec.com/GSQ_OG.png"
        />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        {getLayout(<Component {...pageProps} />)}
      </SessionContextProvider>
    </>
  );
}
