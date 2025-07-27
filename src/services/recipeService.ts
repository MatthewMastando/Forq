import { supabase } from '../lib/supabase';
import { Recipe } from '../context/RecipeContext';

export interface SavedRecipe {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
  recipe: Recipe;
}

export const recipeService = {
  // Transform database data to match Recipe interface
  transformRecipe(dbRecipe: any): Recipe {
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
  },

  // Get all recipes
  async getRecipes(): Promise<Recipe[]> {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching recipes:', error);
      throw error; // Throw error so fallback logic can trigger
    }

    return (data || []).map(recipe => this.transformRecipe(recipe));
  },

  // Get recipe by ID
  async getRecipeById(id: string): Promise<Recipe | null> {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }

    return data ? this.transformRecipe(data) : null;
  },

  // Create new recipe
  async createRecipe(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe | null> {
    const { data, error } = await supabase
      .from('recipes')
      .insert([{
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
        original_id: recipe.originalId,
        version: recipe.version,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating recipe:', error);
      return null;
    }

    return data ? this.transformRecipe(data) : null;
  },

  // Update recipe
  async updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe | null> {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    // Transform camelCase to snake_case for database
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.ingredients !== undefined) updateData.ingredients = updates.ingredients;
    if (updates.steps !== undefined) updateData.steps = updates.steps;
    if (updates.prepTime !== undefined) updateData.prep_time = updates.prepTime;
    if (updates.cookTime !== undefined) updateData.cook_time = updates.cookTime;
    if (updates.servings !== undefined) updateData.servings = updates.servings;
    if (updates.difficulty !== undefined) updateData.difficulty = updates.difficulty;
    if (updates.tags !== undefined) updateData.tags = updates.tags;
    if (updates.image !== undefined) updateData.image = updates.image;
    if (updates.authorId !== undefined) updateData.author_id = updates.authorId;
    if (updates.originalId !== undefined) updateData.original_id = updates.originalId;
    if (updates.version !== undefined) updateData.version = updates.version;

    const { data, error } = await supabase
      .from('recipes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating recipe:', error);
      return null;
    }

    return data ? this.transformRecipe(data) : null;
  },

  // Delete recipe
  async deleteRecipe(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting recipe:', error);
      return false;
    }

    return true;
  },

  // Save recipe to user's saved recipes
  async saveRecipe(userId: string, recipeId: string): Promise<boolean> {
    const { error } = await supabase
      .from('saved_recipes')
      .insert([{
        user_id: userId,
        recipe_id: recipeId,
      }]);

    if (error) {
      console.error('Error saving recipe:', error);
      return false;
    }

    return true;
  },

  // Remove recipe from user's saved recipes
  async unsaveRecipe(userId: string, recipeId: string): Promise<boolean> {
    const { error } = await supabase
      .from('saved_recipes')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('Error unsaving recipe:', error);
      return false;
    }

    return true;
  },

  // Get user's saved recipes
  async getSavedRecipes(userId: string): Promise<SavedRecipe[]> {
    const { data, error } = await supabase
      .from('saved_recipes')
      .select(`
        *,
        recipe:recipes(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching saved recipes:', error);
      return [];
    }
    
    // Transform the recipe data to match the Recipe interface
    const transformedData = (data || []).map(savedRecipe => ({
      ...savedRecipe,
      recipe: this.transformRecipe(savedRecipe.recipe)
    }));
    
    return transformedData;
  },

  // Check if recipe is saved by user
  async isRecipeSaved(userId: string, recipeId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('saved_recipes')
      .select('id')
      .eq('user_id', userId)
      .eq('recipe_id', recipeId)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  },

  // Get recipes by author
  async getRecipesByAuthor(authorId: string): Promise<Recipe[]> {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching author recipes:', error);
      return [];
    }

    return (data || []).map(recipe => this.transformRecipe(recipe));
  },
}; 