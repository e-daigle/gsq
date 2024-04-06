import React, { useEffect, useState } from "react";
import IGarage from "../../interfaces/IGarage";
import dynamic from "next/dynamic";
import { supabase } from "../../lib/Database/supabase";
import { getGarages } from "../../lib/Database/garages";
import { redirect } from "next/dist/server/api-utils";
import MapPlaceHolder from "../../components/MapPlaceHolder";
import { GetStaticProps } from "next";
import withLayout from "../../layouts/withLayout";
import handleError from "../../utils/handleError";
import { addError } from "../../lib/Database/errors";
import Head from "next/head";

const MapL = dynamic(import("../../components/MapL"), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
  ),
});

const Garages = ({ garages }: { garages: IGarage[] }) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Retrouvez des informations sur les garages spécialisés Subaru à l'aide d'une carte interactive qui est constamment mise à jour."
          key="description"
        />
        <meta
          property="og:title"
          content="Guide Subaru Québec - Garages"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Carte interactive des garages spécialisés Subaru au Québec."
          key="og:description"
        />
        <meta
          property="og:url"
          content="https://guidesubaruquebec.com/garages"
          key="og:url"
        />
      </Head>
      {garages.length ? <MapL garages={garages} /> : <MapPlaceHolder />}
    </>
  );
};

export default Garages;

Garages.getLayout = withLayout();

export const getStaticProps = async () => {
  try {
    const garages = await getGarages();
    return {
      props: {
        garages,
      },
      revalidate: 300,
    };
  } catch (error) {
    const errorMessage = handleError(error);
    addError(errorMessage, "Admin index");
    return {
      props: {
        error: errorMessage,
      },
      revalidate: 10,
    };
  }
};
