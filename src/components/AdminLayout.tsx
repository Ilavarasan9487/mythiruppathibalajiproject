import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, Car, Map, Package, 
  CalendarCheck, Settings, LogOut, Menu, X, ShieldAlert
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  // Protect the route: If not loading and no user is found, redirect to login
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Vehicles', path: '/admin/vehicles', icon: Car },
    { name: 'Destinations', path: '/admin/destinations', icon: Map },
    { name: 'Tour Packages', path: '/admin/packages', icon: Package },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  // Show a loading screen while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-brand-blue text-white transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-slate-700">
          <span className="font-serif text-xl font-bold text-brand-gold tracking-tight">
            Admin Panel
          </span>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-xl transition-colors font-medium
                ${isActive 
                  ? 'bg-brand-gold text-brand-blue' 
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center px-4 py-3 text-sm text-gray-300 mb-2">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center mr-3 font-bold text-brand-gold">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="truncate">
              <p className="font-medium text-white truncate">{user?.email || 'Admin User'}</p>
              <p className="text-xs text-brand-gold">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-xl transition-colors font-medium"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold text-brand-blue hidden sm:block">Thirupathi Balaji Travels CMS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" target="_blank" className="text-sm font-medium text-brand-blue hover:text-brand-gold transition-colors flex items-center">
                View Website
              </a>
            </div>
          </div>
        </header>

        {/* Demo Mode Warning */}
        {!isSupabaseConfigured && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center text-yellow-800 text-sm">
            <ShieldAlert className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
            <p><strong>Demo Mode Active:</strong> Supabase is not connected. Changes made here will only reflect locally during this session.</p>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
