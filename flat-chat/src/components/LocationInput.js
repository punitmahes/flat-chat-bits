import React, { useState, useEffect, useRef } from "react";

const LocationInput = ({ onUpdateLocation }) => {
  const [location, setLocation] = useState("");
  const [options, setOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  async function handleLocationChange(event) {
    const inputValue = event.target.value;
    setLocation(inputValue);

    if (inputValue !== "" && inputValue.length >= 3) {
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
      setShowDropdown(true);
    } else {
      setOptions([]);
      setShowDropdown(false);
    }
  }

  function handleOptionChange(event) {
    const selectedValue = options.find(
      (option) => option.label === event.target.value
    );
    setLocation(event.target.value);
    if (selectedValue && selectedValue.lat && selectedValue.lon) {
      onUpdateLocation(selectedValue.lat, selectedValue.lon);
    }
    setShowDropdown(false);
  }

  function handleOutsideClick(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        onFocus={() => setShowDropdown(true)}
        className="px-4 py-2 text-base border border-green-100 h-2/3 py-4 rounded-md shadow-sm focus:outline-none text-green-100 bg-transparent w-full placeholder-green-100"
        placeholder="Location"
      />
      {showDropdown && options.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-green-100 h-20 rounded-md shadow-lg h-40 overflow-y-auto"
        >
          {options.map((option, index) => (
            <button
              key={index}
              className="block w-full px-4 py-2 text-base text-left border-gray-300 hover:bg-blue-100 focus:bg-blue-100 focus:outline-none"
              onClick={() => handleOptionChange({ target: { value: option.label } })}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
