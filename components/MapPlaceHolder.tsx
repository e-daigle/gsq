import Link from "next/link";
import React from "react";
import styles from "../styles/map.module.css";

const MapPlaceHolder = () => {
  return (
    <div className={styles.placeHolder}>
      <img src="/GSQ.png" alt="Logo GSQ" height={100} />
      <div>Désolé, la carte des garages n'est pas disponible. </div>
        <Link href={"/garages/list"}>
          <p>Afficher une liste des garages</p>
        </Link>
        <Link href={"/"}>
          <p>Accueil</p>
        </Link>
    </div>
  );
};

export default MapPlaceHolder;
