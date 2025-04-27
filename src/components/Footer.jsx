import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { 
  FaceSmileIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              UpInTheSky
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Find your perfect stay and create unforgettable memories with our curated selection of accommodations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaceSmileIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <PhotoIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <UserGroupIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-400" />
                upinthesky@gmail.com
              </li>
              <li className="flex items-center text-gray-400">
                <PhoneIcon className="h-5 w-5 mr-2 text-blue-400" />
                +91 7385429723
              </li>
              <li className="flex items-center text-gray-400">
                <MapPinIcon className="h-5 w-5 mr-2 text-blue-400" />
                IIT Ropar, Punjab, India - 140001
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} UpInTheSky. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;