import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
// Ensure the URL is a valid HTTP/HTTPS string, otherwise use placeholder to prevent crashes
const supabaseUrl = (envUrl && envUrl.startsWith('http')) 
  ? envUrl 
  : 'https://placeholder.supabase.co';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if we are using real credentials
export const isSupabaseConfigured = 
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_URL !== 'YOUR_API_KEY' &&
  import.meta.env.VITE_SUPABASE_URL.startsWith('http');
