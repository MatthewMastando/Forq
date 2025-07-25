import React, { useEffect, useState, createContext, useContext } from 'react';
import { recipes as initialRecipes } from '../data/recipes';
import { comments as initialComments } from '../data/comments';
import { forks as initialForks } from '../data/forks';
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
  getRecipeById: (id: string) => Recipe | undefined;
  getRecipesByAuthor: (authorId: string) => Recipe[];
  getCommentsByRecipe: (recipeId: string) => Comment[];
  getForksByOriginal: (originalId: string) => Fork[];
  createRecipe: (recipe: Partial<Recipe>) => Recipe;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => Recipe | undefined;
  forkRecipe: (originalId: string, changes: Partial<Recipe>) => Recipe;
  addComment: (comment: Partial<Comment>) => Comment;
  searchRecipes: (query: string, filters?: any) => Recipe[];
}
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);
export const RecipeProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [forks, setForks] = useState<Fork[]>(initialForks);
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
  const createRecipe = (recipe: Partial<Recipe>) => {
    const newRecipe: Recipe = {
      id: `recipe-${Date.now()}`,
      title: recipe.title || 'Untitled Recipe',
      description: recipe.description || '',
      ingredients: recipe.ingredients || [],
      steps: recipe.steps || [],
      prepTime: recipe.prepTime || 0,
      cookTime: recipe.cookTime || 0,
      servings: recipe.servings || 1,
      difficulty: recipe.difficulty || 'medium',
      tags: recipe.tags || [],
      image: recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      authorId: recipe.authorId || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      originalId: recipe.originalId,
      version: 1
    };
    setRecipes([...recipes, newRecipe]);
    return newRecipe;
  };
  const updateRecipe = (id: string, recipeUpdate: Partial<Recipe>) => {
    const index = recipes.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    const updatedRecipe = {
      ...recipes[index],
      ...recipeUpdate,
      updatedAt: new Date().toISOString(),
      version: (recipes[index].version || 1) + 1
    };
    const updatedRecipes = [...recipes];
    updatedRecipes[index] = updatedRecipe;
    setRecipes(updatedRecipes);
    return updatedRecipe;
  };
  const forkRecipe = (originalId: string, changes: Partial<Recipe>) => {
    const original = getRecipeById(originalId);
    if (!original) throw new Error('Original recipe not found');
    const forkedRecipe = createRecipe({
      ...original,
      ...changes,
      id: undefined,
      originalId: originalId,
      version: 1
    });
    const newFork: Fork = {
      id: `fork-${Date.now()}`,
      originalId,
      forkedId: forkedRecipe.id,
      createdAt: new Date().toISOString()
    };
    setForks([...forks, newFork]);
    return forkedRecipe;
  };
  const addComment = (comment: Partial<Comment>) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      recipeId: comment.recipeId || '',
      authorId: comment.authorId || '',
      content: comment.content || '',
      createdAt: new Date().toISOString()
    };
    setComments([...comments, newComment]);
    return newComment;
  };
  const searchRecipes = (query: string, filters?: any) => {
    let results = recipes;
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(recipe => recipe.title.toLowerCase().includes(lowercaseQuery) || recipe.description.toLowerCase().includes(lowercaseQuery) || recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)));
    }
    // Apply filters (simplified version)
    if (filters) {
      if (filters.difficulty) {
        results = results.filter(recipe => recipe.difficulty === filters.difficulty);
      }
      if (filters.tags && filters.tags.length > 0) {
        results = results.filter(recipe => filters.tags.some((tag: string) => recipe.tags.includes(tag)));
      }
    }
    return results;
  };
  return <RecipeContext.Provider value={{
    recipes,
    comments,
    forks,
    getRecipeById,
    getRecipesByAuthor,
    getCommentsByRecipe,
    getForksByOriginal,
    createRecipe,
    updateRecipe,
    forkRecipe,
    addComment,
    searchRecipes
  }}>
      {children}
    </RecipeContext.Provider>;
};
export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};