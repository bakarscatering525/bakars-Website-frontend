import { create } from 'zustand';
import { menuAPI } from '@api/endpoints/menu';
import {
  MenuItem,
  MenuFilters,
  MenuCategory,
  PaginationState,
  DailyMenuAvailability,
} from '@models/menu.types';
import { formatCategoryLabel } from '@utils/formatters';

const DEFAULT_DAILY_PAGE_SIZE = 12;

// ============================================
// NORMALIZATION HELPERS
// ============================================

const normalizeMenuItem = (item: any): MenuItem => {
  const itemId = item.id || item._id;

  if (!itemId) {
    console.error('�o. Menu item missing identifier:', item);
  }

  const normalized: MenuItem = {
    ...item,
    id: itemId,
    _id: itemId,
    name: item.name || 'Unnamed Item',
    description: item.description || '',
    category: item.category || 'other',
    price: Number(item.price) || 0,
    image_url: item.image_url || undefined,
    is_available: item.is_available !== false,
    is_available_for_daily: item.is_available_for_daily !== false,
    is_available_for_meal_plan: item.is_available_for_meal_plan !== false,
    allergens: Array.isArray(item.allergens) ? item.allergens : [],
    spice_level: item.spice_level || undefined,
    is_vegetarian: item.is_vegetarian === true,
    is_vegan: item.is_vegan === true,
    is_halal: item.is_halal !== false,
    nutritional_info: item.nutritional_info || undefined,
    serving_size: item.serving_size || undefined,
    created_at: item.created_at || new Date().toISOString(),
    updated_at: item.updated_at || new Date().toISOString(),
  };

  if (import.meta.env.DEV) {
    console.log('�o. Normalized menu item:', {
      id: normalized.id,
      name: normalized.name,
      category: normalized.category,
    });
  }

  return normalized;
};

const normalizeMenuCategory = (category: any): MenuCategory | null => {
  if (!category) {
    return null;
  }

  if (typeof category === 'string') {
    const label = formatCategoryLabel(category);
    return {
      _id: category,
      id: category,
      name: category,
      display_name: label,
      description: '',
      image_url: undefined,
      is_active: true,
      sort_order: 0,
    };
  }

  const rawId = category._id || category.id || category.name || category.internal_name;
  if (!rawId) {
    return null;
  }

  const resolvedName =
    category.name || category.internal_name || String(rawId);
  const displayName =
    category.display_name || formatCategoryLabel(resolvedName);

  return {
    _id: category._id || String(rawId),
    id: category.id || String(rawId),
    name: resolvedName,
    display_name: displayName,
    description: category.description || '',
    image_url: category.image_url,
    is_active: category.is_active !== false,
    sort_order:
      typeof category.sort_order === 'number'
        ? category.sort_order
        : Number(category.sort_order) || 0,
    created_at: category.created_at,
    updated_at: category.updated_at,
  };
};



// ============================================
// MENU STORE
// ============================================

interface MenuState {
  dailyMenuItems: MenuItem[];
  mealPlanItems: MenuItem[];
  dailyMenuPagination: PaginationState;
  dailyMenuAvailability: DailyMenuAvailability | null;
  categories: MenuCategory[];
  categoryMap: Record<string, MenuCategory>;
  activeFilters: MenuFilters;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;

  fetchDailyMenu: (options?: {
    page?: number;
    pageSize?: number;
    filters?: Partial<MenuFilters>;
    search?: string;
  }) => Promise<void>;
  fetchMealPlanMenu: (deliveryDate?: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  searchMenuItems: (query: string) => Promise<void>;
  fetchDailyMenuAvailability: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<MenuFilters>) => void;
  clearFilters: () => void;
  getFilteredItems: (orderType: 'daily_menu' | 'meal_subscription') => MenuItem[];
}

