import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Search, Star, Shield, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 sm:px-6"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1623190230999-4c511d167045?auto=format&fit=crop&q=80')" }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/70"></div>
        
        <div className="relative z-10 text-center w-full max-w-6xl mx-auto mt-10 md:mt-16 flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-brand-gold mb-4 sm:mb-6 drop-shadow-2xl leading-tight uppercase tracking-wide w-full"
          >
            Thirupathi Balaji<br className="hidden sm:block md:hidden" /> Travels
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-2xl text-white mb-10 sm:mb-12 font-light tracking-wide text-pretty max-w-3xl mx-auto px-2"
          >
            Your Divine Journey Begins in Rameswaram
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl flex flex-col lg:flex-row gap-4 sm:gap-6 items-end w-full max-w-5xl mx-auto"
          >
            <div className="flex-1 w-full text-left">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 tracking-wide">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 text-brand-gold w-5 h-5" />
                <input type="text" placeholder="Where to?" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800 text-sm sm:text-base" />
              </div>
            </div>
            <div className="flex-1 w-full text-left">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 tracking-wide">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3.5 text-brand-gold w-5 h-5" />
                <input type="date" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800 text-sm sm:text-base" />
              </div>
            </div>
            <div className="flex-1 w-full text-left">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 tracking-wide">Travelers</label>
              <div className="relative">
                <Users className="absolute left-3.5 top-3.5 text-brand-gold w-5 h-5" />
                <select className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none appearance-none transition-all shadow-sm text-gray-800 bg-white text-sm sm:text-base">
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3-5 Passengers</option>
                  <option>Group (6+)</option>
                </select>
              </div>
            </div>
            <button className="w-full lg:w-auto bg-brand-gold text-brand-blue px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center shadow-md hover:shadow-lg text-sm sm:text-base mt-2 lg:mt-0">
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
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
              <div key={i} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer h-80 sm:h-96">
                <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/20 to-transparent flex items-end p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white text-balance">{dest.title}</h3>
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
