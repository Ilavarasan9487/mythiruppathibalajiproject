import React, { useState, useEffect } from 'react';
import { Save, Phone, Mail, MapPin, MessageCircle, Link as LinkIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export default function SettingsManager() {
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    phone: '+91 733 947 4561',
    whatsapp: '917339474561',
    email: 'bookings@thirupathibalajitravels.com',
    address: '123 Temple Road, Near Agni Theertham, Rameswaram, Tamil Nadu 623526',
    google_business_link: 'https://www.google.com/search?kgmid=/g/11yq62038t...',
    google_maps_url: 'https://www.google.com/search?kgmid=/g/11yq62038t...'
  });

  useEffect(() => {
    async function fetchSettings() {
      if (!isSupabaseConfigured) return;
      const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (data) {
        setFormData({
          phone: data.phone || formData.phone,
          whatsapp: data.whatsapp || formData.whatsapp,
          email: data.email || formData.email,
          address: data.address || formData.address,
          google_business_link: data.google_business_link || formData.google_business_link,
          google_maps_url: data.google_maps_url || formData.google_maps_url
        });
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) return;
    setIsSaving(true);
    
    await supabase.from('site_settings').upsert({ id: 1, ...formData });
    
    setIsSaving(false);
    alert('Settings updated successfully!');
  };

  if (loading && isSupabaseConfigured) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-brand-blue">Website Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Update your contact information, social links, and website content globally.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-brand-blue mb-6 border-b border-gray-100 pb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 text-gray-400 w-5 h-5" />
                <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number (with country code)</label>
              <div className="relative">
                <MessageCircle className="absolute left-3.5 top-3 text-gray-400 w-5 h-5" />
                <input type="text" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-gray-400 w-5 h-5" />
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Office Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 text-gray-400 w-5 h-5" />
                <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Links & Integrations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-brand-blue mb-6 border-b border-gray-100 pb-4">Links & Integrations</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Google Business / Reviews Link</label>
              <div className="relative">
                <LinkIcon className="absolute left-3.5 top-3 text-gray-400 w-5 h-5" />
                <input type="url" value={formData.google_business_link} onChange={e => setFormData({...formData, google_business_link: e.target.value})} className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-gray-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">This link is used for the "Top Rated on Google" buttons and footer icons.</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Google Maps Embed URL (iframe src)</label>
              <textarea rows={3} value={formData.google_maps_url} onChange={e => setFormData({...formData, google_maps_url: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none resize-none text-gray-600 text-sm"></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-brand-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md flex items-center disabled:opacity-70"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
