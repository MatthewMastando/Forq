import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, XIcon, SaveIcon } from 'lucide-react';
export const RecipeEditor: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    getRecipeById,
    createRecipe,
    updateRecipe
  } = useRecipes();
  const {
    currentUser,
    isAuthenticated
  } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: 'medium',
    image: '',
    tags: [] as string[],
    ingredients: [] as {
      id: string;
      name: string;
      quantity: string;
      unit: string;
    }[],
    steps: [] as {
      id: string;
      description: string;
    }[]
  });
  const [tagInput, setTagInput] = useState('');
  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      navigate('/login');
      return;
    }
    if (id) {
      const recipe = getRecipeById(id);
      if (recipe) {
        // Only allow editing if user is the author
        if (recipe.authorId !== currentUser.id) {
          navigate(`/recipe/${id}`);
          return;
        }
        setFormData({
          title: recipe.title,
          description: recipe.description,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          image: recipe.image,
          tags: recipe.tags,
          ingredients: recipe.ingredients,
          steps: recipe.steps
        });
      }
    } else {
      // Add default empty ingredient and step for new recipes
      setFormData(prev => ({
        ...prev,
        ingredients: [{
          id: `ing-new-1`,
          name: '',
          quantity: '',
          unit: ''
        }],
        steps: [{
          id: `step-new-1`,
          description: ''
        }]
      }));
    }
  }, [id, getRecipeById, currentUser, isAuthenticated, navigate]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };
  const handleIngredientChange = (index: number, field: string, value: string) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      ingredients: updatedIngredients
    }));
  };
  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      description: value
    };
    setFormData(prev => ({
      ...prev,
      steps: updatedSteps
    }));
  };
  const addIngredient = () => {
    const newIngredient = {
      id: `ing-new-${Date.now()}`,
      name: '',
      quantity: '',
      unit: ''
    };
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
  };
  const removeIngredient = (index: number) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      ingredients: updatedIngredients
    }));
  };
  const addStep = () => {
    const newStep = {
      id: `step-new-${Date.now()}`,
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };
  const removeStep = (index: number) => {
    const updatedSteps = [...formData.steps];
    updatedSteps.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      steps: updatedSteps
    }));
  };
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
      setTagInput('');
    }
  };
  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    // Validate required fields
    if (!formData.title || formData.ingredients.some(ing => !ing.name) || formData.steps.some(step => !step.description)) {
      alert('Please fill in all required fields');
      return;
    }
    if (id) {
      // Update existing recipe
      updateRecipe(id, {
        ...formData,
        authorId: currentUser.id
      });
      navigate(`/recipe/${id}`);
    } else {
      // Create new recipe
      const newRecipe = createRecipe({
        ...formData,
        authorId: currentUser.id,
        image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
      });
      navigate(`/recipe/${newRecipe.id}`);
    }
  };
  return <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? 'Edit Recipe' : 'Create New Recipe'}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {id ? 'Update your recipe and save changes.' : 'Share your culinary creation with the community.'}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Title <span className="text-red-500">*</span>
              </label>
              <input type="text" id="title" name="title" required value={formData.title} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea id="description" name="description" rows={3} required value={formData.description} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input type="url" id="image" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <p className="mt-1 text-xs text-gray-500">
                Enter a URL for your recipe image. Leave blank for a default
                image.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Prep Time (minutes)
                </label>
                <input type="number" id="prepTime" name="prepTime" min="0" value={formData.prepTime} onChange={handleNumberChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Cook Time (minutes)
                </label>
                <input type="number" id="cookTime" name="cookTime" min="0" value={formData.cookTime} onChange={handleNumberChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
                  Servings
                </label>
                <input type="number" id="servings" name="servings" min="1" value={formData.servings} onChange={handleNumberChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map(tag => <span key={tag} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-xs font-medium flex items-center">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-indigo-600 hover:text-indigo-800">
                      <XIcon className="h-3 w-3" />
                    </button>
                  </span>)}
              </div>
              <div className="flex">
                <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagInputKeyDown} placeholder="Add a tag (e.g., dinner, italian)" className="block w-full border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                <button type="button" onClick={addTag} className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-700 rounded-r-md hover:bg-gray-100">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Ingredients Section */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
            <button type="button" onClick={addIngredient} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Ingredient
            </button>
          </div>
          <div className="space-y-4">
            {formData.ingredients.map((ingredient, index) => <div key={ingredient.id} className="flex items-center space-x-2">
                <input type="text" value={ingredient.quantity} onChange={e => handleIngredientChange(index, 'quantity', e.target.value)} placeholder="Qty" className="block w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                <input type="text" value={ingredient.unit} onChange={e => handleIngredientChange(index, 'unit', e.target.value)} placeholder="Unit" className="block w-24 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                <input type="text" value={ingredient.name} onChange={e => handleIngredientChange(index, 'name', e.target.value)} placeholder="Ingredient name" className="block flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                <button type="button" onClick={() => removeIngredient(index)} className="text-gray-400 hover:text-red-500" disabled={formData.ingredients.length <= 1}>
                  <XIcon className="h-5 w-5" />
                </button>
              </div>)}
          </div>
        </div>
        {/* Steps Section */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Instructions
            </h2>
            <button type="button" onClick={addStep} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Step
            </button>
          </div>
          <div className="space-y-4">
            {formData.steps.map((step, index) => <div key={step.id} className="flex items-start space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 font-medium text-sm mt-2">
                  {index + 1}
                </div>
                <textarea value={step.description} onChange={e => handleStepChange(index, e.target.value)} placeholder="Describe this step" rows={2} className="block flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                <button type="button" onClick={() => removeStep(index)} className="text-gray-400 hover:text-red-500 mt-2" disabled={formData.steps.length <= 1}>
                  <XIcon className="h-5 w-5" />
                </button>
              </div>)}
          </div>
        </div>
        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={() => navigate(id ? `/recipe/${id}` : '/')} className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <SaveIcon className="h-4 w-4 mr-2" />
            {id ? 'Save Changes' : 'Create Recipe'}
          </button>
        </div>
      </form>
    </div>;
};