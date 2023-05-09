import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import GoogleAuthenticate from "./components/googleAuthenticate";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});


function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  }, [selectPosition]);

  return null;
}


export default function Maps(props) {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const id = params.get('ID');
  //   console.log(id)
  //   if(id){
  //     var url = 'http://localhost:3001/api/user/'+id.toString()
  //     axios.get(url).then(response => {
  //       setUser(response.data);
  //       console.log(user);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  //   }
  // }, []);
const position = [13.02459661074545, 80.21557509899141];
  return (
    <MapContainer
      center={position}
      zoom={20}
      style={{ width: "50%", height: "50%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=PIjqK954rztHE1CpBVNa"
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
