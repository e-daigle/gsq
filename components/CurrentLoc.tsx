import React, { Dispatch, SetStateAction, useState } from "react";
import IPosition from "../interfaces/IPosition";
import styles from "../styles/position-buton.module.css";

type Props = {
  setPos: Dispatch<SetStateAction<IPosition>>;
};

const CurrentLocation = ({ setPos }: Props) => {
  const [disabled, setDisabled] = useState(false);

  const handleClosestClick = () => {
    setDisabled(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setDisabled(false);
          setPos({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      );
    } else {
      // Browser doesn't support Geolocation
    }
  };
  return (
    <div className={`${styles.container} leaflet-top`}>
      <button
        disabled={disabled}
        onClick={handleClosestClick}
        className={styles.button}
      >
        {disabled ? <p>Recherche ...</p> : <p>Garage le plus proche</p>}
      </button>
    </div>
  );
};

export default CurrentLocation;
