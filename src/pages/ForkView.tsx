import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { users } from '../data/users';
import { GitForkIcon, GitBranchIcon, ArrowLeftIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export const ForkView: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    getRecipeById,
    recipes,
    getForksByOriginal
  } = useRecipes();
  if (!id) return <div>Recipe not found</div>;
  const recipe = getRecipeById(id);
  if (!recipe) return <div>Recipe not found</div>;
  const author = users.find(user => user.id === recipe.authorId);
  // Get all forks of this recipe
  const directForks = getForksByOriginal(id);
  // Get the original recipe if this is a fork
  const originalRecipe = recipe.originalId ? getRecipeById(recipe.originalId) : null;
  const originalAuthor = originalRecipe ? users.find(user => user.id === originalRecipe.authorId) : null;
  // Get all recipes in the fork tree (simplified version)
  const forkTree = [...(originalRecipe ? [originalRecipe] : []), recipe, ...(directForks.map(fork => getRecipeById(fork.forkedId)).filter(Boolean) as any[])];
  return <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link to={`/recipe/${id}`} className="text-indigo-600 hover:text-indigo-800 flex items-center">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to recipe
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <GitForkIcon className="h-6 w-6 mr-2 text-indigo-600" />
          Fork History
        </h1>
        <p className="mt-2 text-gray-600">
          Showing the version history and forks for{' '}
          <span className="font-medium">{recipe.title}</span>
        </p>
      </div>
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Version Timeline
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 left-6 h-full w-0.5 bg-gray-200"></div>
          <div className="space-y-8">
            {forkTree.map((forkRecipe, index) => {
            const isCurrentRecipe = forkRecipe.id === recipe.id;
            const recipeAuthor = users.find(user => user.id === forkRecipe.authorId);
            return <div key={forkRecipe.id} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute top-0 left-6 w-3 h-3 rounded-full transform -translate-x-1.5 ${isCurrentRecipe ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                  {/* Recipe card */}
                  <div className={`ml-12 p-4 rounded-lg ${isCurrentRecipe ? 'bg-indigo-50 border border-indigo-100' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <Link to={`/recipe/${forkRecipe.id}`} className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                          {forkRecipe.title}
                          {isCurrentRecipe && <span className="ml-2 text-indigo-600 text-sm">
                              (Current)
                            </span>}
                        </Link>
                        <div className="flex items-center mt-1">
                          <img src={recipeAuthor?.avatar} alt={recipeAuthor?.name} className="h-6 w-6 rounded-full mr-2" />
                          <span className="text-sm text-gray-600">
                            Created by{' '}
                            <Link to={`/profile/${recipeAuthor?.username}`} className="text-indigo-600 hover:text-indigo-800">
                              {recipeAuthor?.name}
                            </Link>
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDistanceToNow(new Date(forkRecipe.createdAt), {
                        addSuffix: true
                      })}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Link to={`/recipe/${forkRecipe.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          View Recipe
                        </Link>
                      </div>
                    </div>
                    {/* Show relationship to other recipes */}
                    {index > 0 && <div className="mt-3 flex items-center text-sm text-gray-500">
                        <GitBranchIcon className="h-4 w-4 mr-1" />
                        Forked from previous version
                      </div>}
                    {/* Display changes made in this fork (simplified) */}
                    {index > 0 && <div className="mt-3 text-sm">
                        <h4 className="font-medium text-gray-700">Changes:</h4>
                        <ul className="mt-1 list-disc list-inside text-gray-600">
                          <li>Updated ingredients or instructions</li>
                          <li>Modified cooking technique</li>
                          <li>Adjusted cooking times</li>
                        </ul>
                      </div>}
                  </div>
                </div>;
          })}
          </div>
        </div>
      </div>
      {/* Direct Forks Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Direct Forks ({directForks.length})
        </h2>
        {directForks.length > 0 ? <div className="space-y-4">
            {directForks.map(fork => {
          const forkRecipe = getRecipeById(fork.forkedId);
          if (!forkRecipe) return null;
          const forkAuthor = users.find(user => user.id === forkRecipe.authorId);
          return <div key={fork.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link to={`/recipe/${forkRecipe.id}`} className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                        {forkRecipe.title}
                      </Link>
                      <div className="flex items-center mt-1">
                        <img src={forkAuthor?.avatar} alt={forkAuthor?.name} className="h-6 w-6 rounded-full mr-2" />
                        <span className="text-sm text-gray-600">
                          Forked by{' '}
                          <Link to={`/profile/${forkAuthor?.username}`} className="text-indigo-600 hover:text-indigo-800">
                            {forkAuthor?.name}
                          </Link>
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(fork.createdAt), {
                    addSuffix: true
                  })}
                      </p>
                    </div>
                    <Link to={`/recipe/${forkRecipe.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View Recipe
                    </Link>
                  </div>
                </div>;
        })}
          </div> : <div className="text-center py-8">
            <GitForkIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No forks yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This recipe hasn't been forked by anyone yet.
            </p>
          </div>}
      </div>
    </div>;
};