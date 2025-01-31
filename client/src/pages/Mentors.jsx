import { FaChalkboardTeacher } from 'react-icons/fa';
import { images } from '../assets/assets';

const mentors = [
  {
    name: 'Yogesh shah',
    expertise: 'Web Development',
    image: images.yogesh,
  },
  {
    name: 'Mandip Basnet',
    expertise: 'Cybersecurity',
    image: images.Mandip,
  },
  {
    name: 'Sandesh Shrestha',
    expertise: 'AI & Machine Learning',
    image: images.sandesh,
  },
];

const Mentor = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8'>
      <div className='max-w-7xl mx-auto text-center'>
        <h2 className='text-4xl font-bold text-white mb-8'>
          <FaChalkboardTeacher className='inline-block text-4xl mb-2' /> Mentor
          Section
        </h2>
        <p className='text-gray-400 mb-6'>
          The mentor section is coming soon! Stay tuned for more information.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className='bg-gray-800 p-6 rounded-2xl text-center shadow-lg'
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className='w-24 h-24 mx-auto rounded-full mb-4'
              />
              <h3 className='text-xl font-semibold text-white'>
                {mentor.name}
              </h3>
              <p className='text-gray-400'>{mentor.expertise}</p>
              <button className='mt-4 px-6 py-2 bg-gray-700 text-gray-400 rounded-full cursor-not-allowed'>
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentor;
