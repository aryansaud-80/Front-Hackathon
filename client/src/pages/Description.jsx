import React from 'react';
import { FaCalendarAlt, FaTrophy, FaClock, FaLaptopCode } from 'react-icons/fa';

const HackathonPage = () => {
  return (
    <div className='bg-gradient-to-r from-purple-500 to-purple-700 min-h-screen text-white'>
      <header className='flex justify-between items-center p-8'>
        <h1 className='text-4xl font-bold'>Hackathon 2025</h1>
        <button className='bg-yellow-500 hover:bg-yellow-400 py-2 px-6 rounded-full text-lg transition duration-300'>
          Register Now
        </button>
      </header>

      <section className='text-center py-16'>
        <h2 className='text-3xl font-extrabold'>Unleash Your Creativity!</h2>
        <p className='mt-4 text-lg'>
          Join us for an intense 48-hour coding marathon with amazing prizes and
          opportunities to showcase your skills.
        </p>
      </section>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
        {/* Event Details Card */}
        <div className='bg-purple-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300'>
          <div className='flex items-center space-x-3'>
            <FaCalendarAlt className='text-3xl text-purple-600' />
            <h3 className='text-2xl font-semibold'>Event Details</h3>
          </div>
          <p className='mt-2'>When: April 15-17, 2025</p>
          <p className='mt-2'>Where: Online & In-Person</p>
          <p className='mt-4 text-gray-700'>
            Join developers and innovators from around the world. Whether you're
            coding from home or joining us live, we’ve got a spot for you!
          </p>
        </div>

        {/* Prizes Card */}
        <div className='bg-purple-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300'>
          <div className='flex items-center space-x-3'>
            <FaTrophy className='text-3xl text-purple-600' />
            <h3 className='text-2xl font-semibold'>Prizes</h3>
          </div>
          <p className='mt-2'>Grand Prize: $5,000</p>
          <p className='mt-2'>Runner-up: $2,000</p>
          <p className='mt-2'>Best Design: $1,000</p>
          <p className='mt-2'>Most Innovative: $1,500</p>
        </div>

        {/* Schedule Card */}
        <div className='bg-purple-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300'>
          <div className='flex items-center space-x-3'>
            <FaClock className='text-3xl text-purple-600' />
            <h3 className='text-2xl font-semibold'>Schedule</h3>
          </div>
          <p className='mt-2'>
            <strong>Day 1:</strong> Coding begins (9:00 AM)
          </p>
          <p className='mt-2'>
            <strong>Day 2:</strong> Mentorship & Workshops (10:00 AM - 3:00 PM)
          </p>
          <p className='mt-2'>
            <strong>Day 3:</strong> Presentations & Judging (1:00 PM - 5:00 PM)
          </p>
          <p className='mt-4 text-gray-700'>
            Get hands-on guidance from industry experts, workshops, and
            mentorship sessions to help shape your project.
          </p>
        </div>
      </section>

      <section className='text-center py-16 bg-gray-800 mt-16'>
        <div className='flex justify-center items-center space-x-6 mb-6'>
          <FaLaptopCode className='text-4xl text-white' />
          <h2 className='text-3xl font-extrabold text-yellow-500'>
            Get Ready to Code!
          </h2>
        </div>
        <p className='mt-4 text-lg text-gray-300'>
          Prepare your ideas, gather your team, and get ready for a weekend
          filled with creativity, challenges, and learning. Don't wait —
          register today!
        </p>
        <button className='bg-yellow-500 hover:bg-yellow-400 py-3 px-8 rounded-full text-lg mt-6 transition duration-300'>
          Register Now
        </button>
      </section>
    </div>
  );
};

export default HackathonPage;
