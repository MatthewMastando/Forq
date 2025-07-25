import React, { useEffect, useState, useRef, createElement, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, GitForkIcon, ChefHatIcon, BookmarkIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
interface HeroSectionProps {
  popularTags: string[];
}
export const HeroSection: React.FC<HeroSectionProps> = ({
  popularTags
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    recipes,
    forks
  } = useRecipes();
  // Generate recipe cards from actual recipe data
  // Filter out Butter Chicken (recipe-4) and ensure Salmon (recipe-21) is included
  const salmonRecipe = recipes.find(recipe => recipe.id === 'recipe-21');
  const filteredRecipes = recipes.filter(recipe => recipe.id !== 'recipe-4') // Filter out Butter Chicken
  .slice(0, 5); // Take first 5 recipes
  // If salmon isn't in first 5, replace the last one with salmon
  const recipesToShow = [...filteredRecipes];
  if (salmonRecipe && !filteredRecipes.some(r => r.id === 'recipe-21')) {
    recipesToShow[recipesToShow.length - 1] = salmonRecipe;
  }
  const recipeCards = recipesToShow.map((recipe, index) => {
    const isOriginal = !recipe.originalId;
    return {
      id: index + 1,
      title: recipe.title,
      description: recipe.description.substring(0, 60) + (recipe.description.length > 60 ? '...' : ''),
      image: recipe.image,
      icon: isOriginal ? BookmarkIcon : GitForkIcon,
      iconColor: isOriginal ? '#6366F1' : '#EC4899',
      tag: isOriginal ? 'Original' : 'Forked Recipe',
      rotation: (index % 2 === 0 ? -1 : 1) * (Math.floor(Math.random() * 10) + 3),
      recipeId: recipe.id
    };
  });
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  // Get visible cards (current, previous, and next)
  const visibleCards = () => {
    const cards = recipeCards.length;
    return [(currentCardIndex - 1 + cards) % cards, currentCardIndex, (currentCardIndex + 1) % cards];
  };
  // Handle navigation
  const goToNextCard = () => {
    setCurrentCardIndex(prevIndex => (prevIndex + 1) % recipeCards.length);
  };
  const goToPrevCard = () => {
    setCurrentCardIndex(prevIndex => (prevIndex - 1 + recipeCards.length) % recipeCards.length);
  };
  // Touch event handlers for swiping
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartTime(Date.now());
  };
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endTime = Date.now();
    const timeElapsed = endTime - startTime;
    // If it was a quick tap/click (less than 300ms) and didn't move much, treat as a click
    if (timeElapsed < 300 && Math.abs(translateX) < 10) {
      // Handle as click - will be handled by the Link component
    }
    // Otherwise handle as swipe
    else if (translateX > 50) {
      goToPrevCard();
    } else if (translateX < -50) {
      goToNextCard();
    }
    setTranslateX(0);
  };
  // Handle card click - navigate to recipe page
  const handleCardClick = (recipeId: string) => {
    if (!isDragging || Math.abs(translateX) < 10) {
      navigate(`/recipe/${recipeId}`);
    }
  };
  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextCard();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentCardIndex]);
  const [visible, prev, next] = visibleCards();
  return <div className="relative overflow-hidden bg-white">
      {/* Split screen container - stacks vertically on mobile */}
      <div className="flex flex-col md:flex-row">
        {/* Left section */}
        <div className="w-full md:w-1/2 px-4 py-8 md:py-20 md:px-12 lg:px-16 flex flex-col justify-center relative">
          {/* Dot pattern background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(#E25E3E 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#E25E3E] animate-slide-in-right">
              Cook. Share. <span className="text-[#6A8D39]">Remix.</span>
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-xl text-[#5C4033] max-w-md animate-slide-in-left">
              Fork, modify, and share recipes with the community. Discover new
              variations and contribute your own culinary ideas.
            </p>
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3 animate-fade-in">
              <Link to="/create" className="btn-primary px-4 md:px-6 py-2 md:py-3 rounded-md text-white bg-[#E25E3E]/80 hover:bg-[#E25E3E] transition-all flex items-center">
                <ChefHatIcon className="h-5 w-5 mr-2" />
                Create Recipe
              </Link>
              <Link to="/search" className="btn-secondary px-4 md:px-6 py-2 md:py-3 rounded-md text-[#E25E3E] border border-[#E25E3E] hover:bg-[#E25E3E]/10 transition-all flex items-center">
                <SearchIcon className="h-5 w-5 mr-2" />
                Explore Recipes
              </Link>
            </div>
          </div>
        </div>
        {/* Right section */}
        <div className="w-full md:w-1/2 px-4 py-8 md:py-20 flex items-center justify-center relative bg-gradient-to-br from-[#FFF8EA] to-[#F8EAD8] min-h-[300px] md:min-h-0">
          {/* Carousel navigation */}
          <div className="absolute top-1/2 left-2 md:left-4 z-20 transform -translate-y-1/2">
            <button onClick={goToPrevCard} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all">
              <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6 text-[#E25E3E]" />
            </button>
          </div>
          <div className="absolute top-1/2 right-2 md:right-4 z-20 transform -translate-y-1/2">
            <button onClick={goToNextCard} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all">
              <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6 text-[#E25E3E]" />
            </button>
          </div>
          {/* Carousel indicators */}
          <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {recipeCards.map((_, index) => <button key={index} onClick={() => setCurrentCardIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentCardIndex ? 'bg-[#E25E3E] w-6' : 'bg-gray-300'}`} />)}
          </div>
          {/* Interactive recipe cards */}
          <div ref={carouselRef} className="relative w-full max-w-xs md:max-w-md h-56 md:h-80 touch-manipulation" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}>
            {recipeCards.map((card, index) => {
            // Calculate position based on current index
            let position = 'hidden';
            let zIndex = 0;
            let scale = 0.8;
            let translateY = '0%';
            let translateX = '0%';
            let rotation = card.rotation;
            // Reduce rotation angle on mobile for better visibility
            const mobileRotation = window.innerWidth < 768 ? rotation / 2 : rotation;
            if (index === currentCardIndex) {
              position = 'center';
              zIndex = 30;
              scale = 1;
              translateY = '-50%';
              translateX = '-50%';
            } else if (index === (currentCardIndex - 1 + recipeCards.length) % recipeCards.length) {
              position = 'left';
              zIndex = 20;
              translateY = '-60%';
              translateX = '-70%';
            } else if (index === (currentCardIndex + 1) % recipeCards.length) {
              position = 'right';
              zIndex = 20;
              translateY = '-40%';
              translateX = '-30%';
            }
            return <Link key={card.id} to={`/recipe/${card.recipeId}`} className={`glass-card absolute left-1/2 top-1/2 w-56 md:w-64 h-64 md:h-80 shadow-lg transition-all duration-500 cursor-pointer ${position === 'hidden' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{
              transform: `translate(${translateX}, ${translateY}) rotate(${mobileRotation}deg) scale(${scale})`,
              zIndex,
              display: position === 'hidden' ? 'none' : 'block'
            }} onClick={e => {
              if (isDragging && Math.abs(translateX) > 10) {
                e.preventDefault(); // Prevent navigation if dragging
              }
            }}>
                  <div className="h-32 md:h-40 overflow-hidden rounded-t-lg">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-bold text-sm md:text-base text-[#3C2A21]">
                      {card.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#5C4033] mt-1 line-clamp-2">
                      {card.description}
                    </p>
                    <div className="flex items-center mt-2 md:mt-3 text-xs text-[#5C4033]">
                      {card.icon && createElement(card.icon, {
                    className: `h-3 w-3 md:h-4 md:w-4 mr-1 text-[${card.iconColor}]`
                  })}
                      <span>{card.tag}</span>
                    </div>
                  </div>
                </Link>;
          })}
            {/* Fork icon animation */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 animate-fork">
              <GitForkIcon className="h-10 w-10 md:h-12 md:w-12 text-[#6A8D39]" />
            </div>
          </div>
        </div>
      </div>
      {/* Search bar spanning both sections */}
      <div className="w-full bg-gradient-to-r from-[#E25E3E]/5 to-[#6A8D39]/5 py-6 md:py-8 px-4 md:px-12 lg:px-16">
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search for recipes or ingredients..." className="form-input block w-full pl-10 pr-3 py-3 md:py-4 border-0 rounded-lg shadow-lg bg-white/90 backdrop-blur-sm text-gray-900" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            }
          }} />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button type="submit" className={`inline-flex items-center px-3 md:px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E25E3E] hover:bg-[#C04A2E] ${!searchQuery.trim() ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!searchQuery.trim()}>
                Search
              </button>
            </div>
          </div>
          {/* Popular tags - scrollable on mobile */}
          <div className="mt-3 md:mt-4 flex items-center overflow-x-auto md:flex-wrap md:justify-center gap-2 pb-1 md:pb-0 hide-scrollbar">
            <span className="text-xs md:text-sm text-[#5C4033] whitespace-nowrap">
              Popular:
            </span>
            {popularTags.map(tag => <Link key={tag} to={`/search?tag=${tag}`} className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm bg-white hover:bg-[#E25E3E]/10 hover:text-[#E25E3E] text-[#5C4033] rounded-full transition-all duration-300 shadow-sm whitespace-nowrap">
                {tag}
              </Link>)}
          </div>
        </form>
      </div>
      {/* CSS for the fork animation and scrollbar hiding */}
      <style jsx>{`
        @keyframes fork {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-fork {
          animation: fork 3s infinite;
        }
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