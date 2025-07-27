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

async function testAuthConnection() {
  console.log('Testing Supabase auth connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Auth connection error:', error);
      return;
    }
    
    console.log('✅ Auth connection successful');
    console.log('Current session:', data.session ? 'User logged in' : 'No session');
    
    // Test profiles table access
    console.log('\nTesting profiles table access...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (profilesError) {
      console.error('❌ Profiles table error:', profilesError);
    } else {
      console.log('✅ Profiles table accessible');
      console.log('Sample profile:', profiles[0] || 'No profiles found');
    }
    
    // Test saved_recipes table access
    console.log('\nTesting saved_recipes table access...');
    const { data: savedRecipes, error: savedRecipesError } = await supabase
      .from('saved_recipes')
      .select('*')
      .limit(1);
    
    if (savedRecipesError) {
      console.error('❌ Saved recipes table error:', savedRecipesError);
    } else {
      console.log('✅ Saved recipes table accessible');
      console.log('Sample saved recipe:', savedRecipes[0] || 'No saved recipes found');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testAuthConnection(); 