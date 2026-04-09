import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Packages from './pages/Packages';
import Vehicles from './pages/Vehicles';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SearchResults from './pages/SearchResults';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminVehicles from './pages/admin/VehiclesManager';
import AdminDestinations from './pages/admin/DestinationsManager';
import AdminPackages from './pages/admin/PackagesManager';
import AdminBookings from './pages/admin/BookingsManager';
import AdminSettings from './pages/admin/SettingsManager';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="packages" element={<Packages />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="search-results" element={<SearchResults />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="destinations" element={<AdminDestinations />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
