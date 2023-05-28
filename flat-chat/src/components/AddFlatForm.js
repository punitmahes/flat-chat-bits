import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import UI from './media/manUIflat.png'
import TextField from '@mui/material/TextField';
import LocationInput from './LocationInput';
import FlatTypeInput from "./FlatTypeInput";

const AddFlatForm = (props) => {
    const [user,setUser] = useState([]);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [flatAddress, setFlatAddress] = useState('');
    const [rent, setRent] = useState('');
    const [vacantRoom, setVacantRoom] = useState();
    const [description, setDescription] = useState('');
    const [selectedFlatType, setSelectedFlatType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        setUser(props.user);
    },[props.user]);

    const handleCreateFlat = (e) => {
        e.preventDefault();
        if (!user || !latitude || !longitude || !rent || !vacantRoom || !selectedFlatType) {
          setErrorMessage('Please fill in all fields.');
          return;
        };

        //Compelete the post method of the Add flat. Look at variables here
    };

    function handleUpdateLocation(lat, lon, label) {
        setLatitude(lat);
        setLongitude(lon);
        setFlatAddress(label);
    };

    const handleRentChange = (e) => {
        setRent(e.target.value);
    };

    const handleVacantRoomChange = (e) => {
        setVacantRoom(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleFlatTypeUpdate = (value) => {
        setSelectedFlatType(value);
    };

    return (
        <div className='flex items-center relative justify-center h-screen w-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700  overflow-hidden'>
        <div className='w-10/12 md:w-5/12 h-auto absolute -bottom-10 -left-10 md:-bottom-20 md:-left-20 opacity-20 md:opacity-60'><img src={UI}></img></div>
        <div className='bg-zinc-50 p-3 rounded-lg border border-green-200 border-2 w-3/4 lg:w-2/5 md:w-3/4 bg-opacity-0'>
          <h1 className='flex-auto font-bold text-center w-full text-green-100 font-serif text-2xl p-3'>Add a Flat  {String.fromCodePoint(0x270D)}</h1>
          <div className=''>
          <form onSubmit={handleCreateFlat} className='flex-auto m-1'>
          <div className ='m-3'><LocationInput onUpdateLocation={handleUpdateLocation} /></div>
          <div className='m-3'><TextField sx={{"& .MuiInputLabel-root": {color: '#dcfce7'}, ".MuiInputBase-input": {color: '#dcfce7'},"& .MuiOutlinedInput-root": {"& > fieldset": { color: '#dcfce7',borderColor: "#dcfce7", borderWidth: 1 },},}} label="Approx Monthly Rent" onChange={handleRentChange} value={rent} className='w-full'/></div>
          <div className='m-3'><TextField sx={{"& .MuiInputLabel-root": {color: '#dcfce7'}, ".MuiInputBase-input": {color: '#dcfce7'},"& .MuiOutlinedInput-root": {"& > fieldset": { color: '#dcfce7',borderColor: "#dcfce7", borderWidth: 1 },},}} label="Vacant Rooms" onChange={handleVacantRoomChange} value={vacantRoom} className='w-full'/></div>
          <div className="m-3"><FlatTypeInput onUpdateFlatType={handleFlatTypeUpdate} /></div>
          <div className='m-3'><TextField sx={{"& .MuiInputLabel-root": {color: '#dcfce7'}, ".MuiInputBase-input": {color: '#dcfce7'},"& .MuiOutlinedInput-root": {"& > fieldset": { color: '#dcfce7',borderColor: "#dcfce7", borderWidth: 1 },},}} label="Additional Details" onChange={handleDescriptionChange} value={description} className='w-full'/></div>
          <div className='flex w-full justify-center relative'><button className="border bg-green-900 text-white md:bg-transparent md:border-green-500 md:text-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded-lg" style={{zIndex:999}}>Submit</button></div>
          {errorMessage && (
                <div className="m-3 text-red-500 flex justify-center">{errorMessage}</div>
              )}
          </form>
          </div>
          </div>
      </div>
    );
}

export default AddFlatForm;