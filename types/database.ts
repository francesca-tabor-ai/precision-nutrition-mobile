export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          date_of_birth: string | null
          height_cm: number | null
          weight_kg: number | null
          activity_level: string
          dietary_preferences: Json
          cooking_skill: string
          cooking_time_available: number
          budget_level: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          date_of_birth?: string | null
          height_cm?: number | null
          weight_kg?: number | null
          activity_level?: string
          dietary_preferences?: Json
          cooking_skill?: string
          cooking_time_available?: number
          budget_level?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          date_of_birth?: string | null
          height_cm?: number | null
          weight_kg?: number | null
          activity_level?: string
          dietary_preferences?: Json
          cooking_skill?: string
          cooking_time_available?: number
          budget_level?: string
          created_at?: string
          updated_at?: string
        }
      }
      health_conditions: {
        Row: {
          id: string
          user_id: string
          condition_name: string
          diagnosed_date: string | null
          severity: string
          notes: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          condition_name: string
          diagnosed_date?: string | null
          severity?: string
          notes?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          condition_name?: string
          diagnosed_date?: string | null
          severity?: string
          notes?: string
          created_at?: string
        }
      }
      biomarkers: {
        Row: {
          id: string
          user_id: string
          biomarker_name: string
          value: number
          unit: string
          test_date: string
          reference_range_min: number | null
          reference_range_max: number | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          biomarker_name: string
          value: number
          unit: string
          test_date: string
          reference_range_min?: number | null
          reference_range_max?: number | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          biomarker_name?: string
          value?: number
          unit?: string
          test_date?: string
          reference_range_min?: number | null
          reference_range_max?: number | null
          status?: string
          created_at?: string
        }
      }
      medications: {
        Row: {
          id: string
          user_id: string
          medication_name: string
          dosage: string
          frequency: string
          started_date: string | null
          food_interactions: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          medication_name: string
          dosage?: string
          frequency?: string
          started_date?: string | null
          food_interactions?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          medication_name?: string
          dosage?: string
          frequency?: string
          started_date?: string | null
          food_interactions?: Json
          created_at?: string
        }
      }
      pets: {
        Row: {
          id: string
          user_id: string
          name: string
          species: string
          breed: string
          age_years: number
          weight_kg: number | null
          health_conditions: Json
          dietary_restrictions: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          species: string
          breed?: string
          age_years?: number
          weight_kg?: number | null
          health_conditions?: Json
          dietary_restrictions?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          species?: string
          breed?: string
          age_years?: number
          weight_kg?: number | null
          health_conditions?: Json
          dietary_restrictions?: Json
          created_at?: string
        }
      }
      meal_plans: {
        Row: {
          id: string
          user_id: string
          week_start_date: string
          plan_type: string
          pet_id: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          week_start_date: string
          plan_type?: string
          pet_id?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          week_start_date?: string
          plan_type?: string
          pet_id?: string | null
          status?: string
          created_at?: string
        }
      }
      meals: {
        Row: {
          id: string
          meal_plan_id: string
          day_of_week: number
          meal_type: string
          recipe_name: string
          ingredients: Json
          nutrition_info: Json
          preparation_time: number
          cooking_instructions: string
          health_score: number
          created_at: string
        }
        Insert: {
          id?: string
          meal_plan_id: string
          day_of_week: number
          meal_type: string
          recipe_name: string
          ingredients?: Json
          nutrition_info?: Json
          preparation_time?: number
          cooking_instructions?: string
          health_score?: number
          created_at?: string
        }
        Update: {
          id?: string
          meal_plan_id?: string
          day_of_week?: number
          meal_type?: string
          recipe_name?: string
          ingredients?: Json
          nutrition_info?: Json
          preparation_time?: number
          cooking_instructions?: string
          health_score?: number
          created_at?: string
        }
      }
      grocery_lists: {
        Row: {
          id: string
          user_id: string
          meal_plan_id: string | null
          supermarket_name: string
          total_estimated_cost: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          meal_plan_id?: string | null
          supermarket_name?: string
          total_estimated_cost?: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          meal_plan_id?: string | null
          supermarket_name?: string
          total_estimated_cost?: number
          status?: string
          created_at?: string
        }
      }
      grocery_items: {
        Row: {
          id: string
          grocery_list_id: string
          item_name: string
          quantity: string
          category: string
          estimated_price: number
          checked: boolean
          aisle_location: string
          created_at: string
        }
        Insert: {
          id?: string
          grocery_list_id: string
          item_name: string
          quantity: string
          category?: string
          estimated_price?: number
          checked?: boolean
          aisle_location?: string
          created_at?: string
        }
        Update: {
          id?: string
          grocery_list_id?: string
          item_name?: string
          quantity?: string
          category?: string
          estimated_price?: number
          checked?: boolean
          aisle_location?: string
          created_at?: string
        }
      }
      scanned_foods: {
        Row: {
          id: string
          user_id: string
          food_name: string
          barcode: string
          ingredients: Json
          nutrition_info: Json
          safety_score: number
          safety_analysis: string
          benefits: Json
          warnings: Json
          scanned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          food_name: string
          barcode?: string
          ingredients?: Json
          nutrition_info?: Json
          safety_score?: number
          safety_analysis?: string
          benefits?: Json
          warnings?: Json
          scanned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          food_name?: string
          barcode?: string
          ingredients?: Json
          nutrition_info?: Json
          safety_score?: number
          safety_analysis?: string
          benefits?: Json
          warnings?: Json
          scanned_at?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          name: string
          cuisine_type: string
          address: string
          latitude: number | null
          longitude: number | null
          delivery_platforms: Json
          menu_items: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          cuisine_type?: string
          address?: string
          latitude?: number | null
          longitude?: number | null
          delivery_platforms?: Json
          menu_items?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          cuisine_type?: string
          address?: string
          latitude?: number | null
          longitude?: number | null
          delivery_platforms?: Json
          menu_items?: Json
          created_at?: string
        }
      }
      safe_restaurant_items: {
        Row: {
          id: string
          user_id: string
          restaurant_id: string
          item_name: string
          safety_score: number
          customization_notes: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          restaurant_id: string
          item_name: string
          safety_score?: number
          customization_notes?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          restaurant_id?: string
          item_name?: string
          safety_score?: number
          customization_notes?: string
          created_at?: string
        }
      }
    }
  }
}
