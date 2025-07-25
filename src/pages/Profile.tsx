import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { RecipeCard } from '../components/RecipeCard';
import { users } from '../data/users';
import { UserIcon, CalendarIcon, UsersIcon, GitForkIcon, BookmarkIcon, PencilIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export const Profile: React.FC = () => {
  const {
    username
  } = useParams<{
    username: string;
  }>();
  const {
    recipes,
    forks
  } = useRecipes();
  const {
    currentUser
  } = useAuth();
  const [activeTab, setActiveTab] = useState('recipes');
  const user = users.find(u => u.username === username);
  if (!user) return <div>User not found</div>;
  const userRecipes = recipes.filter(recipe => recipe.authorId === user.id);
  const userForks = recipes.filter(recipe => recipe.authorId === user.id && recipe.originalId);
  const isCurrentUser = currentUser?.id === user.id;
  const getRecipeForkCount = (recipeId: string) => {
    return forks.filter(fork => fork.originalId === recipeId).length;
  };
  return <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img className="h-24 w-24 rounded-full" src={user.avatar} alt={user.name} />
              </div>
              <div className="mt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:flex sm:items-center">
                  {user.name}
                  {isCurrentUser && <span className="ml-2 text-sm bg-gray-100 text-gray-600 py-1 px-2 rounded">
                      You
                    </span>}
                </h1>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500">
                  <div className="flex items-center mr-4">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Joined{' '}
                    {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true
                  })}
                  </div>
                  <div className="flex items-center mr-4">
                    <BookmarkIcon className="h-4 w-4 mr-1" />
                    {userRecipes.length} recipes
                  </div>
                  <div className="flex items-center mr-4">
                    <GitForkIcon className="h-4 w-4 mr-1" />
                    {userForks.length} forks
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              {isCurrentUser ? <button className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </button> : <button className="flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Follow
                </button>}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Bio</h3>
            <p className="mt-1 text-sm text-gray-600">{user.bio}</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-6 text-center border-t border-gray-200 pt-6">
            <div>
              <span className="text-2xl font-bold text-indigo-600">
                {userRecipes.length}
              </span>
              <p className="text-sm text-gray-500">Recipes</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-indigo-600">
                {user.followers.length}
              </span>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-indigo-600">
                {user.following.length}
              </span>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('recipes')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'recipes' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Recipes
            </button>
            <button onClick={() => setActiveTab('forks')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'forks' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Forks
            </button>
            <button onClick={() => setActiveTab('saved')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'saved' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Saved
            </button>
          </nav>
        </div>
        {/* Recipe Grid */}
        {activeTab === 'recipes' && <>
            {userRecipes.length > 0 ? <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} authorName={user.name} authorAvatar={user.avatar} forkCount={getRecipeForkCount(recipe.id)} />)}
              </div> : <div className="text-center py-12">
                <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No recipes yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {isCurrentUser ? "You haven't created any recipes yet." : `${user.name} hasn't created any recipes yet.`}
                </p>
                {isCurrentUser && <div className="mt-6">
                    <Link to="/create" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      Create Recipe
                    </Link>
                  </div>}
              </div>}
          </>}
        {activeTab === 'forks' && <>
            {userForks.length > 0 ? <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userForks.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} authorName={user.name} authorAvatar={user.avatar} forkCount={getRecipeForkCount(recipe.id)} />)}
              </div> : <div className="text-center py-12">
                <GitForkIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No forks yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {isCurrentUser ? "You haven't forked any recipes yet." : `${user.name} hasn't forked any recipes yet.`}
                </p>
                {isCurrentUser && <div className="mt-6">
                    <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      Explore Recipes
                    </Link>
                  </div>}
              </div>}
          </>}
        {activeTab === 'saved' && <div className="text-center py-12">
            <BookmarkIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No saved recipes
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isCurrentUser ? "You haven't saved any recipes yet." : `${user.name} hasn't saved any recipes yet.`}
            </p>
            {isCurrentUser && <div className="mt-6">
                <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Explore Recipes
                </Link>
              </div>}
          </div>}
      </div>
    </div>;
};