import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const LocationInput = ({ onUpdateLocation }) => {
    const [location, setLocation] = useState("");
    const [options, setOptions] = useState([]);
    
    async function handleLocationChange(event, value) {
      const inputValue = event.target.value;
      setLocation(inputValue);
  
      if (inputValue != null && inputValue.length >= 3) {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
        );
        const data = await response.json();
        const options = data.map((result) => ({
          label: result.display_name,
          lat: result.lat,
          lon: result.lon,
        }));
        setOptions(options);
      }
    }
  
    function handleOptionChange(event, value) {
      setLocation(value.label);
      if(value.lat && value.lon){
        onUpdateLocation(value.lat, value.lon);
      }
    }
  
    return (
      <div>
        <Autocomplete
          id="location-input"
          options={options}
          getOptionLabel={(option) => option.label || ""}
          filterOptions={(options) => options}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Location"
              variant="outlined"
              className="px-4 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          )}
          onChange={handleOptionChange}
          inputValue={location}
          onInputChange={handleLocationChange}
        />
      </div>
    );
  };
  
  export default LocationInput;