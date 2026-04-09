import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

export default function DestinationsManager() {
  const [destinations, setDestinations] = useState([
    { id: '1', name: 'Rameswaram', category: 'Temple Places', image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80' },
    { id: '2', name: 'Ooty', category: 'Hill Stations', image_url: 'https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&q=80' },
    { id: '3', name: 'Madurai', category: 'Temple Places', image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('Destination saved successfully! (Demo Mode)');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">Destinations Management</h2>
          <p className="text-gray-500 text-sm mt-1">Add or edit travel destinations shown on your website.</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="bg-brand-gold text-brand-blue px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors flex items-center shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Destination
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Destination</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {destinations.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center">
                    <img src={item.image_url} alt={item.name} className="w-16 h-12 rounded-lg object-cover mr-4 border border-gray-200" />
                    <span className="font-bold text-brand-blue">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="text-blue-500 hover:text-blue-700 p-2">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDestinations(destinations.filter(d => d.id !== item.id))} className="text-red-500 hover:text-red-700 p-2 ml-2">
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
              <h3 className="text-xl font-bold text-brand-blue">{editingItem ? 'Edit Destination' : 'Add New Destination'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Destination Name</label>
                  <input type="text" defaultValue={editingItem?.name} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select defaultValue={editingItem?.category || 'Hill Stations'} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none bg-white">
                    <option>Hill Stations</option>
                    <option>Temple Places</option>
                    <option>Cities & Heritage</option>
                    <option>Nature & Wildlife</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-gold">
                  <div className="bg-gray-50 px-3 py-2 border-r border-gray-200 text-gray-500">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <input type="url" defaultValue={editingItem?.image_url} placeholder="https://..." required className="w-full px-4 py-2 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none resize-none"></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-md">Save Destination</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
