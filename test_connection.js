import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wdvdhrxeoweosqjypojz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkdmRocnhlb3dlb3Nxanlwb2p6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQwNDgwNSwiZXhwIjoyMDY4OTgwODA1fQ.sCeaYCSLLAwew3J4mP7o6GiLtEt5haAIr4C3vFYSAmE';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testConnection() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Try to fetch a single recipe to test the connection
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error);
    } else {
      console.log('✅ Connection successful!');
      console.log('📊 Found', data?.length || 0, 'recipes in database');
    }
    
  } catch (error) {
    console.error('❌ Error testing connection:', error);
  }
}

testConnection(); 