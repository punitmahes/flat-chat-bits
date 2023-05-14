import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker from './media/marker.png'
import markerUser from './media/location.png'

const Maps = (props) => {
  const [user, setUser] = useState([]);
  const [allCoordinates, setAllCoordinates] = useState([]);
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
          var url = 'http://localhost:3001/api/user/unique/coordinates/?latitude='+user.location.coordinates[0].toString()+'&longitude='+user.location.coordinates[1].toString()+'&radius=5000';
          console.log(url);
          axios.get(url,config).then(response => {
            setAllCoordinates(response.data);
            console.log(allCoordinates);
          })
          .catch(error => {
            console.error(error);
          });
        }
    }
  },[user]);

  

  if(Object.keys(user).length > 0){
    return  <div className="w-full h-full">
    <MapContainer center={user.location.coordinates} zoom={13} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ul>
        {allCoordinates.map(coordinatesWithCompanyName => (
          <Marker key={coordinatesWithCompanyName.coordinates} position={[coordinatesWithCompanyName.coordinates[0], coordinatesWithCompanyName.coordinates[1]]} icon={coordinatesWithCompanyName.companyName == user.companyName ? userIcon : icon}>
            <Popup>
              <div>
                <p>Company Name: {coordinatesWithCompanyName.companyName}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </ul>
    </MapContainer>
  </div>
} else {
return <div>Waiting</div>;
}
};

export default Maps;