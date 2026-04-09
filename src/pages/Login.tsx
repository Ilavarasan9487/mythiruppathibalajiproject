import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Lock } from 'lucide-react';

export default function Login() {
  // Pre-filled credentials for development convenience
  const [email, setEmail] = useState('ilavarasan4909@gmail.com');
  const [password, setPassword] = useState('Qwertyuiop@2003');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  // If already logged in, redirect to admin
  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      // 1. First, attempt to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      
      if (signInError) {
        // 2. If sign in fails (likely because user doesn't exist), attempt to sign up automatically
        if (signInError.message.includes('Invalid login credentials')) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ 
            email, 
            password 
          });

          if (signUpError) {
            throw signUpError;
          }

          // If Supabase requires email confirmation by default
          if (signUpData.user && !signUpData.session) {
            setSuccessMsg('Account created successfully! Please check your email inbox to verify your account before logging in.');
            setLoading(false);
            return;
          }
        } else {
          throw signInError;
        }
      }
      
      // If successful (either sign in worked, or sign up auto-logged in)
      navigate('/admin');
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || 'Invalid admin credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center">
          <div className="bg-brand-blue/10 p-4 rounded-full mb-4">
            <Lock className="w-8 h-8 text-brand-blue" />
          </div>
          <h2 className="text-center text-3xl font-serif font-bold text-brand-blue">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Secure login for authorized personnel only.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm text-center font-medium">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 border border-green-100 text-green-700 p-4 rounded-xl text-sm text-center font-medium">
              {successMsg}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent sm:text-sm transition-all"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent sm:text-sm transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-brand-blue hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors shadow-md disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Secure Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
