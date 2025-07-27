import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wdvdhrxeoweosqjypojz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkdmRocnhlb3dlb3Nxanlwb2p6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQwNDgwNSwiZXhwIjoyMDY4OTgwODA1fQ.sCeaYCSLLAwew3J4mP7o6GiLtEt5haAIr4C3vFYSAmE';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Test with just one simple recipe
const testRecipe = {
  id: '550e8400-e29b-41d4-a716-446655440101',
  title: 'Test Pizza',
  description: 'A simple test recipe',
  ingredients: [
    { id: 'ing-1-1', name: 'Pizza dough', quantity: '1', unit: 'ball' },
    { id: 'ing-1-2', name: 'Tomato sauce', quantity: '200', unit: 'ml' }
  ],
  steps: [
    { id: 'step-1-1', description: 'Make the pizza' },
    { id: 'step-1-2', description: 'Bake the pizza' }
  ],
  prep_time: 20,
  cook_time: 10,
  servings: 2,
  difficulty: 'easy',
  tags: ['test', 'pizza'],
  image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
  author_id: null,
  created_at: '2023-01-10T15:30:00Z',
  updated_at: '2023-01-10T15:30:00Z',
  version: 1
};

async function testSingleRecipe() {
  try {
    console.log('🧪 Testing single recipe import...');
    
    const { data, error } = await supabase
      .from('recipes')
      .upsert(testRecipe)
      .select();
    
    if (error) {
      console.error('❌ Error importing test recipe:', error);
    } else {
      console.log('✅ Successfully imported test recipe!');
      console.log('📊 Data:', data);
    }
    
  } catch (error) {
    console.error('❌ Error during test:', error);
  }
}

testSingleRecipe(); 