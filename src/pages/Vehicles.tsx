import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Users, Check, Star, Info } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  capacity: string;
  features: string[];
  description: string;
  image_url: string;
  is_popular?: boolean;
  status?: 'available' | 'booked' | 'limited';
}

const MOCK_VEHICLES: Vehicle[] = [
  // Cars (1-6 People)
  { 
    id: '1', 
    name: 'Toyota Innova Crysta', 
    category: 'Cars', 
    capacity: '6-7 Seats', 
    features: ['Premium AC', 'Pushback Seats', 'Music System', 'Extra Luggage Space'],
    description: 'Perfect for family trips offering premium comfort and a smooth ride for long distances.', 
    image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80',
    is_popular: true,
    status: 'available'
  },
  { 
    id: '2', 
    name: 'Swift Dzire', 
    category: 'Cars', 
    capacity: '4 Seats', 
    features: ['AC', 'Comfortable Seating', 'Music System', 'Standard Luggage'],
    description: 'Ideal for couples, small families, or quick city transfers and temple drop-offs.', 
    image_url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80',
    status: 'available'
  },
  // Vans (6-14 People)
  { 
    id: '4', 
    name: 'Tempo Traveller', 
    category: 'Vans', 
    capacity: '12-14 Seats', 
    features: ['AC / Non-AC', 'Pushback Seats', 'LED TV & Music', 'Ample Luggage Space'],
    description: 'The best and most requested vehicle for group tours and extended family trips.', 
    image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80',
    is_popular: true,
    status: 'available'
  },
  // Buses (20+ People)
  { 
    id: '7', 
    name: 'Mini Bus', 
    category: 'Buses', 
    capacity: '21-25 Seats', 
    features: ['AC / Non-AC', 'Pushback Seats', 'Video Coach', 'Air Suspension'],
    description: 'Great for corporate outings, school trips, and large family gatherings.', 
    image_url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80',
    status: 'available'
  },
];

const CATEGORIES = [
  { id: 'All', label: 'All Vehicles' },
  { id: 'Cars', label: 'Cars (1-6 People)' },
  { id: 'Vans', label: 'Vans (6-14 People)' },
  { id: 'Buses', label: 'Buses (20+ People)' }
];

const WHATSAPP_NUMBER = '917339474561';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function fetchVehicles() {
      if (!isSupabaseConfigured) {
        setVehicles(MOCK_VEHICLES);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.from('vehicles').select('*');
        
      if (error || !data || data.length === 0) {
        setVehicles(MOCK_VEHICLES);
      } else {
        setVehicles(data as Vehicle[]); 
      }
      setLoading(false);
    }

    fetchVehicles();

    if (isSupabaseConfigured) {
      const channel = supabase
        .channel('vehicles_status_changes')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'vehicles' },
          (payload) => {
            setVehicles((prevVehicles) =>
              prevVehicles.map((v) =>
                v.id === payload.new.id ? { ...v, status: payload.new.status } : v
              )
            );
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const filteredVehicles = vehicles.filter(vehicle => 
    activeCategory === 'All' || vehicle.category === activeCategory
  );

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'booked':
        return { bg: 'bg-red-500/95', text: 'text-white', dot: 'bg-red-200', label: 'Booked' };
      case 'limited':
        return { bg: 'bg-yellow-500/95', text: 'text-white', dot: 'bg-yellow-200', label: 'Limited' };
      case 'available':
      default:
        return { bg: 'bg-green-500/95', text: 'text-white', dot: 'bg-green-200', label: 'Available' };
    }
  };

  return (
    <div className="py-12 md:py-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-4 md:mb-6 text-balance">
            Our Premium Fleet
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            From compact cars for small families to luxury buses for large groups, we have the perfect vehicle for your journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all shadow-sm ${
                activeCategory === category.id
                  ? 'bg-brand-blue text-brand-gold shadow-md scale-105'
                  : 'bg-white text-gray-600 hover:bg-brand-blue/5 hover:text-brand-blue border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-brand-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {filteredVehicles.map((vehicle) => {
              const statusConfig = getStatusBadge(vehicle.status);
              const isBooked = vehicle.status === 'booked';

              return (
                <div key={vehicle.id} className={`bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col transition-all duration-300 relative group ${isBooked ? 'opacity-90' : 'hover:shadow-2xl hover:-translate-y-1'}`}>
                  
                  {/* Popular Badge */}
                  {vehicle.is_popular && (
                    <div className="absolute top-4 left-4 md:top-5 md:left-5 z-10 bg-brand-gold text-brand-blue px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center shadow-md">
                      <Star className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1 md:mr-1.5 fill-brand-blue" />
                      Most Popular
                    </div>
                  )}

                  {/* Real-time Status Badge */}
                  <div className={`absolute top-4 right-4 md:top-5 md:right-5 z-10 px-3 md:px-3.5 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center shadow-md backdrop-blur-sm ${statusConfig.bg} ${statusConfig.text}`}>
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mr-1.5 md:mr-2 animate-pulse ${statusConfig.dot}`}></div>
                    {statusConfig.label}
                  </div>

                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img 
                      src={vehicle.image_url} 
                      alt={vehicle.name} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${!isBooked && 'group-hover:scale-110'} ${isBooked && 'grayscale-[30%]'}`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-5">
                      <div className="flex items-center text-white font-medium text-sm md:text-base">
                        <Users className="w-4 h-4 md:w-5 md:h-5 mr-2 text-brand-gold" />
                        {vehicle.capacity}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 sm:p-6 md:p-8 flex-grow flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-blue text-balance leading-snug mb-2 md:mb-3">
                      {vehicle.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm sm:text-base text-pretty leading-relaxed mb-5 md:mb-6">
                      {vehicle.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-y-2 md:gap-y-3 gap-x-2 mb-6 md:mb-8 pt-4 md:pt-5 border-t border-gray-100 flex-grow">
                      {vehicle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start text-xs sm:text-sm text-gray-700 font-medium">
                          <Check className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Fixed Footer Alignment with Flex Wrap */}
                    <div className="mt-auto pt-5 md:pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 md:gap-4">
                      <div className="text-left w-full sm:w-auto">
                        <span className="text-xs sm:text-sm text-gray-500 font-medium block mb-0.5">Pricing</span>
                        <span className="text-base sm:text-lg font-bold text-brand-blue whitespace-nowrap">Contact for Price</span>
                      </div>
                      
                      <a 
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello!%20I'm%20interested%20in%20booking%20the%20${encodeURIComponent(vehicle.name)}%20(${encodeURIComponent(vehicle.capacity)}).%20${isBooked ? 'When will it be available next?' : 'Could you please share the pricing details?'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full sm:w-auto sm:flex-1 text-white px-4 sm:px-5 py-2.5 md:py-3 rounded-xl font-bold transition-colors shadow-sm hover:shadow-md flex items-center justify-center text-sm md:text-base whitespace-nowrap ${
                          isBooked 
                            ? 'bg-gray-500 hover:bg-gray-600' 
                            : 'bg-[#25D366] hover:bg-[#128C7E]'
                        }`}
                      >
                        {isBooked ? (
                          <>
                            <Info className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                            Check Next Available
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Book Now
                          </>
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
