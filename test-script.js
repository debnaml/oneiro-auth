// Test Supabase connection
// Run this in browser console on https://oneiro-auth.vercel.app/

// Test 1: Check if Supabase client is initialized
console.log('🧪 Testing Supabase Connection...');

// Test 2: Check environment variables are loaded
console.log('Environment Variables:');
console.log('SUPABASE_URL:', process?.env?.NEXT_PUBLIC_SUPABASE_URL ? '✅ Loaded' : '❌ Missing');

// Test 3: Try to get session (should be null for new user)
import { supabase } from './lib/supabase.js';
const { data: session } = await supabase.auth.getSession();
console.log('Current session:', session?.session ? '✅ User logged in' : '✅ No active session (expected)');

// Test 4: Check if auth methods are available
console.log('Auth methods available:', typeof supabase.auth.signUp === 'function' ? '✅ Ready' : '❌ Error');

console.log('🎉 Basic tests complete!');