-- Import Existing Recipes from Forq App to Supabase
-- Run this in your Supabase SQL Editor

-- First, create user profiles for the recipe authors
INSERT INTO profiles (id, username, name, email, bio, avatar, created_at, updated_at)
VALUES 
  ('user-1', 'chef_sarah', 'Sarah Johnson', 'sarah@example.com', 'Professional chef with 10 years of experience', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150', NOW(), NOW()),
  ('user-2', 'baker_mike', 'Mike Chen', 'mike@example.com', 'Home baker and food enthusiast', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', NOW(), NOW()),
  ('user-3', 'vegan_anna', 'Anna Rodriguez', 'anna@example.com', 'Plant-based cooking expert', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', NOW(), NOW()),
  ('user-4', 'curry_chef', 'Raj Patel', 'raj@example.com', 'Indian cuisine specialist', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', NOW(), NOW()),
  ('user-5', 'dessert_master', 'Emma Wilson', 'emma@example.com', 'Pastry chef and dessert creator', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Import Recipe 1: Classic Margherita Pizza
INSERT INTO recipes (id, title, description, ingredients, steps, prep_time, cook_time, servings, difficulty, tags, image, author_id, created_at, updated_at, version)
VALUES (
  'recipe-1',
  'Classic Margherita Pizza',
  'A traditional Italian pizza with simple, fresh ingredients. The perfect balance of tomato, mozzarella, and basil.',
  '[
    {"id": "ing-1-1", "name": "Pizza dough", "quantity": "1", "unit": "ball"},
    {"id": "ing-1-2", "name": "San Marzano tomatoes", "quantity": "400", "unit": "g"},
    {"id": "ing-1-3", "name": "Fresh mozzarella", "quantity": "200", "unit": "g"},
    {"id": "ing-1-4", "name": "Fresh basil leaves", "quantity": "10", "unit": "leaves"},
    {"id": "ing-1-5", "name": "Extra virgin olive oil", "quantity": "2", "unit": "tbsp"},
    {"id": "ing-1-6", "name": "Salt", "quantity": "1", "unit": "tsp"}
  ]',
  '[
    {"id": "step-1-1", "description": "Preheat your oven to the highest temperature (usually 500-550°F/260-290°C) with a pizza stone or steel inside."},
    {"id": "step-1-2", "description": "Crush the tomatoes by hand and mix with 1 tbsp olive oil and salt."},
    {"id": "step-1-3", "description": "Stretch the pizza dough into a 12-inch circle on a floured pizza peel."},
    {"id": "step-1-4", "description": "Spread the tomato sauce evenly over the dough, leaving a 1-inch border for the crust."},
    {"id": "step-1-5", "description": "Tear the mozzarella into pieces and distribute evenly over the sauce."},
    {"id": "step-1-6", "description": "Slide the pizza onto the preheated stone and bake for 8-10 minutes until the crust is golden and the cheese is bubbly."},
    {"id": "step-1-7", "description": "Remove from the oven, top with fresh basil leaves and a drizzle of remaining olive oil."}
  ]',
  20, 10, 2, 'medium', '["italian", "pizza", "vegetarian", "dinner"]',
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
  'user-1', NOW(), NOW(), 1
);

-- Import Recipe 2: Sourdough Bread
INSERT INTO recipes (id, title, description, ingredients, steps, prep_time, cook_time, servings, difficulty, tags, image, author_id, created_at, updated_at, version)
VALUES (
  'recipe-2',
  'Sourdough Bread',
  'A rustic sourdough bread with a crispy crust and tender, airy crumb. Perfect for sandwiches or simply enjoyed with butter.',
  '[
    {"id": "ing-2-1", "name": "Active sourdough starter", "quantity": "100", "unit": "g"},
    {"id": "ing-2-2", "name": "Bread flour", "quantity": "400", "unit": "g"},
    {"id": "ing-2-3", "name": "Whole wheat flour", "quantity": "100", "unit": "g"},
    {"id": "ing-2-4", "name": "Water", "quantity": "350", "unit": "ml"},
    {"id": "ing-2-5", "name": "Salt", "quantity": "10", "unit": "g"}
  ]',
  '[
    {"id": "step-2-1", "description": "Mix the sourdough starter with water in a large bowl."},
    {"id": "step-2-2", "description": "Add both flours and mix until no dry flour remains. Let rest for 30 minutes (autolyse)."},
    {"id": "step-2-3", "description": "Add salt and incorporate by pinching and folding the dough."},
    {"id": "step-2-4", "description": "Perform 4-6 stretch and folds over the next 2-3 hours, allowing 30 minutes between each fold."},
    {"id": "step-2-5", "description": "Shape the dough into a boule and place in a floured banneton basket."},
    {"id": "step-2-6", "description": "Cover and refrigerate overnight (8-12 hours) for slow fermentation."},
    {"id": "step-2-7", "description": "Preheat oven to 500°F (260°C) with a Dutch oven inside."},
    {"id": "step-2-8", "description": "Turn the dough out onto parchment paper, score the top, and transfer to the hot Dutch oven."},
    {"id": "step-2-9", "description": "Bake covered for 20 minutes, then uncovered for 20-25 minutes more until deep golden brown."},
    {"id": "step-2-10", "description": "Cool completely on a wire rack before slicing."}
  ]',
  180, 45, 8, 'hard', '["bread", "sourdough", "baking"]',
  'https://images.unsplash.com/photo-1597604391235-a7429b4b350c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'user-2', NOW(), NOW(), 1
);

-- Import Recipe 3: Vegan Buddha Bowl
INSERT INTO recipes (id, title, description, ingredients, steps, prep_time, cook_time, servings, difficulty, tags, image, author_id, created_at, updated_at, version)
VALUES (
  'recipe-3',
  'Vegan Buddha Bowl',
  'A nourishing bowl packed with colorful vegetables, protein-rich quinoa, and a creamy tahini dressing. Perfect for a balanced meal.',
  '[
    {"id": "ing-3-1", "name": "Quinoa", "quantity": "100", "unit": "g"},
    {"id": "ing-3-2", "name": "Sweet potato", "quantity": "1", "unit": "medium"},
    {"id": "ing-3-3", "name": "Chickpeas", "quantity": "400", "unit": "g"},
    {"id": "ing-3-4", "name": "Kale", "quantity": "2", "unit": "cups"},
    {"id": "ing-3-5", "name": "Avocado", "quantity": "1", "unit": "medium"},
    {"id": "ing-3-6", "name": "Tahini", "quantity": "2", "unit": "tbsp"},
    {"id": "ing-3-7", "name": "Lemon juice", "quantity": "1", "unit": "tbsp"},
    {"id": "ing-3-8", "name": "Maple syrup", "quantity": "1", "unit": "tsp"},
    {"id": "ing-3-9", "name": "Cumin", "quantity": "1", "unit": "tsp"},
    {"id": "ing-3-10", "name": "Paprika", "quantity": "1", "unit": "tsp"},
    {"id": "ing-3-11", "name": "Olive oil", "quantity": "2", "unit": "tbsp"},
    {"id": "ing-3-12", "name": "Salt and pepper", "quantity": "", "unit": "to taste"}
  ]',
  '[
    {"id": "step-3-1", "description": "Preheat oven to 400°F (200°C)."},
    {"id": "step-3-2", "description": "Cook quinoa according to package instructions (usually 1 part quinoa to 2 parts water)."},
    {"id": "step-3-3", "description": "Peel and cube sweet potato. Toss with 1 tbsp olive oil, cumin, and paprika."},
    {"id": "step-3-4", "description": "Drain and rinse chickpeas, pat dry, then toss with remaining olive oil and spices."},
    {"id": "step-3-5", "description": "Spread sweet potatoes and chickpeas on a baking sheet and roast for 25-30 minutes, turning halfway."},
    {"id": "step-3-6", "description": "Wash and chop kale, massage with a bit of olive oil and salt until softened."},
    {"id": "step-3-7", "description": "Make the dressing by whisking together tahini, lemon juice, maple syrup, and 2-3 tbsp water until smooth."},
    {"id": "step-3-8", "description": "Assemble bowls with quinoa as the base, arranged sections of roasted vegetables, chickpeas, and kale."},
    {"id": "step-3-9", "description": "Slice avocado and add to the bowl, then drizzle with tahini dressing."}
  ]',
  15, 30, 2, 'easy', '["vegan", "healthy", "bowl", "dinner"]',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
  'user-3', NOW(), NOW(), 1
);

