import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { CommentSection } from '../components/CommentSection';
import { recipeService } from '../services/recipeService';
import { users } from '../data/users';
import { ClockIcon, UsersIcon, ChefHatIcon, GitForkIcon, HistoryIcon, StarIcon, PrinterIcon, ShareIcon, CheckIcon, ChevronsUpDownIcon, PlayIcon, PauseIcon, XIcon, ChevronsRightIcon, ChevronsLeftIcon, BookmarkIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, getCommentsByRecipe, getForksByOriginal, forkRecipe } = useRecipes();
  const { currentUser } = useAuth();
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [cookingMode, setCookingMode] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  // Check if recipe is saved on component mount
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!currentUser || !id) return;
      
      try {
        const saved = await recipeService.isRecipeSaved(currentUser.id, id);
        setIsSaved(saved);
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };

    checkSavedStatus();
  }, [currentUser, id]);

  const handleSaveToggle = async () => {
    if (!currentUser || !id) return;
    
    setIsSaving(true);
    try {
      if (isSaved) {
        await recipeService.unsaveRecipe(currentUser.id, id);
        setIsSaved(false);
      } else {
        await recipeService.saveRecipe(currentUser.id, id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling save status:', error);
    } finally {
      setIsSaving(false);
    }
  };

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
    }
    setTimer(prev => ({
      ...prev,
      active: false
    }));
  };

  const resumeTimer = () => {
    if (timer.seconds > 0) {
      setTimer(prev => ({
        ...prev,
        active: true,
        interval: setInterval(() => {
          setTimer(prev => {
            if (prev.seconds <= 1) {
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
      }));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFork = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const forkedRecipe = forkRecipe(recipe.id, {
      authorId: currentUser.id
    });
    setShowForkAnimation(true);
    setTimeout(() => setShowForkAnimation(false), 2000);
  };

  const adjustQuantity = (quantity: string, multiplier: number) => {
    const num = parseFloat(quantity);
    return (num * multiplier).toString();
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

  if (cookingMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8EA] to-[#F8EAD8]">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#0F172A]">
              Cooking Mode: {recipe.title}
            </h1>
            <button onClick={() => setCookingMode(false)} className="btn-icon p-2 rounded-full text-[#6366F1] hover:text-[#4F46E5] focus:outline-none">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="ingredients-panel glass-card">
              <h2 className="text-xl font-semibold text-[#0F172A] mb-4 flex items-center">
                <ChefHatIcon className="h-5 w-5 text-[#6366F1] mr-2" />
                Ingredients
              </h2>
              <div className="interactive-checklist">
                {recipe.ingredients.map(ingredient => (
                  <div key={ingredient.id} className={`checklist-item flex items-start p-2 rounded-md transition-all duration-300 ${checkedIngredients.includes(ingredient.id) ? 'completed bg-green-50' : ''}`}>
                    <div className={`checkbox flex-shrink-0 w-5 h-5 border-2 rounded-md mr-3 cursor-pointer transition-all duration-300 ${checkedIngredients.includes(ingredient.id) ? 'checked border-green-500 bg-green-500' : 'border-gray-300'}`} onClick={() => toggleIngredientCheck(ingredient.id)}>
                      {checkedIngredients.includes(ingredient.id) && <CheckIcon className="h-4 w-4 text-white animate-checkmark" />}
                    </div>
                    <span className="text-[#334155]">
                      {ingredient.quantity && (
                        <span className="font-medium">
                          {adjustQuantity(ingredient.quantity, servingsMultiplier)}{' '}
                          {ingredient.unit}{' '}
                        </span>
                      )}
                      {ingredient.name}
                    </span>
                  </div>
                ))}
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
                  {servingsMultiplier}× ({Math.round(recipe.servings * servingsMultiplier)} servings)
                </div>
              </div>
            </div>
            <div className="steps-panel glass-card">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-[#6366F1]" />
                  Step {currentStepIndex + 1} of {recipe.steps.length}
                </h2>
                {timer.seconds > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className={`text-lg font-mono ${timer.seconds < 10 ? 'text-red-500 animate-pulse' : 'text-[#0F172A]'}`}>
                      {formatTime(timer.seconds)}
                    </div>
                    {timer.active ? (
                      <button onClick={pauseTimer} className="p-1 rounded-full bg-gray-100">
                        <PauseIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    ) : (
                      <button onClick={resumeTimer} className="p-1 rounded-full bg-gray-100">
                        <PlayIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                )}
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
                {recipe.steps[currentStepIndex].description.toLowerCase().includes('minute') && !timer.active && timer.seconds === 0 && (
                  <button onClick={() => {
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
                  </button>
                )}
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
                  {recipe.steps.map((step, index) => (
                    <li key={step.id} className={`flex p-3 rounded-md transition-all duration-300 ${currentStepIndex === index ? 'bg-[#6366F1]/10' : ''} ${completedSteps.includes(step.id) ? 'opacity-60' : ''}`} onClick={() => setCurrentStepIndex(index)}>
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
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8EA] to-[#F8EAD8]">
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
              {currentUser && (
                <button 
                  onClick={handleSaveToggle}
                  disabled={isSaving}
                  className={`btn-secondary inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors ${
                    isSaved 
                      ? 'border-[#E25E3E] text-[#E25E3E] bg-[#E25E3E]/10' 
                      : 'border-[#6366F1] text-[#6366F1] bg-transparent hover:bg-[#6366F1]/10'
                  } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <BookmarkIcon className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaving ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
                </button>
              )}
              <button className="btn-icon p-2 rounded-full text-[#6366F1] hover:text-[#4F46E5] focus:outline-none">
                <ShareIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          {recipe.originalId && (
            <div className="mt-2 text-sm text-[#64748B] animate-fade-in" style={{
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
            </div>
          )}
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
                    <p className="text-sm text-[#64748B]">Cook Time</p>
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
                {recipe.tags.map(tag => (
                  <Link key={tag} to={`/search?tag=${tag}`} className="bg-[#6366F1]/10 text-[#6366F1] px-2 py-1 rounded-md text-xs font-medium hover:bg-[#6366F1]/20 transition-colors">
                    {tag}
                  </Link>
                ))}
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
                    {servingsMultiplier}× ({Math.round(recipe.servings * servingsMultiplier)})
                  </div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 glass-card p-4 interactive-checklist">
              {recipe.ingredients.map(ingredient => (
                <li key={ingredient.id} className={`checklist-item flex items-start p-2 rounded-md transition-all duration-300 ${checkedIngredients.includes(ingredient.id) ? 'completed bg-green-50' : ''}`}>
                  <div className={`checkbox flex-shrink-0 w-5 h-5 border-2 rounded-md mr-3 cursor-pointer transition-all duration-300 ${checkedIngredients.includes(ingredient.id) ? 'checked border-green-500 bg-green-500' : 'border-gray-300'}`} onClick={() => toggleIngredientCheck(ingredient.id)}>
                    {checkedIngredients.includes(ingredient.id) && <CheckIcon className="h-4 w-4 text-white animate-checkmark" />}
                  </div>
                  <span className={`text-[#334155] ${checkedIngredients.includes(ingredient.id) ? 'line-through opacity-60' : ''}`}>
                    {ingredient.quantity && (
                      <span className="font-medium">
                        {adjustQuantity(ingredient.quantity, servingsMultiplier)}{' '}
                        {ingredient.unit}{' '}
                      </span>
                    )}
                    {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 animate-slide-in-left">
            <h2 className="text-xl font-semibold text-[#0F172A] mb-4 flex items-center justify-between">
              <span>Instructions</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#64748B]">
                  {completedSteps.length} of {recipe.steps.length} completed
                </span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] transition-all duration-300" style={{
                    width: `${progressPercentage}%`
                  }}></div>
                </div>
              </div>
            </h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={step.id} className={`flex p-4 rounded-lg transition-all duration-300 ${completedSteps.includes(step.id) ? 'bg-green-50 border border-green-200' : 'bg-white shadow-sm'}`}>
                  <div className="flex-shrink-0 mr-4">
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full ${completedSteps.includes(step.id) ? 'bg-[#10B981] text-white' : 'bg-[#6366F1] text-white'} font-medium transition-all duration-300`}>
                      {completedSteps.includes(step.id) ? <CheckIcon className="h-4 w-4 animate-checkmark" /> : index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className={`text-[#334155] ${completedSteps.includes(step.id) ? 'line-through' : ''}`}>
                      {step.description}
                    </p>
                  </div>
                  <button onClick={() => toggleStepCompletion(step.id)} className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <CheckIcon className={`h-4 w-4 ${completedSteps.includes(step.id) ? 'text-[#10B981]' : 'text-gray-400'}`} />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
        {/* Comments Section */}
        <CommentSection recipeId={id} comments={comments} users={users} />
      </div>
    </div>
  );
};