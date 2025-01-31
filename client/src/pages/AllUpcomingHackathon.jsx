import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router';
import HackathonListCard from '../components/HackathonListCard';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AllUpcomingHackathon = () => {
  const navigate = useNavigate();
  const { upcomingHackathons } = useContext(AppContext);
  return (
    <div>
      <div className='flex flex-col gap-6 bg-gray-900 h-72 px-20 justify-center'>
        <button
          className='bg-purple-300  p-2 rounded-lg hover:bg-purple-400 transition-all text-lg font-semibold cursor-pointer w-fit text-purple-600 flex items-center gap-2'
          onClick={() => navigate('/hackathon')}
        >
          <IoIosArrowBack className='text-purple-600 text-2xl' />
          Back to all hackathons
        </button>

        <h1 className='text-4xl text-white'>Upcoming Hackathons</h1>
      </div>

      <div className='p-6 mt-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {upcomingHackathons.map((hackathon) => {
            return (
              <HackathonListCard hackathon={hackathon} key={hackathon._id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllUpcomingHackathon;
