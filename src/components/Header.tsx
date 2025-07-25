import React, { useState, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, PlusIcon, UserIcon, HomeIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const {
    currentUser,
    isAuthenticated,
    signOut
  } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <header className="glass sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-[#E25E3E] font-extrabold text-xl">
                Forq
              </span>
            </Link>
            <nav className="hidden md:ml-6 md:flex space-x-8">
              <Link to="/" className="text-[#3C2A21] hover:text-[#E25E3E] px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                <HomeIcon className="w-4 h-4 mr-1" />
                Home
              </Link>
              <Link to="/create" className="text-[#3C2A21] hover:text-[#E25E3E] px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                <PlusIcon className="w-4 h-4 mr-1" />
                Create Recipe
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white/80 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-[#E25E3E] focus:border-[#E25E3E] sm:text-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            {isAuthenticated && currentUser ? (
              <div className="ml-4 flex items-center md:ml-6">
                <Link to={`/profile/${currentUser.username}`} className="btn-icon p-1 rounded-full text-[#3C2A21] hover:text-[#E25E3E] focus:outline-none">
                  <img className="h-8 w-8 rounded-full ring-2 ring-[#E25E3E]/50" src={currentUser.avatar} alt={currentUser.name} />
                </Link>
                <button onClick={handleSignOut} className="btn-icon ml-3 p-2 rounded-full text-[#3C2A21] hover:text-[#E25E3E] focus:outline-none hidden md:block">
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="ml-4 flex items-center md:ml-6">
                <Link to="/login" className="btn-secondary text-[#E25E3E] hover:text-[#C04A2E] px-3 py-2 rounded-md text-sm font-medium hidden md:block">
                  Login
                </Link>
                <Link to="/register" className="btn-primary ml-2 bg-[#E25E3E]/80 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#E25E3E] hidden md:block">
                  Sign Up
                </Link>
              </div>
            )}
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-2 md:hidden p-2 rounded-md text-[#3C2A21] hover:text-[#E25E3E] focus:outline-none"
            >
              {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md shadow-lg">
          <Link to="/" className="text-[#3C2A21] hover:text-[#E25E3E] block px-3 py-2 rounded-md text-base font-medium flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <HomeIcon className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link to="/create" className="text-[#3C2A21] hover:text-[#E25E3E] block px-3 py-2 rounded-md text-base font-medium flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Recipe
          </Link>
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="px-3 py-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search recipes..."
                className="form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white/80 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-[#E25E3E] focus:border-[#E25E3E] text-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          {/* Mobile auth buttons */}
          {isAuthenticated && currentUser ? (
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <img className="h-8 w-8 rounded-full ring-2 ring-[#E25E3E]/50 mr-2" src={currentUser.avatar} alt={currentUser.name} />
                <span className="text-[#3C2A21]">{currentUser.name}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-[#3C2A21] hover:text-[#E25E3E] p-2 rounded-md"
              >
                <LogOutIcon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="px-3 py-2 space-y-2">
              <Link to="/login" className="text-[#3C2A21] hover:text-[#E25E3E] block px-3 py-2 rounded-md text-base font-medium" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="bg-[#E25E3E]/80 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#E25E3E]" onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};