import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker from './media/marker.png'

const Maps = (props) => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  var loaded = false;
  const passedUser = props.user;

  const icon = L.icon({
    iconUrl: marker,
    iconSize: [30, 40],
  });
  
  useEffect(() => {
    setUser(passedUser);
  },[passedUser]);

  useEffect(() => {
    if(user){
      loaded = true;
    }
  },[user]);

  useEffect(() => {
    const config = {
      headers:{
        "x-api-key":"1234"
      }
    }
    var url = 'http://localhost:3001/api/user/'
    axios.get(url,config).then(response => {
      setUsers(response.data);
      console.log(users);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  if(Object.keys(user).length > 0){
    return  <div className="w-full h-full">
    <MapContainer center={user.location.coordinates} zoom={13} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ul>
        {users.map(customUser => (
          <Marker key={customUser.googleId} position={[customUser.location.coordinates[0], customUser.location.coordinates[1]]} icon={icon}>
            <Popup>
              <div>
                <p>Company Name: {customUser.companyName}</p>
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