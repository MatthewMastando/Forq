-- Temporarily disable RLS on all tables to get the app working
-- This is for development/testing only

-- Disable RLS on profiles
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Disable RLS on recipes  
ALTER TABLE recipes DISABLE ROW LEVEL SECURITY;

-- Disable RLS on saved_recipes
ALTER TABLE saved_recipes DISABLE ROW LEVEL SECURITY;

-- Disable RLS on comments
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;

-- Note: This completely disables security for development
-- In production, you should re-enable RLS with proper policies 