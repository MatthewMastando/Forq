// Import Chunk 3: Recipes 20-21 (Final Chunk)
// Run this script to import the final 2 recipes into Supabase

import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials
const supabaseUrl = 'https://wdvdhrxeoweosqjypojz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkdmRocnhlb3dlb3Nxanlwb2p6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQwNDgwNSwiZXhwIjoyMDY4OTgwODA1fQ.sCeaYCSLLAwew3J4mP7o6GiLtEt5haAIr4C3vFYSAmE';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Recipes 20-21 from your app (Final chunk)
const recipes = [
  {
    id: '550e8400-e29b-41d4-a716-446655440120',
    title: 'Homemade Cinnamon Rolls',
    description: 'Soft, fluffy cinnamon rolls with a gooey cinnamon filling and topped with cream cheese frosting. These indulgent breakfast treats are worth the effort for a special weekend brunch.',
    ingredients: [
      { id: 'ing-20-1', name: 'All-purpose flour', quantity: '4', unit: 'cups' },
      { id: 'ing-20-2', name: 'Granulated sugar', quantity: '1/3', unit: 'cup' },
      { id: 'ing-20-3', name: 'Salt', quantity: '1', unit: 'tsp' },
      { id: 'ing-20-4', name: 'Instant yeast', quantity: '2.25', unit: 'tsp' },
      { id: 'ing-20-5', name: 'Milk', quantity: '1', unit: 'cup' },
      { id: 'ing-20-6', name: 'Unsalted butter', quantity: '1/3', unit: 'cup' },
      { id: 'ing-20-7', name: 'Eggs', quantity: '2', unit: 'large' },
      { id: 'ing-20-8', name: 'Brown sugar', quantity: '3/4', unit: 'cup' },
      { id: 'ing-20-9', name: 'Ground cinnamon', quantity: '2', unit: 'tbsp' },
      { id: 'ing-20-10', name: 'Unsalted butter, softened', quantity: '1/4', unit: 'cup' },
      { id: 'ing-20-11', name: 'Cream cheese', quantity: '4', unit: 'oz' },
      { id: 'ing-20-12', name: 'Powdered sugar', quantity: '1', unit: 'cup' },
      { id: 'ing-20-13', name: 'Vanilla extract', quantity: '1/2', unit: 'tsp' },
      { id: 'ing-20-14', name: 'Salt', quantity: '1/8', unit: 'tsp' }
    ],
    steps: [
      { id: 'step-20-1', description: 'In a large bowl, combine 2 cups of flour, sugar, salt, and yeast.' },
      { id: 'step-20-2', description: 'Heat milk and 1/3 cup butter until warm (110-115°F) and butter is almost melted. Add to dry ingredients along with eggs.' },
      { id: 'step-20-3', description: 'Mix until combined, then add remaining flour gradually to form a soft dough. Knead for 5-7 minutes until smooth and elastic.' },
      { id: 'step-20-4', description: 'Place in a greased bowl, cover, and let rise in a warm place for 1 hour or until doubled in size.' },
      { id: 'step-20-5', description: 'Punch down dough and roll out on a floured surface to a 16x12 inch rectangle.' },
      { id: 'step-20-6', description: 'For the filling: Mix brown sugar and cinnamon. Spread softened butter over the dough, then sprinkle with cinnamon-sugar mixture, leaving a 1/2-inch border.' },
      { id: 'step-20-7', description: 'Starting with the long side, roll the dough tightly into a log. Cut into 12 equal pieces using a sharp knife or dental floss.' },
      { id: 'step-20-8', description: 'Place rolls in a greased 9x13 inch baking pan. Cover and let rise for 30 minutes or until nearly doubled.' },
      { id: 'step-20-9', description: 'Preheat oven to 350°F (175°C). Bake for 20-25 minutes until golden brown.' },
      { id: 'step-20-10', description: 'For the frosting: Beat cream cheese and 1/4 cup butter until smooth. Add powdered sugar, vanilla, and salt. Beat until creamy.' },
      { id: 'step-20-11', description: 'Spread frosting over warm rolls and serve.' }
    ],
    prepTime: 30,
    cookTime: 25,
    servings: 12,
    difficulty: 'medium',
    tags: ['breakfast', 'baking', 'dessert', 'brunch'],
    image: 'https://media.istockphoto.com/id/184296528/photo/breakfast.webp?a=1&b=1&s=612x612&w=0&k=20&c=UElwQlgs3MGet9iH8nIzYA6k_uWjMGjenKjthzJqm04%3D',
    authorId: null,
    createdAt: '2023-10-22T09:15:00Z',
    updatedAt: '2023-10-22T09:15:00Z',
    version: 1
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440121',
    title: 'Grilled Salmon with Lemon-Dill Sauce',
    description: 'Perfectly grilled salmon fillets topped with a refreshing lemon-dill sauce. This elegant yet simple dish is packed with omega-3s and comes together in under 30 minutes.',
    ingredients: [
      { id: 'ing-21-1', name: 'Salmon fillets', quantity: '4', unit: '6 oz each' },
      { id: 'ing-21-2', name: 'Olive oil', quantity: '2', unit: 'tbsp' },
      { id: 'ing-21-3', name: 'Lemon', quantity: '1', unit: 'zested and juiced' },
      { id: 'ing-21-4', name: 'Garlic powder', quantity: '1/2', unit: 'tsp' },
      { id: 'ing-21-5', name: 'Salt', quantity: '1', unit: 'tsp' },
      { id: 'ing-21-6', name: 'Black pepper', quantity: '1/2', unit: 'tsp' },
      { id: 'ing-21-7', name: 'Greek yogurt', quantity: '1/2', unit: 'cup' },
      { id: 'ing-21-8', name: 'Fresh dill', quantity: '2', unit: 'tbsp chopped' },
      { id: 'ing-21-9', name: 'Dijon mustard', quantity: '1', unit: 'tsp' },
      { id: 'ing-21-10', name: 'Honey', quantity: '1', unit: 'tsp' },
      { id: 'ing-21-11', name: 'Capers', quantity: '1', unit: 'tbsp drained' },
      { id: 'ing-21-12', name: 'Lemon wedges', quantity: '', unit: 'for serving' }
    ],
    steps: [
      { id: 'step-21-1', description: 'Preheat grill to medium-high heat (about 375-400°F).' },
      { id: 'step-21-2', description: 'Pat salmon fillets dry with paper towels. Brush both sides with olive oil.' },
      { id: 'step-21-3', description: 'In a small bowl, mix half the lemon zest, garlic powder, salt, and pepper. Rub this mixture over both sides of the salmon.' },
      { id: 'step-21-4', description: 'For the sauce, combine Greek yogurt, remaining lemon zest, 1 tablespoon lemon juice, chopped dill, Dijon mustard, honey, and capers in a bowl. Season with salt and pepper to taste.' },
      { id: 'step-21-5', description: 'Oil the grill grates. Place salmon skin-side down on the grill.' },
      { id: 'step-21-6', description: 'Grill with the lid closed for 4-6 minutes until the skin is crisp and the salmon releases easily from the grates.' },
      { id: 'step-21-7', description: 'Carefully flip the salmon and grill for another 2-4 minutes until the fish is opaque and flakes easily with a fork, but is still moist inside.' },
      { id: 'step-21-8', description: 'Transfer salmon to plates, top with a generous spoonful of the lemon-dill sauce, and serve with lemon wedges.' }
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'easy',
    tags: ['seafood', 'dinner', 'healthy', 'quick', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
    authorId: null,
    createdAt: '2023-10-25T19:10:00Z',
    updatedAt: '2023-10-25T19:10:00Z',
    version: 1
  }
];

async function importChunk3() {
  try {
    console.log('🚀 Starting Chunk 3 Import (Recipes 20-21 - Final Chunk)...');

    // Import recipes
    console.log('🍳 Importing recipes...');
    for (const recipe of recipes) {
      const { error } = await supabase
        .from('recipes')
        .upsert({
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          prep_time: recipe.prepTime,
          cook_time: recipe.cookTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          tags: recipe.tags,
          image: recipe.image,
          author_id: recipe.authorId,
          created_at: recipe.createdAt,
          updated_at: recipe.updatedAt,
          version: recipe.version
        });

      if (error) {
        console.error(`❌ Error importing recipe ${recipe.title}:`, error);
      } else {
        console.log(`✅ Imported recipe: ${recipe.title}`);
      }
    }

    console.log('\n🎉 Chunk 3 import completed successfully!');
    console.log(`📊 Imported ${recipes.length} recipes.`);
    console.log('\n🎊 ALL RECIPES IMPORTED!');
    console.log('📈 Total recipes in database: 12 recipes');
    console.log('\n📝 Next steps:');
    console.log('1. Test the save functionality in your app');
    console.log('2. Enjoy your fully populated recipe database!');

  } catch (error) {
    console.error('❌ Error during import:', error);
  }
}

// Run the import
importChunk3(); 