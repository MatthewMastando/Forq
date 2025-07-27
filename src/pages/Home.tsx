import React, { useEffect, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCard } from '../components/RecipeCard';
import { HeroSection } from '../components/HeroSection';
import { users } from '../data/users';
import { ChefHatIcon, TrendingUpIcon, ClockIcon, SearchIcon, PlusIcon, ArrowRightIcon } from 'lucide-react';

export const Home: React.FC = () => {
    const {
    recipes,
    forks,
    loading
  } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');


  // Get the latest recipes
  const latestRecipes = [...recipes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
  // Get trending recipes (most forked)
  const recipeForkCounts = recipes.map(recipe => ({
    recipe,
    forkCount: forks.filter(fork => fork.originalId === recipe.id).length
  }));
  const trendingRecipes = [...recipeForkCounts].sort((a, b) => b.forkCount - a.forkCount).slice(0, 3).map(item => item.recipe);
  // Get quick recipes (shortest total time)
  const quickRecipes = [...recipes].sort((a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime)).slice(0, 3);
  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };
  const getRecipeForkCount = (recipeId: string) => {
    return forks.filter(fork => fork.originalId === recipeId).length;
  };
  // Popular tags
  const allTags = Array.from(new Set(recipes.flatMap(recipe => recipe.tags))).sort();
  const popularTags = allTags.slice(0, 8);
  return <div className="min-h-screen">
      {/* Hero Section - using the new split-screen hero */}
      <HeroSection popularTags={popularTags} />
      {/* Latest Recipes */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0F172A] flex items-center animate-slide-in-right">
            <ChefHatIcon className="h-6 w-6 mr-2 text-[#6366F1]" />
            Latest Recipes
          </h2>
          <Link to="/search" className="text-[#6366F1] hover:text-[#4F46E5] text-sm font-medium transition-colors flex items-center animate-slide-in-left">
            View all
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        {loading ? <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <div key={i} className="glass-card h-96 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="flex space-x-2 pt-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {latestRecipes.map(recipe => {
          const author = getUserById(recipe.authorId);
          return <RecipeCard key={recipe.id} recipe={recipe} authorName={author?.name || 'Unknown Chef'} authorAvatar={author?.avatar || ''} forkCount={getRecipeForkCount(recipe.id)} />;
        })}
          </div>}
      </div>

      {/* Trending Recipes */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0F172A] flex items-center animate-slide-in-right">
            <TrendingUpIcon className="h-6 w-6 mr-2 text-[#EC4899]" />
            Trending Recipes
          </h2>
          <Link to="/search?sort=trending" className="text-[#EC4899] hover:text-[#DB2777] text-sm font-medium transition-colors flex items-center animate-slide-in-left">
            View all
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        {loading ? <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <div key={i} className="glass-card h-96 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="flex space-x-2 pt-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {trendingRecipes.map(recipe => {
          const author = getUserById(recipe.authorId);
          return <RecipeCard key={recipe.id} recipe={recipe} authorName={author?.name || 'Unknown Chef'} authorAvatar={author?.avatar || ''} forkCount={getRecipeForkCount(recipe.id)} />;
        })}
          </div>}
      </div>

      {/* Quick Recipes */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0F172A] flex items-center animate-slide-in-right">
            <ClockIcon className="h-6 w-6 mr-2 text-[#F59E0B]" />
            Quick & Easy Recipes
          </h2>
          <Link to="/search?time=30" className="text-[#F59E0B] hover:text-[#D97706] text-sm font-medium transition-colors flex items-center animate-slide-in-left">
            View all
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        {loading ? <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <div key={i} className="glass-card h-96 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="flex space-x-2 pt-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {quickRecipes.map(recipe => {
          const author = getUserById(recipe.authorId);
          return <RecipeCard key={recipe.id} recipe={recipe} authorName={author?.name || 'Unknown Chef'} authorAvatar={author?.avatar || ''} forkCount={getRecipeForkCount(recipe.id)} />;
        })}
          </div>}
      </div>

      {/* Floating action button */}
      <Link to="/create" className="floating-action-button" aria-label="Create new recipe">
        <PlusIcon className="h-6 w-6" />
      </Link>
    </div>;
};