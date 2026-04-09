import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Check, Clock, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// --- MOCK DATA FOR SMART SEARCH ---
const ALL_VEHICLES = [
  { id: 'v1', name: 'Swift Dzire', capacity: '4 Seats', features: ['AC', 'Comfortable Seating', 'Standard Luggage'], image_url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80', status: 'available' },
  { id: 'v2', name: 'Toyota Innova Crysta', capacity: '6-7 Seats', features: ['Premium AC', 'Pushback Seats', 'Extra Luggage Space'], image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80', status: 'limited' },
  { id: 'v3', name: 'Maruti Ertiga', capacity: '6 Seats', features: ['AC', 'Family Friendly', 'Music System'], image_url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80', status: 'available' },
  { id: 'v4', name: 'Mahindra Van', capacity: '10 Seats', features: ['Non-AC/AC options', 'Spacious', 'Group Travel'], image_url: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?auto=format&fit=crop&q=80', status: 'available' },
  { id: 'v5', name: 'Tempo Traveller', capacity: '12-14 Seats', features: ['AC', 'Pushback Seats', 'LED TV & Music'], image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80', status: 'limited' },
  { id: 'v6', name: 'Force Traveller', capacity: '17 Seats', features: ['AC', 'Pushback Seats', 'Ample Luggage'], image_url: 'https://images.unsplash.com/photo-1530053969419-9517bd2f3f9d?auto=format&fit=crop&q=80', status: 'available' },
  { id: 'v7', name: 'Mini Bus', capacity: '21-25 Seats', features: ['AC / Non-AC', 'Pushback Seats', 'Video Coach'], image_url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80', status: 'available' },
  { id: 'v8', name: 'AC Bus', capacity: '30-40 Seats', features: ['Premium AC', 'Air Suspension', 'Video Coach'], image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80', status: 'available' },
];

const DESTINATION_INFO: Record<string, any> = {
  'rameswaram': {
    title: 'Rameswaram',
    desc: 'A sacred island city, home to the Ramanathaswamy Temple and the legendary Ram Setu. One of the holiest places in India for pilgrims.',
    highlights: ['Ramanathaswamy Temple', 'Dhanushkodi', 'Agni Theertham', 'Pamban Bridge'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80'
  },
  'ooty': {
    title: 'Ooty',
    desc: 'Queen of Hill Stations, known for its rolling hills, lush tea gardens, and the historic Nilgiri Mountain Railway.',
    highlights: ['Ooty Lake', 'Botanical Gardens', 'Nilgiri Mountain Railway', 'Doddabetta Peak'],
    image: 'https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&q=80'
  },
  'madurai': {
    title: 'Madurai',
    desc: 'The cultural capital of Tamil Nadu, centered around the magnificent and historic Meenakshi Amman Temple.',
    highlights: ['Meenakshi Temple', 'Thirumalai Nayakkar Mahal', 'Gandhi Memorial Museum'],
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80'
  }
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const destParam = searchParams.get('dest') || '';
  const dateParam = searchParams.get('date') || '';
  const travelersParam = searchParams.get('travelers') || '';

  const [suitableVehicles, setSuitableVehicles] = useState<typeof ALL_VEHICLES>([]);
  const [destDetails, setDestDetails] = useState<any>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // 1. Filter Vehicles based on travelers
    let filtered = ALL_VEHICLES;
    if (travelersParam === '1-2 Passengers') {
      filtered = ALL_VEHICLES.filter(v => ['Swift Dzire', 'Toyota Innova Crysta'].includes(v.name));
    } else if (travelersParam === '3-5 Passengers') {
      filtered = ALL_VEHICLES.filter(v => ['Maruti Ertiga', 'Toyota Innova Crysta'].includes(v.name));
    } else if (travelersParam === '6-10 Passengers') {
      filtered = ALL_VEHICLES.filter(v => ['Mahindra Van', 'Tempo Traveller'].includes(v.name));
    } else if (travelersParam === '10+ Passengers') {
      filtered = ALL_VEHICLES.filter(v => ['Force Traveller', 'Mini Bus', 'AC Bus'].includes(v.name));
    }
    setSuitableVehicles(filtered);

    // 2. Find Destination Details (Fuzzy match)
    const normalizedDest = destParam.toLowerCase();
    const foundKey = Object.keys(DESTINATION_INFO).find(k => normalizedDest.includes(k));
    
    if (foundKey) {
      setDestDetails(DESTINATION_INFO[foundKey]);
    } else {
      // Generic fallback
      setDestDetails({
        title: destParam || 'Your Destination',
        desc: `Explore the beautiful sights and sounds of ${destParam || 'your chosen destination'} with our premium travel services.`,
        highlights: ['Local Sightseeing', 'Cultural Tours', 'Comfortable Travel'],
        image: 'https://images.unsplash.com/photo-1622308644420-b20142ea98c6?auto=format&fit=crop&q=80'
      });
    }
  }, [destParam, dateParam, travelersParam]);

  const handleBookClick = (vehicleName: string) => {
    setSelectedVehicle(vehicleName);
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('enquiries').insert([{
        name: formData.name,
        phone: formData.phone,
        destination: destParam,
        date: dateParam,
        travelers: travelersParam,
        vehicle: selectedVehicle,
        status: 'Pending'
      }]);
      
      if (error) {
        console.error("Error submitting enquiry:", error);
        alert("There was an error submitting your request. Please try again or contact us directly.");
        setIsSubmitting(false);
        return;
      }
    } else {
      // Fallback for demo mode
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Close modal after showing success message
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
      setFormData({ name: '', phone: '' });
    }, 3000);
  };

  return (
    <div className="bg-brand-light min-h-screen pb-20">
      {/* Search Summary Header */}
      <div className="bg-brand-blue text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-brand-gold mb-6">Your Travel Plan</h1>
          <div className="flex flex-wrap gap-4 md:gap-8 bg-white/10 p-4 md:p-6 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-brand-gold mr-2" />
              <span className="font-medium">{destParam || 'Not specified'}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-brand-gold mr-2" />
              <span className="font-medium">{dateParam || 'Not specified'}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-brand-gold mr-2" />
              <span className="font-medium">{travelersParam || 'Not specified'}</span>
            </div>
            <Link to="/" className="ml-auto text-sm text-brand-gold hover:text-white underline underline-offset-4 transition-colors">
              Modify Search
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Destination Details Section */}
        {destDetails && (
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12 flex flex-col lg:flex-row border border-gray-100">
            <div className="lg:w-2/5 h-64 lg:h-auto relative">
              <img src={destDetails.image} alt={destDetails.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden"></div>
              <h2 className="absolute bottom-4 left-6 text-3xl font-serif font-bold text-white lg:hidden drop-shadow-md">
                {destDetails.title}
              </h2>
            </div>
            <div className="p-6 md:p-10 lg:w-3/5 flex flex-col justify-center">
              <h2 className="hidden lg:block text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-4">
                {destDetails.title}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                {destDetails.desc}
              </p>
              <div className="mb-8">
                <h4 className="font-bold text-brand-blue mb-3">Highlights:</h4>
                <div className="flex flex-wrap gap-2">
                  {destDetails.highlights.map((h: string, i: number) => (
                    <span key={i} className="bg-brand-light text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              <Link to="/packages" className="inline-flex items-center text-brand-blue font-bold hover:text-brand-gold transition-colors">
                View Tour Packages for {destDetails.title}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
          </div>
        )}

        {/* Recommended Vehicles Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-blue mb-2">
            Recommended Vehicles
          </h2>
          <p className="text-gray-600 mb-8">
            Based on your selection of <strong className="text-brand-blue">{travelersParam}</strong>, here are the best options for your trip.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {suitableVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col relative group hover:shadow-xl transition-shadow">
                
                {/* Urgency Badge */}
                {vehicle.status === 'limited' && (
                  <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center shadow-md animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                    Only few left!
                  </div>
                )}

                <div className="relative h-56 overflow-hidden">
                  <img src={vehicle.image_url} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center text-white font-medium">
                      <Users className="w-4 h-4 mr-2 text-brand-gold" />
                      {vehicle.capacity}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-brand-blue mb-4">{vehicle.name}</h3>
                  
                  <div className="grid grid-cols-1 gap-y-2 mb-6 flex-grow">
                    {vehicle.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-700 font-medium">
                        <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleBookClick(vehicle.name)}
                    className="w-full bg-brand-gold text-brand-blue px-4 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-sm flex items-center justify-center"
                  >
                    Request Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 md:p-8">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue mb-2">Request Sent!</h3>
                  <p className="text-gray-600">
                    Thank you! We have received your booking request for {selectedVehicle}. Our team will contact you shortly to confirm details and pricing.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-serif font-bold text-brand-blue mb-2">Complete Booking</h3>
                  <p className="text-gray-500 text-sm mb-6">Please provide your details to request this vehicle.</p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Auto-filled Read-only details */}
                    <div className="bg-brand-light p-4 rounded-xl space-y-2 mb-6 border border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Vehicle:</span>
                        <span className="font-bold text-brand-blue text-right">{selectedVehicle}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Destination:</span>
                        <span className="font-bold text-brand-blue text-right">{destParam}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-bold text-brand-blue text-right">{dateParam}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Travelers:</span>
                        <span className="font-bold text-brand-blue text-right">{travelersParam}</span>
                      </div>
                    </div>

                    {/* User Inputs */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your name" 
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Enter your phone number" 
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-brand-blue text-white px-4 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md mt-6 disabled:opacity-70 flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
