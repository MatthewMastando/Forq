import React, { useEffect, useState, createContext, useContext } from 'react';
import { recipes as initialRecipes } from '../data/recipes';
import { comments as initialComments } from '../data/comments';
import { forks as initialForks } from '../data/forks';
import { recipeService } from '../services/recipeService';

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

export interface Step {
  id: string;
  description: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  image: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  originalId?: string;
  version: number;
}

export interface Comment {
  id: string;
  recipeId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Fork {
  id: string;
  originalId: string;
  forkedId: string;
  createdAt: string;
}

interface RecipeContextType {
  recipes: Recipe[];
  comments: Comment[];
  forks: Fork[];
  loading: boolean;
  getRecipeById: (id: string) => Recipe | undefined;
  getRecipesByAuthor: (authorId: string) => Recipe[];
  getCommentsByRecipe: (recipeId: string) => Comment[];
  getForksByOriginal: (originalId: string) => Fork[];
  createRecipe: (recipe: Partial<Recipe>) => Promise<Recipe | null>;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => Promise<Recipe | null>;
  forkRecipe: (originalId: string, changes: Partial<Recipe>) => Promise<Recipe | null>;
  addComment: (comment: Partial<Comment>) => Comment;
  searchRecipes: (query: string, filters?: any) => Recipe[];
  refreshRecipes: () => Promise<void>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [forks, setForks] = useState<Fork[]>(initialForks);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from Supabase on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const fetchedRecipes = await recipeService.getRecipes();
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes from Supabase, using fallback data:', error);
        // Fallback to mock data if Supabase fails
        setRecipes(initialRecipes);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const getRecipesByAuthor = (authorId: string) => {
    return recipes.filter(recipe => recipe.authorId === authorId);
  };

  const getCommentsByRecipe = (recipeId: string) => {
    return comments.filter(comment => comment.recipeId === recipeId);
  };

  const getForksByOriginal = (originalId: string) => {
    return forks.filter(fork => fork.originalId === originalId);
  };

  const createRecipe = async (recipe: Partial<Recipe>) => {
    try {
      const newRecipe = await recipeService.createRecipe(recipe as Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>);
      if (newRecipe) {
        setRecipes(prev => [...prev, newRecipe]);
        return newRecipe;
      }
      return null;
    } catch (error) {
      console.error('Error creating recipe:', error);
      return null;
    }
  };

  const updateRecipe = async (id: string, recipeUpdate: Partial<Recipe>) => {
    try {
      const updatedRecipe = await recipeService.updateRecipe(id, recipeUpdate);
      if (updatedRecipe) {
        setRecipes(prev => prev.map(recipe => 
          recipe.id === id ? updatedRecipe : recipe
        ));
        return updatedRecipe;
      }
      return null;
    } catch (error) {
      console.error('Error updating recipe:', error);
      return null;
    }
  };

  const forkRecipe = async (originalId: string, changes: Partial<Recipe>) => {
    try {
      const originalRecipe = getRecipeById(originalId);
      if (!originalRecipe) return null;

      const forkedRecipe = await recipeService.createRecipe({
        title: originalRecipe.title,
        description: originalRecipe.description,
        ingredients: originalRecipe.ingredients,
        steps: originalRecipe.steps,
        prepTime: originalRecipe.prepTime,
        cookTime: originalRecipe.cookTime,
        servings: originalRecipe.servings,
        difficulty: originalRecipe.difficulty,
        tags: originalRecipe.tags,
        image: originalRecipe.image,
        authorId: originalRecipe.authorId,
        originalId: originalId,
        version: originalRecipe.version + 1,
        ...(changes as any)
      } as Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>);

      if (forkedRecipe) {
        setRecipes(prev => [...prev, forkedRecipe]);
        return forkedRecipe;
      }
      return null;
    } catch (error) {
      console.error('Error forking recipe:', error);
      return null;
    }
  };

  const addComment = (comment: Partial<Comment>) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      recipeId: comment.recipeId || '',
      authorId: comment.authorId || '',
      content: comment.content || '',
      createdAt: comment.createdAt || new Date().toISOString()
    };
    setComments([...comments, newComment]);
    return newComment;
  };

  const searchRecipes = (query: string, filters?: any) => {
    const lowercaseQuery = query.toLowerCase();
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const refreshRecipes = async () => {
    try {
      setLoading(true);
      const fetchedRecipes = await recipeService.getRecipes();
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Error refreshing recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      comments,
      forks,
      loading,
      getRecipeById,
      getRecipesByAuthor,
      getCommentsByRecipe,
      getForksByOriginal,
      createRecipe,
      updateRecipe,
      forkRecipe,
      addComment,
      searchRecipes,
      refreshRecipes
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};