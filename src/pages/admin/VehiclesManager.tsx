import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

export default function VehiclesManager() {
  const [vehicles, setVehicles] = useState([
    { id: '1', name: 'Toyota Innova Crysta', category: 'Cars', capacity: '6-7 Seats', status: 'available', image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80' },
    { id: '2', name: 'Swift Dzire', category: 'Cars', capacity: '4 Seats', status: 'available', image_url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80' },
    { id: '4', name: 'Tempo Traveller', category: 'Vans', capacity: '12-14 Seats', status: 'booked', image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    // In a real app, save to Supabase here
    alert('Vehicle saved successfully! (Demo Mode)');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">Vehicles Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your fleet, update details, and change availability.</p>
        </div>
        <button 
          onClick={() => { setEditingVehicle(null); setIsModalOpen(true); }}
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
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center">
                    <img src={vehicle.image_url} alt={vehicle.name} className="w-12 h-12 rounded-lg object-cover mr-4 border border-gray-200" />
                    <span className="font-bold text-brand-blue">{vehicle.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{vehicle.category}</td>
                  <td className="px-6 py-4 text-gray-600">{vehicle.capacity}</td>
                  <td className="px-6 py-4">
                    <select
                      value={vehicle.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        setVehicles(vehicles.map(v => v.id === vehicle.id ? { ...v, status: newStatus } : v));
                      }}
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
                    <button onClick={() => { setEditingVehicle(vehicle); setIsModalOpen(true); }} className="text-blue-500 hover:text-blue-700 p-2">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(vehicle.id)} className="text-red-500 hover:text-red-700 p-2 ml-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 relative">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-brand-blue">{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Name</label>
                  <input type="text" defaultValue={editingVehicle?.name} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select defaultValue={editingVehicle?.category || 'Cars'} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none bg-white">
                    <option>Cars</option>
                    <option>Vans</option>
                    <option>Buses</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Seating Capacity</label>
                  <input type="text" defaultValue={editingVehicle?.capacity} placeholder="e.g., 4 Seats" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                  <select defaultValue={editingVehicle?.status || 'available'} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none bg-white">
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
                  <input type="url" defaultValue={editingVehicle?.image_url} placeholder="https://..." required className="w-full px-4 py-2 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none resize-none"></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-md">Save Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
