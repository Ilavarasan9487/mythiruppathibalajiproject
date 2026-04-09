import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Map, Package, CalendarCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ vehicles: 0, destinations: 0, packages: 0, enquiries: 0 });
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      // Fetch counts
      const [vRes, dRes, pRes, eRes] = await Promise.all([
        supabase.from('vehicles').select('id', { count: 'exact', head: true }),
        supabase.from('destinations').select('id', { count: 'exact', head: true }),
        supabase.from('packages').select('id', { count: 'exact', head: true }),
        supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('status', 'Pending')
      ]);

      setCounts({
        vehicles: vRes.count || 0,
        destinations: dRes.count || 0,
        packages: pRes.count || 0,
        enquiries: eRes.count || 0
      });

      // Fetch recent enquiries
      const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(5);
      if (data) setRecentEnquiries(data);
      
      setLoading(false);
    }

    fetchDashboardData();
  }, []);

  const stats = [
    { name: 'Total Vehicles', value: counts.vehicles, icon: Car, color: 'bg-blue-500' },
    { name: 'Destinations', value: counts.destinations, icon: Map, color: 'bg-green-500' },
    { name: 'Active Packages', value: counts.packages, icon: Package, color: 'bg-purple-500' },
    { name: 'Pending Enquiries', value: counts.enquiries, icon: CalendarCheck, color: 'bg-brand-gold' },
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
              <p className="text-2xl font-bold text-brand-blue">{loading ? '-' : stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-brand-blue">Recent Enquiries</h3>
            <Link to="/admin/bookings" className="text-sm text-brand-gold font-medium hover:underline">View All</Link>
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
                {loading ? (
                  <tr><td colSpan={4} className="text-center py-6 text-gray-500">Loading...</td></tr>
                ) : recentEnquiries.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-6 text-gray-500">No recent enquiries found.</td></tr>
                ) : (
                  recentEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-brand-blue">{enquiry.name}</td>
                      <td className="px-6 py-4 text-gray-600">{enquiry.destination || enquiry.vehicle}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{enquiry.date || 'Flexible'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          enquiry.status === 'Pending' ? 'bg-red-100 text-red-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {enquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-brand-blue mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/admin/vehicles" className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-gold hover:bg-brand-light transition-all group">
              <div className="flex items-center">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg mr-3 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  <Car className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-brand-blue">Add New Vehicle</span>
              </div>
            </Link>
            <Link to="/admin/destinations" className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-gold hover:bg-brand-light transition-all group">
              <div className="flex items-center">
                <div className="bg-green-50 text-green-600 p-2 rounded-lg mr-3 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  <Map className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-brand-blue">Add Destination</span>
              </div>
            </Link>
            <Link to="/admin/packages" className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-gold hover:bg-brand-light transition-all group">
              <div className="flex items-center">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-lg mr-3 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  <Package className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-brand-blue">Create Package</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
