import React, { useEffect, useState } from "react";
import IGarage from "../../interfaces/IGarage";
import dynamic from "next/dynamic";
import { supabase } from "../../utils/supabase";
import { getGarages } from "../../lib/garages";
import { redirect } from "next/dist/server/api-utils";
import MapPlaceHolder from "../../components/MapPlaceHolder"

const MapL = dynamic(import("../../components/MapL"), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
  ),
});

const Garages = ({ garages }: { garages: IGarage[]}) => {
  return <>{garages.length > 0 ? <MapL garages={garages} /> : <MapPlaceHolder />}</>;
};

export default Garages;

export async function getStaticProps() {
  const garages = await getGarages();
  return {
    props: {
      garages,
    },
    revalidate: 300,
  };
}
