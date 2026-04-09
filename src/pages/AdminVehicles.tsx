import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Car, Save, AlertCircle } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  status?: 'available' | 'booked' | 'limited';
}

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVehicles() {
      if (!isSupabaseConfigured) {
        // Fallback mock data for admin panel demo
        setVehicles([
          { id: '1', name: 'Toyota Innova Crysta', category: 'Cars', status: 'available' },
          { id: '2', name: 'Swift Dzire', category: 'Cars', status: 'available' },
          { id: '3', name: 'Chevrolet Tavera', category: 'Cars', status: 'booked' },
          { id: '4', name: 'Tempo Traveller', category: 'Vans', status: 'available' },
          { id: '6', name: 'Force Urbania', category: 'Vans', status: 'booked' },
          { id: '10', name: 'Sleeper Bus', category: 'Buses', status: 'limited' },
        ]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.from('vehicles').select('id, name, category, status').order('category');
      if (!error && data) {
        setVehicles(data as Vehicle[]);
      }
      setLoading(false);
    }

    fetchVehicles();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'available' | 'booked' | 'limited') => {
    setSaving(id);
    
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('vehicles')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) {
        console.error('Error updating status:', error);
        alert('Failed to update status in database.');
      } else {
        setVehicles(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
      }
    } else {
      // Simulate local state update for demo
      setTimeout(() => {
        setVehicles(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
      }, 500);
    }
    
    setSaving(null);
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-8 border-b border-gray-100 bg-brand-blue text-white flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Car className="w-6 h-6 mr-3 text-brand-gold" />
                Vehicle Availability Management
              </h1>
              <p className="text-gray-300 mt-2 text-sm">
                Update the real-time availability status of your fleet. Changes reflect instantly on the website.
              </p>
            </div>
          </div>

          {!isSupabaseConfigured && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-6 rounded-r-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">
                <strong>Demo Mode:</strong> Supabase is not configured. Status changes will only update locally for demonstration purposes. Connect your database to enable live updates.
              </p>
            </div>
          )}

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                      <th className="p-4 rounded-tl-xl font-semibold">Vehicle Name</th>
                      <th className="p-4 font-semibold">Category</th>
                      <th className="p-4 font-semibold">Current Status</th>
                      <th className="p-4 rounded-tr-xl font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-brand-blue">{vehicle.name}</td>
                        <td className="p-4 text-gray-500 text-sm">{vehicle.category}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            vehicle.status === 'booked' ? 'bg-red-100 text-red-800' :
                            vehicle.status === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              vehicle.status === 'booked' ? 'bg-red-500' :
                              vehicle.status === 'limited' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}></span>
                            {vehicle.status ? vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1) : 'Available'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <select
                              value={vehicle.status || 'available'}
                              onChange={(e) => handleStatusChange(vehicle.id, e.target.value as any)}
                              disabled={saving === vehicle.id}
                              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-brand-gold focus:border-brand-gold block p-2 outline-none shadow-sm disabled:opacity-50"
                            >
                              <option value="available">Available</option>
                              <option value="limited">Limited</option>
                              <option value="booked">Booked</option>
                            </select>
                            {saving === vehicle.id && (
                              <Save className="w-4 h-4 text-brand-gold animate-pulse" />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
