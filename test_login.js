import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLogin() {
  console.log('Testing login with existing user...');
  
  try {
    // Try to sign in with the existing user from the profiles table
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'matthew.mastando@gmail.com',
      password: 'testpassword123' // You'll need to use the actual password
    });
    
    if (error) {
      console.error('❌ Login error:', error);
      return;
    }
    
    console.log('✅ Login successful');
    console.log('User ID:', data.user?.id);
    console.log('Session:', data.session ? 'Active' : 'No session');
    
    // Test fetching user profile
    if (data.user) {
      console.log('\nTesting profile fetch...');
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) {
        console.error('❌ Profile fetch error:', profileError);
      } else {
        console.log('✅ Profile fetched successfully');
        console.log('Profile:', profile);
      }
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testLogin(); 