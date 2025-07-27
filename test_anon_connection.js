import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Testing with anon key...');
console.log('URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('Anon Key:', supabaseAnonKey ? 'Set' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAnonConnection() {
  try {
    console.log('🔍 Testing Supabase anon connection...');
    
    // Try to fetch recipes
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('❌ Anon connection failed:', error);
    } else {
      console.log('✅ Anon connection successful!');
      console.log('📊 Found', data?.length || 0, 'recipes in database');
      if (data && data.length > 0) {
        console.log('First recipe:', data[0].title);
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing anon connection:', error);
  }
}

testAnonConnection(); 