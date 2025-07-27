-- Fix RLS policies for saved_recipes table
-- This allows the app to work with saved recipes even without full authentication

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own saved recipes" ON saved_recipes;
DROP POLICY IF EXISTS "Users can save recipes" ON saved_recipes;
DROP POLICY IF EXISTS "Users can unsave recipes" ON saved_recipes;

-- Create new policies that are more permissive for testing
-- Allow viewing saved recipes (for now, allow all - you can restrict this later)
CREATE POLICY "Allow viewing saved recipes" ON saved_recipes
  FOR SELECT USING (true);

-- Allow inserting saved recipes (for now, allow all - you can restrict this later)
CREATE POLICY "Allow saving recipes" ON saved_recipes
  FOR INSERT WITH CHECK (true);

-- Allow deleting saved recipes (for now, allow all - you can restrict this later)
CREATE POLICY "Allow unsaving recipes" ON saved_recipes
  FOR DELETE USING (true);

-- Note: In production, you should replace 'true' with proper authentication checks like:
-- FOR SELECT USING (auth.uid() = user_id);
-- FOR INSERT WITH CHECK (auth.uid() = user_id);
-- FOR DELETE USING (auth.uid() = user_id); 