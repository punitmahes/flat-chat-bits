import React from 'react';
import logo from './media/PS-findit.png'

const Navbar = () => {
  return (
    <nav className="bg-black fixed top-0 left-0 right-0">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <button className="bg-yellow-400 text-white px-4 py-2 rounded shadow-md">
          Flat Button
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
