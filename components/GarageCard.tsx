import React from "react";
import IGarage from "../interfaces/IGarage";
import styles from "../styles/garage.module.css"

const GarageCard = (garage: IGarage) => {
  return (
    <>
      <li className={styles.card} id={`garage${garage.id}`}>
        <a className={styles.card__link} target="_blank" href={garage.link}  rel="noreferrer">
          <img
            className={styles.card__img}
            alt="Logo garage"
            src={garage.image}
          />
          <div className={styles.card__info}>
            <h2> {garage.name}</h2>
            <h5>{garage.address}</h5>
            <h5>{garage.phone}</h5>
            <h6>{garage.link}</h6>
          </div>
        </a>
      </li>
    </>
  );
};

export default GarageCard;
