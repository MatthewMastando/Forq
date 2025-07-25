import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { CommentSection } from '../components/CommentSection';
import { users } from '../data/users';
import { ClockIcon, UsersIcon, ChefHatIcon, GitForkIcon, HistoryIcon, StarIcon, PrinterIcon, ShareIcon, CheckIcon, ChevronsUpDownIcon, PlayIcon, PauseIcon, XIcon, ChevronsRightIcon, ChevronsLeftIcon, BookmarkIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export const RecipeDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    getRecipeById,
    getCommentsByRecipe,
    getForksByOriginal,
    forkRecipe
  } = useRecipes();
  const {
    currentUser
  } = useAuth();
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [cookingMode, setCookingMode] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [timer, setTimer] = useState<{
    active: boolean;
    seconds: number;
    interval?: NodeJS.Timeout;
  }>({
    active: false,
    seconds: 0
  });
  const [showForkAnimation, setShowForkAnimation] = useState(false);
  useEffect(() => {
    // Clear timer on component unmount
    return () => {
      if (timer.interval) {
        clearInterval(timer.interval);
      }
    };
  }, [timer.interval]);
  if (!id) return <div>Recipe not found</div>;
  const recipe = getRecipeById(id);
  if (!recipe) return <div>Recipe not found</div>;
  const comments = getCommentsByRecipe(id);
  const forks = getForksByOriginal(id);
  const author = users.find(user => user.id === recipe.authorId);
  const originalRecipe = recipe.originalId ? getRecipeById(recipe.originalId) : null;
  const originalAuthor = originalRecipe ? users.find(user => user.id === originalRecipe.authorId) : null;
  const totalSteps = recipe.steps.length;
  const progressPercentage = completedSteps.length / totalSteps * 100;
  const toggleStepCompletion = (stepId: string) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };
  const toggleIngredientCheck = (ingredientId: string) => {
    if (checkedIngredients.includes(ingredientId)) {
      setCheckedIngredients(checkedIngredients.filter(id => id !== ingredientId));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredientId]);
    }
  };
  const startTimer = (minutes: number) => {
    // Clear any existing timer
    if (timer.interval) {
      clearInterval(timer.interval);
    }
    setTimerCompleted(false);
    const totalSeconds = minutes * 60;
    setTimer({
      active: true,
      seconds: totalSeconds,
      interval: setInterval(() => {
        setTimer(prev => {
          if (prev.seconds <= 1) {
            // Timer finished
            if (prev.interval) clearInterval(prev.interval);
            setTimerCompleted(true);
            return {
              active: false,
              seconds: 0
            };
          }
          return {
            ...prev,
            seconds: prev.seconds - 1
          };
        });
      }, 1000)
    });
  };
  const pauseTimer = () => {
    if (timer.interval) {
      clearInterval(timer.interval);
      setTimer(prev => ({
        ...prev,
        active: false,
        interval: undefined
      }));
    }
  };
  const resumeTimer = () => {
    if (!timer.active && timer.seconds > 0) {
      setTimer(prev => ({
        ...prev,
        active: true,
        interval: setInterval(() => {
          setTimer(prev => {
            if (prev.seconds <= 1) {
              if (prev.interval) clearInterval(prev.interval);
              return {
                active: false,
                seconds: 0
              };
            }
            return {
              ...prev,
              seconds: prev.seconds - 1
            };
          });
        }, 1000)
      }));
    }
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  const handleFork = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    // Show fork animation
    setShowForkAnimation(true);
    // After animation completes, create the fork and navigate
    setTimeout(() => {
      const forkedRecipe = forkRecipe(id, {
        authorId: currentUser.id
      });
      navigate(`/edit/${forkedRecipe.id}`);
    }, 1500);
  };
  const adjustQuantity = (quantity: string, multiplier: number) => {
    const numericValue = parseFloat(quantity);
    if (isNaN(numericValue)) return quantity;
    return (numericValue * multiplier).toFixed(1).replace(/\.0$/, '');
  };
  const nextStep = () => {
    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  return <div className="bg-white/80 backdrop-blur-sm">
      {/* Progress bar for completed steps */}
      <div className="recipe-progress-bar">
        <div className="progress" style={{
        width: `${progressPercentage}%`
      }}></div>
      </div>
      {/* Fork animation overlay */}
      {showForkAnimation && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <GitForkIcon className="h-16 w-16 text-white mx-auto mb-4 animate-bounce" />
            <h2 className="text-white text-xl font-bold animate-fade-in">
              Forking Recipe...
            </h2>
            <p className="text-white/80 animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
              Creating your personal version
            </p>
          </div>
        </div>}
      {/* Cooking mode */}
      {cookingMode && <div className="fixed inset-0 bg-white z-40 overflow-hidden">
          <div className="absolute top-4 right-4 flex space-x-4">
            <button onClick={() => setCookingMode(false)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <XIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="cooking-mode-container">
            <div className="ingredients-panel glass-card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <ChefHatIcon className="h-5 w-5 mr-2 text-[#6366F1]" />
                Ingredients
              </h2>
              <div className="interactive-checklist">
                {recipe.ingredients.map(ingredient => <div key={ingredient.id} className={`checklist-item flex items-start p-2 rounded-md transition-all duration-300 ${checkedIngredients.includes(ingredient.id) ? 'completed bg-green-50' : ''}`}>
                    <div className={`checkbox flex-shrink-0 w-5 h-5 border-2 rounded-md mr-3 cursor-pointer transition-all duration-300 ${checkedIngredients.includes(ingredient.id) ? 'checked border-green-500 bg-green-500' : 'border-gray-300'}`} onClick={() => toggleIngredientCheck(ingredient.id)}>
                      {checkedIngredients.includes(ingredient.id) && <CheckIcon className="h-4 w-4 text-white animate-checkmark" />}
                    </div>
                    <span className="text-[#334155]">
                      {ingredient.quantity && <span className="font-medium">
                          {adjustQuantity(ingredient.quantity, servingsMultiplier)}{' '}
                          {ingredient.unit}{' '}
                        </span>}
                      {ingredient.name}
                    </span>
                  </div>)}
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Adjust servings:
                </h3>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">½×</span>
                  <input type="range" min="0.5" max="4" step="0.5" value={servingsMultiplier} onChange={e => setServingsMultiplier(parseFloat(e.target.value))} className="serving-slider flex-grow" />
                  <span className="text-sm text-gray-600 ml-2">4×</span>
                </div>
                <div className="text-center mt-1 text-sm font-medium">
                  {servingsMultiplier}× (
                  {Math.round(recipe.servings * servingsMultiplier)} servings)
                </div>
              </div>
            </div>
            <div className="steps-panel glass-card">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-[#6366F1]" />
                  Step {currentStepIndex + 1} of {recipe.steps.length}
                </h2>
                {timer.seconds > 0 && <div className="flex items-center space-x-2">
                    <div className={`text-lg font-mono ${timer.seconds < 10 ? 'text-red-500 animate-pulse' : 'text-[#0F172A]'}`}>
                      {formatTime(timer.seconds)}
                    </div>
                    {timer.active ? <button onClick={pauseTimer} className="p-1 rounded-full bg-gray-100">
                        <PauseIcon className="h-4 w-4 text-gray-600" />
                      </button> : <button onClick={resumeTimer} className="p-1 rounded-full bg-gray-100">
                        <PlayIcon className="h-4 w-4 text-gray-600" />
                      </button>}
                  </div>}
              </div>
              <div className="mb-8">
                <div className="relative h-1 bg-gray-200 rounded overflow-hidden">
                  <div className="absolute h-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] transition-all duration-300" style={{
                width: `${(currentStepIndex + 1) / recipe.steps.length * 100}%`
              }}></div>
                </div>
              </div>
              <div className="p-6 glass-card animate-scale-up">
                <p className="text-lg text-[#334155]">
                  {recipe.steps[currentStepIndex].description}
                </p>
                {/* Timer suggestion */}
                {recipe.steps[currentStepIndex].description.toLowerCase().includes('minute') && !timer.active && timer.seconds === 0 && <button onClick={() => {
              // Extract minutes from the description (simplified)
              const match = recipe.steps[currentStepIndex].description.match(/(\d+)[\s-]*minute/);
              if (match && match[1]) {
                startTimer(parseInt(match[1]));
              } else {
                startTimer(5); // Default 5 minutes
              }
            }} className="mt-4 flex items-center text-sm text-[#6366F1] hover:text-[#4F46E5] transition-colors">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Set timer for this step
                    </button>}
                <div className="mt-6 flex justify-between">
                  <button onClick={prevStep} disabled={currentStepIndex === 0} className={`flex items-center px-3 py-1 rounded-md text-sm ${currentStepIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#6366F1] hover:bg-[#6366F1]/10'}`}>
                    <ChevronsLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                  </button>
                  <button onClick={() => {
                toggleStepCompletion(recipe.steps[currentStepIndex].id);
                if (currentStepIndex < recipe.steps.length - 1) {
                  setTimeout(() => {
                    nextStep();
                  }, 500);
                }
              }} className="flex items-center px-4 py-2 bg-[#6366F1] text-white rounded-md hover:bg-[#4F46E5] transition-colors">
                    <CheckIcon className="h-4 w-4 mr-1" />
                    {completedSteps.includes(recipe.steps[currentStepIndex].id) ? 'Completed' : 'Mark Complete'}
                  </button>
                  <button onClick={nextStep} disabled={currentStepIndex === recipe.steps.length - 1} className={`flex items-center px-3 py-1 rounded-md text-sm ${currentStepIndex === recipe.steps.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#6366F1] hover:bg-[#6366F1]/10'}`}>
                    Next
                    <ChevronsRightIcon className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium text-[#0F172A] mb-4">
                  All Steps
                </h3>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => <li key={step.id} className={`flex p-3 rounded-md transition-all duration-300 ${currentStepIndex === index ? 'bg-[#6366F1]/10' : ''} ${completedSteps.includes(step.id) ? 'opacity-60' : ''}`} onClick={() => setCurrentStepIndex(index)}>
                      <div className="flex-shrink-0 mr-4">
                        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${completedSteps.includes(step.id) ? 'bg-[#10B981] text-white' : currentStepIndex === index ? 'bg-[#6366F1] text-white' : 'bg-[#6366F1]/10 text-[#6366F1]'} font-medium transition-all duration-300`}>
                          {completedSteps.includes(step.id) ? <CheckIcon className="h-4 w-4 animate-checkmark" /> : index + 1}
                        </div>
                      </div>
                      <div>
                        <p className={`text-[#334155] ${completedSteps.includes(step.id) ? 'line-through' : ''}`}>
                          {step.description}
                        </p>
                      </div>
                    </li>)}
                </ol>
              </div>
            </div>
          </div>
        </div>}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Recipe Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="recipe-title text-3xl font-bold text-[#0F172A] animate-slide-in-right">
              {recipe.title}
            </h1>
            <div className="mt-4 md:mt-0 flex space-x-4 animate-slide-in-left">
              <button onClick={handleFork} className="btn-primary inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-[#6366F1]/80 hover:bg-[#6366F1]">
                <GitForkIcon className="mr-2 h-4 w-4" />
                Fork Recipe
              </button>
              <button className="btn-secondary inline-flex items-center px-4 py-2 border border-[#6366F1] rounded-md shadow-sm text-sm font-medium text-[#6366F1] bg-transparent hover:bg-[#6366F1]/10">
                <BookmarkIcon className="mr-2 h-4 w-4" />
                Save
              </button>
              <button className="btn-icon p-2 rounded-full text-[#6366F1] hover:text-[#4F46E5] focus:outline-none">
                <ShareIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          {recipe.originalId && <div className="mt-2 text-sm text-[#64748B] animate-fade-in" style={{
          animationDelay: '0.1s'
        }}>
              Forked from{' '}
              <Link to={`/recipe/${recipe.originalId}`} className="text-[#EC4899] hover:text-[#DB2777] transition-colors">
                {originalRecipe?.title}
              </Link>{' '}
              by{' '}
              <Link to={`/profile/${originalAuthor?.username}`} className="text-[#EC4899] hover:text-[#DB2777] transition-colors">
                {originalAuthor?.name}
              </Link>
            </div>}
          <div className="mt-4 flex items-center animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <Link to={`/profile/${author?.username}`}>
              <img src={author?.avatar} alt={author?.name} className="h-10 w-10 rounded-full ring-2 ring-[#6366F1]/30 mr-2" />
            </Link>
            <div>
              <Link to={`/profile/${author?.username}`} className="text-sm font-medium text-[#0F172A] hover:text-[#6366F1] transition-colors">
                {author?.name}
              </Link>
              <p className="text-xs text-[#64748B]">
                {formatDistanceToNow(new Date(recipe.createdAt), {
                addSuffix: true
              })}
              </p>
            </div>
          </div>
        </div>
        {/* Recipe Image and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 animate-scale-up">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={recipe.image} alt={recipe.title} className="w-full h-96 object-cover" />
            </div>
            <p className="mt-4 text-[#334155] animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              {recipe.description}
            </p>
            <div className="mt-6 flex justify-center">
              <button onClick={() => setCookingMode(true)} className="btn-primary inline-flex items-center px-6 py-3 rounded-md shadow-sm font-medium text-white bg-[#6366F1]/80 hover:bg-[#6366F1] animate-pulse">
                <ChefHatIcon className="mr-2 h-5 w-5" />
                Start Cooking Mode
              </button>
            </div>
          </div>
          <div className="glass-card p-6 animate-slide-in-left">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                Recipe Info
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-[#6366F1] mr-2" />
                  <div>
                    <p className="text-sm text-[#64748B]">Prep Time</p>
                    <p className="text-sm font-medium">{recipe.prepTime} min</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-[#6366F1] mr-2" />
                  <div>
                    <p className="text-sm text-[#64768B]">Cook Time</p>
                    <p className="text-sm font-medium">{recipe.cookTime} min</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="h-5 w-5 text-[#6366F1] mr-2" />
                  <div>
                    <p className="text-sm text-[#64748B]">Servings</p>
                    <p className="text-sm font-medium">{recipe.servings}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ChefHatIcon className="h-5 w-5 text-[#6366F1] mr-2" />
                  <div>
                    <p className="text-sm text-[#64748B]">Difficulty</p>
                    <p className="text-sm font-medium capitalize">
                      {recipe.difficulty}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map(tag => <Link key={tag} to={`/search?tag=${tag}`} className="bg-[#6366F1]/10 text-[#6366F1] px-2 py-1 rounded-md text-xs font-medium hover:bg-[#6366F1]/20 transition-colors">
                    {tag}
                  </Link>)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                Recipe Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <GitForkIcon className="h-5 w-5 text-[#EC4899] mr-2" />
                  <div>
                    <p className="text-sm text-[#64748B]">Forks</p>
                    <p className="text-sm font-medium">{forks.length}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <HistoryIcon className="h-5 w-5 text-[#6366F1] mr-2" />
                  <div>
                    <p className="text-sm text-[#64748B]">Version</p>
                    <p className="text-sm font-medium">{recipe.version}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-[#F59E0B] mr-2" />
                  <div>
                    <p className="text-sm text-[#64748B]">Rating</p>
                    <p className="text-sm font-medium">4.8/5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Ingredients and Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="animate-slide-in-right">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#0F172A]">
                Ingredients
              </h2>
              <div className="flex items-center">
                <label htmlFor="servings" className="mr-2 text-sm text-[#64748B]">
                  Servings:
                </label>
                <div className="relative">
                  <input type="range" id="servings" min="0.5" max="4" step="0.5" value={servingsMultiplier} onChange={e => setServingsMultiplier(parseFloat(e.target.value))} className="serving-slider w-24" />
                  <div className="absolute top-6 left-0 right-0 text-center text-xs font-medium text-[#6366F1]">
                    {servingsMultiplier}× (
                    {Math.round(recipe.servings * servingsMultiplier)})
                  </div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 glass-card p-4 interactive-checklist">
              {recipe.ingredients.map(ingredient => <li key={ingredient.id} className={`checklist-item flex items-start p-2 rounded-md transition-all duration-300 ${checkedIngredients.includes(ingredient.id) ? 'completed bg-green-50' : ''}`}>
                  <div className={`checkbox flex-shrink-0 w-5 h-5 border-2 rounded-md mr-3 cursor-pointer transition-all duration-300 ${checkedIngredients.includes(ingredient.id) ? 'checked border-green-500 bg-green-500' : 'border-gray-300'}`} onClick={() => toggleIngredientCheck(ingredient.id)}>
                    {checkedIngredients.includes(ingredient.id) && <CheckIcon className="h-4 w-4 text-white animate-checkmark" />}
                  </div>
                  <span className={`text-[#334155] ${checkedIngredients.includes(ingredient.id) ? 'line-through opacity-60' : ''}`}>
                    {ingredient.quantity && <span className="font-medium">
                        {adjustQuantity(ingredient.quantity, servingsMultiplier)}{' '}
                        {ingredient.unit}{' '}
                      </span>}
                    {ingredient.name}
                  </span>
                </li>)}
            </ul>
          </div>
          <div className="lg:col-span-2 animate-slide-in-left">
            <h2 className="text-xl font-semibold text-[#0F172A] mb-4 flex items-center justify-between">
              <span>Instructions</span>
              <button onClick={() => setCookingMode(true)} className="text-sm text-[#6366F1] hover:text-[#4F46E5] flex items-center">
                <ChefHatIcon className="h-4 w-4 mr-1" />
                Cooking Mode
              </button>
            </h2>
            <ol className="space-y-6 glass-card p-6">
              {recipe.steps.map((step, index) => <li key={step.id} className={`flex transition-all duration-300 ${completedSteps.includes(step.id) ? 'opacity-60' : ''}`}>
                  <div className="flex-shrink-0 mr-4">
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full ${completedSteps.includes(step.id) ? 'bg-[#10B981] text-white' : 'bg-[#6366F1]/10 text-[#6366F1]'} font-medium transition-all duration-300 cursor-pointer`} onClick={() => toggleStepCompletion(step.id)}>
                      {completedSteps.includes(step.id) ? <CheckIcon className="h-4 w-4 animate-checkmark" /> : index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className={`text-[#334155] ${completedSteps.includes(step.id) ? 'line-through' : ''}`}>
                      {step.description}
                    </p>
                    {/* Timer suggestion */}
                    {step.description.toLowerCase().includes('minute') && <button onClick={() => {
                  // Extract minutes from the description (simplified)
                  const match = step.description.match(/(\d+)[\s-]*minute/);
                  if (match && match[1]) {
                    startTimer(parseInt(match[1]));
                  } else {
                    startTimer(5); // Default 5 minutes
                  }
                }} className="mt-2 flex items-center text-sm text-[#6366F1] hover:text-[#4F46E5] transition-colors">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Set timer for{' '}
                        {step.description.match(/(\d+)[\s-]*minute/)?.[1] || '5'}{' '}
                        minutes
                      </button>}
                  </div>
                </li>)}
            </ol>
          </div>
        </div>
        {/* Version History */}
        {recipe.originalId && <div className="mb-8 animate-fade-in" style={{
        animationDelay: '0.3s'
      }}>
            <h2 className="text-xl font-semibold text-[#0F172A] mb-4 flex items-center">
              <HistoryIcon className="h-5 w-5 mr-2 text-[#6366F1]" />
              Version History
            </h2>
            <div className="glass-card p-4 fork-tree">
              <div className="flex items-center justify-between p-3 hover:bg-[#6366F1]/5 rounded-md transition-colors fork-node">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] font-medium mr-3">
                    1
                  </div>
                  <div>
                    <Link to={`/recipe/${recipe.originalId}`} className="text-sm font-medium text-[#0F172A] hover:text-[#6366F1] transition-colors">
                      {originalRecipe?.title}
                    </Link>
                    <p className="text-xs text-[#64748B]">
                      by {originalAuthor?.name},{' '}
                      {formatDistanceToNow(new Date(originalRecipe?.createdAt || ''), {
                    addSuffix: true
                  })}
                    </p>
                  </div>
                </div>
                <Link to={`/recipe/${recipe.originalId}`} className="text-sm text-[#6366F1] hover:text-[#4F46E5] transition-colors">
                  View
                </Link>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#6366F1]/10 rounded-md fork-node">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white font-medium mr-3">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">
                      {recipe.title}{' '}
                      <span className="text-[#6366F1]">(Current)</span>
                    </p>
                    <p className="text-xs text-[#64748B]">
                      by {author?.name},{' '}
                      {formatDistanceToNow(new Date(recipe.createdAt), {
                    addSuffix: true
                  })}
                    </p>
                  </div>
                </div>
              </div>
              {/* Direct forks preview */}
              {forks.length > 0 && forks.slice(0, 2).map((fork, index) => {
            const forkRecipe = getRecipeById(fork.forkedId);
            const forkAuthor = forkRecipe ? users.find(user => user.id === forkRecipe.authorId) : null;
            if (!forkRecipe || !forkAuthor) return null;
            return <div key={fork.id} className="flex items-center justify-between p-3 hover:bg-[#6366F1]/5 rounded-md transition-colors fork-node">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#EC4899]/10 flex items-center justify-center text-[#EC4899] font-medium mr-3">
                          {index + 3}
                        </div>
                        <div>
                          <Link to={`/recipe/${forkRecipe.id}`} className="text-sm font-medium text-[#0F172A] hover:text-[#EC4899] transition-colors">
                            {forkRecipe.title}
                          </Link>
                          <p className="text-xs text-[#64748B]">
                            by {forkAuthor.name},{' '}
                            {formatDistanceToNow(new Date(forkRecipe.createdAt), {
                      addSuffix: true
                    })}
                          </p>
                        </div>
                      </div>
                      <Link to={`/recipe/${forkRecipe.id}`} className="text-sm text-[#EC4899] hover:text-[#DB2777] transition-colors">
                        View
                      </Link>
                    </div>;
          })}
            </div>
            <div className="mt-4">
              <Link to={`/recipe/${id}/forks`} className="text-sm text-[#6366F1] hover:text-[#4F46E5] flex items-center transition-colors">
                <GitForkIcon className="h-4 w-4 mr-1" />
                View all forks and versions
              </Link>
            </div>
          </div>}
        {/* Comments Section */}
        <CommentSection recipeId={id} comments={comments} users={users} />
      </div>
      {/* Floating action button - only visible when not in cooking mode */}
      {!cookingMode && <button onClick={() => setCookingMode(true)} className="floating-action-button">
          <ChefHatIcon className="h-6 w-6" />
        </button>}
      {/* Timer toast notification - when timer completes */}
      {timerCompleted && <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 animate-scale-up z-50">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-[#10B981] mr-2" />
            <div>
              <p className="font-medium text-[#0F172A]">Timer Complete!</p>
              <p className="text-sm text-[#64748B]">Your timer has finished</p>
            </div>
            <button onClick={() => {
          setTimerCompleted(false);
          setTimer({
            active: false,
            seconds: 0
          });
        }} className="ml-4 text-gray-400 hover:text-gray-600">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>}
    </div>;
};