import Card from '../components/Card.jsx';
import { useNavigate } from 'react-router';
import ImageWithText from './Image.jsx';
import TestimonialSlider from './Testimonial.jsx';
import NewsletterSubscription from './NewsLetter.jsx';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import Loader from '../components/Loader.jsx';
// import HackathonPage from './Description.jsx';

const Home = () => {
  const { hackathon, loading } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      <ImageWithText />

      {loading ? (
        <Loader />
      ) : (
        <div className='bg-gray-900 min-h-screen py-10'>
          <div className='container mx-auto text-center'>
            <h1 className='text-3xl text-gray-300 font-bold mb-6'>
              Recent Hackathons
            </h1>
          </div>

          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center'>
              {hackathon
                .slice(0, hackathon.length > 4 ? 4 : hackathon.length)
                .map((data, idx) => (
                  <Card key={idx} data={data} idx={idx} />
                ))}
            </div>

            <div className='flex justify-center mt-10'>
              <button
                className='bg-purple-500 py-3 px-8 text-lg text-white font-bold rounded-md hover:bg-purple-600 transition duration-200'
                onClick={() => navigate('/hackathon')}
              >
                More
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <ChatBot /> */}
      <TestimonialSlider />
      <NewsletterSubscription />
    </>
  );
};

export default Home;
