import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoGithub } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { useUser, useClerk } from '@clerk/clerk-react';


const HackathonListCard = ({ hackathon }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className='border border-gray-700 bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:shadow-xl'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
        <div>
          <h2 className='text-2xl font-semibold text-white'>
            {hackathon.name}
          </h2>
          <p className='text-gray-400 text-sm'>Hackathon</p>
        </div>

        {/* Social Links */}
        <div className='flex gap-4 mt-4 sm:mt-0'>
          <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-600 hover:bg-purple-100 cursor-pointer'>
            <FaXTwitter className='text-purple-500 text-xl' />
          </div>

          <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-600 hover:bg-purple-100 cursor-pointer'>
            <IoLogoGithub className='text-purple-500 text-xl' />
          </div>
        </div>
      </div>

      {/* Theme Section */}
      <div className='flex flex-col sm:flex-row justify-between gap-4 mb-4'>
        <div>
          <h3 className='text-lg font-medium text-purple-500'>THEME</h3>
          <p className='text-white bg-gray-900 border-2 border-purple-500 py-2 px-3 rounded-lg'>
            {hackathon.theme || 'NO RESTRICTION'}
          </p>
        </div>

        <div className='mt-4 sm:mt-0'>
          <p className='text-white text-lg'>+250 participants</p>
        </div>
      </div>

      {/* Location, Status, and Start Date */}
      <div className='space-y-2 text-sm text-gray-400 flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-between mt-6'>
        <div className='flex flex-wrap gap-2'>
          <div className='bg-gray-700 text-white px-4 py-2 rounded-full'>
            {hackathon.location || 'Online'}
          </div>
          <div className='bg-gray-700 text-white px-4 py-2 rounded-full'>
            {hackathon.status}
          </div>
          <div className='bg-gray-700 text-white px-4 py-2 rounded-full'>
            STARTS {new Date(hackathon.startDate).toLocaleDateString()}
          </div>
        </div>

        {/* Button Section */}
        <div className='w-full sm:w-auto flex flex-col sm:flex-row gap-3'>
          <button
            onClick={() => navigate(`/hackathon/${hackathon._id}`)}
            className='w-full sm:w-auto text-white py-2 rounded-lg text-lg font-semibold hover:scale-105 transition-all cursor-pointer px-4 border-2 border-purple-500'
          >
            Details
          </button>

          <button
            onClick={() => {
              if (!user) {
                openSignIn();
              } else {
                navigate(`/contact`);
              }
            }}
            className={`w-full sm:w-auto bg-gradient-to-r from-purple-400 to-purple-500 text-white py-2 rounded-lg text-lg font-semibold hover:scale-105 transition-all cursor-pointer px-4 ${hackathon.status === 'closed' ? 'hidden' : ''} ${!user ? 'cursor-not-allowed opacity-50' : ''}`
            }
          >
            {hackathon.status === 'open'
              ? 'Join Hackathon'
              : hackathon.status === 'upcoming'
              ? 'Register'
              : 'See Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HackathonListCard;
