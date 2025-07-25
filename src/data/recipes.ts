import { Recipe } from '../context/RecipeContext';
export const recipes: Recipe[] = [{
  id: 'recipe-1',
  title: 'Classic Margherita Pizza',
  description: 'A traditional Italian pizza with simple, fresh ingredients. The perfect balance of tomato, mozzarella, and basil.',
  ingredients: [{
    id: 'ing-1-1',
    name: 'Pizza dough',
    quantity: '1',
    unit: 'ball'
  }, {
    id: 'ing-1-2',
    name: 'San Marzano tomatoes',
    quantity: '400',
    unit: 'g'
  }, {
    id: 'ing-1-3',
    name: 'Fresh mozzarella',
    quantity: '200',
    unit: 'g'
  }, {
    id: 'ing-1-4',
    name: 'Fresh basil leaves',
    quantity: '10',
    unit: 'leaves'
  }, {
    id: 'ing-1-5',
    name: 'Extra virgin olive oil',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-1-6',
    name: 'Salt',
    quantity: '1',
    unit: 'tsp'
  }],
  steps: [{
    id: 'step-1-1',
    description: 'Preheat your oven to the highest temperature (usually 500-550°F/260-290°C) with a pizza stone or steel inside.'
  }, {
    id: 'step-1-2',
    description: 'Crush the tomatoes by hand and mix with 1 tbsp olive oil and salt.'
  }, {
    id: 'step-1-3',
    description: 'Stretch the pizza dough into a 12-inch circle on a floured pizza peel.'
  }, {
    id: 'step-1-4',
    description: 'Spread the tomato sauce evenly over the dough, leaving a 1-inch border for the crust.'
  }, {
    id: 'step-1-5',
    description: 'Tear the mozzarella into pieces and distribute evenly over the sauce.'
  }, {
    id: 'step-1-6',
    description: 'Slide the pizza onto the preheated stone and bake for 8-10 minutes until the crust is golden and the cheese is bubbly.'
  }, {
    id: 'step-1-7',
    description: 'Remove from the oven, top with fresh basil leaves and a drizzle of remaining olive oil.'
  }],
  prepTime: 20,
  cookTime: 10,
  servings: 2,
  difficulty: 'medium',
  tags: ['italian', 'pizza', 'vegetarian', 'dinner'],
  image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
  authorId: 'user-1',
  createdAt: '2023-01-10T15:30:00Z',
  updatedAt: '2023-01-10T15:30:00Z',
  version: 1
}, {
  id: 'recipe-2',
  title: 'Sourdough Bread',
  description: 'A rustic sourdough bread with a crispy crust and tender, airy crumb. Perfect for sandwiches or simply enjoyed with butter.',
  ingredients: [{
    id: 'ing-2-1',
    name: 'Active sourdough starter',
    quantity: '100',
    unit: 'g'
  }, {
    id: 'ing-2-2',
    name: 'Bread flour',
    quantity: '400',
    unit: 'g'
  }, {
    id: 'ing-2-3',
    name: 'Whole wheat flour',
    quantity: '100',
    unit: 'g'
  }, {
    id: 'ing-2-4',
    name: 'Water',
    quantity: '350',
    unit: 'ml'
  }, {
    id: 'ing-2-5',
    name: 'Salt',
    quantity: '10',
    unit: 'g'
  }],
  steps: [{
    id: 'step-2-1',
    description: 'Mix the sourdough starter with water in a large bowl.'
  }, {
    id: 'step-2-2',
    description: 'Add both flours and mix until no dry flour remains. Let rest for 30 minutes (autolyse).'
  }, {
    id: 'step-2-3',
    description: 'Add salt and incorporate by pinching and folding the dough.'
  }, {
    id: 'step-2-4',
    description: 'Perform 4-6 stretch and folds over the next 2-3 hours, allowing 30 minutes between each fold.'
  }, {
    id: 'step-2-5',
    description: 'Shape the dough into a boule and place in a floured banneton basket.'
  }, {
    id: 'step-2-6',
    description: 'Cover and refrigerate overnight (8-12 hours) for slow fermentation.'
  }, {
    id: 'step-2-7',
    description: 'Preheat oven to 500°F (260°C) with a Dutch oven inside.'
  }, {
    id: 'step-2-8',
    description: 'Turn the dough out onto parchment paper, score the top, and transfer to the hot Dutch oven.'
  }, {
    id: 'step-2-9',
    description: 'Bake covered for 20 minutes, then uncovered for 20-25 minutes more until deep golden brown.'
  }, {
    id: 'step-2-10',
    description: 'Cool completely on a wire rack before slicing.'
  }],
  prepTime: 180,
  cookTime: 45,
  servings: 8,
  difficulty: 'hard',
  tags: ['bread', 'sourdough', 'baking'],
  image: 'https://images.unsplash.com/photo-1597604391235-a7429b4b350c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  authorId: 'user-2',
  createdAt: '2023-02-15T09:45:00Z',
  updatedAt: '2023-02-15T09:45:00Z',
  version: 1
}, {
  id: 'recipe-3',
  title: 'Vegan Buddha Bowl',
  description: 'A nourishing bowl packed with colorful vegetables, protein-rich quinoa, and a creamy tahini dressing. Perfect for a balanced meal.',
  ingredients: [{
    id: 'ing-3-1',
    name: 'Quinoa',
    quantity: '100',
    unit: 'g'
  }, {
    id: 'ing-3-2',
    name: 'Sweet potato',
    quantity: '1',
    unit: 'medium'
  }, {
    id: 'ing-3-3',
    name: 'Chickpeas',
    quantity: '400',
    unit: 'g'
  }, {
    id: 'ing-3-4',
    name: 'Kale',
    quantity: '2',
    unit: 'cups'
  }, {
    id: 'ing-3-5',
    name: 'Avocado',
    quantity: '1',
    unit: 'medium'
  }, {
    id: 'ing-3-6',
    name: 'Tahini',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-3-7',
    name: 'Lemon juice',
    quantity: '1',
    unit: 'tbsp'
  }, {
    id: 'ing-3-8',
    name: 'Maple syrup',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-3-9',
    name: 'Cumin',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-3-10',
    name: 'Paprika',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-3-11',
    name: 'Olive oil',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-3-12',
    name: 'Salt and pepper',
    quantity: '',
    unit: 'to taste'
  }],
  steps: [{
    id: 'step-3-1',
    description: 'Preheat oven to 400°F (200°C).'
  }, {
    id: 'step-3-2',
    description: 'Cook quinoa according to package instructions (usually 1 part quinoa to 2 parts water).'
  }, {
    id: 'step-3-3',
    description: 'Peel and cube sweet potato. Toss with 1 tbsp olive oil, cumin, and paprika.'
  }, {
    id: 'step-3-4',
    description: 'Drain and rinse chickpeas, pat dry, then toss with remaining olive oil and spices.'
  }, {
    id: 'step-3-5',
    description: 'Spread sweet potatoes and chickpeas on a baking sheet and roast for 25-30 minutes, turning halfway.'
  }, {
    id: 'step-3-6',
    description: 'Wash and chop kale, massage with a bit of olive oil and salt until softened.'
  }, {
    id: 'step-3-7',
    description: 'Make the dressing by whisking together tahini, lemon juice, maple syrup, and 2-3 tbsp water until smooth.'
  }, {
    id: 'step-3-8',
    description: 'Assemble bowls with quinoa as the base, arranged sections of roasted vegetables, chickpeas, and kale.'
  }, {
    id: 'step-3-9',
    description: 'Slice avocado and add to the bowl, then drizzle with tahini dressing.'
  }],
  prepTime: 15,
  cookTime: 30,
  servings: 2,
  difficulty: 'easy',
  tags: ['vegan', 'healthy', 'bowl', 'dinner'],
  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
  authorId: 'user-3',
  createdAt: '2023-03-05T12:15:00Z',
  updatedAt: '2023-03-05T12:15:00Z',
  version: 1
}, {
  id: 'recipe-4',
  title: 'Butter Chicken (Murgh Makhani)',
  description: "A rich and creamy North Indian curry with tender chicken pieces in a tomato-based sauce. A beloved classic that's perfect with naan or rice.",
  ingredients: [{
    id: 'ing-4-1',
    name: 'Chicken thighs',
    quantity: '700',
    unit: 'g'
  }, {
    id: 'ing-4-2',
    name: 'Yogurt',
    quantity: '100',
    unit: 'g'
  }, {
    id: 'ing-4-3',
    name: 'Lemon juice',
    quantity: '1',
    unit: 'tbsp'
  }, {
    id: 'ing-4-4',
    name: 'Garam masala',
    quantity: '2',
    unit: 'tsp'
  }, {
    id: 'ing-4-5',
    name: 'Ground turmeric',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-4-6',
    name: 'Ground cumin',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-4-7',
    name: 'Chili powder',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-4-8',
    name: 'Butter',
    quantity: '50',
    unit: 'g'
  }, {
    id: 'ing-4-9',
    name: 'Onion',
    quantity: '1',
    unit: 'large'
  }, {
    id: 'ing-4-10',
    name: 'Garlic',
    quantity: '4',
    unit: 'cloves'
  }, {
    id: 'ing-4-11',
    name: 'Ginger',
    quantity: '2',
    unit: 'cm piece'
  }, {
    id: 'ing-4-12',
    name: 'Tomato puree',
    quantity: '400',
    unit: 'g'
  }, {
    id: 'ing-4-13',
    name: 'Heavy cream',
    quantity: '100',
    unit: 'ml'
  }, {
    id: 'ing-4-14',
    name: 'Fresh cilantro',
    quantity: '1',
    unit: 'handful'
  }, {
    id: 'ing-4-15',
    name: 'Salt',
    quantity: '',
    unit: 'to taste'
  }],
  steps: [{
    id: 'step-4-1',
    description: 'Cut chicken into bite-sized pieces and place in a bowl.'
  }, {
    id: 'step-4-2',
    description: 'Mix yogurt, lemon juice, 1 tsp garam masala, turmeric, cumin, and chili powder to make a marinade.'
  }, {
    id: 'step-4-3',
    description: 'Coat chicken with the marinade and refrigerate for at least 1 hour, preferably overnight.'
  }, {
    id: 'step-4-4',
    description: 'Heat a large pan over medium heat and add half the butter.'
  }, {
    id: 'step-4-5',
    description: 'Cook the marinated chicken until browned on all sides and cooked through. Remove and set aside.'
  }, {
    id: 'step-4-6',
    description: 'In the same pan, add remaining butter. Finely chop onion, garlic, and ginger, then add to the pan.'
  }, {
    id: 'step-4-7',
    description: 'Sauté until onions are translucent and mixture is fragrant, about 5 minutes.'
  }, {
    id: 'step-4-8',
    description: 'Add tomato puree and simmer for 10-15 minutes until sauce thickens.'
  }, {
    id: 'step-4-9',
    description: 'Add remaining garam masala and salt to taste.'
  }, {
    id: 'step-4-10',
    description: 'Return chicken to the pan and simmer for 5 minutes.'
  }, {
    id: 'step-4-11',
    description: 'Stir in heavy cream and simmer for another 5 minutes.'
  }, {
    id: 'step-4-12',
    description: 'Garnish with chopped cilantro and serve with naan or rice.'
  }],
  prepTime: 20,
  cookTime: 40,
  servings: 4,
  difficulty: 'medium',
  tags: ['indian', 'curry', 'chicken', 'dinner'],
  image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
  authorId: 'user-4',
  createdAt: '2023-04-12T18:20:00Z',
  updatedAt: '2023-04-12T18:20:00Z',
  version: 1
}, {
  id: 'recipe-5',
  title: 'Chocolate Lava Cake',
  description: "Decadent individual chocolate cakes with a molten center that flows like lava when you cut into them. A chocolate lover's dream!",
  ingredients: [{
    id: 'ing-5-1',
    name: 'Dark chocolate',
    quantity: '200',
    unit: 'g'
  }, {
    id: 'ing-5-2',
    name: 'Unsalted butter',
    quantity: '100',
    unit: 'g'
  }, {
    id: 'ing-5-3',
    name: 'Eggs',
    quantity: '4',
    unit: 'large'
  }, {
    id: 'ing-5-4',
    name: 'Egg yolks',
    quantity: '2',
    unit: ''
  }, {
    id: 'ing-5-5',
    name: 'Granulated sugar',
    quantity: '100',
    unit: 'g'
  }, {
    id: 'ing-5-6',
    name: 'All-purpose flour',
    quantity: '50',
    unit: 'g'
  }, {
    id: 'ing-5-7',
    name: 'Salt',
    quantity: '1/4',
    unit: 'tsp'
  }, {
    id: 'ing-5-8',
    name: 'Vanilla extract',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-5-9',
    name: 'Powdered sugar',
    quantity: '',
    unit: 'for dusting'
  }],
  steps: [{
    id: 'step-5-1',
    description: 'Preheat oven to 425°F (220°C). Butter and lightly flour six 6-ounce ramekins.'
  }, {
    id: 'step-5-2',
    description: 'Melt chocolate and butter together in a double boiler or microwave, stirring until smooth.'
  }, {
    id: 'step-5-3',
    description: 'In a separate bowl, whisk together eggs, egg yolks, and sugar until light and thick.'
  }, {
    id: 'step-5-4',
    description: 'Fold the melted chocolate mixture into the egg mixture.'
  }, {
    id: 'step-5-5',
    description: 'Gently fold in flour and salt until just combined.'
  }, {
    id: 'step-5-6',
    description: 'Stir in vanilla extract.'
  }, {
    id: 'step-5-7',
    description: 'Divide the batter evenly among the prepared ramekins.'
  }, {
    id: 'step-5-8',
    description: 'Place ramekins on a baking sheet and bake for 12-14 minutes until the edges are firm but the center is still soft.'
  }, {
    id: 'step-5-9',
    description: 'Let stand for 1 minute, then run a knife around the edges and invert onto dessert plates.'
  }, {
    id: 'step-5-10',
    description: 'Dust with powdered sugar and serve immediately, perhaps with a scoop of vanilla ice cream.'
  }],
  prepTime: 15,
  cookTime: 14,
  servings: 6,
  difficulty: 'medium',
  tags: ['dessert', 'chocolate', 'baking'],
  image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
  authorId: 'user-5',
  createdAt: '2023-05-20T14:10:00Z',
  updatedAt: '2023-05-20T14:10:00Z',
  version: 1
}, {
  id: 'recipe-6',
  title: 'Neapolitan Margherita Pizza',
  description: 'An authentic Neapolitan version of the classic Margherita pizza, with a thinner crust and traditional preparation methods.',
  ingredients: [{
    id: 'ing-6-1',
    name: 'Tipo 00 flour',
    quantity: '250',
    unit: 'g'
  }, {
    id: 'ing-6-2',
    name: 'Water',
    quantity: '165',
    unit: 'ml'
  }, {
    id: 'ing-6-3',
    name: 'Sea salt',
    quantity: '5',
    unit: 'g'
  }, {
    id: 'ing-6-4',
    name: 'Fresh yeast',
    quantity: '5',
    unit: 'g'
  }, {
    id: 'ing-6-5',
    name: 'San Marzano tomatoes',
    quantity: '400',
    unit: 'g'
  }, {
    id: 'ing-6-6',
    name: 'Buffalo mozzarella',
    quantity: '125',
    unit: 'g'
  }, {
    id: 'ing-6-7',
    name: 'Fresh basil leaves',
    quantity: '8',
    unit: 'leaves'
  }, {
    id: 'ing-6-8',
    name: 'Extra virgin olive oil',
    quantity: '1',
    unit: 'tbsp'
  }],
  steps: [{
    id: 'step-6-1',
    description: 'Mix flour and salt in a large bowl.'
  }, {
    id: 'step-6-2',
    description: 'Dissolve yeast in water and gradually add to the flour mixture, mixing until a dough forms.'
  }, {
    id: 'step-6-3',
    description: 'Knead the dough on a floured surface for 10-15 minutes until smooth and elastic.'
  }, {
    id: 'step-6-4',
    description: 'Place dough in a lightly oiled bowl, cover, and let rise for 8-24 hours at room temperature.'
  }, {
    id: 'step-6-5',
    description: 'Divide dough into 2 balls and let rest for another 2 hours.'
  }, {
    id: 'step-6-6',
    description: 'Preheat your oven to the maximum temperature with a pizza stone for at least 1 hour.'
  }, {
    id: 'step-6-7',
    description: 'Hand-stretch one dough ball into a 10-inch circle, creating a slightly thicker edge.'
  }, {
    id: 'step-6-8',
    description: 'Crush tomatoes by hand and spread a thin layer over the dough, leaving the edge bare.'
  }, {
    id: 'step-6-9',
    description: 'Tear buffalo mozzarella into small pieces and distribute over the tomato.'
  }, {
    id: 'step-6-10',
    description: 'Bake for 60-90 seconds in a wood-fired oven, or 4-5 minutes in a conventional oven at highest temperature.'
  }, {
    id: 'step-6-11',
    description: 'Add fresh basil leaves and a drizzle of olive oil after removing from the oven.'
  }],
  prepTime: 120,
  cookTime: 2,
  servings: 2,
  difficulty: 'hard',
  tags: ['italian', 'pizza', 'vegetarian', 'dinner'],
  image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e',
  authorId: 'user-2',
  originalId: 'recipe-1',
  createdAt: '2023-01-15T10:45:00Z',
  updatedAt: '2023-01-15T10:45:00Z',
  version: 1
}, {
  id: 'recipe-15',
  title: 'Korean Bibimbap',
  description: 'A colorful and nutritious Korean rice bowl topped with an array of seasoned vegetables, marinated beef, a fried egg, and spicy gochujang sauce. Mix it all together for a perfect balance of flavors and textures.',
  ingredients: [{
    id: 'ing-15-1',
    name: 'Short-grain rice',
    quantity: '2',
    unit: 'cups'
  }, {
    id: 'ing-15-2',
    name: 'Beef sirloin',
    quantity: '200',
    unit: 'g'
  }, {
    id: 'ing-15-3',
    name: 'Soy sauce',
    quantity: '3',
    unit: 'tbsp'
  }, {
    id: 'ing-15-4',
    name: 'Sesame oil',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-15-5',
    name: 'Brown sugar',
    quantity: '1',
    unit: 'tbsp'
  }, {
    id: 'ing-15-6',
    name: 'Garlic',
    quantity: '3',
    unit: 'cloves'
  }, {
    id: 'ing-15-7',
    name: 'Spinach',
    quantity: '200',
    unit: 'g'
  }, {
    id: 'ing-15-8',
    name: 'Bean sprouts',
    quantity: '200',
    unit: 'g'
  }, {
    id: 'ing-15-9',
    name: 'Carrots',
    quantity: '2',
    unit: 'medium'
  }, {
    id: 'ing-15-10',
    name: 'Zucchini',
    quantity: '1',
    unit: 'medium'
  }, {
    id: 'ing-15-11',
    name: 'Shiitake mushrooms',
    quantity: '100',
    unit: 'g'
  }, {
    id: 'ing-15-12',
    name: 'Eggs',
    quantity: '4',
    unit: ''
  }, {
    id: 'ing-15-13',
    name: 'Gochujang sauce',
    quantity: '2',
    unit: 'tbsp'
  }],
  steps: [{
    id: 'step-15-1',
    description: 'Cook rice according to package instructions and set aside.'
  }, {
    id: 'step-15-2',
    description: 'Slice beef thinly and marinate with soy sauce, 1 tbsp sesame oil, brown sugar, and minced garlic for at least 30 minutes.'
  }, {
    id: 'step-15-3',
    description: 'Prepare vegetables: blanch spinach and bean sprouts separately, julienne carrots and zucchini, and sauté mushrooms.'
  }, {
    id: 'step-15-4',
    description: 'Season each vegetable with a little salt, garlic, and sesame oil.'
  }, {
    id: 'step-15-5',
    description: 'Heat a pan and cook the marinated beef until browned and cooked through.'
  }, {
    id: 'step-15-6',
    description: 'Fry eggs sunny-side up, keeping the yolks runny.'
  }, {
    id: 'step-15-7',
    description: 'Assemble bibimbap: place rice in a bowl, arrange vegetables and beef on top, and crown with a fried egg.'
  }, {
    id: 'step-15-8',
    description: 'Serve with gochujang sauce on the side or drizzled on top. Mix everything together before eating.'
  }],
  prepTime: 30,
  cookTime: 20,
  servings: 4,
  difficulty: 'medium',
  tags: ['korean', 'rice bowl', 'beef', 'dinner'],
  image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7',
  authorId: 'user-4',
  createdAt: '2023-09-18T16:40:00Z',
  updatedAt: '2023-09-18T16:40:00Z',
  version: 1
}, {
  id: 'recipe-16',
  title: 'Creamy Mushroom Risotto',
  description: 'A luxurious Italian rice dish cooked to perfection with arborio rice, mushrooms, white wine, and parmesan cheese. This comforting risotto is creamy, rich, and full of umami flavor.',
  ingredients: [{
    id: 'ing-16-1',
    name: 'Arborio rice',
    quantity: '1.5',
    unit: 'cups'
  }, {
    id: 'ing-16-2',
    name: 'Mixed mushrooms',
    quantity: '300',
    unit: 'g'
  }, {
    id: 'ing-16-3',
    name: 'Shallots',
    quantity: '2',
    unit: 'medium'
  }, {
    id: 'ing-16-4',
    name: 'Garlic',
    quantity: '3',
    unit: 'cloves'
  }, {
    id: 'ing-16-5',
    name: 'Dry white wine',
    quantity: '1/2',
    unit: 'cup'
  }, {
    id: 'ing-16-6',
    name: 'Vegetable broth',
    quantity: '4',
    unit: 'cups'
  }, {
    id: 'ing-16-7',
    name: 'Parmesan cheese',
    quantity: '1/2',
    unit: 'cup'
  }, {
    id: 'ing-16-8',
    name: 'Butter',
    quantity: '3',
    unit: 'tbsp'
  }, {
    id: 'ing-16-9',
    name: 'Olive oil',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-16-10',
    name: 'Fresh thyme',
    quantity: '2',
    unit: 'sprigs'
  }, {
    id: 'ing-16-11',
    name: 'Salt',
    quantity: '',
    unit: 'to taste'
  }, {
    id: 'ing-16-12',
    name: 'Black pepper',
    quantity: '',
    unit: 'to taste'
  }, {
    id: 'ing-16-13',
    name: 'Fresh parsley',
    quantity: '2',
    unit: 'tbsp'
  }],
  steps: [{
    id: 'step-16-1',
    description: 'In a large saucepan, heat the vegetable broth and keep it warm on low heat.'
  }, {
    id: 'step-16-2',
    description: 'Clean and slice mushrooms. Finely dice shallots and mince garlic.'
  }, {
    id: 'step-16-3',
    description: 'In a large, heavy-bottomed pan, heat 1 tbsp butter and olive oil over medium heat. Add mushrooms and thyme, and sauté until mushrooms are golden brown. Remove and set aside.'
  }, {
    id: 'step-16-4',
    description: 'In the same pan, add the remaining butter. Add shallots and cook until translucent, about 3 minutes. Add garlic and cook for another 30 seconds.'
  }, {
    id: 'step-16-5',
    description: 'Add the arborio rice and stir to coat in butter, toasting for about 2 minutes until the edges become translucent.'
  }, {
    id: 'step-16-6',
    description: 'Pour in the white wine and stir until almost completely absorbed.'
  }, {
    id: 'step-16-7',
    description: 'Begin adding the warm broth one ladle at a time, stirring frequently. Wait until each addition is almost completely absorbed before adding more.'
  }, {
    id: 'step-16-8',
    description: 'Continue this process for about 18-20 minutes, until the rice is creamy and al dente.'
  }, {
    id: 'step-16-9',
    description: 'Stir in the sautéed mushrooms, grated Parmesan cheese, and season with salt and pepper to taste.'
  }, {
    id: 'step-16-10',
    description: 'Remove from heat, cover, and let rest for 2 minutes. Garnish with chopped parsley before serving.'
  }],
  prepTime: 15,
  cookTime: 30,
  servings: 4,
  difficulty: 'medium',
  tags: ['italian', 'rice', 'vegetarian', 'dinner'],
  image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371',
  authorId: 'user-2',
  createdAt: '2023-10-05T14:25:00Z',
  updatedAt: '2023-10-05T14:25:00Z',
  version: 1
}, {
  id: 'recipe-17',
  title: 'Thai Green Curry',
  description: 'A fragrant and spicy Thai curry with coconut milk, tender chicken, and colorful vegetables. This aromatic dish balances sweet, sour, and spicy flavors for an authentic taste of Thailand.',
  ingredients: [{
    id: 'ing-17-1',
    name: 'Chicken thighs',
    quantity: '500',
    unit: 'g'
  }, {
    id: 'ing-17-2',
    name: 'Green curry paste',
    quantity: '3',
    unit: 'tbsp'
  }, {
    id: 'ing-17-3',
    name: 'Coconut milk',
    quantity: '400',
    unit: 'ml'
  }, {
    id: 'ing-17-4',
    name: 'Chicken broth',
    quantity: '200',
    unit: 'ml'
  }, {
    id: 'ing-17-5',
    name: 'Fish sauce',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-17-6',
    name: 'Palm sugar',
    quantity: '1',
    unit: 'tbsp'
  }, {
    id: 'ing-17-7',
    name: 'Thai eggplants',
    quantity: '4',
    unit: 'small'
  }, {
    id: 'ing-17-8',
    name: 'Bell pepper',
    quantity: '1',
    unit: 'medium'
  }, {
    id: 'ing-17-9',
    name: 'Bamboo shoots',
    quantity: '100',
    unit: 'g'
  }, {
    id: 'ing-17-10',
    name: 'Thai basil leaves',
    quantity: '1',
    unit: 'handful'
  }, {
    id: 'ing-17-11',
    name: 'Kaffir lime leaves',
    quantity: '4',
    unit: ''
  }, {
    id: 'ing-17-12',
    name: 'Vegetable oil',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-17-13',
    name: 'Thai chilies',
    quantity: '2',
    unit: 'optional'
  }],
  steps: [{
    id: 'step-17-1',
    description: 'Cut chicken thighs into bite-sized pieces and set aside.'
  }, {
    id: 'step-17-2',
    description: 'Heat oil in a large pot over medium heat. Add the green curry paste and stir-fry for 1-2 minutes until fragrant.'
  }, {
    id: 'step-17-3',
    description: 'Add chicken pieces and stir to coat with curry paste. Cook for 3-4 minutes until chicken starts to brown.'
  }, {
    id: 'step-17-4',
    description: 'Pour in coconut milk and chicken broth. Add kaffir lime leaves and bring to a gentle simmer.'
  }, {
    id: 'step-17-5',
    description: 'Add fish sauce and palm sugar, then stir to combine.'
  }, {
    id: 'step-17-6',
    description: 'Add Thai eggplants, bell pepper, and bamboo shoots. Simmer for 10-15 minutes until chicken is cooked through and vegetables are tender.'
  }, {
    id: 'step-17-7',
    description: 'Taste and adjust seasoning with more fish sauce or palm sugar if needed.'
  }, {
    id: 'step-17-8',
    description: 'Remove from heat and stir in Thai basil leaves. Add sliced Thai chilies if desired for extra heat.'
  }, {
    id: 'step-17-9',
    description: 'Serve hot with steamed jasmine rice.'
  }],
  prepTime: 15,
  cookTime: 25,
  servings: 4,
  difficulty: 'medium',
  tags: ['thai', 'curry', 'chicken', 'dinner', 'spicy'],
  image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
  authorId: 'user-3',
  createdAt: '2023-10-10T13:20:00Z',
  updatedAt: '2023-10-10T13:20:00Z',
  version: 1
}, {
  id: 'recipe-18',
  title: 'Classic French Ratatouille',
  description: 'A vibrant Provençal stewed vegetable dish originating from Nice. This rustic French classic transforms simple summer vegetables into a delicious medley of flavors and colors.',
  ingredients: [{
    id: 'ing-18-1',
    name: 'Eggplant',
    quantity: '1',
    unit: 'large'
  }, {
    id: 'ing-18-2',
    name: 'Zucchini',
    quantity: '2',
    unit: 'medium'
  }, {
    id: 'ing-18-3',
    name: 'Yellow squash',
    quantity: '1',
    unit: 'medium'
  }, {
    id: 'ing-18-4',
    name: 'Bell peppers',
    quantity: '2',
    unit: 'assorted colors'
  }, {
    id: 'ing-18-5',
    name: 'Roma tomatoes',
    quantity: '6',
    unit: 'medium'
  }, {
    id: 'ing-18-6',
    name: 'Yellow onion',
    quantity: '1',
    unit: 'large'
  }, {
    id: 'ing-18-7',
    name: 'Garlic',
    quantity: '4',
    unit: 'cloves'
  }, {
    id: 'ing-18-8',
    name: 'Tomato paste',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-18-9',
    name: 'Fresh thyme',
    quantity: '4',
    unit: 'sprigs'
  }, {
    id: 'ing-18-10',
    name: 'Fresh rosemary',
    quantity: '1',
    unit: 'sprig'
  }, {
    id: 'ing-18-11',
    name: 'Bay leaf',
    quantity: '1',
    unit: ''
  }, {
    id: 'ing-18-12',
    name: 'Olive oil',
    quantity: '1/4',
    unit: 'cup'
  }, {
    id: 'ing-18-13',
    name: 'Fresh basil',
    quantity: '1/4',
    unit: 'cup'
  }, {
    id: 'ing-18-14',
    name: 'Salt and pepper',
    quantity: '',
    unit: 'to taste'
  }],
  steps: [{
    id: 'step-18-1',
    description: 'Preheat oven to 375°F (190°C). Cut eggplant, zucchini, and yellow squash into 1/4-inch thick rounds.'
  }, {
    id: 'step-18-2',
    description: 'Slice bell peppers into 1-inch strips, dice onion, and mince garlic. Cut tomatoes into quarters.'
  }, {
    id: 'step-18-3',
    description: 'Heat 2 tablespoons olive oil in a large oven-safe skillet over medium heat. Add onions and cook until translucent, about 5 minutes.'
  }, {
    id: 'step-18-4',
    description: 'Add garlic and cook for another minute until fragrant. Stir in tomato paste and cook for 2 minutes.'
  }, {
    id: 'step-18-5',
    description: 'Add tomatoes, thyme, rosemary, and bay leaf. Season with salt and pepper. Simmer for 10 minutes until slightly thickened.'
  }, {
    id: 'step-18-6',
    description: 'Remove herb sprigs and bay leaf. Transfer sauce to a bowl, leaving a thin layer in the skillet.'
  }, {
    id: 'step-18-7',
    description: 'Arrange vegetable slices in alternating patterns over the sauce (eggplant, zucchini, squash, bell pepper, tomato). Drizzle with remaining olive oil and season with salt and pepper.'
  }, {
    id: 'step-18-8',
    description: 'Cover with parchment paper cut to fit the skillet. Bake for 45 minutes, then remove parchment and bake for another 15-20 minutes until vegetables are tender and slightly caramelized.'
  }, {
    id: 'step-18-9',
    description: 'Let cool for 10 minutes, then garnish with torn fresh basil leaves before serving.'
  }],
  prepTime: 30,
  cookTime: 75,
  servings: 6,
  difficulty: 'medium',
  tags: ['french', 'vegetarian', 'vegan', 'dinner', 'healthy'],
  image: 'https://plus.unsplash.com/premium_photo-1713635953474-b74990274152?q=80&w=2384&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  authorId: 'user-1',
  createdAt: '2023-10-15T11:45:00Z',
  updatedAt: '2023-10-15T11:45:00Z',
  version: 1
}, {
  id: 'recipe-19',
  title: 'Homemade Beef Tacos',
  description: 'Delicious and easy beef tacos with seasoned ground beef, fresh toppings, and warm tortillas. These customizable tacos are perfect for a fun family dinner or casual entertaining.',
  ingredients: [{
    id: 'ing-19-1',
    name: 'Ground beef',
    quantity: '500',
    unit: 'g'
  }, {
    id: 'ing-19-2',
    name: 'Onion',
    quantity: '1',
    unit: 'medium'
  }, {
    id: 'ing-19-3',
    name: 'Garlic',
    quantity: '2',
    unit: 'cloves'
  }, {
    id: 'ing-19-4',
    name: 'Chili powder',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-19-5',
    name: 'Ground cumin',
    quantity: '1',
    unit: 'tbsp'
  }, {
    id: 'ing-19-6',
    name: 'Paprika',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-19-7',
    name: 'Dried oregano',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-19-8',
    name: 'Salt',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-19-9',
    name: 'Black pepper',
    quantity: '1/2',
    unit: 'tsp'
  }, {
    id: 'ing-19-10',
    name: 'Tomato sauce',
    quantity: '1/2',
    unit: 'cup'
  }, {
    id: 'ing-19-11',
    name: 'Corn tortillas',
    quantity: '12',
    unit: 'small'
  }, {
    id: 'ing-19-12',
    name: 'Lettuce',
    quantity: '2',
    unit: 'cups shredded'
  }, {
    id: 'ing-19-13',
    name: 'Tomatoes',
    quantity: '2',
    unit: 'diced'
  }, {
    id: 'ing-19-14',
    name: 'Cheddar cheese',
    quantity: '1',
    unit: 'cup shredded'
  }, {
    id: 'ing-19-15',
    name: 'Sour cream',
    quantity: '1/2',
    unit: 'cup'
  }, {
    id: 'ing-19-16',
    name: 'Avocado',
    quantity: '1',
    unit: 'sliced'
  }, {
    id: 'ing-19-17',
    name: 'Lime',
    quantity: '1',
    unit: 'cut into wedges'
  }, {
    id: 'ing-19-18',
    name: 'Fresh cilantro',
    quantity: '1/4',
    unit: 'cup chopped'
  }],
  steps: [{
    id: 'step-19-1',
    description: 'Finely dice onion and mince garlic. Heat a large skillet over medium heat.'
  }, {
    id: 'step-19-2',
    description: 'Add ground beef to the skillet and cook until browned, breaking it up with a spoon, about 5-7 minutes.'
  }, {
    id: 'step-19-3',
    description: 'Add onion and garlic to the beef and cook for another 2-3 minutes until softened.'
  }, {
    id: 'step-19-4',
    description: 'Stir in chili powder, cumin, paprika, oregano, salt, and pepper. Cook for 1 minute until fragrant.'
  }, {
    id: 'step-19-5',
    description: 'Add tomato sauce and 1/4 cup water. Simmer for 5-7 minutes until slightly thickened but still moist.'
  }, {
    id: 'step-19-6',
    description: 'While the beef is cooking, prepare the toppings: shred lettuce, dice tomatoes, shred cheese, slice avocado, and chop cilantro.'
  }, {
    id: 'step-19-7',
    description: 'Warm the corn tortillas according to package instructions or directly over a gas flame for 10-15 seconds per side.'
  }, {
    id: 'step-19-8',
    description: 'To serve, place a spoonful of beef mixture in the center of each tortilla. Let everyone add their preferred toppings.'
  }, {
    id: 'step-19-9',
    description: 'Serve with lime wedges for squeezing over the tacos.'
  }],
  prepTime: 15,
  cookTime: 20,
  servings: 4,
  difficulty: 'easy',
  tags: ['mexican', 'beef', 'dinner', 'family'],
  image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
  authorId: 'user-5',
  createdAt: '2023-10-18T18:30:00Z',
  updatedAt: '2023-10-18T18:30:00Z',
  version: 1
}, {
  id: 'recipe-20',
  title: 'Homemade Cinnamon Rolls',
  description: 'Soft, fluffy cinnamon rolls with a gooey cinnamon filling and topped with cream cheese frosting. These indulgent breakfast treats are worth the effort for a special weekend brunch.',
  ingredients: [{
    id: 'ing-20-1',
    name: 'All-purpose flour',
    quantity: '4',
    unit: 'cups'
  }, {
    id: 'ing-20-2',
    name: 'Granulated sugar',
    quantity: '1/3',
    unit: 'cup'
  }, {
    id: 'ing-20-3',
    name: 'Salt',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-20-4',
    name: 'Instant yeast',
    quantity: '2.25',
    unit: 'tsp'
  }, {
    id: 'ing-20-5',
    name: 'Milk',
    quantity: '1',
    unit: 'cup'
  }, {
    id: 'ing-20-6',
    name: 'Unsalted butter',
    quantity: '1/3',
    unit: 'cup'
  }, {
    id: 'ing-20-7',
    name: 'Eggs',
    quantity: '2',
    unit: 'large'
  }, {
    id: 'ing-20-8',
    name: 'Brown sugar',
    quantity: '3/4',
    unit: 'cup'
  }, {
    id: 'ing-20-9',
    name: 'Ground cinnamon',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-20-10',
    name: 'Unsalted butter, softened',
    quantity: '1/4',
    unit: 'cup'
  }, {
    id: 'ing-20-11',
    name: 'Cream cheese',
    quantity: '4',
    unit: 'oz'
  }, {
    id: 'ing-20-12',
    name: 'Powdered sugar',
    quantity: '1',
    unit: 'cup'
  }, {
    id: 'ing-20-13',
    name: 'Vanilla extract',
    quantity: '1/2',
    unit: 'tsp'
  }, {
    id: 'ing-20-14',
    name: 'Salt',
    quantity: '1/8',
    unit: 'tsp'
  }],
  steps: [{
    id: 'step-20-1',
    description: 'In a large bowl, combine 2 cups of flour, sugar, salt, and yeast.'
  }, {
    id: 'step-20-2',
    description: 'Heat milk and 1/3 cup butter until warm (110-115°F) and butter is almost melted. Add to dry ingredients along with eggs.'
  }, {
    id: 'step-20-3',
    description: 'Mix until combined, then add remaining flour gradually to form a soft dough. Knead for 5-7 minutes until smooth and elastic.'
  }, {
    id: 'step-20-4',
    description: 'Place in a greased bowl, cover, and let rise in a warm place for 1 hour or until doubled in size.'
  }, {
    id: 'step-20-5',
    description: 'Punch down dough and roll out on a floured surface to a 16x12 inch rectangle.'
  }, {
    id: 'step-20-6',
    description: 'For the filling: Mix brown sugar and cinnamon. Spread softened butter over the dough, then sprinkle with cinnamon-sugar mixture, leaving a 1/2-inch border.'
  }, {
    id: 'step-20-7',
    description: 'Starting with the long side, roll the dough tightly into a log. Cut into 12 equal pieces using a sharp knife or dental floss.'
  }, {
    id: 'step-20-8',
    description: 'Place rolls in a greased 9x13 inch baking pan. Cover and let rise for 30 minutes or until nearly doubled.'
  }, {
    id: 'step-20-9',
    description: 'Preheat oven to 350°F (175°C). Bake for 20-25 minutes until golden brown.'
  }, {
    id: 'step-20-10',
    description: 'For the frosting: Beat cream cheese and 1/4 cup butter until smooth. Add powdered sugar, vanilla, and salt. Beat until creamy.'
  }, {
    id: 'step-20-11',
    description: 'Spread frosting over warm rolls and serve.'
  }],
  prepTime: 30,
  cookTime: 25,
  servings: 12,
  difficulty: 'medium',
  tags: ['breakfast', 'baking', 'dessert', 'brunch'],
  image: 'https://media.istockphoto.com/id/184296528/photo/breakfast.webp?a=1&b=1&s=612x612&w=0&k=20&c=UElwQlgs3MGet9iH8nIzYA6k_uWjMGjenKjthzJqm04%3D',
  authorId: 'user-2',
  createdAt: '2023-10-22T09:15:00Z',
  updatedAt: '2023-10-22T09:15:00Z',
  version: 1
}, {
  id: 'recipe-21',
  title: 'Grilled Salmon with Lemon-Dill Sauce',
  description: 'Perfectly grilled salmon fillets topped with a refreshing lemon-dill sauce. This elegant yet simple dish is packed with omega-3s and comes together in under 30 minutes.',
  ingredients: [{
    id: 'ing-21-1',
    name: 'Salmon fillets',
    quantity: '4',
    unit: '6 oz each'
  }, {
    id: 'ing-21-2',
    name: 'Olive oil',
    quantity: '2',
    unit: 'tbsp'
  }, {
    id: 'ing-21-3',
    name: 'Lemon',
    quantity: '1',
    unit: 'zested and juiced'
  }, {
    id: 'ing-21-4',
    name: 'Garlic powder',
    quantity: '1/2',
    unit: 'tsp'
  }, {
    id: 'ing-21-5',
    name: 'Salt',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-21-6',
    name: 'Black pepper',
    quantity: '1/2',
    unit: 'tsp'
  }, {
    id: 'ing-21-7',
    name: 'Greek yogurt',
    quantity: '1/2',
    unit: 'cup'
  }, {
    id: 'ing-21-8',
    name: 'Fresh dill',
    quantity: '2',
    unit: 'tbsp chopped'
  }, {
    id: 'ing-21-9',
    name: 'Dijon mustard',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-21-10',
    name: 'Honey',
    quantity: '1',
    unit: 'tsp'
  }, {
    id: 'ing-21-11',
    name: 'Capers',
    quantity: '1',
    unit: 'tbsp drained'
  }, {
    id: 'ing-21-12',
    name: 'Lemon wedges',
    quantity: '',
    unit: 'for serving'
  }],
  steps: [{
    id: 'step-21-1',
    description: 'Preheat grill to medium-high heat (about 375-400°F).'
  }, {
    id: 'step-21-2',
    description: 'Pat salmon fillets dry with paper towels. Brush both sides with olive oil.'
  }, {
    id: 'step-21-3',
    description: 'In a small bowl, mix half the lemon zest, garlic powder, salt, and pepper. Rub this mixture over both sides of the salmon.'
  }, {
    id: 'step-21-4',
    description: 'For the sauce, combine Greek yogurt, remaining lemon zest, 1 tablespoon lemon juice, chopped dill, Dijon mustard, honey, and capers in a bowl. Season with salt and pepper to taste.'
  }, {
    id: 'step-21-5',
    description: 'Oil the grill grates. Place salmon skin-side down on the grill.'
  }, {
    id: 'step-21-6',
    description: 'Grill with the lid closed for 4-6 minutes until the skin is crisp and the salmon releases easily from the grates.'
  }, {
    id: 'step-21-7',
    description: 'Carefully flip the salmon and grill for another 2-4 minutes until the fish is opaque and flakes easily with a fork, but is still moist inside.'
  }, {
    id: 'step-21-8',
    description: 'Transfer salmon to plates, top with a generous spoonful of the lemon-dill sauce, and serve with lemon wedges.'
  }],
  prepTime: 10,
  cookTime: 15,
  servings: 4,
  difficulty: 'easy',
  tags: ['seafood', 'dinner', 'healthy', 'quick', 'gluten-free'],
  image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
  authorId: 'user-4',
  createdAt: '2023-10-25T19:10:00Z',
  updatedAt: '2023-10-25T19:10:00Z',
  version: 1
}];