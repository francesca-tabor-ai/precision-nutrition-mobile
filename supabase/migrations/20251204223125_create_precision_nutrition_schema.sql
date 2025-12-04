/*
  # Precision Nutrition Database Schema
  
  ## Overview
  Complete database schema for the Precision Nutrition app, enabling personalized meal planning,
  health tracking, and food safety analysis.
  
  ## New Tables
  
  ### User Profiles & Preferences
  - `user_profiles` - Extended user profile data
    - `id` (uuid, primary key, references auth.users)
    - `full_name` (text)
    - `date_of_birth` (date)
    - `height_cm` (numeric)
    - `weight_kg` (numeric)
    - `activity_level` (text)
    - `dietary_preferences` (jsonb) - cuisines, restrictions, etc.
    - `cooking_skill` (text) - beginner, intermediate, advanced
    - `cooking_time_available` (int) - minutes per day
    - `budget_level` (text) - low, medium, high
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)
  
  ### Health Data
  - `health_conditions` - User's medical conditions
    - `id` (uuid, primary key)
    - `user_id` (uuid, references user_profiles)
    - `condition_name` (text)
    - `diagnosed_date` (date)
    - `severity` (text)
    - `notes` (text)
    - `created_at` (timestamptz)
  
  - `biomarkers` - Lab results and biomarker data
    - `id` (uuid, primary key)
    - `user_id` (uuid, references user_profiles)
    - `biomarker_name` (text) - e.g., glucose, cholesterol, vitamin D
    - `value` (numeric)
    - `unit` (text)
    - `test_date` (date)
    - `reference_range_min` (numeric)
    - `reference_range_max` (numeric)
    - `status` (text) - low, normal, high
    - `created_at` (timestamptz)
  
  - `medications` - Current medications
    - `id` (uuid, primary key)
    - `user_id` (uuid, references user_profiles)
    - `medication_name` (text)
    - `dosage` (text)
    - `frequency` (text)
    - `started_date` (date)
    - `food_interactions` (jsonb) - list of foods to avoid
    - `created_at` (timestamptz)
  
  ### Pet Management
  - `pets` - User's pets
    - `id` (uuid, primary key)
    - `user_id` (uuid, references user_profiles)
    - `name` (text)
    - `species` (text) - dog, cat, etc.
    - `breed` (text)
    - `age_years` (int)
    - `weight_kg` (numeric)
    - `health_conditions` (jsonb)
    - `dietary_restrictions` (jsonb)
    - `created_at` (timestamptz)
  
  ### Meal Planning
  - `meal_plans` - Weekly meal plans
    - `id` (uuid, primary key)
    - `user_id` (uuid, references user_profiles)
    - `week_start_date` (date)
    - `plan_type` (text) - human or pet
    - `pet_id` (uuid, references pets, nullable)
    - `status` (text) - active, completed, archived
    - `created_at` (timestamptz)
  
  - `meals` - Individual meals in plans
    - `id` (uuid, primary key)
    - `meal_plan_id` (uuid, references meal_plans)
    - `day_of_week` (int) - 0-6
    - `meal_type` (text) - breakfast, lunch, dinner, snack
    - `recipe_name` (text)
    - `ingredients` (jsonb)
    - `nutrition_info` (jsonb)
    - `preparation_time` (int)
    - `cooking_instructions` (text)
    - `health_score` (numeric) - personalized score
    - `created_at` (timestamptz)
  
  ### Shopping & Groceries
  - `grocery_lists` - Shopping lists
    - `id` (uuid, primary key)
    - `user_id` (uuid, references user_profiles)
    - `meal_plan_id` (uuid, references meal_plans, nullable)
    - `supermarket_name` (text)
    - `total_estimated_cost` (numeric)
    - `status` (text) - active, completed
    - `created_at` (timestamptz)
  
  - `grocery_items` - Items in shopping lists
    - `id` (uuid, primary key)
    - `grocery_list_id` (uuid, references grocery_lists)
    - `item_name` (text)
    - `quantity` (text)
    - `category` (text) - produce, dairy, meat, etc.
    - `estimated_price` (numeric)
    - `checked` (boolean)
    - `aisle_location` (text)
    - `created_at` (timestamptz)
  
  ### Food Scanner
  - `scanned_foods` - History of scanned foods
    - `id` (uuid, primary key)
    - `user_id` (uuid, references user_profiles)
    - `food_name` (text)
    - `barcode` (text)
    - `ingredients` (jsonb)
    - `nutrition_info` (jsonb)
    - `safety_score` (numeric) - personalized safety rating
    - `safety_analysis` (text) - detailed explanation
    - `benefits` (jsonb)
    - `warnings` (jsonb)
    - `scanned_at` (timestamptz)
  
  ### Restaurants & Delivery
  - `restaurants` - Curated restaurant options
    - `id` (uuid, primary key)
    - `name` (text)
    - `cuisine_type` (text)
    - `address` (text)
    - `latitude` (numeric)
    - `longitude` (numeric)
    - `delivery_platforms` (jsonb) - Uber Eats, DoorDash, etc.
    - `menu_items` (jsonb)
    - `created_at` (timestamptz)
  
  - `safe_restaurant_items` - User-safe menu items
    - `id` (uuid, primary key)
    - `user_id` (uuid, references user_profiles)
    - `restaurant_id` (uuid, references restaurants)
    - `item_name` (text)
    - `safety_score` (numeric)
    - `customization_notes` (text)
    - `created_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their own data
*/

