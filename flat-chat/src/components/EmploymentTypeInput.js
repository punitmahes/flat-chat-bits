import React, { useState } from 'react';


const EmploymentTypeInput = ({ onUpdateEmploymentType }) => {
  const [employmentType, setEmploymentType] = useState('');

  const handleEmploymentTypeChange = (e) => {
    setEmploymentType(e.target.value);
    onUpdateEmploymentType(e.target.value);
  };

  return (
    <div className="w-full">
      <select
        id="employment-type"
        className="block w-full px-2 text-base border border-green-200 h-2/3 py-4 rounded-md shadow-sm focus:outline-none text-green-100 bg-transparent"
        value={employmentType}
        onChange={handleEmploymentTypeChange}
        placeholder='Employment Type'
        isClearable={true}
      >
        <option value="" disabled selected hidden>Employment Type</option>
        <option value="full-time" className="py-2 px-4 bg-green-100 text-zinc-900">Full-Time</option>
        <option value="summer-intern" className="py-2 px-4 bg-green-100 text-zinc-900">Summer-Intern</option>
        <option value="PS-2" className="py-2 px-4 bg-green-100 text-zinc-900">PS-2</option>
        <option value="PS-1" className="py-2 px-4 bg-green-100 text-zinc-900">PS-1</option>
      </select>
      
    </div>
  );
};

export default EmploymentTypeInput;
