import { useNavigate } from 'react-router';
import HackathonListCard from './HackathonListCard';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const FinishedHackathon = () => {
  const navigate = useNavigate();
  const { closedHackathons } = useContext(AppContext);

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold mb-6 text-white'>
          Closed Hackathons
        </h1>

        <button
          className='bg-purple-300 border-2 border-purple-300 p-2 text-white rounded-lg hover:bg-purple-400 transition-all text-lg font-semibold cursor-pointer'
          onClick={() => navigate('/closed-hackathons')}
        >
          All closed hackathons
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {closedHackathons
          .slice(0, closedHackathons.length > 4 ? 4 : closedHackathons.length)
          .map((hackathon) => {
            return (
              <HackathonListCard hackathon={hackathon} key={hackathon._id} />
            );
          })}
      </div>
    </div>
  );
};

export default FinishedHackathon;
