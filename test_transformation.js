import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock the transformRecipe function from recipeService
function transformRecipe(dbRecipe) {
  return {
    id: dbRecipe.id,
    title: dbRecipe.title,
    description: dbRecipe.description,
    ingredients: dbRecipe.ingredients,
    steps: dbRecipe.steps,
    prepTime: dbRecipe.prep_time,
    cookTime: dbRecipe.cook_time,
    servings: dbRecipe.servings,
    difficulty: dbRecipe.difficulty,
    tags: dbRecipe.tags,
    image: dbRecipe.image,
    authorId: dbRecipe.author_id,
    createdAt: dbRecipe.created_at,
    updatedAt: dbRecipe.updated_at,
    originalId: dbRecipe.original_id,
    version: dbRecipe.version
  };
}

async function testTransformation() {
  try {
    console.log('🧪 Testing data transformation...');
    
    // Fetch raw data from Supabase
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .limit(2);
    
    if (error) {
      console.error('❌ Error fetching data:', error);
      return;
    }
    
    console.log('📊 Raw data from Supabase:');
    console.log('First recipe raw:', data[0]);
    
    // Transform the data
    const transformedRecipes = data.map(recipe => transformRecipe(recipe));
    
    console.log('🔄 Transformed data:');
    console.log('First recipe transformed:', transformedRecipes[0]);
    
    // Check if required fields exist
    const firstRecipe = transformedRecipes[0];
    console.log('✅ Field check:');
    console.log('- title:', !!firstRecipe.title);
    console.log('- prepTime:', !!firstRecipe.prepTime);
    console.log('- cookTime:', !!firstRecipe.cookTime);
    console.log('- authorId:', !!firstRecipe.authorId);
    console.log('- createdAt:', !!firstRecipe.createdAt);
    
  } catch (error) {
    console.error('❌ Error during transformation test:', error);
  }
}

testTransformation(); 