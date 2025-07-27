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

async function testAuthenticatedProfileFetch() {
  console.log('Testing authenticated profile fetch...');
  
  try {
    // First, sign in
    console.log('1. Signing in...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'matthew.mastando@gmail.com',
      password: 'testpassword123' // You'll need to use the actual password
    });
    
    if (signInError) {
      console.error('❌ Sign in error:', signInError);
      return;
    }
    
    console.log('✅ Sign in successful');
    console.log('User ID:', signInData.user?.id);
    
    // Now try to fetch the profile while authenticated
    console.log('\n2. Fetching profile while authenticated...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', signInData.user.id)
      .single();
    
    if (profileError) {
      console.error('❌ Profile fetch error:', profileError);
      console.log('Error details:', {
        message: profileError.message,
        details: profileError.details,
        hint: profileError.hint,
        code: profileError.code
      });
    } else {
      console.log('✅ Profile fetched successfully');
      console.log('Profile:', profile);
    }
    
    // Test saved recipes fetch while authenticated
    console.log('\n3. Fetching saved recipes while authenticated...');
    const { data: savedRecipes, error: savedRecipesError } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('user_id', signInData.user.id);
    
    if (savedRecipesError) {
      console.error('❌ Saved recipes fetch error:', savedRecipesError);
    } else {
      console.log('✅ Saved recipes fetched successfully');
      console.log('Saved recipes count:', savedRecipes.length);
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testAuthenticatedProfileFetch(); 