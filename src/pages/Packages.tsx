import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Clock, Star } from 'lucide-react';

interface Package {
  id: string;
  title: string;
  duration_days: number;
  price: number;
  image_url: string;
}

const MOCK_PACKAGES: Package[] = [
  { id: '1', title: 'Rameswaram Divine Tour', duration_days: 2, price: 4999, image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80' },
  { id: '2', title: 'Madurai & Rameswaram Explorer', duration_days: 4, price: 12500, image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80' },
  { id: '3', title: 'South India Pilgrimage', duration_days: 7, price: 24999, image_url: 'https://images.unsplash.com/photo-1622308644420-b20142ea98c6?auto=format&fit=crop&q=80' }
];

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      if (!isSupabaseConfigured) {
        setPackages(MOCK_PACKAGES);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('packages')
        .select('*');
        
      if (error) {
        console.error('Error fetching packages:', error);
        setPackages(MOCK_PACKAGES);
      } else {
        setPackages(data && data.length > 0 ? data : MOCK_PACKAGES);
      }
      setLoading(false);
    }

    fetchPackages();
  }, []);

  return (
    <div className="py-12 md:py-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-4 md:mb-6 text-balance">
            Exclusive Tour Packages
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Handcrafted itineraries designed to provide the perfect balance of pilgrimage and leisure.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-brand-gold"></div>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center bg-white p-8 md:p-12 rounded-3xl shadow-sm max-w-2xl mx-auto">
            <p className="text-gray-500 text-base md:text-lg font-medium">No packages are currently listed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="relative h-56 md:h-64">
                  <img 
                    src={pkg.image_url || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80'} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3 md:mb-4 gap-3 md:gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-blue text-balance leading-snug">{pkg.title}</h3>
                    <div className="flex items-center bg-brand-gold/10 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-brand-gold text-xs md:text-sm font-bold flex-shrink-0">
                      <Star className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-1.5 fill-current" /> 4.9
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-5 md:mb-6 font-medium text-sm md:text-base">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-brand-gold" />
                    {pkg.duration_days} Days / {pkg.duration_days - 1} Nights
                  </div>
                  
                  <div className="mt-auto pt-5 md:pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="w-full sm:w-auto">
                      <span className="text-xs md:text-sm text-gray-500 font-medium block mb-0.5 md:mb-1">Starting from</span>
                      <span className="text-2xl md:text-3xl font-bold text-brand-blue">₹{pkg.price}</span>
                    </div>
                    <button className="w-full sm:w-auto bg-brand-gold text-brand-blue px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-sm hover:shadow-md text-sm md:text-base">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
