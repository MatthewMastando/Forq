import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, UsersIcon, GitForkIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Recipe } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
interface RecipeCardProps {
  recipe: Recipe;
  authorName: string;
  authorAvatar: string;
  forkCount: number;
}
export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  authorName,
  authorAvatar,
  forkCount
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalTime = recipe.prepTime + recipe.cookTime;
  return <div className={`glass-card overflow-hidden transition-all duration-500 ${isExpanded ? 'expanded' : ''}`} style={{
    transformOrigin: 'center top'
  }}>
      <Link to={`/recipe/${recipe.id}`} className="block overflow-hidden">
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      <div className="p-3 sm:p-4">
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className="recipe-title text-base sm:text-lg font-bold text-[#3C2A21] hover:text-[#E25E3E] transition-colors animate-slide-in-right line-clamp-1">
            {recipe.title}
          </h3>
        </Link>
        <p className="mt-1 text-xs sm:text-sm text-[#5C4033] line-clamp-2 animate-slide-in-left" style={{
        animationDelay: '0.1s'
      }}>
          {recipe.description}
        </p>
        <div className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm text-[#5C4033] animate-fade-in" style={{
        animationDelay: '0.2s'
      }}>
          <div className="flex items-center tooltip">
            <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#E25E3E]" />
            <span>{totalTime} min</span>
            <span className="tooltip-text">Total time</span>
          </div>
          <div className="flex items-center ml-3 sm:ml-4 tooltip">
            <UsersIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#E25E3E]" />
            <span>{recipe.servings}</span>
            <span className="tooltip-text">Servings</span>
          </div>
          <div className="flex items-center ml-3 sm:ml-4 tooltip">
            <GitForkIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#6A8D39]" />
            <span>{forkCount}</span>
            <span className="tooltip-text">Forks</span>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 flex items-center animate-fade-in" style={{
        animationDelay: '0.3s'
      }}>
          <Link to={`/profile/${recipe.authorId}`}>
            <img src={authorAvatar} alt={authorName} className="h-6 w-6 sm:h-8 sm:w-8 rounded-full ring-1 ring-[#E25E3E]/30 mr-2" />
          </Link>
          <div>
            <Link to={`/profile/${recipe.authorId}`} className="text-xs sm:text-sm font-medium text-[#3C2A21] hover:text-[#E25E3E] transition-colors">
              {authorName}
            </Link>
            <p className="text-xs text-[#5C4033]">
              {formatDistanceToNow(new Date(recipe.createdAt), {
              addSuffix: true
            })}
            </p>
          </div>
        </div>
        {recipe.originalId && <div className="mt-2 text-xs text-[#5C4033] animate-fade-in" style={{
        animationDelay: '0.4s'
      }}>
            Forked from{' '}
            <Link to={`/recipe/${recipe.originalId}`} className="text-[#6A8D39] hover:text-[#55722E] transition-colors">
              original recipe
            </Link>
          </div>}
        {/* Expandable content */}
        <div className={`card-content mt-3 sm:mt-4 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} transition-all duration-500 overflow-hidden`}>
          <div className="border-t border-gray-100 pt-3 sm:pt-4 mt-2">
            <h4 className="font-medium text-xs sm:text-sm text-[#3C2A21] mb-2">
              Ingredients:
            </h4>
            <ul className="text-xs sm:text-sm text-[#5C4033] space-y-1">
              {recipe.ingredients.slice(0, 4).map(ingredient => <li key={ingredient.id} className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-[#E25E3E] mt-1.5 mr-2"></span>
                  <span>
                    {ingredient.quantity && <span className="font-medium">
                        {ingredient.quantity} {ingredient.unit}{' '}
                      </span>}
                    {ingredient.name}
                  </span>
                </li>)}
              {recipe.ingredients.length > 4 && <li className="text-[#E25E3E] text-xs">
                  + {recipe.ingredients.length - 4} more ingredients
                </li>}
            </ul>
          </div>
          <div className="mt-3 sm:mt-4">
            <h4 className="font-medium text-xs sm:text-sm text-[#3C2A21] mb-2">
              Tags:
            </h4>
            <div className="flex flex-wrap gap-1">
              {recipe.tags.map(tag => <Link key={tag} to={`/search?tag=${tag}`} className="bg-[#E25E3E]/10 text-[#E25E3E] px-1.5 py-0.5 rounded-md text-xs hover:bg-[#E25E3E]/20 transition-colors">
                  {tag}
                </Link>)}
            </div>
          </div>
        </div>
        {/* Expand/collapse button - larger touch target for mobile */}
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full mt-2 sm:mt-3 py-2 flex items-center justify-center text-xs text-[#E25E3E] hover:text-[#C04A2E] transition-colors">
          {isExpanded ? <>
              <ChevronUpIcon className="h-4 w-4 mr-1" />
              Show less
            </> : <>
              <ChevronDownIcon className="h-4 w-4 mr-1" />
              Show more
            </>}
        </button>
      </div>
    </div>;
};