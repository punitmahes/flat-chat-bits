import '../App.css';
import React, { useState } from "react";
import Maps from "../components/Map";

const Home = () => {
  const [selectPosition, setSelectPosition] = useState(null); 
  return (
    <>
     <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "50vw", height: "100%" }}>
        <Maps selectPosition={selectPosition} />
      </div>
    </div>
    </>
        // <></>
  );
}

export default Home;