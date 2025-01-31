import { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';

const SelfLearning = () => {
  const [selectedCategory, setSelectedCategory] = useState('web');

  const categories = {
    web: {
      title: 'Web Development',
      videos: ['mU6anWqZJcc', 'nu_pCVPKzTk', 'kUMe1FH4CHE'],
      description: 'Master modern web development with hands-on projects.',
    },
    cyber: {
      title: 'Cybersecurity',
      videos: ['dl7G7jYQf2s', '3Kq1MIfTWCE', 'F6BZ-boSKIE'],
      description: 'Learn ethical hacking and network security fundamentals.',
    },
    ai: {
      title: 'AI/ML',
      videos: ['aircAruvnKk', '7eh4d6sabA0', 'GwIo3gDZCVQ'],
      description: 'Deep dive into machine learning and neural networks.',
    },
    iot: {
      title: 'IoT',
      videos: ['Q3ur8wzzhBU', 'XIoINXbS4eI', 'R1X7YYoWnko'],
      description: 'Build smart devices with IoT development.',
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <section className='text-center mb-12'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent mb-4'>
            Self Learning
          </h1>
        </section>

        {/* Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Category Selector */}
          <div className='bg-gray-800 rounded-2xl p-6 space-y-4 '>
            <h2 className='text-2xl font-bold text-white mb-4'>Categories</h2>
            <div className='grid gap-4'>
              {Object.keys(categories).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`p-4 rounded-xl transition-all ${
                    selectedCategory === key
                      ? 'bg-gradient-to-r from-purple-600 to-purple-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {categories[key].title}
                </button>
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div className='bg-gray-800 rounded-2xl p-6'>
            <h3 className='text-2xl font-bold text-white mb-4'>
              {categories[selectedCategory].title}
            </h3>
            <p className='text-gray-400 mb-4'>
              {categories[selectedCategory].description}
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {categories[selectedCategory].videos.map((videoId, index) => (
                <div
                  key={index}
                  className='aspect-video bg-gray-700 rounded-xl overflow-hidden'
                >
                  <iframe
                    className='w-full h-full'
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={categories[selectedCategory].title}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfLearning;
