import React, { useState } from 'react';
import { CheckCircle2, Clock, Phone } from 'lucide-react';

export default function BookingsManager() {
  const [bookings, setBookings] = useState([
    { id: 1, name: 'Rajesh Kumar', phone: '+91 9876543210', vehicle: 'Toyota Innova Crysta', destination: 'Rameswaram', date: '2023-11-20', status: 'Pending' },
    { id: 2, name: 'Priya Sharma', phone: '+91 8765432109', vehicle: 'Tempo Traveller', destination: 'Ooty', date: '2023-11-22', status: 'Contacted' },
    { id: 3, name: 'Amit Patel', phone: '+91 7654321098', vehicle: 'Swift Dzire', destination: 'Madurai', date: '2023-11-25', status: 'Pending' },
  ]);

  const toggleStatus = (id: number) => {
    setBookings(bookings.map(b => {
      if (b.id === id) {
        return { ...b, status: b.status === 'Pending' ? 'Contacted' : 'Pending' };
      }
      return b;
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-brand-blue">Customer Enquiries & Bookings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage incoming requests from the website and track contact status.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer Info</th>
                <th className="px-6 py-4 font-semibold">Request Details</th>
                <th className="px-6 py-4 font-semibold">Travel Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-brand-blue">{booking.name}</div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Phone className="w-3 h-3 mr-1" /> {booking.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{booking.vehicle}</div>
                    <div className="text-sm text-gray-500">To: {booking.destination}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{booking.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'Pending' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {booking.status === 'Pending' ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toggleStatus(booking.id)}
                      className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors border ${
                        booking.status === 'Pending' 
                          ? 'border-brand-gold text-brand-blue hover:bg-brand-gold' 
                          : 'border-gray-200 text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {booking.status === 'Pending' ? 'Mark Contacted' : 'Mark Pending'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