-- User Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  date_of_birth date,
  height_cm numeric,
  weight_kg numeric,
  activity_level text DEFAULT 'moderate',
  dietary_preferences jsonb DEFAULT '{}',
  cooking_skill text DEFAULT 'intermediate',
  cooking_time_available int DEFAULT 60,
  budget_level text DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Health Conditions
CREATE TABLE IF NOT EXISTS health_conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  condition_name text NOT NULL,
  diagnosed_date date,
  severity text DEFAULT 'moderate',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE health_conditions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own health conditions"
  ON health_conditions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health conditions"
  ON health_conditions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health conditions"
  ON health_conditions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own health conditions"
  ON health_conditions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Biomarkers
CREATE TABLE IF NOT EXISTS biomarkers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  biomarker_name text NOT NULL,
  value numeric NOT NULL,
  unit text NOT NULL,
  test_date date NOT NULL,
  reference_range_min numeric,
  reference_range_max numeric,
  status text DEFAULT 'normal',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE biomarkers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own biomarkers"
  ON biomarkers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own biomarkers"
  ON biomarkers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own biomarkers"
  ON biomarkers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own biomarkers"
  ON biomarkers FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Medications
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  medication_name text NOT NULL,
  dosage text DEFAULT '',
  frequency text DEFAULT '',
  started_date date,
  food_interactions jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own medications"
  ON medications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own medications"
  ON medications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own medications"
  ON medications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own medications"
  ON medications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Pets
CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  species text NOT NULL,
  breed text DEFAULT '',
  age_years int DEFAULT 0,
  weight_kg numeric,
  health_conditions jsonb DEFAULT '[]',
  dietary_restrictions jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pets"
  ON pets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pets"
  ON pets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pets"
  ON pets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pets"
  ON pets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Meal Plans
CREATE TABLE IF NOT EXISTS meal_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  week_start_date date NOT NULL,
  plan_type text DEFAULT 'human',
  pet_id uuid REFERENCES pets(id) ON DELETE SET NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own meal plans"
  ON meal_plans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meal plans"
  ON meal_plans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meal plans"
  ON meal_plans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own meal plans"
  ON meal_plans FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Meals
CREATE TABLE IF NOT EXISTS meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id uuid REFERENCES meal_plans(id) ON DELETE CASCADE NOT NULL,
  day_of_week int NOT NULL,
  meal_type text NOT NULL,
  recipe_name text NOT NULL,
  ingredients jsonb DEFAULT '[]',
  nutrition_info jsonb DEFAULT '{}',
  preparation_time int DEFAULT 30,
  cooking_instructions text DEFAULT '',
  health_score numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE meals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view meals from own meal plans"
  ON meals FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meal_plans
      WHERE meal_plans.id = meals.meal_plan_id
      AND meal_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert meals to own meal plans"
  ON meals FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM meal_plans
      WHERE meal_plans.id = meals.meal_plan_id
      AND meal_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update meals in own meal plans"
  ON meals FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meal_plans
      WHERE meal_plans.id = meals.meal_plan_id
      AND meal_plans.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM meal_plans
      WHERE meal_plans.id = meals.meal_plan_id
      AND meal_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete meals from own meal plans"
  ON meals FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meal_plans
      WHERE meal_plans.id = meals.meal_plan_id
      AND meal_plans.user_id = auth.uid()
    )
  );

