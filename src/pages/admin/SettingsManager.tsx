import React, { useState } from 'react';
import { Save, Phone, Mail, MapPin, MessageCircle, Link as LinkIcon } from 'lucide-react';

export default function SettingsManager() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings updated successfully! (Demo Mode)');
    }, 1000);
  };

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
                <input type="text" defaultValue="+91 733 947 4561" className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number (with country code)</label>
              <div className="relative">
                <MessageCircle className="absolute left-3.5 top-3 text-gray-400 w-5 h-5" />
                <input type="text" defaultValue="917339474561" className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-gray-400 w-5 h-5" />
                <input type="email" defaultValue="bookings@thirupathibalajitravels.com" className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Office Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 text-gray-400 w-5 h-5" />
                <input type="text" defaultValue="123 Temple Road, Near Agni Theertham, Rameswaram, Tamil Nadu 623526" className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none" />
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
                <input type="url" defaultValue="https://www.google.com/search?kgmid=/g/11yq62038t..." className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-gray-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">This link is used for the "Top Rated on Google" buttons and footer icons.</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Google Maps Embed URL (iframe src)</label>
              <textarea rows={3} defaultValue="https://www.google.com/search?kgmid=/g/11yq62038t..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none resize-none text-gray-600 text-sm"></textarea>
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
