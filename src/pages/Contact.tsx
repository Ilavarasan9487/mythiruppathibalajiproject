import React from 'react';
import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react';

const GOOGLE_BUSINESS_LINK = 'https://www.google.com/search?kgmid=/g/11yq62038t&hl=en-IN&q=Thirupathi+Balaji+Travels&shndl=30&shem=damc,lcuae,ptotple,shrtsdl&source=sh/x/loc/osrp/m1/2&kgs=b59e5458219a3677&utm_source=damc,lcuae,ptotple,shrtsdl,sh/x/loc/osrp/m1/2';

export default function Contact() {
  return (
    <div className="py-12 md:py-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-4 md:mb-6 text-balance">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            We are here to assist you 24/7. Reach out to us for bookings, inquiries, or any travel assistance you may need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Contact Form */}
          <div className="lg:col-span-3 p-6 sm:p-8 md:p-12 order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-blue mb-6 md:mb-8">Send us a Message</h3>
            <form className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">First Name</label>
                  <input type="text" placeholder="John" className="w-full px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800 text-sm md:text-base" />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800 text-sm md:text-base" />
                </div>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800 text-sm md:text-base" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Your Message</label>
                <textarea rows={4} placeholder="How can we help you?" className="w-full px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800 resize-none text-sm md:text-base"></textarea>
              </div>
              <button type="button" className="w-full sm:w-auto bg-brand-blue text-white px-8 md:px-10 py-3 md:py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg text-sm md:text-base">
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-2 bg-brand-blue text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-hidden order-1 lg:order-2">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 md:w-64 md:h-64 bg-brand-gold opacity-10 rounded-full blur-3xl"></div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-10 relative z-10">Contact Information</h3>
            
            <div className="space-y-6 md:space-y-8 relative z-10">
              <div className="flex items-start group">
                <div className="bg-white/10 p-2.5 md:p-3 rounded-lg group-hover:bg-brand-gold transition-colors mr-4 md:mr-5 flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-brand-gold group-hover:text-brand-blue transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-base md:text-lg text-white mb-1">Office Address</h4>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed text-pretty">123 Temple Road, Near Agni Theertham,<br/>Rameswaram, Tamil Nadu 623526</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-white/10 p-2.5 md:p-3 rounded-lg group-hover:bg-brand-gold transition-colors mr-4 md:mr-5 flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-brand-gold group-hover:text-brand-blue transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-base md:text-lg text-white mb-1">Phone Number</h4>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">+91 733 947 4561</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-white/10 p-2.5 md:p-3 rounded-lg group-hover:bg-brand-gold transition-colors mr-4 md:mr-5 flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-brand-gold group-hover:text-brand-blue transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-base md:text-lg text-white mb-1">Email Address</h4>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed break-all">bookings@thirupathibalajitravels.com</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-white/10 p-2.5 md:p-3 rounded-lg group-hover:bg-brand-gold transition-colors mr-4 md:mr-5 flex-shrink-0">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-brand-gold group-hover:text-brand-blue transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-base md:text-lg text-white mb-1">Working Hours</h4>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed text-pretty">24/7 Available for Bookings & Support</p>
                </div>
              </div>

              <a href={GOOGLE_BUSINESS_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start group cursor-pointer">
                <div className="bg-white/10 p-2.5 md:p-3 rounded-lg group-hover:bg-brand-gold transition-colors mr-4 md:mr-5 flex-shrink-0">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-brand-gold group-hover:text-brand-blue transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-base md:text-lg text-white mb-1 group-hover:text-brand-gold transition-colors">Google Business</h4>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed text-pretty">View our profile and read customer reviews</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
