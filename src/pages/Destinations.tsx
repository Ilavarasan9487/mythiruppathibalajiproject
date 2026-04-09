import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country?: string;
  category?: string;
  description: string;
  image_url: string;
  best_time?: string;
  duration?: string;
}

const MOCK_DESTINATIONS: Destination[] = [
  // Hill Stations
  { id: '1', name: 'Ooty', category: 'Hill Stations', description: 'Queen of Hill Stations, known for its rolling hills, lush tea gardens, and the historic Nilgiri Mountain Railway.', image_url: 'https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&q=80', best_time: 'Oct to Jun', duration: '2-3 Days' },
  { id: '2', name: 'Kodaikanal', category: 'Hill Stations', description: 'Princess of Hill Stations, famous for its star-shaped lake, pine forests, and scenic viewpoints.', image_url: 'https://images.unsplash.com/photo-1596522354195-e84ae3c98731?auto=format&fit=crop&q=80', best_time: 'Sep to May', duration: '2-3 Days' },
  { id: '3', name: 'Yercaud', category: 'Hill Stations', description: 'A tranquil hill station in the Shevaroy Hills, known for its sprawling coffee plantations and pleasant weather.', image_url: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?auto=format&fit=crop&q=80', best_time: 'Oct to Jun', duration: '1-2 Days' },
  { id: '4', name: 'Coonoor', category: 'Hill Stations', description: 'A quiet alternative to Ooty, offering lush tea estates, Sim\'s Park, and panoramic valley views.', image_url: 'https://images.unsplash.com/photo-1605557202138-097824c3e074?auto=format&fit=crop&q=80', best_time: 'Oct to Mar', duration: '1-2 Days' },
  { id: '5', name: 'Valparai', category: 'Hill Stations', description: 'A pristine hill station known for its untouched evergreen forests, tea estates, and rich wildlife.', image_url: 'https://images.unsplash.com/photo-1586896263546-2182d39860b2?auto=format&fit=crop&q=80', best_time: 'Sep to Mar', duration: '2-3 Days' },
  
  // Temple Places
  { id: '10', name: 'Rameshwaram', category: 'Temple Places', description: 'A sacred island city, home to the Ramanathaswamy Temple and the legendary Ram Setu.', image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80', best_time: 'Oct to Apr', duration: '1-2 Days' },
  { id: '11', name: 'Madurai', category: 'Temple Places', description: 'The cultural capital of Tamil Nadu, centered around the magnificent and historic Meenakshi Amman Temple.', image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80', best_time: 'Oct to Mar', duration: '1-2 Days' },
  { id: '12', name: 'Chidambaram', category: 'Temple Places', description: 'Famous for the Thillai Nataraja Temple, a masterpiece of Dravidian architecture dedicated to Lord Shiva.', image_url: 'https://images.unsplash.com/photo-1623060100413-c35015383182?auto=format&fit=crop&q=80', best_time: 'Oct to Mar', duration: '1 Day' },

  // Cities & Heritage
  { id: '22', name: 'Kanyakumari', category: 'Cities & Heritage', description: 'The southernmost tip of India where three oceans meet, famous for its spectacular sunrises and sunsets.', image_url: 'https://images.unsplash.com/photo-1622308644420-b20142ea98c6?auto=format&fit=crop&q=80', best_time: 'Oct to Mar', duration: '1-2 Days' },
  { id: '23', name: 'Mahabalipuram', category: 'Cities & Heritage', description: 'A UNESCO World Heritage site known for its ancient rock-cut temples and the beautiful Shore Temple.', image_url: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80', best_time: 'Nov to Feb', duration: '1-2 Days' },

  // Nature & Wildlife
  { id: '30', name: 'Courtallam', category: 'Nature & Wildlife', description: 'The "Spa of South India", famous for its numerous waterfalls believed to have medicinal properties.', image_url: 'https://images.unsplash.com/photo-1621245025916-2402517e5a03?auto=format&fit=crop&q=80', best_time: 'Jun to Sep', duration: '1-2 Days' },
  { id: '31', name: 'Hogenakkal', category: 'Nature & Wildlife', description: 'Often referred to as the "Niagara of India", known for its thrilling coracle rides and powerful falls.', image_url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80', best_time: 'Aug to May', duration: '1 Day' },
];

const CATEGORIES = ['All', 'Hill Stations', 'Temple Places', 'Cities & Heritage', 'Nature & Wildlife'];
const WHATSAPP_NUMBER = '917339474561';

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

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

  const filteredDestinations = destinations.filter(dest => 
    activeCategory === 'All' || dest.category === activeCategory
  );

  return (
    <div className="py-12 md:py-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-4 md:mb-6 text-balance">
            Explore Tamil Nadu
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Discover the spiritual, scenic, and natural beauty of our carefully curated destinations across the state.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all shadow-sm ${
                activeCategory === category
                  ? 'bg-brand-blue text-brand-gold shadow-md scale-105'
                  : 'bg-white text-gray-600 hover:bg-brand-blue/5 hover:text-brand-blue border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-brand-gold"></div>
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center bg-white p-8 md:p-12 rounded-3xl shadow-sm max-w-2xl mx-auto">
            <p className="text-gray-500 text-base md:text-lg font-medium">No destinations found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {filteredDestinations.map((dest) => (
              <div key={dest.id} className="bg-white rounded-3xl overflow-hidden shadow-lg group flex flex-col border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                
                {/* Image Section */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img 
                    src={dest.image_url} 
                    alt={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-white/95 backdrop-blur-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold text-brand-blue flex items-center shadow-sm">
                    <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1 md:mr-1.5 text-brand-gold" />
                    {dest.category || 'Destination'}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 sm:p-6 md:p-8 flex-grow flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-brand-blue mb-2 md:mb-3 text-balance group-hover:text-brand-gold transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 text-sm sm:text-base text-pretty leading-relaxed mb-5 md:mb-6 flex-grow">
                    {dest.description}
                  </p>
                  
                  {/* Info Tags */}
                  <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 pt-4 md:pt-5 border-t border-gray-100">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600 font-medium">
                      <Calendar className="w-4 h-4 mr-2 md:mr-3 text-brand-gold flex-shrink-0" />
                      <span className="w-20 md:w-24 text-gray-500 flex-shrink-0">Best Time:</span>
                      <span className="text-brand-blue font-semibold">{dest.best_time || 'Year-round'}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600 font-medium">
                      <Clock className="w-4 h-4 mr-2 md:mr-3 text-brand-gold flex-shrink-0" />
                      <span className="w-20 md:w-24 text-gray-500 flex-shrink-0">Duration:</span>
                      <span className="text-brand-blue font-semibold">{dest.duration || 'Flexible'}</span>
                    </div>
                  </div>

                  {/* WhatsApp Booking Button */}
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello!%20I'm%20interested%20in%20booking%20a%20trip%20to%20${encodeURIComponent(dest.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white px-4 md:px-6 py-3 md:py-3.5 rounded-xl font-bold hover:bg-[#128C7E] transition-colors shadow-sm hover:shadow-md flex items-center justify-center mt-auto text-sm md:text-base"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-2.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Book via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
