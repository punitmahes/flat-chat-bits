import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker from './media/marker.png'
import markerUser from './media/location.png'
import markerFlat from './media/flat-pin.png'
import PopupWindow from "./PopupWindow";

const Maps = (props) => {
  const [user, setUser] = useState([]);
  const [allCoordinates, setAllCoordinates] = useState([]);
  const [flats,setFlats] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [currentCompany, setCurrentCompany] = useState(null);
  var loaded = false;
  const passedUser = props.user;
  

  const icon = L.icon({
    iconUrl: marker,
    iconSize: [30, 40],
  });
  const userIcon = L.icon({
    iconUrl: markerUser,
    iconSize: [50, 50],
  });
  const flatIcon = L.icon({
    iconUrl: markerFlat,
    iconSize: [30, 30],
  });
  useEffect(() => {
    setUser(passedUser);
  },[passedUser]);

  useEffect(() => {
    if(user){
      loaded = true;
      if(Object.keys(user).length > 0){
        const config = {
          headers:{
            "x-api-key": "1234"
          }
        }
        var url = 'http://localhost:3001/api/user/unique/coordinates/?latitude='+user.location.coordinates[0].toString()+'&longitude='+user.location.coordinates[1].toString()+'&radius=1000000000';
        console.log(url);
        axios.get(url,config).then(response => {
          setAllCoordinates(response.data);
          console.log(allCoordinates);
        })
        .catch(error => {
          console.error(error);
        });
        var url = 'http://localhost:3001/api/flat/unique/flats/?latitude='+user.location.coordinates[0].toString()+'&longitude='+user.location.coordinates[1].toString()+'&radius=1000000000';
        console.log(url);
        axios.get(url,config).then(response => {
          setFlats(response.data);
          console.log(flats);
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
  },[user]);

  const mapRef = useRef(null); 
  function HandleMarkerClick(data){
    if (mapRef.current) {
      const map = mapRef.current;
      map.flyTo(data.coordinates, 18); // Adjust the zoom level as needed
    }
    setCurrentCompany(data.companyName);
    setSelectedPin(data.coordinates);
  }

  function handleMarkerClose(){
    setSelectedPin(null);
  }

  if(Object.keys(user).length > 0){
    return  <div className="w-full h-full absolute top-0">
    <MapContainer ref = {mapRef} center={user.location.coordinates} zoom={13} className="w-full h-full" >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ul>
        {allCoordinates.map(coordinatesWithCompanyName => (
          <Marker key={coordinatesWithCompanyName.coordinates} position={[coordinatesWithCompanyName.coordinates[0], coordinatesWithCompanyName.coordinates[1]]} icon={coordinatesWithCompanyName.companyName == user.companyName ? userIcon : icon} eventHandlers={{
            click: () => HandleMarkerClick(coordinatesWithCompanyName),
          }}>
          </Marker>
        ))}
      </ul>
      <ul>
        {flats.map(flat => (
          <Marker key={flat.coordinates} position={[flat.coordinates[0], flat.coordinates[1]]} icon={flatIcon} eventHandlers={{
            click: () => HandleMarkerClick(flat),
          }}>
          </Marker>
        ))}
      </ul>
    </MapContainer>
    {selectedPin && <PopupWindow data={selectedPin} onClose={handleMarkerClose} companyName={currentCompany}/>}
  </div>
} else {
return <div>Waiting</div>;
}
};

export default Maps;