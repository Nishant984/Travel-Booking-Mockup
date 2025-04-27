import { useState } from 'react';
import { stays } from '../data/stays';
import BookingModal from '../components/BookingModal';

const Home = () => {
  const [selectedStay, setSelectedStay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openBookingModal = (stay) => {
    setSelectedStay(stay);
    setIsModalOpen(true);
  };

  const filteredStays = stays.filter(stay => 
    stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stay.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.avif')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Perfect Stay
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Find the best accommodations for your next adventure
          </p>
          <div className="w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full px-6 py-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStays.map((stay) => (
            <div 
              key={stay.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img 
                  src={stay.image} 
                  alt={stay.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
                  <span className="text-blue-600 font-semibold">₹{stay.price}/night</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{stay.name}</h2>
                <p className="text-gray-600 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {stay.location}
                </p>
                <p className="text-gray-700 mb-6 line-clamp-2">{stay.description}</p>
                <button 
                  onClick={() => openBookingModal(stay)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <BookingModal 
          stay={selectedStay} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default Home;