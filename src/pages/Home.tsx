import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Search, Star, Shield, Clock } from 'lucide-react';

const WHATSAPP_NUMBER = '917339474561';

export default function Home() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('1-2 Passengers');
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!destination.trim() || !date) {
      setError('Please select a destination and date to continue.');
      return;
    }
    setError('');
    // Redirect to search results with query params
    navigate(`/search-results?dest=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}&travelers=${encodeURIComponent(travelers)}`);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 sm:px-6"
        style={{ backgroundImage: "url('https://images.dualite.app/03f09802-3dfc-4644-a7c4-306de861314f/Gemini_Generated_Image_if5rtwif5rtwif5r-7bd475e1-ffa7-42f7-9e72-60f106d331a8.webp')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-900/40"></div>
        
        <div className="relative z-10 text-center w-full max-w-6xl mx-auto mt-10 md:mt-16 flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-brand-gold mb-4 sm:mb-6 drop-shadow-2xl leading-tight uppercase tracking-wide w-full"
          >
            Thirupathi Balaji<br className="block md:hidden" /> Travels
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-2xl text-white mb-10 sm:mb-12 font-medium tracking-wide text-pretty max-w-3xl mx-auto px-2 drop-shadow-lg"
          >
            Your Divine Journey Begins in Rameswaram
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col gap-4 w-full max-w-5xl mx-auto"
          >
            {error && (
              <div className="bg-red-50 text-red-500 text-sm font-semibold p-3 rounded-lg text-left">
                {error}
              </div>
            )}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-end w-full">
              <div className="flex-1 w-full text-left">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 tracking-wide">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 text-brand-gold w-5 h-5" />
                  <input 
                    type="text" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Rameswaram, Ooty" 
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800 text-sm sm:text-base" 
                  />
                </div>
              </div>
              <div className="flex-1 w-full text-left">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 tracking-wide">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 text-brand-gold w-5 h-5" />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800 text-sm sm:text-base" 
                  />
                </div>
              </div>
              <div className="flex-1 w-full text-left">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 tracking-wide">Travelers</label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-3.5 text-brand-gold w-5 h-5" />
                  <select 
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none appearance-none transition-all shadow-sm text-gray-800 bg-white text-sm sm:text-base"
                  >
                    <option value="1-2 Passengers">1-2 Passengers</option>
                    <option value="3-5 Passengers">3-5 Passengers</option>
                    <option value="6-10 Passengers">6-10 Passengers</option>
                    <option value="10+ Passengers">10+ Passengers</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={handleSearch}
                className="w-full lg:w-auto bg-brand-gold text-brand-blue px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center shadow-md hover:shadow-lg text-sm sm:text-base mt-2 lg:mt-0"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 sm:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-brand-light p-4 rounded-full mb-5 sm:mb-6">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-brand-gold" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-blue mb-2 sm:mb-3">Secure Booking</h3>
              <p className="text-gray-600 text-sm sm:text-base text-pretty leading-relaxed max-w-xs">
                100% secure payment processing and data protection for your peace of mind.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-brand-light p-4 rounded-full mb-5 sm:mb-6">
                <Star className="w-8 h-8 sm:w-10 sm:h-10 text-brand-gold" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-blue mb-2 sm:mb-3">Premium Service</h3>
              <p className="text-gray-600 text-sm sm:text-base text-pretty leading-relaxed max-w-xs">
                Top-rated vehicles and highly experienced drivers ensuring a comfortable journey.
              </p>
            </div>
            <div className="flex flex-col items-center sm:col-span-2 md:col-span-1">
              <div className="bg-brand-light p-4 rounded-full mb-5 sm:mb-6">
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-brand-gold" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-blue mb-2 sm:mb-3">24/7 Support</h3>
              <p className="text-gray-600 text-sm sm:text-base text-pretty leading-relaxed max-w-xs">
                Round-the-clock assistance dedicated to all your travel needs and inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Destinations */}
      <section className="py-16 sm:py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-4 sm:mb-6 text-balance">
              Sacred Destinations
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed px-2">
              Explore the most divine and breathtaking locations in and around Rameswaram with our expertly guided tours.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: 'Ramanathaswamy Temple', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80' },
              { title: 'Dhanushkodi Beach', image: 'https://images.unsplash.com/photo-1622308644420-b20142ea98c6?auto=format&fit=crop&q=80' },
              { title: 'Madurai Meenakshi', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80' }
            ].map((dest, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden shadow-lg h-80 sm:h-96">
                <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/95 via-brand-blue/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white text-balance mb-4">{dest.title}</h3>
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello!%20I'm%20interested%20in%20booking%20a%20trip%20to%20${encodeURIComponent(dest.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#128C7E] transition-colors shadow-sm hover:shadow-md flex items-center justify-center text-sm sm:text-base opacity-90 hover:opacity-100"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Book via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 sm:mt-16">
            <Link to="/destinations" className="inline-block border-2 border-brand-blue text-brand-blue px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-bold hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:shadow-md text-sm sm:text-base">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
