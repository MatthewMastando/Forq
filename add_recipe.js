import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example recipe - modify this with your recipe details
const newRecipe = {
  title: 'Spaghetti Carbonara',
  description: 'A classic Italian pasta dish with eggs, cheese, and pancetta',
  ingredients: [
    { id: 'ing-1', name: 'Spaghetti', quantity: '400', unit: 'g' },
    { id: 'ing-2', name: 'Pancetta or guanciale', quantity: '150', unit: 'g' },
    { id: 'ing-3', name: 'Eggs', quantity: '4', unit: 'large' },
    { id: 'ing-4', name: 'Parmesan cheese', quantity: '100', unit: 'g' },
    { id: 'ing-5', name: 'Black pepper', quantity: '1', unit: 'tsp' },
    { id: 'ing-6', name: 'Salt', quantity: '', unit: 'to taste' }
  ],
  steps: [
    { id: 'step-1', description: 'Bring a large pot of salted water to boil and cook spaghetti according to package directions.' },
    { id: 'step-2', description: 'Meanwhile, cut pancetta into small cubes and cook in a large skillet until crispy.' },
    { id: 'step-3', description: 'In a bowl, whisk together eggs, grated parmesan, and black pepper.' },
    { id: 'step-4', description: 'When pasta is done, drain it quickly, reserving 1 cup of pasta water.' },
    { id: 'step-5', description: 'Add hot pasta to the skillet with pancetta, remove from heat.' },
    { id: 'step-6', description: 'Quickly stir in the egg mixture, adding pasta water as needed to create a creamy sauce.' },
    { id: 'step-7', description: 'Serve immediately with extra parmesan and black pepper.' }
  ],
  prep_time: 10,
  cook_time: 15,
  servings: 4,
  difficulty: 'medium',
  tags: ['italian', 'pasta', 'dinner', 'quick'],
  image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5',
  author_id: null, // Set to null for now, or add a user ID if you have one
  version: 1
};

async function addRecipe() {
  try {
    console.log('🍝 Adding new recipe to database...');
    
    const { data, error } = await supabase
      .from('recipes')
      .insert([newRecipe])
      .select();
    
    if (error) {
      console.error('❌ Error adding recipe:', error);
    } else {
      console.log('✅ Successfully added recipe!');
      console.log('📋 Recipe details:', data[0]);
    }
    
  } catch (error) {
    console.error('❌ Error during recipe addition:', error);
  }
}

addRecipe(); 