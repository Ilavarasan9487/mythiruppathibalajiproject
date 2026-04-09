import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Users, Briefcase, CheckCircle, XCircle } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  type: string;
  capacity: number;
  price_per_day: number;
  image_url: string;
  is_available: boolean;
}

const MOCK_VEHICLES: Vehicle[] = [
  { id: '1', name: 'Toyota Innova Crysta', type: 'SUV', capacity: 7, price_per_day: 2500, image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80', is_available: true },
  { id: '2', name: 'Tempo Traveller', type: 'Van', capacity: 14, price_per_day: 4500, image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80', is_available: true },
  { id: '3', name: 'Luxury Volvo Bus', type: 'Bus', capacity: 40, price_per_day: 12000, image_url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80', is_available: false }
];

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      if (!isSupabaseConfigured) {
        setVehicles(MOCK_VEHICLES);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('price_per_day', { ascending: true });
        
      if (error) {
        console.error('Error fetching vehicles:', error);
        setVehicles(MOCK_VEHICLES);
      } else {
        setVehicles(data && data.length > 0 ? data : MOCK_VEHICLES);
      }
      setLoading(false);
    }

    fetchVehicles();
  }, []);

  return (
    <div className="py-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-6 text-balance">
            Our Premium Fleet
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Choose from our wide range of well-maintained vehicles for a comfortable, safe, and luxurious journey across South India.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-3xl shadow-sm max-w-2xl mx-auto">
            <p className="text-gray-500 text-lg font-medium">No vehicles are currently listed in the database.</p>
            <p className="text-sm text-gray-400 mt-2">Please add vehicles via the Supabase dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img 
                    src={vehicle.image_url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80'} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-brand-blue shadow-sm">
                    {vehicle.type}
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <h3 className="text-2xl font-bold text-brand-blue text-balance leading-snug">{vehicle.name}</h3>
                    <div className="text-right flex-shrink-0">
                      <span className="text-3xl font-bold text-brand-gold">₹{vehicle.price_per_day}</span>
                      <span className="text-sm text-gray-500 block font-medium mt-1">/ day</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8 mb-8 text-gray-600 font-medium">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2.5 text-brand-gold" />
                      <span>{vehicle.capacity} Seats</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-2.5 text-brand-gold" />
                      <span>AC/Non-AC</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      {vehicle.is_available ? (
                        <>
                          <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                          <span className="text-base font-bold text-green-600">Available</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-red-500 mr-2" />
                          <span className="text-base font-bold text-red-600">Booked</span>
                        </>
                      )}
                    </div>
                    <button 
                      disabled={!vehicle.is_available}
                      className={`px-8 py-3 rounded-xl font-bold transition-all shadow-sm ${
                        vehicle.is_available 
                          ? 'bg-brand-blue text-white hover:bg-slate-800 hover:shadow-md' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Book Now
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
