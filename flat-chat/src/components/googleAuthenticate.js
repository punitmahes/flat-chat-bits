import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from './media/PS-findit.png';
import LocationInput from './LocationInput';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import UIImage from './media/UI_About.png'
import EmploymentTypeInput from './EmploymentTypeInput';
import manUI from './media/man.gif'


function GoogleAuthenticate() {
  const [user, setUser] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [Role, setRole] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [budget, setBudget] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleUpdateEmploymentType = (e) => {
    setEmploymentType(e.target.value);
  };

  const handlebudgetChange = (e) => {
    setBudget(e.target.value);
  }

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!companyName || !latitude || !longitude || !Role || !employmentType || !budget) {
      setErrorMessage('Please fill in all fields.');
      return;
    };
    // Call server-side create user endpoint to update user's company name and location
    axios.patch('http://localhost:3001/api/user/' + user._id, { companyName, latitude, longitude, Role, employmentType, budget}).then((res) => {
      setUser(res.data);
      navigate('/home', {state: {user}});
    }).catch((err) => {
      console.error('Error creating user', err);
    });
  };

  function handleUpdateLocation(lat, lon, label) {
    // Your code to handle the updated location goes here
    setLatitude(lat);
    setLongitude(lon);
  };

  if (!user || Object.keys(user).length == 0) {
    // Render Google sign-in button if user is not authenticated
    return (
      <div className='flex items-center justify-center h-screen w-screen relative overflow-y-hidden'>
        <div className='-bottom-4 right-0 absolute md:-bottom-6 md:w-5/12 '><img src={manUI} ></img></div>
        <div className='md:w-2/5 md:w-3/4'>
          <div className='flex-auto w-full text-center'>
           <div className='w-full flex justify-center '  style = {{fontFamily: "Climate Crisis", zIndex:1000}}><div className='text-white text-4xl text-opacity-100 text-2xl m-3 md:mx-8'>Find Flat</div></div>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-4 h-4 mr-2" />}
              className="px-4  py-2 text-sm font-medium text-black bg-white !important hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <a href='http://localhost:3001/auth/google'>Sign In</a>
    </Button>
          </div>
        </div>
      </div>
    );
  } else if (!user.companyName || !user.location || true) {
    // Render sign-up form if user is authenticated but has not filled in company name and location
    return (
      <div className='flex items-center relative justify-center h-screen w-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700  overflow-hidden'>
        <div className='w-10/12 md:w-5/12 h-auto absolute -bottom-10 -left-10 md:-bottom-20 md:-left-20 opacity-20 md:opacity-60'><img src={UIImage}></img></div>
        <div className='bg-zinc-50 p-3 rounded-lg border border-green-200 border-2 w-3/4 lg:w-2/5 md:w-3/4 bg-opacity-0'>
          <h1 className='flex-auto font-bold text-center w-full text-green-100 font-serif text-2xl p-3'>Tell us more about yourself {String.fromCodePoint(0x270D)}</h1>
          <div className=''>
          <form onSubmit={handleCreateUser} className='flex-auto m-1'>
          <div className='m-3'><TextField  sx={{"& .MuiInputLabel-root": {color: '#dcfce7'}, ".MuiInputBase-input": {color: '#dcfce7'},"& .MuiOutlinedInput-root": {"& > fieldset": { color: '#dcfce7',borderColor: "#dcfce7", borderWidth: 1 },},}} id="outlined" label="Company Name" onChange={handleCompanyNameChange} value={companyName} className='w-full border-white'/></div>
          <div className='m-3'><TextField id="outlined-password-input" sx={{"& .MuiInputLabel-root": {color: '#dcfce7'}, ".MuiInputBase-input": {color: '#dcfce7'},"& .MuiOutlinedInput-root": {"& > fieldset": { color: '#dcfce7',borderColor: "#dcfce7", borderWidth: 1 },},}} label="Role" onChange={handleRoleChange} value={Role} className='w-full'/></div>
          <div className ='m-3'><LocationInput onUpdateLocation={handleUpdateLocation} /></div>
          <div className="m-3">
            <EmploymentTypeInput onUpdateEmploymentType={handleUpdateEmploymentType} />
          </div>
          <div className='m-3'><TextField sx={{"& .MuiInputLabel-root": {color: '#dcfce7'}, ".MuiInputBase-input": {color: '#dcfce7'},"& .MuiOutlinedInput-root": {"& > fieldset": { color: '#dcfce7',borderColor: "#dcfce7", borderWidth: 1 },},}} label="Preferred Price Range" onChange={handlebudgetChange} value={budget} className='w-full'/></div>
          <div className='flex w-full justify-center relative'><button className="border bg-green-900 text-white md:bg-transparent md:border-green-500 md:text-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded-lg" style={{zIndex:999}}>Submit</button></div>
          {errorMessage && (
                <div className="m-3 text-red-500 flex justify-center">{errorMessage}</div>
              )}
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
