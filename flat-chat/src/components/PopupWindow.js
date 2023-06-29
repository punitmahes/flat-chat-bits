import axios from "axios";
import React, { useState, useEffect } from "react";
import companyLogo from './media/company.png';
import CircularProgress from '@mui/material/CircularProgress';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/WorkOutline';
import Button from '@mui/material/Button';
import { base_url } from "./url";

const PopupWindow = ({ data , onClose, companyName}) => {
    const [apiResult, setApiResult] = useState(null); // Result of the API call
  
    useEffect(() => {
        setApiResult(null);
        const config = {
            headers:{
              "x-api-key": "1234"
            }
        };
        var url  = base_url + '/api/user/users?latitude=' + data[0] + '&longitude=' + data[1];
        axios.get(url, config).then(response=>{
            setApiResult(response.data);
        }).catch(err => {
            console.log(err);
        });
        console.log(data);
    }, [data]);

    useEffect(()=>{
        console.log(apiResult);
    },[apiResult]);

    function getBatch(str){
        var userName = str.substring(1,5);
        userName = Number(userName) + 4;
        console.log(userName);
        return userName;
    }
  
    return (
      <div className="popup-window absolute left-2 top-20 flex flex-col w-11/12 h-5/6 md:w-1/3  border border-green-200 border-1 rounded-lg bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 opacity-75" style={{zIndex:1000}}>
        <div className="p-4 flex justify-between ">
        <div className="flex justify-inline">
        <div className="h-9 w-9"><img src={companyLogo}></img></div>
        <div className="font-bold text-2xl p-2 text-white">{companyName}</div>
        </div>
        <button className="close-button" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1" style = {{zIndex:4000}}>
          {apiResult?.map((item) => (
            <>
            <div key={item._id} className="border border-gray-200 border-1 rounded p-1 m-2 bg-zinc-900">
              <div className="flex justify-between content-between">
              <div className="font-semibold flex text-lg text-white ">
                <div className="m-0.5"><PersonOutlineIcon color="disabled" style = {{color: "white"}}/></div>
                <div className="m-1">{item.name}</div>
                </div>
                <div className="flex ">
                    <div className=""><SchoolIcon color="action" sx={{ fontSize: 15 , color :"white"}} /></div>
                    <div className="text-sm m-1 text-zinc-400">{getBatch(item.email)}</div>
                </div>
              </div>

              <div className="flex justify-between content-between items-baseline px-1">
              <div className="flex text-sm text-zinc-400">
                <div className="mx-0.5"><WorkIcon color="action" sx={{ fontSize: 15, color :"white" }} /></div>
                {/* Fill with appropiate role */}
                <div className="my-0.5 mx-1">Software developer Intern</div> 
                </div>
                <div className="">
                    <div className="text-xs text-zinc-400 italic">PS-2</div>
                </div>
              </div>
              <div className="flex justify-between my-1">
                <div className="text-xs px-2 text-zinc-300 w-2/3 description">
                    <p className="py-1">Preferred roomate : Female</p>
                    <p className="">Budget : 20000-30000</p>
                </div>
                <div className="">
                <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-4 h-4 mr-2" />}
                          className="px-4 py-2 text-sm font-medium text-black bg-white !important hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      ><a href={'mailto:' + item.email}>Gmail</a></Button>
                </div>
              </div>    
            </div>
             </>
          ))}
        </div>
        {!apiResult && <div className="h-full w-full flex justify-center Align-center"><CircularProgress /></div>}
      </div>
      </div>
    );
  };

  export default PopupWindow;