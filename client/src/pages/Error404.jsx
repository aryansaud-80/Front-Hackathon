import React from 'react';
import { Link } from 'react-router';

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-lg text-center relative">
        {/* Floating 404 number */}
        <div className="animate-float text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
          404
        </div>

        {/* Main content */}
        <div className="relative ">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Oops! Lost in Space
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for seems to have drifted off into the cosmic 
            void. Let's get you back to safety!
          </p>

          {/* Animated emoji */}
          <div className="text-8xl mb-8 animate-bounce hover:animate-spin cursor-pointer">
            🚀
          </div>

          {/* Return button */}
          <Link 
            to="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-full 
            text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Beam Me Home
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
          text-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        @media (max-width: 640px) {
          .animate-float {
            font-size: 6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Error404;