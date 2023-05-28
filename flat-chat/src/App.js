import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import './index.css';
import GoogleAuthenticate from './components/googleAuthenticate';
import SignUp from './pages/SignUp'
import Home from "./pages/Home";
import AddFlat from "./pages/AddFlat";

function App() {
  return (
    <>
    <div className='bg-black'>
     <Router>
      <Routes>
      <Route exact path="/" element = {<SignUp />} />
      <Route exact path="/home" element = {<Home />} />
      <Route exact path="/AddFlat" element = {<AddFlat />} />
      </Routes>
     </Router>
    </div>
    </>
  );
}

export default App;