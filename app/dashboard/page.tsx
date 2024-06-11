'use client'
import { Clapperboard, Link, } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';

const Dashboard = () => {
  const hehe = "hehe"
  const [formData, setFormData] = useState({
    fullName: '',
    dlink: ''
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('apis/SubmitData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Data submitted successfully');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred. Please try again.');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Register Movie</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border-b border-gray-300 py-2">
            <Clapperboard className="text-gray-400 mr-3" />
            <input
              className="w-full px-3 py-2 text-gray-700 bg-white border-none focus:outline-none"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <Link className="text-gray-400 mr-3" />
            <input
              className="w-full px-3 py-2 text-gray-700 bg-white border-none focus:outline-none"
              type="text"
              name="dlink"
              value={formData.dlink}
              onChange={handleChange}
              placeholder="Enter Download Link"
            />
            </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