-- Grocery Lists
CREATE TABLE IF NOT EXISTS grocery_lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  meal_plan_id uuid REFERENCES meal_plans(id) ON DELETE SET NULL,
  supermarket_name text DEFAULT '',
  total_estimated_cost numeric DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE grocery_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own grocery lists"
  ON grocery_lists FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own grocery lists"
  ON grocery_lists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own grocery lists"
  ON grocery_lists FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own grocery lists"
  ON grocery_lists FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Grocery Items
CREATE TABLE IF NOT EXISTS grocery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grocery_list_id uuid REFERENCES grocery_lists(id) ON DELETE CASCADE NOT NULL,
  item_name text NOT NULL,
  quantity text NOT NULL,
  category text DEFAULT '',
  estimated_price numeric DEFAULT 0,
  checked boolean DEFAULT false,
  aisle_location text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE grocery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view items from own grocery lists"
  ON grocery_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_items.grocery_list_id
      AND grocery_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert items to own grocery lists"
  ON grocery_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_items.grocery_list_id
      AND grocery_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update items in own grocery lists"
  ON grocery_items FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_items.grocery_list_id
      AND grocery_lists.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_items.grocery_list_id
      AND grocery_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from own grocery lists"
  ON grocery_items FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_items.grocery_list_id
      AND grocery_lists.user_id = auth.uid()
    )
  );

-- Scanned Foods
CREATE TABLE IF NOT EXISTS scanned_foods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  food_name text NOT NULL,
  barcode text DEFAULT '',
  ingredients jsonb DEFAULT '[]',
  nutrition_info jsonb DEFAULT '{}',
  safety_score numeric DEFAULT 0,
  safety_analysis text DEFAULT '',
  benefits jsonb DEFAULT '[]',
  warnings jsonb DEFAULT '[]',
  scanned_at timestamptz DEFAULT now()
);

ALTER TABLE scanned_foods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scanned foods"
  ON scanned_foods FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scanned foods"
  ON scanned_foods FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own scanned foods"
  ON scanned_foods FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Restaurants
CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cuisine_type text DEFAULT '',
  address text DEFAULT '',
  latitude numeric,
  longitude numeric,
  delivery_platforms jsonb DEFAULT '[]',
  menu_items jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view restaurants"
  ON restaurants FOR SELECT
  TO authenticated
  USING (true);

-- Safe Restaurant Items
CREATE TABLE IF NOT EXISTS safe_restaurant_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  item_name text NOT NULL,
  safety_score numeric DEFAULT 0,
  customization_notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE safe_restaurant_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own safe restaurant items"
  ON safe_restaurant_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own safe restaurant items"
  ON safe_restaurant_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own safe restaurant items"
  ON safe_restaurant_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own safe restaurant items"
  ON safe_restaurant_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_health_conditions_user_id ON health_conditions(user_id);
CREATE INDEX IF NOT EXISTS idx_biomarkers_user_id ON biomarkers(user_id);
CREATE INDEX IF NOT EXISTS idx_medications_user_id ON medications(user_id);
CREATE INDEX IF NOT EXISTS idx_pets_user_id ON pets(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user_id ON meal_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_meals_meal_plan_id ON meals(meal_plan_id);
CREATE INDEX IF NOT EXISTS idx_grocery_lists_user_id ON grocery_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_grocery_items_list_id ON grocery_items(grocery_list_id);
CREATE INDEX IF NOT EXISTS idx_scanned_foods_user_id ON scanned_foods(user_id);
CREATE INDEX IF NOT EXISTS idx_safe_restaurant_items_user_id ON safe_restaurant_items(user_id);