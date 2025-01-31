import { useNavigate } from 'react-router';

const Card = ({ data, idx }) => {
  const navigate = useNavigate();

  return (
    <div className='relative flex flex-col w-full max-w-sm border bg-gray-800 rounded-lg overflow-hidden shadow-md mt-4 p-6 transition-transform transform hover:shadow-lg hover:-translate-y-1 m-auto'>
      <div className='absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-gray-800 rounded-t-lg'></div>

      <div className='pt-10 flex flex-col gap-6 '>
        <h1 className='text-2xl font-bold text-white text-center'>
          {data.name}
        </h1>
        <p className='text-gray-300 text-md text-center'>
          {data.startDate
            ? new Date(data.startDate).toLocaleDateString()
            : 'N/A'}
        </p>
        <p className='text-gray-400 text-md text-center'>
          {data.location || 'Location Not Available'}
        </p>

        <button
          className='w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-200 cursor-pointer text-lg'
          onClick={() => navigate(`/hackathon/${data._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