export const useMenuStore = create<MenuState>((set, get) => ({
  dailyMenuItems: [],
  mealPlanItems: [],
  dailyMenuPagination: {
    page: 1,
    pageSize: DEFAULT_DAILY_PAGE_SIZE,
    total: 0,
    totalPages: 1,
  },
  dailyMenuAvailability: null,
  categories: [],
  categoryMap: {},
  activeFilters: {},
  searchQuery: '',
  isLoading: false,
  error: null,

  fetchDailyMenu: async (options) => {
    const state = get();
    const currentPagination = state.dailyMenuPagination;
    const page = options?.page ?? currentPagination.page ?? 1;
    const pageSize =
      options?.pageSize ?? currentPagination.pageSize ?? DEFAULT_DAILY_PAGE_SIZE;

    const filters: MenuFilters = {
      ...state.activeFilters,
      ...(options?.filters || {}),
      page,
      page_size: pageSize,
    };

    const searchTerm = options?.search ?? state.searchQuery;
    if (searchTerm && searchTerm.trim()) {
      filters.search = searchTerm.trim();
    }

    set({ isLoading: true, error: null });

    try {
      const response = await menuAPI.getDailyMenu(filters);
      const payload = response.data?.data ?? response.data;

      let items: any[] = [];
      let paginationMeta: PaginationState = {
        page,
        pageSize,
        total: 0,
        totalPages: 1,
      };

      if (Array.isArray(payload)) {
        items = payload;
        paginationMeta.total = payload.length;
      } else if (payload?.items && Array.isArray(payload.items)) {
        items = payload.items;
        paginationMeta = {
          page: payload.pagination?.page ?? page,
          pageSize: payload.pagination?.page_size ?? pageSize,
          total: payload.pagination?.total_items ?? payload.pagination?.total ?? items.length,
          totalPages: payload.pagination?.total_pages ?? 1,
        };
      } else if (payload?.items && Array.isArray(payload.items)) {
        items = payload.items;
      } else if (Array.isArray(response.data)) {
        items = response.data;
      } else if (Array.isArray(response.data?.items)) {
        items = response.data.items;
      } else {
        console.warn('�o. [MenuStore] Unknown daily menu payload shape:', payload);
      }

      const normalizedItems = items.map(normalizeMenuItem);

      set({
        dailyMenuItems: normalizedItems,
        dailyMenuPagination: {
          page: paginationMeta.page,
          pageSize: paginationMeta.pageSize,
          total: paginationMeta.total ?? normalizedItems.length,
          totalPages: paginationMeta.totalPages ?? 1,
        },
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('�o. [MenuStore] Failed to fetch daily menu:', error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch daily menu',
        isLoading: false,
        dailyMenuItems: [],
        dailyMenuPagination: {
          page: 1,
          pageSize,
          total: 0,
          totalPages: 1,
        },
      });
    }
  },

  fetchMealPlanMenu: async (deliveryDate?: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await menuAPI.getWeeklyMenu(deliveryDate);
      const menuData = response.data?.data || response.data;

      let items: any[] = [];
      if (Array.isArray(menuData)) {
        items = menuData;
      } else if (menuData?.items && Array.isArray(menuData.items)) {
        items = menuData.items;
      }

      const normalizedItems = items.map(normalizeMenuItem);

      set({
        mealPlanItems: normalizedItems,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('�o. [MenuStore] Failed to fetch weekly menu:', error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch weekly menu',
        isLoading: false,
        mealPlanItems: [],
      });
    }
  },

  fetchDailyMenuAvailability: async () => {
    try {
      const response = await menuAPI.getDailyMenuAvailability();
      const payload = response.data?.data ?? response.data;

      if (payload) {
        set({
          dailyMenuAvailability: payload as DailyMenuAvailability,
        });
      }
    } catch (error) {
      console.error('[MenuStore] Failed to fetch daily menu availability:', error);
    }
  },

  fetchCategories: async () => {
    try {
      const response = await menuAPI.getCategories();
      const payload = response.data?.data ?? response.data;

      let rawCategories: any[] = [];
      if (Array.isArray(payload)) {
        rawCategories = payload;
      } else if (Array.isArray(payload?.categories)) {
        rawCategories = payload.categories;
      }

      const normalizedCategories = rawCategories
        .map(normalizeMenuCategory)
        .filter((category): category is MenuCategory => {
          if (!category) {
            return false;
          }
          return category.is_active !== false;
        })
        .sort((a, b) => {
          if (a.sort_order !== b.sort_order) {
            return a.sort_order - b.sort_order;
          }
          return a.display_name.localeCompare(b.display_name);
        });

      const categoryMap = normalizedCategories.reduce(
        (acc, category) => {
          acc[category.name] = category;
          if (category.id) {
            acc[category.id] = category;
          }
          if (category._id) {
            acc[category._id] = category;
          }
          return acc;
        },
        {} as Record<string, MenuCategory>
      );

      set({ categories: normalizedCategories, categoryMap });
    } catch (error: any) {
      console.error('[MenuStore] Failed to fetch categories:', error);
      set({ categories: [], categoryMap: {} });
    }
  },

  searchMenuItems: async (query: string) => {
    set({ searchQuery: query, isLoading: true, error: null });

    try {
      const response = await menuAPI.searchMenuItems(query);
      const data = response.data?.data || response.data;
      const items = Array.isArray(data) ? data : [];
      const normalizedItems = items.map(normalizeMenuItem);

      set({
        dailyMenuItems: normalizedItems.filter(
          (item) => item.is_available_for_daily
        ),
        mealPlanItems: normalizedItems.filter(
          (item) => item.is_available_for_meal_plan
        ),
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('�o. [MenuStore] Search failed:', error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          'Search failed',
        isLoading: false,
      });
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setFilters: (filters: Partial<MenuFilters>) =>
    set((state) => ({
      activeFilters: { ...state.activeFilters, ...filters },
    })),

  clearFilters: () => set({ activeFilters: {}, searchQuery: '' }),

  getFilteredItems: (orderType: 'daily_menu' | 'meal_subscription') => {
    const { activeFilters, searchQuery } = get();

    if (orderType === 'daily_menu') {
      return get().dailyMenuItems;
    }

    const items = get().mealPlanItems;
    let filtered = items;

    if (activeFilters.category) {
      filtered = filtered.filter((item) => item.category === activeFilters.category);
    }

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  },
}));

