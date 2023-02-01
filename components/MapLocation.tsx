import React, { Dispatch, SetStateAction, useState } from "react";
import IPosition from "../interfaces/IPosition";
import styles from "../styles/map.module.css";

type Props = {
  setPos: Dispatch<SetStateAction<IPosition>>;
};

const MapLocation = ({ setPos }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const [text, setText] = useState("Garage le plus proche");

  const handleClosestClick = () => {
    setDisabled(true);
    setText("Recherche ...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setText("Garage trouvé");
          setPos({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      );
    } else {
      setDisabled(false);
      setText("Garage le plus proche");
      alert("La localisation n'est pas supportée dans votre navigateur! ");
    }
  };
  return (
    <div className={`${styles.container} leaflet-top`}>
      <button
        disabled={disabled}
        onClick={handleClosestClick}
        className={styles.button}
      >
        {text}
      </button>
    </div>
  );
};

export default MapLocation;
