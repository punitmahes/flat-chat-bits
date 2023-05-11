import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  var position = [13.024817679507436, 80.21549257938041];
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('ID');
    console.log(id)
    if(id){
      var url = 'http://localhost:3001/api/user/'+id.toString()
      axios.get(url).then(response => {
        setUser(response.data);
        // console.log("user: "+user);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []);
  useEffect(() => {
    const config = {
      headers:{
        "x-api-key":"1234"
      }
    }
    var url = 'http://localhost:3001/api/user/'
    axios.get(url,config).then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  if(!user) {
    console.log("loading");
  } 
  else {
    const coordinates = user.location.coordinates;
    console.log(coordinates);
    position = [coordinates[0],coordinates[1]];
    console.log("position: "+position);
    
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
        <ul>
          {users.map((customUser) =>
          <Marker position={[customUser.location.coordinates[0],customUser.location.coordinates[1]]} icon={icon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          )}
        </ul>
        <ResetCenterView selectPosition={selectPosition} />
      
      </MapContainer>
      
    );
  }
}
