import React from 'react';
import { images } from '../assets/assets';

function ImageWithText() {
  return (
    <div
      className='flex items-center justify-center gap-16  mx-auto   bg-white h-[600px]  w-full bg-cover bg-center'
      style={{
        backgroundImage: `url(${images.hackothon})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <p className='text-3xl font-semibold text-white text-center pt-64 uppercase mt-16'>
        Hack the hackathon <br />
        our community of{' '}
        <span className='text-gray-900 underline'>Developers.</span>
      </p>

      <div></div>
    </div>
  );
}

export default ImageWithText;
