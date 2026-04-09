import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const GOOGLE_BUSINESS_LINK = 'https://www.google.com/search?kgmid=/g/11yq62038t&hl=en-IN&q=Thirupathi+Balaji+Travels&shndl=30&shem=damc,lcuae,ptotple,shrtsdl&source=sh/x/loc/osrp/m1/2&kgs=b59e5458219a3677&utm_source=damc,lcuae,ptotple,shrtsdl,sh/x/loc/osrp/m1/2';

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-gray-300 pt-12 md:pt-16 pb-6 md:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-10 md:mb-12">
          <div className="col-span-1 sm:col-span-2 pr-0 md:pr-12">
            <h3 className="font-serif text-2xl md:text-3xl text-brand-gold font-bold mb-4 md:mb-6">
              Thirupathi Balaji Travels
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-pretty max-w-md mb-6 md:mb-8 text-gray-400">
              Experience the divine journey and explore the sacred beauty of Rameswaram and beyond with our premium travel and vehicle booking services.
            </p>
            <div className="flex space-x-4 md:space-x-5">
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href={GOOGLE_BUSINESS_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10" title="Google Business Profile">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
              <li><Link to="/destinations" className="text-gray-400 hover:text-brand-gold transition-colors">Destinations</Link></li>
              <li><Link to="/packages" className="text-gray-400 hover:text-brand-gold transition-colors">Tour Packages</Link></li>
              <li><Link to="/vehicles" className="text-gray-400 hover:text-brand-gold transition-colors">Book a Vehicle</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-brand-gold transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 tracking-wide">Contact Info</h4>
            <ul className="space-y-4 md:space-y-5 text-sm md:text-base text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-brand-gold mr-3 md:mr-4 flex-shrink-0 mt-1" />
                <span className="leading-relaxed">123 Temple Road, Near Agni Theertham, Rameswaram, Tamil Nadu 623526</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-brand-gold mr-3 md:mr-4 flex-shrink-0" />
                <span>+91 733 947 4561</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-brand-gold mr-3 md:mr-4 flex-shrink-0" />
                <span className="break-all">bookings@thirupathibalajitravels.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-6 md:pt-8 text-xs md:text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Thirupathi Balaji Travels. All rights reserved.</p>
          <div className="mt-3 md:mt-0 space-x-3 md:space-x-4 flex items-center">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
            <span>|</span>
            <Link to="/login" className="hover:text-brand-gold transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
