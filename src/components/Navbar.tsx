import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center mr-2 sm:mr-4 lg:mr-8 flex-shrink-0">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-brand-gold leading-tight sm:whitespace-nowrap tracking-tight">
                Thirupathi Balaji<span className="hidden sm:inline"> Travels</span>
                <span className="sm:hidden block text-xs">Travels</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-gold whitespace-nowrap ${
                  isActive(link.path) ? 'text-brand-gold' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Only show Admin controls if logged in. No public Sign In button. */}
            {user && (
              <div className="flex items-center space-x-4 ml-2 border-l border-slate-700 pl-4">
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 -mr-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-brand-gold bg-slate-700'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {user && (
              <>
                <div className="border-t border-slate-700 my-2 pt-2"></div>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-brand-gold hover:bg-slate-700 flex items-center"
                >
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  Admin Panel
                </Link>
                <button
                  onClick={() => { signOut(); setIsOpen(false); }}
                  className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-slate-700 flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
