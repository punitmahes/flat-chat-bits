import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from './media/PS-findit.png';
import LocationInput from './LoactionInput';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


function GoogleAuthenticate() {
  const [user, setUser] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('ID');
    if(id){
      getData(id);
      
    }

    async function getData(id){
      var url = 'http://localhost:3001/api/user/'+id.toString();
      const response = await axios.get(url);
      const data = await response.data;
      await setUser(data);
    }
    
  }, []);

  useEffect(()=> {
    if(user?.companyName){
      navigate('/home', {state: {user}});
    }
  },[user])
  

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };


  const handleCreateUser = (e) => {
    e.preventDefault();

    // Call server-side create user endpoint to update user's company name and location
    axios.patch('http://localhost:3001/api/user/' + user._id, { companyName, latitude, longitude, description, reason }).then((res) => {
      setUser(res.data);
      navigate('/home', {state: {user}});
    }).catch((err) => {
      console.error('Error creating user', err);
    });
  };

  function handleUpdateLocation(lat, lon) {
    console.log(`Updating location to lat: ${lat}, lon: ${lon}`);
    // Your code to handle the updated location goes here
    setLatitude(lat);
    setLongitude(lon);
  };

  if (!user || Object.keys(user).length == 0) {
    // Render Google sign-in button if user is not authenticated
    return (
      <div className='flex items-center justify-center h-screen w-screen'>
        <div className='lg:w-2/5 md:w-3/4'>
          <div className='flex-auto w-full text-center'>
           <div className='w-full flex justify-center'><img src={logo} alt='logo' className='lg:w-3/4 md:w-1/2 sm:w-1/2'></img></div>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-4 h-4 mr-2" />}
              className="px-4 py-2 text-sm font-medium text-black bg-white !important hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <a href='http://localhost:3001/auth/google'>Sign In</a>
    </Button>
          </div>
        </div>
      </div>
    );
  } else if (!user.companyName || !user.location) {
    // Render sign-up form if user is authenticated but has not filled in company name and location
    return (
      <div className='flex items-center justify-center h-screen w-screen'>
        <div className='bg-zinc-50 p-3 rounded-lg border border-orange-400 border-2 lg:w-2/5 md:w-3/4 shadow-[0px_0px_50px_20px_rgb(255,225,255,0.5)]'>
          <h1 className='flex-auto font-bold text-center w-full text-orange-400 font-serif text-2xl p-3'>Additional Details</h1>
          <div className=''>
          <form onSubmit={handleCreateUser} className='flex-auto m-1'>
          <div className='m-3'><TextField  id="outlined" label="PS Station" onChange={handleCompanyNameChange} value={companyName} className='w-full border-white'/></div>
          <div className ='m-3'><LocationInput className='w-full' onUpdateLocation={handleUpdateLocation} /></div>
          <div className='m-3'><TextField id="outlined-password-input" label="About You" onChange={handleDescriptionChange} value={description} className='w-full'/></div>
          <div className='m-3'>
          <div>
            <label htmlFor="reason">Reason:</label>
          </div>
          <div>
            <select id="reason" onChange={handleReasonChange} value={reason} className='w-full border-white'>
              <option value="PS1">PS 1</option>
              <option value="PS2">PS 2</option>
              <option value="SI">Summer Intern</option>
              <option value="Job">Job</option>
            </select>
          </div>
        </div>
          <div className='flex w-full justify-center'><button className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded-lg">Submit</button></div>
          </form>
          </div>
          </div>
      </div>
    );
  } else {
    // Render main page if user is authenticated and has filled in company name and location
    return (
      <div className='h-screen w-screen text-white'>
        <h1>Welcome to my app, {user.companyName}!</h1>
        <p>About you - {user.description}.</p>
      </div>
    );
  }
}

export default GoogleAuthenticate;
