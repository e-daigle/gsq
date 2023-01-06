import React, { useEffect, useState, useRef, createRef } from "react";
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
  Polyline,
} from "@react-google-maps/api";
import IGarage from "../interfaces/IGarage";
import GarageCard from "../components/GarageCard";
import styles from "../styles/garage.module.css";
import distance from "../helpers/distance";
import IPosition from "../interfaces/IPosition";
import CurrentLocation from "../components/CurrentLoc";

const containerStyle = {
  width: "100%",
  height: "100vh",
};
const center = {
  lat: 46.737529,
  lng: -71.337942,
};
const options = {
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false
};


const Garages = () => {
  const [garages, setGarages] = useState<IGarage[]>([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: """",
  });
  const [pos, setPos] = useState<IPosition>({
    lat: 0,
    lng: 0,
  });
  const mapRef = useRef<google.maps.Map | null>(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const getGarages = async () => {
      try {
        const response = await fetch("/api/garages");
        const data = await response.json();
        setGarages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getGarages();
  }, []);

  useEffect(() => {
    if (pos.lat == 0 && pos.lng == 0) return;

    let closestDistance: number = Number.MAX_SAFE_INTEGER;
    let closestGarage: IGarage = garages[0];
    garages.forEach((garage) => {
      let dist = distance(pos.lat, pos.lng, garage.pos.lat, garage.pos.lng);
      console.log(dist);
      if (dist < closestDistance) {
        closestDistance = dist;
        closestGarage = garage;
      }
    });
    if (mapRef.current) {
      showDirections(pos, closestGarage.pos);
    }
  }, [pos]);

  const showDirections = (origin: IPosition, destination: IPosition) => {
    var directionsOptions = {
      map: mapRef.current,
      suppressMarkers: true,
    };
    var directionsDisplay: google.maps.DirectionsRenderer =
      new google.maps.DirectionsRenderer(directionsOptions);

    var request = {
      origin: new google.maps.LatLng(origin),
      destination: new google.maps.LatLng(destination),
      travelMode: google.maps.TravelMode.DRIVING,
    };

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      } else {
        alert("Impossible d'avoir le trajet. " + status);
      }
    });
  };

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
    if(buttonRef.current)
    {
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(buttonRef.current);
    }
  };
  const onUnmount = () => {
    mapRef.current = null;
  };

  const handleClickScroll = (id: number) => {
    const element = document.getElementById(`garage${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          key=""
          mapContainerStyle={containerStyle}
          center={center}
          options={options}
          zoom={7}
          clickableIcons={false}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <div ref={buttonRef}><CurrentLocation setPos={setPos} /></div>
          {pos.lat != 0 && pos.lng != 0 && <MarkerF position={pos} />}
          {garages.map((garage) => {
            return (
              <MarkerF
                key={garage.id}
                onClick={() => {
                  handleClickScroll(garage.id);
                }}
                position={garage.pos}
                icon={{
                  url: garage.marker,
                  scaledSize: new window.google.maps.Size(75, 125),
                }}
              />
            );
          })}
        </GoogleMap>
      ) : (
        <p>Map non-disponible</p>
      )}
      <div className={styles.garages}>
        <h1>Garages spécialisés</h1>
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
