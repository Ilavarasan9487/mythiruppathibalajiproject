import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-brand-blue text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 md:py-0 md:h-20">
          
          {/* Logo Area */}
          <div className="flex justify-between items-center mb-3 md:mb-0 flex-shrink-0">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-brand-gold leading-tight tracking-tight">
                Thirupathi Balaji Travels
              </span>
            </Link>
            
            {/* Admin controls on mobile (if logged in) */}
            {user && (
              <div className="flex md:hidden items-center space-x-4">
                <Link to="/admin" className="text-brand-gold hover:text-yellow-400 transition-colors">
                  <LayoutDashboard className="w-5 h-5" />
                </Link>
                <button onClick={signOut} className="text-gray-400 hover:text-red-400 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links - Scrollable on mobile */}
          <div className="flex items-center justify-between sm:justify-start overflow-x-auto pb-1 md:pb-0 w-full sm:w-auto sm:space-x-5 md:space-x-6 lg:space-x-8 scrollbar-hide">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] min-[375px]:text-xs sm:text-sm font-medium transition-colors hover:text-brand-gold whitespace-nowrap ${
                  isActive(link.path) ? 'text-brand-gold' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Admin controls on desktop (if logged in) */}
            {user && (
              <div className="hidden md:flex items-center space-x-4 pl-4 border-l border-slate-700">
                <Link
                  to="/admin"
                  className="flex items-center text-brand-gold hover:text-yellow-400 transition-colors text-sm font-bold whitespace-nowrap"
                >
                  <LayoutDashboard className="w-4 h-4 mr-1.5" />
                  Admin Panel
                </Link>
                <button
                  onClick={signOut}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hide scrollbar for the horizontal scrolling nav on mobile */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}