-- Import Recipe 4: Butter Chicken
INSERT INTO recipes (id, title, description, ingredients, steps, prep_time, cook_time, servings, difficulty, tags, image, author_id, created_at, updated_at, version)
VALUES (
  'recipe-4',
  'Butter Chicken (Murgh Makhani)',
  'A rich and creamy North Indian curry with tender chicken pieces in a tomato-based sauce. A beloved classic that''s perfect with naan or rice.',
  '[
    {"id": "ing-4-1", "name": "Chicken thighs", "quantity": "700", "unit": "g"},
    {"id": "ing-4-2", "name": "Yogurt", "quantity": "100", "unit": "g"},
    {"id": "ing-4-3", "name": "Lemon juice", "quantity": "1", "unit": "tbsp"},
    {"id": "ing-4-4", "name": "Garam masala", "quantity": "2", "unit": "tsp"},
    {"id": "ing-4-5", "name": "Ground turmeric", "quantity": "1", "unit": "tsp"},
    {"id": "ing-4-6", "name": "Ground cumin", "quantity": "1", "unit": "tsp"},
    {"id": "ing-4-7", "name": "Chili powder", "quantity": "1", "unit": "tsp"},
    {"id": "ing-4-8", "name": "Butter", "quantity": "50", "unit": "g"},
    {"id": "ing-4-9", "name": "Onion", "quantity": "1", "unit": "large"},
    {"id": "ing-4-10", "name": "Garlic", "quantity": "4", "unit": "cloves"},
    {"id": "ing-4-11", "name": "Ginger", "quantity": "2", "unit": "cm piece"},
    {"id": "ing-4-12", "name": "Tomato puree", "quantity": "400", "unit": "g"},
    {"id": "ing-4-13", "name": "Heavy cream", "quantity": "100", "unit": "ml"},
    {"id": "ing-4-14", "name": "Fresh cilantro", "quantity": "1", "unit": "handful"},
    {"id": "ing-4-15", "name": "Salt", "quantity": "", "unit": "to taste"}
  ]',
  '[
    {"id": "step-4-1", "description": "Cut chicken into bite-sized pieces and place in a bowl."},
    {"id": "step-4-2", "description": "Mix yogurt, lemon juice, 1 tsp garam masala, turmeric, cumin, and chili powder to make a marinade."},
    {"id": "step-4-3", "description": "Coat chicken with the marinade and refrigerate for at least 1 hour, preferably overnight."},
    {"id": "step-4-4", "description": "Heat a large pan over medium heat and add half the butter."},
    {"id": "step-4-5", "description": "Cook the marinated chicken until browned on all sides and cooked through. Remove and set aside."},
    {"id": "step-4-6", "description": "In the same pan, add remaining butter. Finely chop onion, garlic, and ginger, then add to the pan."},
    {"id": "step-4-7", "description": "Sauté until onions are translucent and mixture is fragrant, about 5 minutes."},
    {"id": "step-4-8", "description": "Add tomato puree and simmer for 10-15 minutes until sauce thickens."},
    {"id": "step-4-9", "description": "Add remaining garam masala and salt to taste."},
    {"id": "step-4-10", "description": "Return chicken to the pan and simmer for 5 minutes."},
    {"id": "step-4-11", "description": "Stir in heavy cream and simmer for another 5 minutes."},
    {"id": "step-4-12", "description": "Garnish with chopped cilantro and serve with naan or rice."}
  ]',
  20, 40, 4, 'medium', '["indian", "curry", "chicken", "dinner"]',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
  'user-4', NOW(), NOW(), 1
);

