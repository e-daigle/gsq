import React, { useEffect, useState } from "react";
import IGarage from "../../interfaces/IGarage";
import GarageCard from "../../components/GarageCard";
import styles from "../../styles/garage.module.css";
import { getGarages } from "../../lib/garages";

const Garages = ({ garages }: { garages: IGarage[] }) => {
  return (
    <>
      <div className={styles.garages}>
        <div className={styles.cards}>
          <ul className={styles.cards__items}>
            {garages.map((garage) => {
              return <GarageCard {...garage} key={garage.id} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
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
