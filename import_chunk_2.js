// Import Chunk 2: Recipes 15-19
// Run this script to import the next 5 recipes into Supabase

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

// Recipes 15-19 from your app
const recipes = [
  {
    id: '550e8400-e29b-41d4-a716-446655440115',
    title: 'Korean Bibimbap',
    description: 'A colorful and nutritious Korean rice bowl topped with an array of seasoned vegetables, marinated beef, a fried egg, and spicy gochujang sauce. Mix it all together for a perfect balance of flavors and textures.',
    ingredients: [
      { id: 'ing-15-1', name: 'Short-grain rice', quantity: '2', unit: 'cups' },
      { id: 'ing-15-2', name: 'Beef sirloin', quantity: '200', unit: 'g' },
      { id: 'ing-15-3', name: 'Soy sauce', quantity: '3', unit: 'tbsp' },
      { id: 'ing-15-4', name: 'Sesame oil', quantity: '2', unit: 'tbsp' },
      { id: 'ing-15-5', name: 'Brown sugar', quantity: '1', unit: 'tbsp' },
      { id: 'ing-15-6', name: 'Garlic', quantity: '3', unit: 'cloves' },
      { id: 'ing-15-7', name: 'Spinach', quantity: '200', unit: 'g' },
      { id: 'ing-15-8', name: 'Bean sprouts', quantity: '200', unit: 'g' },
      { id: 'ing-15-9', name: 'Carrots', quantity: '2', unit: 'medium' },
      { id: 'ing-15-10', name: 'Zucchini', quantity: '1', unit: 'medium' },
      { id: 'ing-15-11', name: 'Shiitake mushrooms', quantity: '100', unit: 'g' },
      { id: 'ing-15-12', name: 'Eggs', quantity: '4', unit: '' },
      { id: 'ing-15-13', name: 'Gochujang sauce', quantity: '2', unit: 'tbsp' }
    ],
    steps: [
      { id: 'step-15-1', description: 'Cook rice according to package instructions and set aside.' },
      { id: 'step-15-2', description: 'Slice beef thinly and marinate with soy sauce, 1 tbsp sesame oil, brown sugar, and minced garlic for at least 30 minutes.' },
      { id: 'step-15-3', description: 'Prepare vegetables: blanch spinach and bean sprouts separately, julienne carrots and zucchini, and sauté mushrooms.' },
      { id: 'step-15-4', description: 'Season each vegetable with a little salt, garlic, and sesame oil.' },
      { id: 'step-15-5', description: 'Heat a pan and cook the marinated beef until browned and cooked through.' },
      { id: 'step-15-6', description: 'Fry eggs sunny-side up, keeping the yolks runny.' },
      { id: 'step-15-7', description: 'Assemble bibimbap: place rice in a bowl, arrange vegetables and beef on top, and crown with a fried egg.' },
      { id: 'step-15-8', description: 'Serve with gochujang sauce on the side or drizzled on top. Mix everything together before eating.' }
    ],
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    difficulty: 'medium',
    tags: ['korean', 'rice bowl', 'beef', 'dinner'],
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7',
    authorId: null,
    createdAt: '2023-09-18T16:40:00Z',
    updatedAt: '2023-09-18T16:40:00Z',
    version: 1
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440116',
    title: 'Creamy Mushroom Risotto',
    description: 'A luxurious Italian rice dish cooked to perfection with arborio rice, mushrooms, white wine, and parmesan cheese. This comforting risotto is creamy, rich, and full of umami flavor.',
    ingredients: [
      { id: 'ing-16-1', name: 'Arborio rice', quantity: '1.5', unit: 'cups' },
      { id: 'ing-16-2', name: 'Mixed mushrooms', quantity: '300', unit: 'g' },
      { id: 'ing-16-3', name: 'Shallots', quantity: '2', unit: 'medium' },
      { id: 'ing-16-4', name: 'Garlic', quantity: '3', unit: 'cloves' },
      { id: 'ing-16-5', name: 'Dry white wine', quantity: '1/2', unit: 'cup' },
      { id: 'ing-16-6', name: 'Vegetable broth', quantity: '4', unit: 'cups' },
      { id: 'ing-16-7', name: 'Parmesan cheese', quantity: '1/2', unit: 'cup' },
      { id: 'ing-16-8', name: 'Butter', quantity: '3', unit: 'tbsp' },
      { id: 'ing-16-9', name: 'Olive oil', quantity: '2', unit: 'tbsp' },
      { id: 'ing-16-10', name: 'Fresh thyme', quantity: '2', unit: 'sprigs' },
      { id: 'ing-16-11', name: 'Salt', quantity: '', unit: 'to taste' },
      { id: 'ing-16-12', name: 'Black pepper', quantity: '', unit: 'to taste' },
      { id: 'ing-16-13', name: 'Fresh parsley', quantity: '2', unit: 'tbsp' }
    ],
    steps: [
      { id: 'step-16-1', description: 'In a large saucepan, heat the vegetable broth and keep it warm on low heat.' },
      { id: 'step-16-2', description: 'Clean and slice mushrooms. Finely dice shallots and mince garlic.' },
      { id: 'step-16-3', description: 'In a large, heavy-bottomed pan, heat 1 tbsp butter and olive oil over medium heat. Add mushrooms and thyme, and sauté until mushrooms are golden brown. Remove and set aside.' },
      { id: 'step-16-4', description: 'In the same pan, add the remaining butter. Add shallots and cook until translucent, about 3 minutes. Add garlic and cook for another 30 seconds.' },
      { id: 'step-16-5', description: 'Add the arborio rice and stir to coat in butter, toasting for about 2 minutes until the edges become translucent.' },
      { id: 'step-16-6', description: 'Pour in the white wine and stir until almost completely absorbed.' },
      { id: 'step-16-7', description: 'Begin adding the warm broth one ladle at a time, stirring frequently. Wait until each addition is almost completely absorbed before adding more.' },
      { id: 'step-16-8', description: 'Continue this process for about 18-20 minutes, until the rice is creamy and al dente.' },
      { id: 'step-16-9', description: 'Stir in the sautéed mushrooms, grated Parmesan cheese, and season with salt and pepper to taste.' },
      { id: 'step-16-10', description: 'Remove from heat, cover, and let rest for 2 minutes. Garnish with chopped parsley before serving.' }
    ],
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'medium',
    tags: ['italian', 'rice', 'vegetarian', 'dinner'],
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371',
    authorId: null,
    createdAt: '2023-10-05T14:25:00Z',
    updatedAt: '2023-10-05T14:25:00Z',
    version: 1
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440117',
    title: 'Thai Green Curry',
    description: 'A fragrant and spicy Thai curry with coconut milk, tender chicken, and colorful vegetables. This aromatic dish balances sweet, sour, and spicy flavors for an authentic taste of Thailand.',
    ingredients: [
      { id: 'ing-17-1', name: 'Chicken thighs', quantity: '500', unit: 'g' },
      { id: 'ing-17-2', name: 'Green curry paste', quantity: '3', unit: 'tbsp' },
      { id: 'ing-17-3', name: 'Coconut milk', quantity: '400', unit: 'ml' },
      { id: 'ing-17-4', name: 'Chicken broth', quantity: '200', unit: 'ml' },
      { id: 'ing-17-5', name: 'Fish sauce', quantity: '2', unit: 'tbsp' },
      { id: 'ing-17-6', name: 'Palm sugar', quantity: '1', unit: 'tbsp' },
      { id: 'ing-17-7', name: 'Thai eggplants', quantity: '4', unit: 'small' },
      { id: 'ing-17-8', name: 'Bell pepper', quantity: '1', unit: 'medium' },
      { id: 'ing-17-9', name: 'Bamboo shoots', quantity: '100', unit: 'g' },
      { id: 'ing-17-10', name: 'Thai basil leaves', quantity: '1', unit: 'handful' },
      { id: 'ing-17-11', name: 'Kaffir lime leaves', quantity: '4', unit: '' },
      { id: 'ing-17-12', name: 'Vegetable oil', quantity: '2', unit: 'tbsp' },
      { id: 'ing-17-13', name: 'Thai chilies', quantity: '2', unit: 'optional' }
    ],
    steps: [
      { id: 'step-17-1', description: 'Cut chicken thighs into bite-sized pieces and set aside.' },
      { id: 'step-17-2', description: 'Heat oil in a large pot over medium heat. Add the green curry paste and stir-fry for 1-2 minutes until fragrant.' },
      { id: 'step-17-3', description: 'Add chicken pieces and stir to coat with curry paste. Cook for 3-4 minutes until chicken starts to brown.' },
      { id: 'step-17-4', description: 'Pour in coconut milk and chicken broth. Add kaffir lime leaves and bring to a gentle simmer.' },
      { id: 'step-17-5', description: 'Add fish sauce and palm sugar, then stir to combine.' },
      { id: 'step-17-6', description: 'Add Thai eggplants, bell pepper, and bamboo shoots. Simmer for 10-15 minutes until chicken is cooked through and vegetables are tender.' },
      { id: 'step-17-7', description: 'Taste and adjust seasoning with more fish sauce or palm sugar if needed.' },
      { id: 'step-17-8', description: 'Remove from heat and stir in Thai basil leaves. Add sliced Thai chilies if desired for extra heat.' },
      { id: 'step-17-9', description: 'Serve hot with steamed jasmine rice.' }
    ],
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: 'medium',
    tags: ['thai', 'curry', 'chicken', 'dinner', 'spicy'],
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
    authorId: null,
    createdAt: '2023-10-10T13:20:00Z',
    updatedAt: '2023-10-10T13:20:00Z',
    version: 1
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440118',
    title: 'Classic French Ratatouille',
    description: 'A vibrant Provençal stewed vegetable dish originating from Nice. This rustic French classic transforms simple summer vegetables into a delicious medley of flavors and colors.',
    ingredients: [
      { id: 'ing-18-1', name: 'Eggplant', quantity: '1', unit: 'large' },
      { id: 'ing-18-2', name: 'Zucchini', quantity: '2', unit: 'medium' },
      { id: 'ing-18-3', name: 'Yellow squash', quantity: '1', unit: 'medium' },
      { id: 'ing-18-4', name: 'Bell peppers', quantity: '2', unit: 'assorted colors' },
      { id: 'ing-18-5', name: 'Roma tomatoes', quantity: '6', unit: 'medium' },
      { id: 'ing-18-6', name: 'Yellow onion', quantity: '1', unit: 'large' },
      { id: 'ing-18-7', name: 'Garlic', quantity: '4', unit: 'cloves' },
      { id: 'ing-18-8', name: 'Tomato paste', quantity: '2', unit: 'tbsp' },
      { id: 'ing-18-9', name: 'Fresh thyme', quantity: '4', unit: 'sprigs' },
      { id: 'ing-18-10', name: 'Fresh rosemary', quantity: '1', unit: 'sprig' },
      { id: 'ing-18-11', name: 'Bay leaf', quantity: '1', unit: '' },
      { id: 'ing-18-12', name: 'Olive oil', quantity: '1/4', unit: 'cup' },
      { id: 'ing-18-13', name: 'Fresh basil', quantity: '1/4', unit: 'cup' },
      { id: 'ing-18-14', name: 'Salt and pepper', quantity: '', unit: 'to taste' }
    ],
    steps: [
      { id: 'step-18-1', description: 'Preheat oven to 375°F (190°C). Cut eggplant, zucchini, and yellow squash into 1/4-inch thick rounds.' },
      { id: 'step-18-2', description: 'Slice bell peppers into 1-inch strips, dice onion, and mince garlic. Cut tomatoes into quarters.' },
      { id: 'step-18-3', description: 'Heat 2 tablespoons olive oil in a large oven-safe skillet over medium heat. Add onions and cook until translucent, about 5 minutes.' },
      { id: 'step-18-4', description: 'Add garlic and cook for another minute until fragrant. Stir in tomato paste and cook for 2 minutes.' },
      { id: 'step-18-5', description: 'Add tomatoes, thyme, rosemary, and bay leaf. Season with salt and pepper. Simmer for 10 minutes until slightly thickened.' },
      { id: 'step-18-6', description: 'Remove herb sprigs and bay leaf. Transfer sauce to a bowl, leaving a thin layer in the skillet.' },
      { id: 'step-18-7', description: 'Arrange vegetable slices in alternating patterns over the sauce (eggplant, zucchini, squash, bell pepper, tomato). Drizzle with remaining olive oil and season with salt and pepper.' },
      { id: 'step-18-8', description: 'Cover with parchment paper cut to fit the skillet. Bake for 45 minutes, then remove parchment and bake for another 15-20 minutes until vegetables are tender and slightly caramelized.' },
      { id: 'step-18-9', description: 'Let cool for 10 minutes, then garnish with torn fresh basil leaves before serving.' }
    ],
    prepTime: 30,
    cookTime: 75,
    servings: 6,
    difficulty: 'medium',
    tags: ['french', 'vegetarian', 'vegan', 'dinner', 'healthy'],
    image: 'https://plus.unsplash.com/premium_photo-1713635953474-b74990274152?q=80&w=2384&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    authorId: null,
    createdAt: '2023-10-15T11:45:00Z',
    updatedAt: '2023-10-15T11:45:00Z',
    version: 1
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440119',
    title: 'Homemade Beef Tacos',
    description: 'Delicious and easy beef tacos with seasoned ground beef, fresh toppings, and warm tortillas. These customizable tacos are perfect for a fun family dinner or casual entertaining.',
    ingredients: [
      { id: 'ing-19-1', name: 'Ground beef', quantity: '500', unit: 'g' },
      { id: 'ing-19-2', name: 'Onion', quantity: '1', unit: 'medium' },
      { id: 'ing-19-3', name: 'Garlic', quantity: '2', unit: 'cloves' },
      { id: 'ing-19-4', name: 'Chili powder', quantity: '2', unit: 'tbsp' },
      { id: 'ing-19-5', name: 'Ground cumin', quantity: '1', unit: 'tbsp' },
      { id: 'ing-19-6', name: 'Paprika', quantity: '1', unit: 'tsp' },
      { id: 'ing-19-7', name: 'Dried oregano', quantity: '1', unit: 'tsp' },
      { id: 'ing-19-8', name: 'Salt', quantity: '1', unit: 'tsp' },
      { id: 'ing-19-9', name: 'Black pepper', quantity: '1/2', unit: 'tsp' },
      { id: 'ing-19-10', name: 'Tomato sauce', quantity: '1/2', unit: 'cup' },
      { id: 'ing-19-11', name: 'Corn tortillas', quantity: '12', unit: 'small' },
      { id: 'ing-19-12', name: 'Lettuce', quantity: '2', unit: 'cups shredded' },
      { id: 'ing-19-13', name: 'Tomatoes', quantity: '2', unit: 'diced' },
      { id: 'ing-19-14', name: 'Cheddar cheese', quantity: '1', unit: 'cup shredded' },
      { id: 'ing-19-15', name: 'Sour cream', quantity: '1/2', unit: 'cup' },
      { id: 'ing-19-16', name: 'Avocado', quantity: '1', unit: 'sliced' },
      { id: 'ing-19-17', name: 'Lime', quantity: '1', unit: 'cut into wedges' },
      { id: 'ing-19-18', name: 'Fresh cilantro', quantity: '1/4', unit: 'cup chopped' }
    ],
    steps: [
      { id: 'step-19-1', description: 'Finely dice onion and mince garlic. Heat a large skillet over medium heat.' },
      { id: 'step-19-2', description: 'Add ground beef to the skillet and cook until browned, breaking it up with a spoon, about 5-7 minutes.' },
      { id: 'step-19-3', description: 'Add onion and garlic to the beef and cook for another 2-3 minutes until softened.' },
      { id: 'step-19-4', description: 'Stir in chili powder, cumin, paprika, oregano, salt, and pepper. Cook for 1 minute until fragrant.' },
      { id: 'step-19-5', description: 'Add tomato sauce and 1/4 cup water. Simmer for 5-7 minutes until slightly thickened but still moist.' },
      { id: 'step-19-6', description: 'While the beef is cooking, prepare the toppings: shred lettuce, dice tomatoes, shred cheese, slice avocado, and chop cilantro.' },
      { id: 'step-19-7', description: 'Warm the corn tortillas according to package instructions or directly over a gas flame for 10-15 seconds per side.' },
      { id: 'step-19-8', description: 'To serve, place a spoonful of beef mixture in the center of each tortilla. Let everyone add their preferred toppings.' },
      { id: 'step-19-9', description: 'Serve with lime wedges for squeezing over the tacos.' }
    ],
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'easy',
    tags: ['mexican', 'beef', 'dinner', 'family'],
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    authorId: null,
    createdAt: '2023-10-18T18:30:00Z',
    updatedAt: '2023-10-18T18:30:00Z',
    version: 1
  }
];

async function importChunk2() {
  try {
    console.log('🚀 Starting Chunk 2 Import (Recipes 15-19)...');

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

    console.log('\n🎉 Chunk 2 import completed successfully!');
    console.log(`📊 Imported ${recipes.length} recipes.`);
    console.log('\n📝 Next steps:');
    console.log('1. Test the save functionality in your app');
    console.log('2. Run the next chunk when ready');

  } catch (error) {
    console.error('❌ Error during import:', error);
  }
}

// Run the import
importChunk2(); 