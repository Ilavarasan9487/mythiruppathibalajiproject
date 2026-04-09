import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-6 text-balance">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            We are here to assist you 24/7. Reach out to us for bookings, inquiries, or any travel assistance you may need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Contact Form */}
          <div className="lg:col-span-3 p-8 md:p-12">
            <h3 className="text-3xl font-bold text-brand-blue mb-8">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input type="text" placeholder="John" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                <textarea rows={5} placeholder="How can we help you?" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all shadow-sm text-gray-800 resize-none"></textarea>
              </div>
              <button type="button" className="w-full md:w-auto bg-brand-blue text-white px-10 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg">
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-2 bg-brand-blue text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl"></div>
            
            <h3 className="text-3xl font-bold text-white mb-10 relative z-10">Contact Information</h3>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start group">
                <div className="bg-white/10 p-3 rounded-lg group-hover:bg-brand-gold transition-colors mr-5 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-gold group-hover:text-brand-blue transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white mb-1">Office Address</h4>
                  <p className="text-gray-300 leading-relaxed text-pretty">123 Temple Road, Near Agni Theertham,<br/>Rameswaram, Tamil Nadu 623526</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-white/10 p-3 rounded-lg group-hover:bg-brand-gold transition-colors mr-5 flex-shrink-0">
                  <Phone className="w-6 h-6 text-brand-gold group-hover:text-brand-blue transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white mb-1">Phone Number</h4>
                  <p className="text-gray-300 leading-relaxed">+91 733 947 4561</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-white/10 p-3 rounded-lg group-hover:bg-brand-gold transition-colors mr-5 flex-shrink-0">
                  <Mail className="w-6 h-6 text-brand-gold group-hover:text-brand-blue transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white mb-1">Email Address</h4>
                  <p className="text-gray-300 leading-relaxed break-all">bookings@thirupathibalajitravels.com</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-white/10 p-3 rounded-lg group-hover:bg-brand-gold transition-colors mr-5 flex-shrink-0">
                  <Clock className="w-6 h-6 text-brand-gold group-hover:text-brand-blue transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white mb-1">Working Hours</h4>
                  <p className="text-gray-300 leading-relaxed text-pretty">24/7 Available for Bookings & Support</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
