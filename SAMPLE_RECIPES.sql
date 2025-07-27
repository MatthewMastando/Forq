-- Sample Recipes for Forq App
-- Run this in your Supabase SQL Editor to populate the recipes table

-- First, let's create some sample user profiles (if they don't exist)
INSERT INTO profiles (id, username, name, email, bio, avatar, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'chef_sarah', 'Sarah Johnson', 'sarah@example.com', 'Professional chef with 10 years of experience', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'foodie_mike', 'Mike Chen', 'mike@example.com', 'Home cook and food blogger', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'baking_anna', 'Anna Rodriguez', 'anna@example.com', 'Pastry chef and baking enthusiast', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Now insert sample recipes
INSERT INTO recipes (id, title, description, ingredients, steps, prep_time, cook_time, servings, difficulty, tags, image, author_id, created_at, updated_at, version)
VALUES 
  (
    'recipe-001',
    'Classic Margherita Pizza',
    'A traditional Italian pizza with fresh mozzarella, basil, and tomato sauce',
    '[
      {"id": "ing-001", "name": "Pizza dough", "quantity": "1", "unit": "ball"},
      {"id": "ing-002", "name": "Fresh mozzarella", "quantity": "8", "unit": "oz"},
      {"id": "ing-003", "name": "Fresh basil leaves", "quantity": "1/2", "unit": "cup"},
      {"id": "ing-004", "name": "Tomato sauce", "quantity": "1/2", "unit": "cup"},
      {"id": "ing-005", "name": "Olive oil", "quantity": "2", "unit": "tbsp"}
    ]',
    '[
      {"id": "step-001", "description": "Preheat oven to 500°F (260°C)"},
      {"id": "step-002", "description": "Roll out the pizza dough on a floured surface"},
      {"id": "step-003", "description": "Spread tomato sauce evenly over the dough"},
      {"id": "step-004", "description": "Add fresh mozzarella slices"},
      {"id": "step-005", "description": "Bake for 12-15 minutes until crust is golden"},
      {"id": "step-006", "description": "Add fresh basil leaves and drizzle with olive oil"}
    ]',
    20,
    15,
    4,
    'medium',
    '["Italian", "Pizza", "Vegetarian"]',
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600',
    '550e8400-e29b-41d4-a716-446655440001',
    NOW(),
    NOW(),
    1
  ),
  (
    'recipe-002',
    'Chocolate Chip Cookies',
    'Soft and chewy chocolate chip cookies with a crispy edge',
    '[
      {"id": "ing-006", "name": "All-purpose flour", "quantity": "2.25", "unit": "cups"},
      {"id": "ing-007", "name": "Butter", "quantity": "1", "unit": "cup"},
      {"id": "ing-008", "name": "Brown sugar", "quantity": "3/4", "unit": "cup"},
      {"id": "ing-009", "name": "White sugar", "quantity": "3/4", "unit": "cup"},
      {"id": "ing-010", "name": "Eggs", "quantity": "2", "unit": "large"},
      {"id": "ing-011", "name": "Vanilla extract", "quantity": "2", "unit": "tsp"},
      {"id": "ing-012", "name": "Chocolate chips", "quantity": "2", "unit": "cups"}
    ]',
    '[
      {"id": "step-007", "description": "Preheat oven to 375°F (190°C)"},
      {"id": "step-008", "description": "Cream butter and sugars until light and fluffy"},
      {"id": "step-009", "description": "Beat in eggs and vanilla extract"},
      {"id": "step-010", "description": "Mix in flour and salt until just combined"},
      {"id": "step-011", "description": "Fold in chocolate chips"},
      {"id": "step-012", "description": "Drop rounded tablespoons onto baking sheet"},
      {"id": "step-013", "description": "Bake for 10-12 minutes until golden brown"}
    ]',
    15,
    12,
    24,
    'easy',
    '["Dessert", "Baking", "Chocolate"]',
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600',
    '550e8400-e29b-41d4-a716-446655440003',
    NOW(),
    NOW(),
    1
  ),
  (
    'recipe-003',
    'Grilled Chicken Salad',
    'A healthy and delicious grilled chicken salad with fresh vegetables',
    '[
      {"id": "ing-013", "name": "Chicken breast", "quantity": "2", "unit": "large"},
      {"id": "ing-014", "name": "Mixed greens", "quantity": "4", "unit": "cups"},
      {"id": "ing-015", "name": "Cherry tomatoes", "quantity": "1", "unit": "cup"},
      {"id": "ing-016", "name": "Cucumber", "quantity": "1", "unit": "medium"},
      {"id": "ing-017", "name": "Red onion", "quantity": "1/4", "unit": "small"},
      {"id": "ing-018", "name": "Olive oil", "quantity": "3", "unit": "tbsp"},
      {"id": "ing-019", "name": "Balsamic vinegar", "quantity": "2", "unit": "tbsp"}
    ]',
    '[
      {"id": "step-014", "description": "Season chicken breasts with salt and pepper"},
      {"id": "step-015", "description": "Grill chicken for 6-8 minutes per side until cooked through"},
      {"id": "step-016", "description": "Let chicken rest for 5 minutes, then slice"},
      {"id": "step-017", "description": "Wash and prepare all vegetables"},
      {"id": "step-018", "description": "Combine greens, tomatoes, cucumber, and onion"},
      {"id": "step-019", "description": "Whisk together olive oil and balsamic vinegar"},
      {"id": "step-020", "description": "Toss salad with dressing and top with sliced chicken"}
    ]',
    15,
    20,
    2,
    'easy',
    '["Healthy", "Salad", "Grilled"]',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
    '550e8400-e29b-41d4-a716-446655440002',
    NOW(),
    NOW(),
    1
  ),
  (
    'recipe-004',
    'Beef Tacos',
    'Authentic Mexican beef tacos with homemade tortillas',
    '[
      {"id": "ing-020", "name": "Ground beef", "quantity": "1", "unit": "lb"},
      {"id": "ing-021", "name": "Taco seasoning", "quantity": "1", "unit": "packet"},
      {"id": "ing-022", "name": "Corn tortillas", "quantity": "12", "unit": "small"},
      {"id": "ing-023", "name": "Shredded lettuce", "quantity": "2", "unit": "cups"},
      {"id": "ing-024", "name": "Diced tomatoes", "quantity": "1", "unit": "cup"},
      {"id": "ing-025", "name": "Shredded cheese", "quantity": "1", "unit": "cup"},
      {"id": "ing-026", "name": "Sour cream", "quantity": "1/2", "unit": "cup"}
    ]',
    '[
      {"id": "step-021", "description": "Brown ground beef in a large skillet over medium heat"},
      {"id": "step-022", "description": "Drain excess fat and add taco seasoning with water"},
      {"id": "step-023", "description": "Simmer for 5 minutes until thickened"},
      {"id": "step-024", "description": "Warm tortillas in a dry skillet for 30 seconds each"},
      {"id": "step-025", "description": "Fill tortillas with beef mixture"},
      {"id": "step-026", "description": "Top with lettuce, tomatoes, cheese, and sour cream"}
    ]',
    10,
    15,
    4,
    'easy',
    '["Mexican", "Tacos", "Beef"]',
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600',
    '550e8400-e29b-41d4-a716-446655440001',
    NOW(),
    NOW(),
    1
  ),
  (
    'recipe-005',
    'Pasta Carbonara',
    'Classic Italian pasta carbonara with eggs, cheese, and pancetta',
    '[
      {"id": "ing-027", "name": "Spaghetti", "quantity": "1", "unit": "lb"},
      {"id": "ing-028", "name": "Pancetta", "quantity": "8", "unit": "oz"},
      {"id": "ing-029", "name": "Eggs", "quantity": "4", "unit": "large"},
      {"id": "ing-030", "name": "Parmesan cheese", "quantity": "1", "unit": "cup"},
      {"id": "ing-031", "name": "Black pepper", "quantity": "1", "unit": "tsp"},
      {"id": "ing-032", "name": "Salt", "quantity": "1", "unit": "tsp"}
    ]',
    '[
      {"id": "step-027", "description": "Bring a large pot of salted water to boil"},
      {"id": "step-028", "description": "Cook spaghetti according to package directions"},
      {"id": "step-029", "description": "Meanwhile, cook pancetta in a large skillet until crispy"},
      {"id": "step-030", "description": "Whisk together eggs, cheese, and pepper in a bowl"},
      {"id": "step-031", "description": "Drain pasta, reserving 1 cup of pasta water"},
      {"id": "step-032", "description": "Add hot pasta to skillet with pancetta"},
      {"id": "step-033", "description": "Remove from heat and quickly stir in egg mixture"},
      {"id": "step-034", "description": "Add pasta water as needed to create creamy sauce"}
    ]',
    10,
    20,
    4,
    'medium',
    '["Italian", "Pasta", "Creamy"]',
    'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=600',
    '550e8400-e29b-41d4-a716-446655440002',
    NOW(),
    NOW(),
    1
  )
ON CONFLICT (id) DO NOTHING; 