import '../App.css';
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Maps from "../components/Maps";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';

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

  if(Object.keys(user).length == 0){
    return <div>Loading</div>
  }
  else{
    return <div className="relative h-screen">
        <Maps user={user} />
      </div>
  }
};

export default Home;
