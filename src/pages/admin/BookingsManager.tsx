import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Phone, Trash2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  destination: string;
  date: string;
  travelers: string;
  vehicle: string;
  status: string;
  created_at: string;
}

export default function BookingsManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    if (!error && data) setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    if (!isSupabaseConfigured) return;
    const newStatus = currentStatus === 'Pending' ? 'Contacted' : 'Pending';
    
    // Optimistic update
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    
    await supabase.from('enquiries').update({ status: newStatus }).eq('id', id);
  };

  const handleDelete = async (id: string) => {
    if (!isSupabaseConfigured) return;
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      await supabase.from('enquiries').delete().eq('id', id);
      fetchEnquiries();
    }
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
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">Loading enquiries...</td></tr>
              ) : enquiries.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">No recent enquiries.</td></tr>
              ) : (
                enquiries.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-brand-blue">{booking.name}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Phone className="w-3 h-3 mr-1" /> {booking.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{booking.vehicle || 'Not specified'}</div>
                      <div className="text-sm text-gray-500">To: {booking.destination || 'Not specified'}</div>
                      <div className="text-xs text-gray-400 mt-1">{booking.travelers}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{booking.date || 'Flexible'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'Pending' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {booking.status === 'Pending' ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => toggleStatus(booking.id, booking.status)}
                          className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors border ${
                            booking.status === 'Pending' 
                              ? 'border-brand-gold text-brand-blue hover:bg-brand-gold' 
                              : 'border-gray-200 text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          {booking.status === 'Pending' ? 'Mark Contacted' : 'Mark Pending'}
                        </button>
                        <button onClick={() => handleDelete(booking.id)} className="text-red-400 hover:text-red-600 p-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
