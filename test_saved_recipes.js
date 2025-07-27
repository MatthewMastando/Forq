import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSavedRecipes() {
  try {
    console.log('🧪 Testing saved recipes functionality...');
    
    // 1. Check if saved_recipes table exists and has data
    console.log('\n1. Checking saved_recipes table...');
    const { data: savedRecipes, error: savedError } = await supabase
      .from('saved_recipes')
      .select('*')
      .limit(5);
    
    if (savedError) {
      console.error('❌ Error fetching saved recipes:', savedError);
    } else {
      console.log('✅ Saved recipes found:', savedRecipes?.length || 0);
      console.log('Sample saved recipe:', savedRecipes?.[0]);
    }
    
    // 2. Check if we can fetch recipes with their saved status
    console.log('\n2. Testing saved recipes with recipe data...');
    const { data: savedWithRecipes, error: joinError } = await supabase
      .from('saved_recipes')
      .select(`
        *,
        recipe:recipes(*)
      `)
      .limit(3);
    
    if (joinError) {
      console.error('❌ Error fetching saved recipes with recipe data:', joinError);
    } else {
      console.log('✅ Saved recipes with recipe data found:', savedWithRecipes?.length || 0);
      if (savedWithRecipes && savedWithRecipes.length > 0) {
        console.log('Sample saved recipe with data:', savedWithRecipes[0]);
      }
    }
    
    // 3. Check if we can insert a new saved recipe with proper UUID
    console.log('\n3. Testing save recipe functionality...');
    const testUserId = '550e8400-e29b-41d4-a716-446655440000'; // Proper UUID format
    const testRecipeId = '550e8400-e29b-41d4-a716-446655440101'; // Test Pizza recipe
    
    const { data: insertData, error: insertError } = await supabase
      .from('saved_recipes')
      .insert([{
        user_id: testUserId,
        recipe_id: testRecipeId,
      }])
      .select();
    
    if (insertError) {
      console.error('❌ Error inserting saved recipe:', insertError);
    } else {
      console.log('✅ Successfully inserted saved recipe:', insertData);
    }
    
    // 4. Check if we can fetch saved recipes for a specific user
    console.log('\n4. Testing get saved recipes for user...');
    const { data: userSavedRecipes, error: userError } = await supabase
      .from('saved_recipes')
      .select(`
        *,
        recipe:recipes(*)
      `)
      .eq('user_id', testUserId);
    
    if (userError) {
      console.error('❌ Error fetching user saved recipes:', userError);
    } else {
      console.log('✅ User saved recipes found:', userSavedRecipes?.length || 0);
      console.log('User saved recipes:', userSavedRecipes);
    }
    
  } catch (error) {
    console.error('❌ Error during saved recipes test:', error);
  }
}

testSavedRecipes(); 