-- Import Recipe 5: Chocolate Lava Cake
INSERT INTO recipes (id, title, description, ingredients, steps, prep_time, cook_time, servings, difficulty, tags, image, author_id, created_at, updated_at, version)
VALUES (
  'recipe-5',
  'Chocolate Lava Cake',
  'Decadent individual chocolate cakes with a molten center that flows like lava when you cut into them. A chocolate lover''s dream!',
  '[
    {"id": "ing-5-1", "name": "Dark chocolate", "quantity": "200", "unit": "g"},
    {"id": "ing-5-2", "name": "Unsalted butter", "quantity": "100", "unit": "g"},
    {"id": "ing-5-3", "name": "Eggs", "quantity": "4", "unit": "large"},
    {"id": "ing-5-4", "name": "Egg yolks", "quantity": "2", "unit": ""},
    {"id": "ing-5-5", "name": "Granulated sugar", "quantity": "100", "unit": "g"},
    {"id": "ing-5-6", "name": "All-purpose flour", "quantity": "50", "unit": "g"},
    {"id": "ing-5-7", "name": "Salt", "quantity": "1/4", "unit": "tsp"},
    {"id": "ing-5-8", "name": "Vanilla extract", "quantity": "1", "unit": "tsp"},
    {"id": "ing-5-9", "name": "Powdered sugar", "quantity": "", "unit": "for dusting"}
  ]',
  '[
    {"id": "step-5-1", "description": "Preheat oven to 425°F (220°C). Butter and lightly flour six 6-ounce ramekins."},
    {"id": "step-5-2", "description": "Melt chocolate and butter together in a double boiler or microwave, stirring until smooth."},
    {"id": "step-5-3", "description": "In a separate bowl, whisk together eggs, egg yolks, and sugar until light and thick."},
    {"id": "step-5-4", "description": "Fold the melted chocolate mixture into the egg mixture."},
    {"id": "step-5-5", "description": "Gently fold in flour and salt until just combined."},
    {"id": "step-5-6", "description": "Stir in vanilla extract."},
    {"id": "step-5-7", "description": "Divide the batter evenly among the prepared ramekins."},
    {"id": "step-5-8", "description": "Place ramekins on a baking sheet and bake for 12-14 minutes until the edges are firm but the center is still soft."},
    {"id": "step-5-9", "description": "Let stand for 1 minute, then run a knife around the edges and invert onto dessert plates."},
    {"id": "step-5-10", "description": "Dust with powdered sugar and serve immediately, perhaps with a scoop of vanilla ice cream."}
  ]',
  15, 14, 6, 'medium', '["dessert", "chocolate", "baking"]',
  'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
  'user-5', NOW(), NOW(), 1
);

-- Continue with more recipes...
-- (Note: Due to length limits, I'm showing the first 5 recipes. You can continue with the rest following the same pattern) 