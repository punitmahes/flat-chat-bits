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
    if(!location.state){
      navigate('/');
    }
    else{
      setUser(location?.state.user);
    }
  },[location]);


  function handleAddFlat(){
    navigate('/AddFlat', {state: {user}});
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
        {/* <button className='bg-gradient-to-br from-zinc-900 to-blue-900 text-white font-bold py-2 px-4 rounded-full absolute top-5 right-20' style = {{zIndex:400}} onClick={handleAddFlat}>Add Flat</button>
        <button className='absolute top-6 right-7 w-7 h-7' style = {{zIndex:400}} onClick={handleProfile}>
          <img src={profilePicture}></img>
  </button> */}
        <div className='bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 opacity-75  h-14 absolute top-2 mx-0.5 md:mx-2 flex justify-between border border-green-200 border-1 rounded-md ' style = {{zIndex:1000, width: "98%", fontFamily: "Climate Crisis"}}>
        </div>
        <div className='h-14 absolute top-2 flex justify-between' style = {{zIndex:1000, width: "98%", fontFamily: "Climate Crisis"}}>
        <div className='text-white text-opacity-100 text-xl md:text-2xl m-3 md:mx-8'>Find Flat</div>
        <div className='text-white mx-1 flex  '>
        <button className='text-zinc-950 bg-green-400 text-white rounded-full font-bold font-serif px-2 py-1 my-3 md:my-2' style = {{zIndex:400}} onClick={handleAddFlat}>Add Flat</button>
        <div className='p-0 my-1 md:my-1 px-1 md:px-4'>
          <img src={profilePicture}></img>
        </div>
        </div>
      </div>
      </div>
  }
};

export default Home;
