import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { format } from 'date-fns';
import { 
  CalendarIcon, 
  CurrencyDollarIcon, 
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(collection(db, 'bookings'), where('userEmail', '==', auth.currentUser?.email || ''));
        const querySnapshot = await getDocs(q);
        const bookingsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await deleteDoc(doc(db, 'bookings', bookingId));
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      } catch (error) {
        console.error("Error deleting booking: ", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4 tracking-tight leading-tight">
          <span className="text-blue-400">My Bookings</span>
          </h1>
          <p className="text-gray-600 mb-8">Manage and view all your upcoming stays</p>
          
          {bookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CalendarIcon className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Bookings Yet</h3>
                <p className="text-gray-600 mb-6">Start planning your next adventure by browsing our selection of stays.</p>
                <a 
                  href="/" 
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Browse Stays
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map(booking => (
                <div 
                  key={booking.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-bold text-gray-800">{booking.stayName}</h2>
                          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                            Booking ID: {booking.id.slice(0, 8)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center text-gray-600">
                            <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Check-in</p>
                              <p>{format(new Date(booking.checkIn), 'MMM dd, yyyy')}</p>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Check-out</p>
                              <p>{format(new Date(booking.checkOut), 'MMM dd, yyyy')}</p>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Total Price</p>
                              <p className="text-lg font-semibold text-gray-800">₹{booking.totalPrice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-lg transition-all duration-300"
                      >
                        <XCircleIcon className="h-5 w-5" />
                        <span>Cancel Booking</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;