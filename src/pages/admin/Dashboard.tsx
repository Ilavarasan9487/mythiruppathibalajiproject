import React from 'react';
import { Car, Map, Package, CalendarCheck, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Vehicles', value: '12', icon: Car, color: 'bg-blue-500' },
    { name: 'Destinations', value: '24', icon: Map, color: 'bg-green-500' },
    { name: 'Active Packages', value: '8', icon: Package, color: 'bg-purple-500' },
    { name: 'New Bookings', value: '15', icon: CalendarCheck, color: 'bg-brand-gold' },
  ];

  const recentEnquiries = [
    { id: 1, name: 'Rajesh Kumar', destination: 'Rameswaram Tour', date: '2023-11-15', status: 'Pending' },
    { id: 2, name: 'Priya Sharma', destination: 'Ooty Package', date: '2023-11-14', status: 'Contacted' },
    { id: 3, name: 'Amit Patel', destination: 'Innova Booking', date: '2023-11-14', status: 'Confirmed' },
    { id: 4, name: 'Sneha Reddy', destination: 'Kodaikanal Trip', date: '2023-11-13', status: 'Contacted' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-brand-blue">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className={`${stat.color} p-4 rounded-xl text-white mr-4 shadow-sm`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-brand-blue">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-brand-blue">Recent Enquiries</h3>
            <button className="text-sm text-brand-gold font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Interest</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-brand-blue">{enquiry.name}</td>
                    <td className="px-6 py-4 text-gray-600">{enquiry.destination}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{enquiry.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        enquiry.status === 'Pending' ? 'bg-red-100 text-red-700' :
                        enquiry.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {enquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-brand-blue mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-gold hover:bg-brand-light transition-all group">
              <div className="flex items-center">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg mr-3 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  <Car className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-brand-blue">Add New Vehicle</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-gold hover:bg-brand-light transition-all group">
              <div className="flex items-center">
                <div className="bg-green-50 text-green-600 p-2 rounded-lg mr-3 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  <Map className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-brand-blue">Add Destination</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-gold hover:bg-brand-light transition-all group">
              <div className="flex items-center">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-lg mr-3 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  <Package className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-brand-blue">Create Package</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
