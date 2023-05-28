import React, { useState } from 'react';

const FlatTypeInput = ({ onUpdateFlatType }) => {
  const [flatType, setFlatType] = useState('');

  const handleFlatTypeChange = (e) => {
    setFlatType(e.target.value);
    onUpdateFlatType(e.target.value);
  };

  return (
    <div className="w-full">
      <select
        id="flat-type"
        className="block w-full px-2 text-base border border-green-200 h-2/3 py-4 rounded-md shadow-sm focus:outline-none text-green-100 bg-transparent"
        value={flatType}
        onChange={handleFlatTypeChange}
      >
        <option value="" disabled selected hidden>Flat Type</option>
        <option value="non-furnished" className="py-2 px-4 bg-green-100 text-zinc-900">Non-Furnished</option>
        <option value="semi-furnished" className="py-2 px-4 bg-green-100 text-zinc-900">Semi-Furnished</option>
        <option value="fully-furnished" className="py-2 px-4 bg-green-100 text-zinc-900">Fully Furnished</option>
      </select>
    </div>
  );
};

export default FlatTypeInput;
