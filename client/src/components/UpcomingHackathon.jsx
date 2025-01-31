import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AppContext } from '../context/AppContext';
import HackathonListCard from './HackathonListCard';

const UpcomingHackathon = () => {
  const navigate = useNavigate();
  const { upcomingHackathons } = useContext(AppContext);

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold mb-6 text-white'>
          Upcoming Hackathons
        </h1>

        <button
          className='bg-purple-300 border-2 border-purple-300 p-2 text-white rounded-lg hover:bg-purple-400 transition-all text-lg font-semibold cursor-pointer'
          onClick={() => navigate('/upcoming-hackathons')}
        >
          All upcoming hackathons
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {upcomingHackathons
          .slice(
            0,
            upcomingHackathons.length > 4 ? 4 : upcomingHackathons.length
          )
          .map((hackathon) => (
            <HackathonListCard hackathon={hackathon} key={hackathon._id} />
          ))}
      </div>
    </div>
  );
};

export default UpcomingHackathon;
