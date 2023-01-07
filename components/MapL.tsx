import React, { useEffect, useState, useRef, createRef, use } from "react";
import L, { Map as MapProp } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
  LayerGroup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import IGarage from "../interfaces/IGarage";
import GarageCard from "./GarageCard";
import CurrentLocation from "./CurrentLoc";
import IPosition from "../interfaces/IPosition";
import distance from "../helpers/distance";

const center = {
  lat: 46.5,
  lng: -71.337942,
};

const icon = L.icon({
  iconUrl: "/Marker//marker-icon.png",
  shadowUrl: "/Marker/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const maxBounds = L.latLngBounds(L.latLng(55, -56), L.latLng(44, -77));

const MapL = ({ garages }: { garages: IGarage[] }) => {
  const [map, setMap] = useState<MapProp | null>(null);
  const [pos, setPos] = useState<IPosition>({
    lat: 0,
    lng: 0,
  });
  var closestGarage: IGarage;
  useEffect(() => {
    if (pos.lat == 0 && pos.lng == 0) return;

    let closestDistance: number = Number.MAX_SAFE_INTEGER;
    garages.forEach((garage) => {
      let dist = distance(pos.lat, pos.lng, garage.pos.lat, garage.pos.lng);
      console.log(dist);
      if (dist < closestDistance) {
        closestDistance = dist;
        closestGarage = garage;
      }
    });
    if (map) {
      map.setView(closestGarage.pos, 12);
    }
  }, [pos]);

  return (
    <>
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}
        minZoom={6}
        style={{ height: "100vh", width: "100wh" }}
        ref={setMap}
        maxBounds={maxBounds}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CurrentLocation setPos={setPos} />
        {pos.lat != 0 && pos.lng != 0 && (
          <>
            <Marker position={pos} icon={icon} />
            <Polyline positions={[garages[0].pos, pos]} />
          </>
        )}
        {garages.map((garage, index) => {
          return (
            <Marker
              key={index}
              position={garage.pos}
              icon={
                new L.Icon({
                  iconUrl: garage.marker,
                  iconRetinaUrl: garage.marker,
                  iconAnchor: [25, 85],
                  popupAnchor: [-0, -0],
                  iconSize: [50, 85],
                })
              }
            >
              <Popup>
                <GarageCard {...garage} />
              </Popup>
            </Marker>
          );
        })}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </>
  );
};

export default MapL;
