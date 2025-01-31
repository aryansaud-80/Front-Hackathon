import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { teamMembers } from '../assets/assets';

const AboutUs = () => {
  return (
    <div className='min-h-screen text-gray-800 py-12 px-6 bg-gray-700'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-5xl font-extrabold text-white'>About Us</h1>
        <p className='mt-3 text-lg text-white max-w-2xl mx-auto'>
          We are a passionate team committed to delivering the best experience.
        </p>
      </div>

      {/* Team Section */}
      <div className='flex justify-center mt-10 b'>
        <div className='w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 '>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className='flex flex-col items-center bg-gray-900 p-6 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-xl'
            >
              <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 shadow-md'>
                <img
                  src={member.image}
                  alt={member.name}
                  className='w-full h-full object-cover'
                />
              </div>
              <h3 className='mt-4 text-xl font-semibold text-gray-400'>
                {member.name}
              </h3>
              <p className='text-gray-900'>{member.role}</p>
              <p className='text-gray-400 text-sm mt-2 text-center'>
                {member.bio}
              </p>

              {/* Social Links */}
              <div className='flex space-x-4 mt-4'>
                <a
                  href={member.linkedin}
                  className='text-blue-600 hover:text-blue-800 text-xl'
                >
                  <FaLinkedin />
                </a>
                <a
                  href={member.twitter}
                  className='text-blue-400 hover:text-blue-600 text-xl'
                >
                  <FaTwitter />
                </a>
                <a
                  href={member.github}
                  className='text-white hover:text-black text-xl'
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className='text-center mt-16 bg-gray-900 p-8 rounded-xl shadow-md w-4/5 mx-auto'>
        <h2 className='text-3xl font-semibold text-white'>Our Mission</h2>
        <p className='mt-3 text-white max-w-3xl mx-auto'>
          We aim to make the web more accessible and provide users with
          innovative solutions that solve real-world problems. Our goal is to
          bridge the gap between technology and users through seamless digital
          experiences.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
