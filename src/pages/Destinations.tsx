import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MapPin } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image_url: string;
}

const MOCK_DESTINATIONS: Destination[] = [
  { id: '1', name: 'Rameswaram Temple', country: 'India', description: 'The historic Ramanathaswamy Temple, a masterpiece of Dravidian architecture and a major pilgrimage site.', image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80' },
  { id: '2', name: 'Dhanushkodi', country: 'India', description: 'The ghost town at the edge of the world, where the oceans meet. Experience the raw beauty of nature.', image_url: 'https://images.unsplash.com/photo-1622308644420-b20142ea98c6?auto=format&fit=crop&q=80' },
  { id: '3', name: 'Madurai Meenakshi', country: 'India', description: 'A historic Hindu temple located on the southern bank of the Vaigai River, known for its stunning gopurams.', image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80' }
];

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      if (!isSupabaseConfigured) {
        setDestinations(MOCK_DESTINATIONS);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('destinations')
        .select('*');
        
      if (error) {
        console.error('Error fetching destinations:', error);
        setDestinations(MOCK_DESTINATIONS);
      } else {
        setDestinations(data && data.length > 0 ? data : MOCK_DESTINATIONS);
      }
      setLoading(false);
    }

    fetchDestinations();
  }, []);

  return (
    <div className="py-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-6 text-balance">
            Sacred Destinations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Discover the spiritual and scenic beauty of our carefully curated destinations across South India.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-3xl shadow-sm max-w-2xl mx-auto">
            <p className="text-gray-500 text-lg font-medium">No destinations are currently listed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinations.map((dest) => (
              <div key={dest.id} className="bg-white rounded-3xl overflow-hidden shadow-lg group cursor-pointer flex flex-col border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={dest.image_url || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80'} 
                    alt={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-brand-blue flex items-center shadow-sm">
                    <MapPin className="w-4 h-4 mr-1.5 text-brand-gold" />
                    {dest.country}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-brand-blue mb-3 text-balance">{dest.name}</h3>
                  <p className="text-gray-600 line-clamp-3 text-pretty leading-relaxed flex-grow">
                    {dest.description}
                  </p>
                  <button className="mt-6 text-brand-gold font-bold hover:text-yellow-600 transition-colors inline-flex items-center w-fit">
                    Explore Packages <span className="ml-2 text-xl leading-none">&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
