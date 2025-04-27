import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import LoginButton from './LoginButton';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
            <img src="/images/logo.svg" alt="Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 drop-shadow-sm">
              UpInTheSky
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`flex items-center px-4 py-2 rounded-lg font-semibold tracking-wide text-lg transition-all duration-300 !text-white ${
                isActive('/') 
                  ? 'bg-black shadow-lg' 
                  : 'bg-black/70 hover:bg-black'
              }`}
            >
              <HomeIcon className="h-5 w-5 mr-2 !text-white" />
              Home
            </Link>
            <Link 
              to="/bookings" 
              className={`flex items-center px-4 py-2 rounded-lg font-semibold tracking-wide text-lg transition-all duration-300 !text-white ${
                isActive('/bookings') 
                  ? 'bg-black shadow-lg' 
                  : 'bg-black/70 hover:bg-black'
              }`}
            >
              <BookOpenIcon className="h-5 w-5 mr-2 !text-white" />
              My Bookings
            </Link>
            <Link 
              to="/blog" 
              className={`flex items-center px-4 py-2 rounded-lg font-semibold tracking-wide text-lg transition-all duration-300 !text-white ${
                isActive('/blog') 
                  ? 'bg-black shadow-lg' 
                  : 'bg-black/70 hover:bg-black'
              }`}
            >
              <UserCircleIcon className="h-5 w-5 mr-2 !text-white" />
              Community
            </Link>
            <LoginButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              to="/" 
              className={`block px-4 py-2 rounded-lg font-semibold tracking-wide text-lg transition-all duration-300 !text-white ${
                isActive('/') 
                  ? 'bg-black' 
                  : 'bg-black/70 hover:bg-black'
              }`}
            >
              <HomeIcon className="h-5 w-5 inline-block mr-2 !text-white" />
              Home
            </Link>
            <Link 
              to="/bookings" 
              className={`block px-4 py-2 rounded-lg font-semibold tracking-wide text-lg transition-all duration-300 !text-white ${
                isActive('/bookings') 
                  ? 'bg-black' 
                  : 'bg-black/70 hover:bg-black'
              }`}
            >
              <BookOpenIcon className="h-5 w-5 inline-block mr-2 !text-white" />
              My Bookings
            </Link>
            <Link 
              to="/blog" 
              className={`block px-4 py-2 rounded-lg font-semibold tracking-wide text-lg transition-all duration-300 !text-white ${
                isActive('/blog') 
                  ? 'bg-black' 
                  : 'bg-black/70 hover:bg-black'
              }`}
            >
              <UserCircleIcon className="h-5 w-5 inline-block mr-2 !text-white" />
              Community
            </Link>
            <div className="px-4 py-2">
              <LoginButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;