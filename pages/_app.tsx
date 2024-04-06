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
