import React, { useEffect, useState } from "react";
import IGarage from "../../interfaces/IGarage";
import GarageCard from "../../components/GarageCard";
import styles from "../../styles/garage.module.css";
import { getGarages } from "../../lib/database/garages";
import withLayout from "../../layouts/withLayout";
import { redirectError } from "../../lib/SSR/redirect";
import handleError from "../../utils/handleError";
import { addError } from "../../lib/database/errors";

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
    addError( errorMessage, "Admin index");
    return {
      props: {
        error: errorMessage
      },
      revalidate: 10,
    };
  }
};