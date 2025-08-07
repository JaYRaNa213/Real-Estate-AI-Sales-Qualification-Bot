// src/components/LeadForm.jsx

import { useState } from 'react';
import { createLead } from '../api';

const LeadForm = () => {
  const [form, setForm] = useState({
    location: '',
    budget: '',
    loanNeeded: false,
    sessionId: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createLead({ ...form, qualified: true });
      alert('Lead created!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded">
      <input name="location" placeholder="Location" onChange={handleChange} className="w-full p-2" />
      <input name="budget" placeholder="Budget" type="number" onChange={handleChange} className="w-full p-2" />
      <input name="sessionId" placeholder="Session ID" onChange={handleChange} className="w-full p-2" />
      <label className="flex items-center">
        <input name="loanNeeded" type="checkbox" onChange={handleChange} className="mr-2" />
        Loan Needed
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default LeadForm;
