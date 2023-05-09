import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GoogleAuthenticate() {
  const [user, setUser] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('ID');
    console.log(id)
    if(id){
      var url = 'http://localhost:3001/api/user/'+id.toString()
      axios.get(url).then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
   
    
  }, []);
  

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


  const handleCreateUser = (e) => {
    e.preventDefault();

    // Call server-side create user endpoint to update user's company name and location
    axios.patch('http://localhost:3001/api/user/' + user._id, { companyName, latitude, longitude, description }).then((res) => {
      setUser(res.data);
      console.log(user);
    }).catch((err) => {
      console.error('Error creating user', err);
    });
  };

  if (!user) {
    // Render Google sign-in button if user is not authenticated
    return (
      <div>
        <h1>Welcome to my app</h1>
        <p>Please sign in with Google:</p>
        <a href='http://localhost:3001/auth/google'>Sign in</a>
      </div>
    );
  } else if (!user.companyName || !user.location) {
    // Render sign-up form if user is authenticated but has not filled in company name and location
    return (
      <div>
        <h1>Welcome to my app</h1>
        <form onSubmit={handleCreateUser}>
          <label>
            Company name:
            <input type="text" value={companyName} onChange={handleCompanyNameChange} />
          </label>
          <br />
          <label>
            Latitude:
            <input type="text" value={latitude} onChange={handleLatitudeChange} />
          </label>
          <label>
            Longitude:
            <input type="text" value={longitude} onChange={handleLongitudeChange} />
          </label>
          <label>
            description:
            <input type="text" value={description} onChange={handleDescriptionChange} />
          </label>
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  } else {
    // Render main page if user is authenticated and has filled in company name and location
    return (
      <div>
        <h1>Welcome to my app, {user.companyName}!</h1>
        <p>Your location is {user.location.coordinates}.</p>
      </div>
    );
  }
}

export default GoogleAuthenticate;
