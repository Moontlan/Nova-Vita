'use client'
import { useMapEvents } from "react-leaflet";

function MapEvents({ onClick }) {
    useMapEvents({
      click: onClick,
    });
  
    return null;
  };

export default MapEvents;