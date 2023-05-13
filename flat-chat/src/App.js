import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import './index.css';
import GoogleAuthenticate from './components/googleAuthenticate';
import SignUp from './pages/SignUp'
import Home from "./pages/Home";

function App() {
  return (
    <>
    <div className='bg-black bg-auto'>
     <Router>
      <Routes>
      <Route exact path="/" element = {<SignUp />} />
      <Route exact path="/home" element = {<Home />} />
      </Routes>
     </Router>
    </div>
    </>
  );
}

export default App;