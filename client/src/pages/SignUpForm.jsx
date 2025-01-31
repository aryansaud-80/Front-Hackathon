// src/components/SignUpForm.js

import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    hackathonName: '',
    teamName: '',
    teamEmail: '',
    member1: '',
    member2: '',
    member3: '',
    member4: '',
    phoneNumber: '',
    eventType: 'Online',
  });
  const { BACKEND_URL } = useContext(AppContext);

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/hackathon/register`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setFormData({
          hackathonName: '',
          teamName: '',
          teamEmail: '',
          member1: '',
          member2: '',
          member3: '',
          member4: '',
          phoneNumber: '',
          eventType: 'Online',
        });
        setIsLoading(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error registering team', error);
      toast.error('Failed to register team');
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
        <h2 className='text-3xl font-semibold text-center text-grey-900 mb-6'>
          Hackathon Team Registration
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='hackathonName'
              className='block text-sm font-medium text-gray-700'
            >
              Hackathon Name
            </label>
            <input
              type='text'
              id='hackathonName'
              name='hackathonName'
              value={formData.hackathonName}
              onChange={handleChange}
              required
              className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>
          {/* Team Name */}
          <div>
            <label
              htmlFor='teamName'
              className='block text-sm font-medium text-gray-700'
            >
              Team Name
            </label>
            <input
              type='text'
              id='teamName'
              name='teamName'
              value={formData.teamName}
              onChange={handleChange}
              required
              className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>

          {/* Team Email */}
          <div>
            <label
              htmlFor='teamEmail'
              className='block text-sm font-medium text-gray-700'
            >
              Team Email
            </label>
            <input
              type='email'
              id='teamEmail'
              name='teamEmail'
              value={formData.teamEmail}
              onChange={handleChange}
              required
              className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>

          {/* Team Members */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Team Members
            </label>
            <div className='space-y-4'>
              <input
                type='text'
                name='member1'
                value={formData.member1}
                onChange={handleChange}
                placeholder='Member 1 Name'
                className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
              />
              <input
                type='text'
                name='member2'
                value={formData.member2}
                onChange={handleChange}
                placeholder='Member 2 Name'
                className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
              />
              <input
                type='text'
                name='member3'
                value={formData.member3}
                onChange={handleChange}
                placeholder='Member 3 Name'
                className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
              />
              <input
                type='text'
                name='member4'
                value={formData.member4}
                onChange={handleChange}
                placeholder='Member 4 Name (Optional)'
                className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor='phoneNumber'
              className='block text-sm font-medium text-gray-700'
            >
              Phone Number
            </label>
            <input
              type='text'
              id='phoneNumber'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>

          {/* Event Type */}
          <div>
            <label
              htmlFor='eventType'
              className='block text-sm font-medium text-gray-700'
            >
              Event Type
            </label>
            <select
              id='eventType'
              name='eventType'
              value={formData.eventType}
              onChange={handleChange}
              className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
            >
              <option value='Online'>Online</option>
              <option value='In-Person'>In-Person</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <button
              type='submit'
              className={`bg-purple-500 text-white px-6 py-3 rounded-md text-xl hover:bg-purple-500 transition-all cursor-pointer ${isLoading && 'opacity-50'}`}
              onSubmit={handleSubmit}
              disabled={isLoading}
            >
              Register Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
