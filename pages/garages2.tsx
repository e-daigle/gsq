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
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import dynamic from "next/dynamic";


const MapL = dynamic(import('../components/MapL'), {
    ssr: false,
    loading: () => (
      <div style={{textAlign: 'center', paddingTop: 20}}>
        Chargement…
      </div>
    )
  })

const Garages = () => {
  const [garages, setGarages] = useState<IGarage[]>([]);
  const [pos, setPos] = useState<IPosition>({
    lat: 0,
    lng: 0,
  });
  const mapRef = useRef<google.maps.Map | null>(null);


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
    }
  }, [pos]);

  return (
    <>
      <MapL garages={garages}/>
    </>
  );
};

export default Garages;
