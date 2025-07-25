import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { RecipeCard } from '../components/RecipeCard';
import { supabase } from '../lib/supabase';
import { UserIcon, CalendarIcon, UsersIcon, GitForkIcon, BookmarkIcon, PencilIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  following: string[];
  followers: string[];
  created_at: string;
}

export const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { recipes, forks } = useRecipes();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('recipes');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (error) {
          console.error('Error fetching user:', error);
          setError('User not found');
          return;
        }

        setUser(data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="h-24 w-24 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">User not found</h2>
            <p className="text-gray-600">The user you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const userRecipes = recipes.filter(recipe => recipe.authorId === user.id);
  const userForks = recipes.filter(recipe => recipe.authorId === user.id && recipe.originalId);
  const isCurrentUser = currentUser?.id === user.id;

  const getRecipeForkCount = (recipeId: string) => {
    return forks.filter(fork => fork.originalId === recipeId).length;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
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
                  {isCurrentUser && (
                    <span className="ml-2 text-sm bg-gray-100 text-gray-600 py-1 px-2 rounded">
                      You
                    </span>
                  )}
                </h1>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500">
                  <div className="flex items-center mr-4">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Joined{' '}
                    {formatDistanceToNow(new Date(user.created_at), {
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
              {isCurrentUser ? (
                <button className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <button className="flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Bio</h3>
            <p className="mt-1 text-sm text-gray-600">{user.bio || 'No bio yet.'}</p>
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
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('recipes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'recipes'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Recipes ({userRecipes.length})
              </button>
              <button
                onClick={() => setActiveTab('forks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'forks'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Forks ({userForks.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'recipes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userRecipes.length > 0 ? (
                  userRecipes.map((recipe) => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe} 
                      authorName={user.name}
                      authorAvatar={user.avatar}
                      forkCount={getRecipeForkCount(recipe.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No recipes yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'forks' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userForks.length > 0 ? (
                  userForks.map((recipe) => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe} 
                      authorName={user.name}
                      authorAvatar={user.avatar}
                      forkCount={getRecipeForkCount(recipe.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No forks yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};