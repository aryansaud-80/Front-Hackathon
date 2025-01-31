import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='text-white py-12 bg-gray-800'>
      <div className='container mx-auto px-6 flex flex-col items-center text-center'>
        {/* Logo */}
        <h2 className='text-3xl font-bold mb-6 text-purple-500'>Hackathon X</h2>

        {/* Social Media Links */}
        <div className='flex space-x-6 mb-6'>
          <a
            href='https://www.linkedin.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl text-gray-400 hover:text-blue-500 transition'
          >
            <FaLinkedin />
          </a>
          <a
            href='https://www.instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl text-gray-400 hover:text-purple-500 transition'
          >
            <FaInstagram />
          </a>
          <a
            href='https://www.github.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl text-gray-400 hover:text-gray-300 transition'
          >
            <FaGithub />
          </a>
          <a
            href='https://www.twitter.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl text-gray-400 hover:text-blue-400 transition'
          >
            <FaTwitter />
          </a>
        </div>

        {/* Quick Links */}
        <div className='flex space-x-6 mb-6 text-sm text-gray-400'>
          <a href='#about' className='hover:text-white transition'>
            About
          </a>
          <a href='#events' className='hover:text-white transition'>
            Events
          </a>
          <a href='#contact' className='hover:text-white transition'>
            Contact
          </a>
        </div>

        {/* Copyright Info */}
        <p className='text-sm text-gray-500'>
          © {new Date().getFullYear()} Hackathon X. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
