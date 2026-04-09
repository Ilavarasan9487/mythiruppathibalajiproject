import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  capacity_text: string;
  status: string;
  image_url: string;
  description: string;
}

export default function VehiclesManager() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Vehicle | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cars',
    capacity_text: '',
    status: 'available',
    image_url: '',
    description: ''
  });

  const fetchVehicles = async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    const { data, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
    if (!error && data) setVehicles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const openModal = (item: Vehicle | null = null) => {
    setEditingItem(item);
    setError('');
    if (item) {
      setFormData({
        name: item.name,
        category: item.category || 'Cars',
        capacity_text: item.capacity_text || '',
        status: item.status || 'available',
        image_url: item.image_url || '',
        description: item.description || ''
      });
    } else {
      setFormData({ name: '', category: 'Cars', capacity_text: '', status: 'available', image_url: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Custom Validation
    if (!formData.name.trim()) {
      setError('Please enter a Vehicle Name.');
      return;
    }
    if (!formData.capacity_text.trim()) {
      setError('Please enter the Seating Capacity.');
      return;
    }
    if (!formData.image_url.trim()) {
      setError('Please provide an Image URL.');
      return;
    }

    if (!isSupabaseConfigured) return;
    setIsSaving(true);

    const payload = {
      name: formData.name,
      category: formData.category,
      type: formData.category, // required by schema
      capacity_text: formData.capacity_text,
      capacity: parseInt(formData.capacity_text) || 4, // required by schema
      price_per_day: 0, // required by schema
      status: formData.status,
      image_url: formData.image_url,
      description: formData.description
    };

    if (editingItem) {
      await supabase.from('vehicles').update(payload).eq('id', editingItem.id);
    } else {
      await supabase.from('vehicles').insert([payload]);
    }

    setIsSaving(false);
    setIsModalOpen(false);
    fetchVehicles();
  };

  const handleDelete = async (id: string) => {
    if (!isSupabaseConfigured) return;
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      await supabase.from('vehicles').delete().eq('id', id);
      fetchVehicles();
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!isSupabaseConfigured) return;
    setVehicles(vehicles.map(v => v.id === id ? { ...v, status: newStatus } : v));
    await supabase.from('vehicles').update({ status: newStatus }).eq('id', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">Vehicles Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your fleet, update details, and change availability.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-brand-gold text-brand-blue px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors flex items-center shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Vehicle
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Vehicle</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Capacity</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">Loading vehicles...</td></tr>
              ) : vehicles.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">No vehicles found. Add one to get started.</td></tr>
              ) : (
                vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 flex items-center">
                      <img src={vehicle.image_url} alt={vehicle.name} className="w-12 h-12 rounded-lg object-cover mr-4 border border-gray-200" />
                      <span className="font-bold text-brand-blue">{vehicle.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{vehicle.category}</td>
                    <td className="px-6 py-4 text-gray-600">{vehicle.capacity_text}</td>
                    <td className="px-6 py-4">
                      <select
                        value={vehicle.status}
                        onChange={(e) => handleStatusChange(vehicle.id, e.target.value)}
                        className={`text-xs font-bold rounded-full px-3 py-1 border-0 outline-none cursor-pointer ${
                          vehicle.status === 'booked' ? 'bg-red-100 text-red-700' :
                          vehicle.status === 'limited' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}
                      >
                        <option value="available">Available</option>
                        <option value="limited">Limited</option>
                        <option value="booked">Booked</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openModal(vehicle)} className="text-blue-500 hover:text-blue-700 p-2">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(vehicle.id)} className="text-red-500 hover:text-red-700 p-2 ml-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 relative">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-brand-blue">{editingItem ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4" noValidate>
              
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm font-medium flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none bg-white">
                    <option value="Cars">Cars</option>
                    <option value="Vans">Vans</option>
                    <option value="Buses">Buses</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Seating Capacity</label>
                  <input type="text" value={formData.capacity_text} onChange={e => setFormData({...formData, capacity_text: e.target.value})} placeholder="e.g., 4 Seats" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none bg-white">
                    <option value="available">Available</option>
                    <option value="limited">Limited</option>
                    <option value="booked">Booked</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-gold">
                  <div className="bg-gray-50 px-3 py-2 border-r border-gray-200 text-gray-500">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <input type="url" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." className="w-full px-4 py-2 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none resize-none"></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-brand-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-md disabled:opacity-70">
                  {isSaving ? 'Saving...' : 'Save Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
