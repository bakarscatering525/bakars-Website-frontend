import apiClient from '../client';
import { MenuItem, MenuFilters, MenuCategory, DailyMenuAvailability } from '@models/menu.types';
import { MealSubscriptionPlan } from '@models/subscription.types';
import { ApiResponse } from '@models/common.types';

type DailyMenuResponsePayload =
  | MenuItem[]
  | {
      items: MenuItem[];
      pagination: {
        page: number;
        page_size: number;
        total_items: number;
        total_pages: number;
      };
    };

export const menuAPI = {
  /**
   * Get daily menu items
   */
  getDailyMenu: (filters?: MenuFilters) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);

    const pageValue = filters?.page;
    if (pageValue) {
      params.append('page', String(pageValue));
    }
    const pageSizeValue = filters?.page_size ?? filters?.pageSize;
    if (pageSizeValue) {
      params.append('page_size', String(pageSizeValue));
    }

    // Add filter for weekly available items
    if (filters?.order_type === 'meal_subscription') {
      params.append('is_available_for_meal_plan', 'true');
    }

    const query = params.toString();
    const suffix = query ? `?${query}` : '';

    return apiClient.get<ApiResponse<DailyMenuResponsePayload>>(
      `/menu/daily${suffix}`
    );
  },

  /**
   * Get current daily menu ordering window
   */
  getDailyMenuAvailability: () => {
    return apiClient.get<ApiResponse<DailyMenuAvailability>>('/menu/daily/status');
  },

  /**
   * Get configurable meal subscription plans
   */
  getMealSubscriptionPlans: (tab?: string) => {
    const params = tab ? `?tab=${encodeURIComponent(tab)}` : '';
    return apiClient.get<ApiResponse<MealSubscriptionPlan[]>>(
      `/menu/subscription/plans${params}`
    );
  },

  /**
   * Get weekly menu items with improved error handling
   */
  getWeeklyMenu: (delivery_date?: string) => {
    // If no date provided, use next Monday
    if (!delivery_date) {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + daysUntilMonday);
      delivery_date = nextMonday.toISOString().split('T')[0];
    }

    const params = `?delivery_date=${delivery_date}`;
    
    console.log('🔍 Fetching weekly menu for date:', delivery_date);
    
    return apiClient.get<ApiResponse<any>>(`/menu/weekly${params}`).catch((error) => {
      // If 404, don't throw - let the component handle it
      if (error.response?.status === 404) {
        console.log('📝 No weekly menu found for date:', delivery_date);
        // Return a valid but empty response structure
        return {
          data: {
            success: true,
            data: { 
              delivery_date,
              menu_rotation: null,
              items: []
            }
          },
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: error.config
        };
      }
      // Re-throw other errors
      throw error;
    });
  },



  /**
   * Get menu categories
   */
  getCategories: () => {
    return apiClient.get<ApiResponse<MenuCategory[] | { categories: MenuCategory[] }>>(
      '/menu/categories'
    );
  },

  /**
   * Get specific menu item by ID
   */
  getMenuItemById: (id: string) => {
    return apiClient.get<ApiResponse<MenuItem>>(`/menu/items/${id}`);
  },

  /**
   * Search menu items
   */
  searchMenuItems: (query: string, filters?: MenuFilters) => {
    const params = new URLSearchParams({ search: query });
    if (filters?.category) params.append('category', filters.category);
    if (filters?.order_type) params.append('order_type', filters.order_type);
    return apiClient.get<ApiResponse<MenuItem[]>>(
      `/menu/daily?${params.toString()}`
    );
  },
};
