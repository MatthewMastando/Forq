import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCard } from '../components/RecipeCard';
import { users } from '../data/users';
import { SearchIcon, FilterIcon, XIcon, ChevronDownIcon, ChevronUpIcon, SlidersIcon } from 'lucide-react';
export const Search: React.FC = () => {
  const location = useLocation();
  const {
    recipes,
    forks,
    searchRecipes
  } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    difficulty?: string;
    tags?: string[];
    time?: number;
  }>({});
  const [sortBy, setSortBy] = useState<string>('newest');
  // Extract search parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const tag = params.get('tag');
    const time = params.get('time');
    const sort = params.get('sort');
    if (q) setSearchTerm(q);
    if (tag) setActiveFilters(prev => ({
      ...prev,
      tags: [tag]
    }));
    if (time) setActiveFilters(prev => ({
      ...prev,
      time: parseInt(time)
    }));
    if (sort) setSortBy(sort);
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, [location.search]);
  // Get all unique tags from recipes
  const allTags = Array.from(new Set(recipes.flatMap(recipe => recipe.tags))).sort();
  // Filter and sort recipes
  const filteredRecipes = useMemo(() => {
    let results = searchTerm ? searchRecipes(searchTerm, activeFilters) : [...recipes];
    // Apply tag filter if not already applied in searchRecipes
    if (!searchTerm && activeFilters.tags?.length) {
      results = results.filter(recipe => activeFilters.tags?.some(tag => recipe.tags.includes(tag)));
    }
    // Apply difficulty filter if not already applied in searchRecipes
    if (!searchTerm && activeFilters.difficulty) {
      results = results.filter(recipe => recipe.difficulty === activeFilters.difficulty);
    }
    // Apply time filter
    if (activeFilters.time) {
      results = results.filter(recipe => recipe.prepTime + recipe.cookTime <= activeFilters.time);
    }
    // Sort results
    switch (sortBy) {
      case 'newest':
        return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'trending':
        return results.sort((a, b) => {
          const aForks = forks.filter(fork => fork.originalId === a.id).length;
          const bForks = forks.filter(fork => fork.originalId === b.id).length;
          return bForks - aForks;
        });
      case 'quickest':
        return results.sort((a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime));
      default:
        return results;
    }
  }, [recipes, searchTerm, activeFilters, sortBy, forks, searchRecipes]);
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search parameters
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.set('q', searchTerm);
    if (activeFilters.tags?.length) searchParams.set('tag', activeFilters.tags[0]);
    if (activeFilters.time) searchParams.set('time', activeFilters.time.toString());
    if (sortBy !== 'newest') searchParams.set('sort', sortBy);
    window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  };
  // Toggle a tag filter
  const toggleTagFilter = (tag: string) => {
    setActiveFilters(prev => {
      const currentTags = prev.tags || [];
      const newTags = currentTags.includes(tag) ? currentTags.filter(t => t !== tag) : [...currentTags, tag];
      return {
        ...prev,
        tags: newTags.length ? newTags : undefined
      };
    });
  };
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
    setSortBy('newest');
    if (!searchTerm) {
      window.history.pushState({}, '', window.location.pathname);
    } else {
      const searchParams = new URLSearchParams();
      searchParams.set('q', searchTerm);
      window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    }
  };
  // Get user information for recipe cards
  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };
  // Get fork count for recipe cards
  const getRecipeForkCount = (recipeId: string) => {
    return forks.filter(fork => fork.originalId === recipeId).length;
  };
  // Count active filters for badge
  const activeFilterCount = Object.keys(activeFilters).length + (sortBy !== 'newest' ? 1 : 0);
  return <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Search header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
          {searchTerm ? `Results for "${searchTerm}"` : 'All Recipes'}
        </h1>
        <p className="mt-1 sm:mt-2 text-sm text-[#64748B]">
          {filteredRecipes.length}{' '}
          {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
        </p>
      </div>

      {/* Search form */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search recipes..." className="form-input block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg bg-white text-gray-900" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button type="button" onClick={() => setShowFilters(!showFilters)} className="min-w-[44px] h-[44px] px-2 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-[#0F172A] hover:bg-gray-50 flex items-center justify-center" aria-label="Filters">
            <SlidersIcon className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && <span className="ml-1 bg-[#6366F1] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {activeFilterCount}
              </span>}
          </button>
          <button type="submit" className="px-4 sm:px-6 py-2 sm:py-3 bg-[#6366F1] text-white rounded-lg hover:bg-[#4F46E5] transition-colors">
            Search
          </button>
        </form>

        {/* Filters panel */}
        {showFilters && <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-[#0F172A]">Filter & Sort</h3>
              {activeFilterCount > 0 && <button onClick={clearFilters} className="text-sm text-[#6366F1] hover:text-[#4F46E5] flex items-center">
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear all
                </button>}
            </div>

            {/* Mobile-friendly filter layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Difficulty filter */}
              <div>
                <h4 className="font-medium text-sm text-[#0F172A] mb-2">
                  Difficulty
                </h4>
                <div className="space-y-3">
                  {['easy', 'medium', 'hard'].map(difficulty => <label key={difficulty} className="flex items-center">
                      <input type="radio" name="difficulty" checked={activeFilters.difficulty === difficulty} onChange={() => setActiveFilters(prev => ({
                  ...prev,
                  difficulty: prev.difficulty === difficulty ? undefined : difficulty
                }))} className="h-4 w-4 text-[#6366F1] focus:ring-[#6366F1]" />
                      <span className="ml-2 text-sm text-[#334155] capitalize">
                        {difficulty}
                      </span>
                    </label>)}
                </div>
              </div>

              {/* Time filter */}
              <div>
                <h4 className="font-medium text-sm text-[#0F172A] mb-2">
                  Total Time
                </h4>
                <div className="space-y-3">
                  {[30, 60, 120].map(time => <label key={time} className="flex items-center">
                      <input type="radio" name="time" checked={activeFilters.time === time} onChange={() => setActiveFilters(prev => ({
                  ...prev,
                  time: prev.time === time ? undefined : time
                }))} className="h-4 w-4 text-[#6366F1] focus:ring-[#6366F1]" />
                      <span className="ml-2 text-sm text-[#334155]">
                        Under {time} minutes
                      </span>
                    </label>)}
                </div>
              </div>

              {/* Sort options */}
              <div>
                <h4 className="font-medium text-sm text-[#0F172A] mb-2">
                  Sort By
                </h4>
                <div className="space-y-3">
                  {[{
                id: 'newest',
                label: 'Newest first'
              }, {
                id: 'oldest',
                label: 'Oldest first'
              }, {
                id: 'trending',
                label: 'Most popular'
              }, {
                id: 'quickest',
                label: 'Quickest to make'
              }].map(option => <label key={option.id} className="flex items-center">
                      <input type="radio" name="sortBy" checked={sortBy === option.id} onChange={() => setSortBy(option.id)} className="h-4 w-4 text-[#6366F1] focus:ring-[#6366F1]" />
                      <span className="ml-2 text-sm text-[#334155]">
                        {option.label}
                      </span>
                    </label>)}
                </div>
              </div>
            </div>

            {/* Tags - scrollable on mobile */}
            <div className="mt-6">
              <h4 className="font-medium text-sm text-[#0F172A] mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2 max-h-32 sm:max-h-none overflow-y-auto sm:overflow-visible pb-1">
                {allTags.map(tag => <button key={tag} onClick={() => toggleTagFilter(tag)} className={`px-3 py-1.5 text-sm rounded-full ${activeFilters.tags?.includes(tag) ? 'bg-[#6366F1] text-white' : 'bg-gray-100 text-[#334155] hover:bg-gray-200'} transition-colors`}>
                    {tag}
                  </button>)}
              </div>
            </div>
          </div>}

        {/* Active filters display - scrollable on mobile */}
        {activeFilterCount > 0 && <div className="mt-4 flex overflow-x-auto pb-1 hide-scrollbar">
            <div className="flex flex-nowrap gap-2">
              {activeFilters.difficulty && <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-sm whitespace-nowrap">
                  <span className="capitalize">{activeFilters.difficulty}</span>
                  <button onClick={() => setActiveFilters(prev => ({
              ...prev,
              difficulty: undefined
            }))} className="ml-1 text-gray-500 hover:text-gray-700">
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>}
              {activeFilters.time && <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-sm whitespace-nowrap">
                  <span>Under {activeFilters.time} min</span>
                  <button onClick={() => setActiveFilters(prev => ({
              ...prev,
              time: undefined
            }))} className="ml-1 text-gray-500 hover:text-gray-700">
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>}
              {activeFilters.tags?.map(tag => <div key={tag} className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-sm whitespace-nowrap">
                  <span>{tag}</span>
                  <button onClick={() => toggleTagFilter(tag)} className="ml-1 text-gray-500 hover:text-gray-700">
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>)}
              {sortBy !== 'newest' && <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-sm whitespace-nowrap">
                  <span>
                    {sortBy === 'oldest' && 'Oldest first'}
                    {sortBy === 'trending' && 'Most popular'}
                    {sortBy === 'quickest' && 'Quickest to make'}
                  </span>
                  <button onClick={() => setSortBy('newest')} className="ml-1 text-gray-500 hover:text-gray-700">
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>}
            </div>
          </div>}
      </div>

      {/* Results */}
      {isLoading ? <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="glass-card h-72 sm:h-96 animate-pulse">
              <div className="h-40 sm:h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="flex space-x-2 pt-2">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 rounded-full"></div>
                  <div className="space-y-1">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-2 sm:h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>)}
        </div> : <>
          {filteredRecipes.length > 0 ? <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map(recipe => {
          const author = getUserById(recipe.authorId);
          return <RecipeCard key={recipe.id} recipe={recipe} authorName={author?.name || 'Unknown Chef'} authorAvatar={author?.avatar || ''} forkCount={getRecipeForkCount(recipe.id)} />;
        })}
            </div> : <div className="text-center py-12 sm:py-16">
              <SearchIcon className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No recipes found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
              <button onClick={clearFilters} className="mt-4 sm:mt-6 px-4 py-2 bg-[#6366F1] text-white rounded-md hover:bg-[#4F46E5]">
                Clear all filters
              </button>
            </div>}
        </>}

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>;
};