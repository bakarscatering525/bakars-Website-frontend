export interface MenuItem {
  _id: string;  // MongoDB ID
  id: string;   // Also support 'id' field for compatibility
  name: string;
  description: string;
  category: string;
  price: number;
  image_url?: string;  // ✅ This can be null/undefined
  availability_scope?: 'daily' | 'meal_plan' | 'both';
  is_available: boolean;
  is_available_for_daily: boolean;
  is_available_for_meal_plan: boolean;
  nutritional_info?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  allergens?: string[];
  spice_level?: 'mild' | 'medium' | 'hot';
  is_vegetarian: boolean;
  is_vegan?: boolean;
  is_halal?: boolean;
  serving_size?: string;
  created_at: string;
  updated_at: string;
}

export interface DailyMenuAvailability {
  is_open: boolean;
  window_label: string;
  timezone: string;
  opens_at: string;
  closes_at: string;
  current_time?: string;
  message?: string;
}

export interface MenuCategory {
  _id: string;
  id: string;
  name: string;
  display_name: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface MenuFilters {
  category?: string;
  search?: string;
  order_type?: 'daily_menu' | 'meal_subscription';
  page?: number;
  page_size?: number;
  pageSize?: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
