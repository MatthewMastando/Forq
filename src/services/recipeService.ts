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
  // Get all recipes
  async getRecipes(): Promise<Recipe[]> {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }

    return data || [];
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
      return null;
    }

    return data;
  },

  // Create new recipe
  async createRecipe(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe | null> {
    const { data, error } = await supabase
      .from('recipes')
      .insert([{
        ...recipe,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating recipe:', error);
      return null;
    }

    return data;
  },

  // Update recipe
  async updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe | null> {
    const { data, error } = await supabase
      .from('recipes')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating recipe:', error);
      return null;
    }

    return data;
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

    return data || [];
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

    return data || [];
  },
}; 