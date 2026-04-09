import React from 'react';

export default function About() {
  return (
    <div className="py-20 lg:py-28 bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block bg-brand-gold/10 text-brand-gold font-semibold px-4 py-1.5 rounded-full text-sm mb-6">
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-blue mb-8 text-balance leading-tight">
              About Thirupathi Balaji Travels
            </h1>
            <div className="space-y-6 text-lg text-gray-600 text-pretty leading-relaxed">
              <p>
                Founded in the sacred city of Rameswaram, <strong className="text-brand-blue font-semibold">Thirupathi Balaji Travels</strong> has been the trusted companion for thousands of pilgrims and tourists exploring the divine beauty of South India.
              </p>
              <p>
                We pride ourselves on offering premium, safe, and comfortable journeys with our modern fleet of vehicles and expertly crafted tour packages. Your spiritual journey is our utmost priority, and we ensure every detail is handled with care and devotion.
              </p>
              <p>
                Whether you are seeking a peaceful pilgrimage to the Ramanathaswamy Temple or an adventurous trip to Dhanushkodi, our experienced drivers and dedicated support team are here to make your experience unforgettable.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-100 pt-10">
              <div>
                <h4 className="text-4xl font-serif font-bold text-brand-gold mb-2">10+</h4>
                <p className="text-gray-500 font-medium">Years of Experience</p>
              </div>
              <div>
                <h4 className="text-4xl font-serif font-bold text-brand-gold mb-2">50k+</h4>
                <p className="text-gray-500 font-medium">Happy Travelers</p>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-brand-gold rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80" 
                alt="Rameswaram Temple" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
