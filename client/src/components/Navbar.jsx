import { useState } from 'react';
import { NavLink } from 'react-router';
import { UserButton, useClerk, useUser } from '@clerk/clerk-react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <nav className='bg-gray-900 text-white sticky w-full z-10 top-0'>
      <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-10'>
        <div className='flex justify-between items-center h-16'>
          <NavLink
            to='/'
            className='text-white text-3xl font-semibold flex items-center space-x-2'
            style={{ fontFamily: 'var(--logo-font)' }}
          >
            <span className='text-purple-500 text-4xl'>CODINg</span>
            <span className='text-2xl'>Heroes</span>
          </NavLink>

          {/* Main Navigation Links */}
          <div className='hidden md:flex space-x-6'>
            {[
              'Home',
              ,
              'Hackathon',
              'Projects',
              'Guides',
              'Mentors',
              'About',
            ].map((link) => (
              <NavLink
                key={link}
                to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                className={({ isActive }) =>
                  `${
                    isActive ? 'bg-purple-600' : ''
                  } text-lg px-4 py-2 rounded-md transition-all duration-300
                   ${link === 'Projects' && !user ? 'cursor-not-allowed opacity-50' : ''}`
                }
              >
                {link}
              </NavLink>
            ))}
          </div>

          {/* Authentication or Login Button */}
          <div className='flex items-center gap-4'>
            {user ? (
              <div className='flex items-center gap-4'>
                <p className='hidden sm:block'>Hi, {user.firstName}</p>
                <UserButton />
              </div>
            ) : (
              <div className='flex gap-4'>
                <button
                  onClick={() => openSignIn()}
                  className='px-6 py-2 text-white bg-purple-600 rounded-full transition duration-300 hover:bg-purple-500 cursor-pointer'
                >
                  Login
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden text-white focus:outline-none'
          >
            {isOpen ? (
              <FaTimes className='w-6 h-6' />
            ) : (
              <FaBars className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-gray-800 text-white flex flex-col items-center py-4 space-y-4'>
          {['Home', 'Hackathon', 'Projects', 'Guides', 'Mentors', 'About'].map(
            (link) => (
              <NavLink
                key={link}
                to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                className='block text-lg px-6 py-2 text-gray-300 hover:bg-gray-700 rounded-md w-full text-center transition-all duration-300'
                onClick={() => setIsOpen(false)}
              >
                {link}
              </NavLink>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
