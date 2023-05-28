import { useLocation, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddFlatForm from "../components/AddFlatForm";


const AddFlat = () => {
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


    return (
        <div className="h-screen w-screen bg-black">
            <AddFlatForm user={user}/>
        </div>
    );
}

export default AddFlat;