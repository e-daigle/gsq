import React from "react";
import { Popup } from "react-leaflet";
import IGarage from "../interfaces/IGarage";
import styles from "../styles/popup.module.css";

const GaragePopup = ({ garage }: { garage: IGarage }) => {
  return (
    <Popup>
      <div className={styles.container}>
        <a target="_blank" href={garage.link} rel="noreferrer">
          <img className={styles.img} alt="Logo garage" src={garage.image} />
        </a>
        <div className={styles.info}>
          <h2> {garage.name}</h2>
          <h5>{garage.address}</h5>
          <h5>{garage.phone}</h5>
          <a target="_blank" href={garage.link} rel="noreferrer">
            <h6>{garage.link}</h6>
          </a>
        </div>
      </div>
    </Popup>
  );
};

export default GaragePopup;
