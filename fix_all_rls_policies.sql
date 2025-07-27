-- Fix all RLS policies to allow the app to work properly
-- This script makes the policies more permissive for development/testing

-- 1. Fix profiles table RLS policies
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Allow viewing all profiles" ON profiles;
DROP POLICY IF EXISTS "Allow inserting profiles" ON profiles;
DROP POLICY IF EXISTS "Allow updating profiles" ON profiles;

-- Allow viewing all profiles
CREATE POLICY "Allow viewing all profiles" ON profiles
  FOR SELECT USING (true);

-- Allow inserting profiles (for signup)
CREATE POLICY "Allow inserting profiles" ON profiles
  FOR INSERT WITH CHECK (true);

-- Allow updating profiles (for profile updates)
CREATE POLICY "Allow updating profiles" ON profiles
  FOR UPDATE USING (true);

-- 2. Fix saved_recipes table RLS policies
DROP POLICY IF EXISTS "Users can view their own saved recipes" ON saved_recipes;
DROP POLICY IF EXISTS "Users can save recipes" ON saved_recipes;
DROP POLICY IF EXISTS "Users can unsave recipes" ON saved_recipes;
DROP POLICY IF EXISTS "Allow viewing saved recipes" ON saved_recipes;
DROP POLICY IF EXISTS "Allow inserting saved recipes" ON saved_recipes;
DROP POLICY IF EXISTS "Allow deleting saved recipes" ON saved_recipes;

-- Allow viewing saved recipes
CREATE POLICY "Allow viewing saved recipes" ON saved_recipes
  FOR SELECT USING (true);

-- Allow inserting saved recipes
CREATE POLICY "Allow inserting saved recipes" ON saved_recipes
  FOR INSERT WITH CHECK (true);

-- Allow deleting saved recipes
CREATE POLICY "Allow deleting saved recipes" ON saved_recipes
  FOR DELETE USING (true);

-- 3. Fix recipes table RLS policies (if needed)
DROP POLICY IF EXISTS "Users can create their own recipes" ON recipes;
DROP POLICY IF EXISTS "Users can update their own recipes" ON recipes;
DROP POLICY IF EXISTS "Users can delete their own recipes" ON recipes;
DROP POLICY IF EXISTS "Allow creating recipes" ON recipes;
DROP POLICY IF EXISTS "Allow updating recipes" ON recipes;
DROP POLICY IF EXISTS "Allow deleting recipes" ON recipes;

-- Allow creating recipes
CREATE POLICY "Allow creating recipes" ON recipes
  FOR INSERT WITH CHECK (true);

-- Allow updating recipes
CREATE POLICY "Allow updating recipes" ON recipes
  FOR UPDATE USING (true);

-- Allow deleting recipes
CREATE POLICY "Allow deleting recipes" ON recipes
  FOR DELETE USING (true);

-- Note: In production, you should replace 'true' with proper authentication checks like:
-- FOR INSERT WITH CHECK (auth.uid() = author_id);
-- FOR UPDATE USING (auth.uid() = author_id);
-- FOR DELETE USING (auth.uid() = author_id); 