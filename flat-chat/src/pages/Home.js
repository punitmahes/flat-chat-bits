import '../App.css';
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Maps from "../components/Maps";
import { useNavigate } from 'react-router-dom';
import profilePicture from'../components/media/user.png'
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import PersonIcon from '@mui/icons-material/Person';

const Home = () => {
  const location = useLocation();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  if(!location.state){
    navigate('/');
  }
  useEffect(()=> {
    console.log(location);
    setUser(location?.state.user);
  },[location]);


  function handleAddFlat(){
    //navigate to add flat page
  };

  function handleProfile(){
    //naviate to profile-page
  }

  if(Object.keys(user).length == 0){
    return <div>Loading</div>
  }
  else{
    return <div className="relative h-screen">
        <Maps user={user} />
        <button className='bg-gradient-to-br from-zinc-900 to-blue-900 text-white font-bold py-2 px-4 rounded-full absolute top-5 right-20' style = {{zIndex:400}} onClick={handleAddFlat}>Add Flat</button>
        <button className='absolute top-6 right-7 w-7 h-7' style = {{zIndex:400}} onClick={handleProfile}>
          <img src={profilePicture}></img>
  </button>
      </div>
  }
};

export default Home;
