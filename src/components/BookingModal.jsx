import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';
import { 
  XMarkIcon, 
  CheckCircleIcon,
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const BookingModal = ({ stay, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        stayId: stay.id,
        stayName: stay.name,
        userName: data.name,
        userEmail: data.email,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        totalPrice: calculateTotalPrice(data.checkIn, data.checkOut, stay.price),
        createdAt: serverTimestamp()
      });
      setBookingSuccess(true);
    } catch (error) {
      console.error("Error adding booking: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotalPrice = (checkIn, checkOut, pricePerNight) => {
    const diffTime = new Date(checkOut) - new Date(checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * pricePerNight;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Book {stay.name}</h2>
              <p className="text-gray-600 mt-1">Complete your booking details</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {bookingSuccess ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-8">Your stay at {stay.name} has been successfully booked.</p>
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="checkIn">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      id="checkIn"
                      type="date"
                      {...register('checkIn', { 
                        required: 'Check-in date is required',
                        validate: value => new Date(value) >= new Date(new Date().setHours(0, 0, 0, 0)) || 'Check-in date must be today or later'
                      })}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="checkOut">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <input
                      id="checkOut"
                      type="date"
                      {...register('checkOut', { 
                        required: 'Check-out date is required',
                        validate: value => {
                          const checkIn = new Date(document.getElementById('checkIn').value);
                          const checkOut = new Date(value);
                          return checkOut > checkIn || 'Check-out date must be after check-in date';
                        }
                      })}
                      className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut.message}</p>}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2 text-lg font-bold">₹</span>
                    <span className="text-gray-600">Price per night:</span>
                  </div>
                  <span className="font-semibold text-gray-800">₹{stay.price}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;