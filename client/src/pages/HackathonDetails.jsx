import { useNavigate, useParams } from 'react-router';
import { images } from '../assets/assets';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Error404 from './Error404';
import { IoIosArrowBack } from 'react-icons/io';
import { useUser, useClerk } from '@clerk/clerk-react';

export default function HackathonDetail() {
  const { id } = useParams();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const { hackathon } = useContext(AppContext);
  const [hack, setHack] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundHack = hackathon.find(
      (hack) => hack._id.toString() === id.toString()
    );
    setHack(foundHack);
  }, [id, hackathon]);

  if (!hack) {
    return <Error404 />;
  }
  return (
    <div className='min-h-screen bg-gray-700 flex justify-center items-center p-6 '>
      <div className='bg-gray-800 shadow-lg rounded-2xl p-8 max-w-3xl w-full border-t-8 border-purple-500'>
        <img
          src={images.HackDetail}
          alt='Hackathon Banner'
          className='w-full rounded-lg mb-4 object-cover h-40'
        />

        <button
          onClick={() => navigate('/hackathon')}
          className='bg-purple-500 p-3 mb-2 rounded-lg cursor-pointer text-white font-bold flex items-center gap-3'
        >
          <IoIosArrowBack />
          Back To Hackathon List
        </button>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Title: {hack.name}
        </h1>
        <p className='text-white italic'>Location: {hack.location}</p>

        <div className='mt-6'>
          <p className='text-white'>Description: {hack.description}</p>
        </div>

        <div className='mt-6 grid grid-cols-2 gap-4'>
          <div className='bg-purple-100 p-4 rounded-lg'>
            <p className='text-gray-800 font-semibold'>Start Date:</p>
            <p className='text-gray-800'>
              {new Date(hack.startDate).toDateString()}
            </p>
          </div>
          <div className='bg-purple-100 p-4 rounded-lg'>
            <p className='text-gray-800 font-semibold'>End Date:</p>
            <p className='text-gray-800'>
              {new Date(hack.endDate).toDateString()}
            </p>
          </div>
        </div>

        <div className='mt-6 bg-gray-200 p-4 rounded-lg'>
          <p className='text-gray-800 font-semibold'>Prizes:</p>
          <p className='text-gray-800'>{hack.prizes}</p>
        </div>

        <div className='mt-6'>
          <button
            className={`w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition cursor-pointer text-2xl ${hack.status === 'closed' && 'hidden'}`}
            onClick={() => {
              if (user) {
                navigate(`/contact`);
              } else {
                openSignIn();
              }
            }}
          >
            Register Now
          </button>
        </div>

        <div className='mt-8 text-center'>
          <h2 className='text-xl font-bold text-gray-800'>Sponsored By</h2>

          <div className='flex '>
            <img
              src={images.facebook}
              alt='Sponsor Logo'
              className='mx-auto mt-4 size-20'
            />

            <img
              src={images.google}
              alt='Sponsor Logo'
              className='mx-auto mt-4 size-20'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
