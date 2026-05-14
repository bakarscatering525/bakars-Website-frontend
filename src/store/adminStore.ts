import { create } from 'zustand';
import { adminAPI } from '@api';
import { MenuItem, MenuCategory } from '@models/menu.types';
import { MealSubscriptionPlan, DeliveryZone } from '@models/subscription.types';
import { Order } from '@models/order.types';
import { DashboardStats, SalesReport } from '@models/admin.types';

interface PaginationMeta {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface AdminStore {
  // Dashboard
  orderStats: DashboardStats | null;
  fetchDashboardStats: () => Promise<void>;
  revenueReport: SalesReport | null;
  isRevenueLoading: boolean;
  fetchSalesReport: (startDate: string, endDate: string) => Promise<void>;

  // Orders with pagination
  allOrders: Order[];
  orderPagination: PaginationMeta | null;
  fetchAllOrders: (filters?: {
    status?: string;
    date_from?: string;
    date_to?: string;
    order_type?: string;
    search?: string;
    page?: number;
    page_size?: number;
  }) => Promise<void>;
  updateOrderStatus: (orderId: string, status: string, notes?: string) => Promise<void>;

  // Menu Items
  managedMenuItems: MenuItem[];
  menuItemPagination: PaginationMeta | null;
  menuItemStats: {
    total: number;
    available: number;
    unavailable: number;
    daily_ready: number;
    weekly_ready: number;
  } | null;
  fetchManagedMenuItems: (options?: {
    page?: number;
    pageSize?: number;
    category?: string;
    includeUnavailable?: boolean;
    search?: string;
  }) => Promise<void>;
  lastMenuItemsQuery: {
    page: number;
    pageSize: number;
    category?: string;
    includeUnavailable: boolean;
    search?: string;
  };
  createMenuItem: (data: FormData) => Promise<void>;
  updateMenuItem: (itemId: string, data: FormData) => Promise<void>;
  deleteMenuItem: (itemId: string) => Promise<void>;

  // Categories
  managedCategories: MenuCategory[];
  categoryPagination: PaginationMeta | null;
  fetchManagedCategories: (page?: number, pageSize?: number) => Promise<void>;
  createCategory: (data: FormData) => Promise<void>;
  updateCategory: (categoryId: string, data: FormData) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;

  // Meal Plans
  mealPlans: MealSubscriptionPlan[];
  mealPlanPagination: PaginationMeta | null;
  fetchMealPlans: (options?: {
    tab?: string;
    includeInactive?: boolean;
    page?: number;
    pageSize?: number;
  }) => Promise<void>;
  createMealPlan: (payload: Partial<MealSubscriptionPlan>) => Promise<void>;
  updateMealPlan: (planId: string, payload: Partial<MealSubscriptionPlan>) => Promise<void>;
  deleteMealPlan: (planId: string) => Promise<void>;

  // Delivery Zones
  deliveryZones: DeliveryZone[];
  deliveryZonePagination: PaginationMeta | null;
  fetchDeliveryZones: (options?: {
    includeInactive?: boolean;
    page?: number;
    pageSize?: number;
    search?: string;
  }) => Promise<void>;
  createDeliveryZone: (payload: Partial<DeliveryZone>) => Promise<void>;
  updateDeliveryZone: (zoneId: string, payload: Partial<DeliveryZone>) => Promise<void>;
  deleteDeliveryZone: (zoneId: string, permanent?: boolean) => Promise<void>;

  // Loading states
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  clearError: () => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  // Initial state
  orderStats: null,
  revenueReport: null,
  allOrders: [],
  orderPagination: null,
  managedMenuItems: [],
  menuItemPagination: null,
  menuItemStats: null,
  lastMenuItemsQuery: {
    page: 1,
    pageSize: 50,
    includeUnavailable: true,
  },
  managedCategories: [],
  categoryPagination: null,
  mealPlans: [],
  mealPlanPagination: null,
  deliveryZones: [],
  deliveryZonePagination: null,
  isLoading: false,
  isRevenueLoading: false,
  isUpdating: false,
  error: null,

  clearError: () => set({ error: null }),

  // Dashboard
  fetchDashboardStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await adminAPI.getDashboardStats();
      set({ orderStats: response.data.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch dashboard stats',
        isLoading: false,
      });
      throw error;
    }
  },

  fetchSalesReport: async (startDate, endDate) => {
    const formatDate = (date: string, endOfDay: boolean) => {
      // If a time component exists, trust it; otherwise append start/end of day for inclusivity
      if (date.includes('T')) return date;
      return `${date}T${endOfDay ? '23:59:59' : '00:00:00'}`;
    };
    set({ isRevenueLoading: true, error: null });
    try {
      const response = await adminAPI.getSalesReport(
        formatDate(startDate, false),
        formatDate(endDate, true)
      );
      set({ revenueReport: response.data.data, isRevenueLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch sales report',
        isRevenueLoading: false,
      });
      throw error;
    }
  },

  // Orders with pagination
  fetchAllOrders: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await adminAPI.getAllOrders(filters);
      set({
        allOrders: response.data.data.orders,
        orderPagination: response.data.data.pagination,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch orders',
        isLoading: false,
      });
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status, notes) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.updateOrderStatus(orderId, status, notes);
      set({ isUpdating: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update order status',
        isUpdating: false,
      });
      throw error;
    }
  },

  // Menu Items
  fetchManagedMenuItems: async (options = {}) => {
    const previousQuery = get().lastMenuItemsQuery || {
      page: 1,
      pageSize: 50,
      category: undefined,
      includeUnavailable: true,
      search: undefined,
    };

    const resolvedOptions = {
      page: options.page ?? previousQuery.page ?? 1,
      pageSize: options.pageSize ?? previousQuery.pageSize ?? 50,
      category:
        options.category !== undefined
          ? options.category
          : previousQuery.category,
      includeUnavailable:
        options.includeUnavailable ??
        previousQuery.includeUnavailable ??
        true,
      search:
        options.search !== undefined ? options.search : previousQuery.search,
    };

    const normalizedOptions = {
      page: Math.max(1, resolvedOptions.page),
      pageSize: Math.min(Math.max(1, resolvedOptions.pageSize), 200),
      category: resolvedOptions.category,
      includeUnavailable: resolvedOptions.includeUnavailable ?? true,
      search: resolvedOptions.search?.trim() || undefined,
    };

    set({ isLoading: true, error: null });
    try {
      const response = await adminAPI.getAllMenuItems(normalizedOptions);
      set({
        managedMenuItems: response.data.data.items,
        menuItemPagination: {
          total: response.data.data.total,
          page: response.data.data.page,
          page_size: response.data.data.page_size,
          total_pages: response.data.data.total_pages,
        },
        menuItemStats: response.data.data.stats ?? null,
        lastMenuItemsQuery: normalizedOptions,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch menu items',
        isLoading: false,
      });
      throw error;
    }
  },

  createMenuItem: async (data) => {
    set({ isUpdating: true, error: null });
    try {
      const rawScope = data.get('availability_scope');
      let normalizedScope: 'daily' | 'meal_plan' | 'both' = 'both';
      if (typeof rawScope === 'string') {
        const candidate = rawScope.toLowerCase();
        if (candidate === 'daily' || candidate === 'meal_plan' || candidate === 'both') {
          normalizedScope = candidate as 'daily' | 'meal_plan' | 'both';
          if (candidate !== rawScope) {
            data.set('availability_scope', normalizedScope);
          }
        } else {
          data.set('availability_scope', normalizedScope);
        }
      } else {
        data.set('availability_scope', normalizedScope);
      }

      const requestFn =
        normalizedScope === 'daily'
          ? adminAPI.createDailyMenuItem
          : normalizedScope === 'meal_plan'
          ? adminAPI.createMealPlanMenuItem
          : adminAPI.createMenuItem;

      await requestFn(data);
      set({ isUpdating: false });
      await get().fetchManagedMenuItems();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create menu item',
        isUpdating: false,
      });
      throw error;
    }
  },

  updateMenuItem: async (itemId, data) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.updateMenuItem(itemId, data);
      set({ isUpdating: false });
      await get().fetchManagedMenuItems();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update menu item',
        isUpdating: false,
      });
      throw error;
    }
  },

  deleteMenuItem: async (itemId) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.deleteMenuItem(itemId);
      set({ isUpdating: false });
      await get().fetchManagedMenuItems();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to delete menu item',
        isUpdating: false,
      });
      throw error;
    }
  },

  // Categories
  fetchManagedCategories: async (page = 1, pageSize = 100) => {
    set({ isLoading: true, error: null });
    try {
      const response = await adminAPI.getAllCategories(page, pageSize);
      set({
        managedCategories: response.data.data.categories,
        categoryPagination: {
          total: response.data.data.total,
          page: response.data.data.page,
          page_size: response.data.data.page_size,
          total_pages: response.data.data.total_pages,
        },
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch categories',
        isLoading: false,
      });
      throw error;
    }
  },

  createCategory: async (data) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.createCategory(data);
      set({ isUpdating: false });
      await get().fetchManagedCategories();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create category',
        isUpdating: false,
      });
      throw error;
    }
  },

  updateCategory: async (categoryId, data) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.updateCategory(categoryId, data);
      set({ isUpdating: false });
      await get().fetchManagedCategories();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update category',
        isUpdating: false,
      });
      throw error;
    }
  },

  deleteCategory: async (categoryId) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.deleteCategory(categoryId);
      set({ isUpdating: false });
      await get().fetchManagedCategories();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to delete category',
        isUpdating: false,
      });
      throw error;
    }
  },

  // Meal Plans
  fetchMealPlans: async (options = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await adminAPI.getMealPlans(
        options.tab,
        options.includeInactive ?? true,
        options.page ?? 1,
        options.pageSize ?? 10
      );
      set({
        mealPlans: response.data.data.plans,
        mealPlanPagination: {
          total: response.data.data.total,
          page: response.data.data.page,
          page_size: response.data.data.page_size,
          total_pages: response.data.data.total_pages,
        },
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch meal plans',
        isLoading: false,
      });
      throw error;
    }
  },

  createMealPlan: async (payload) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.createMealPlan(payload);
      set({ isUpdating: false });
      await get().fetchMealPlans();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create meal plan',
        isUpdating: false,
      });
      throw error;
    }
  },

  updateMealPlan: async (planId, payload) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.updateMealPlan(planId, payload);
      set({ isUpdating: false });
      await get().fetchMealPlans();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update meal plan',
        isUpdating: false,
      });
      throw error;
    }
  },

  deleteMealPlan: async (planId) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.deleteMealPlan(planId);
      set({ isUpdating: false });
      await get().fetchMealPlans();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to delete meal plan',
        isUpdating: false,
      });
      throw error;
    }
  },

  // Delivery Zones
  fetchDeliveryZones: async (options = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await adminAPI.getDeliveryZones(
        options.includeInactive ?? true,
        options.page ?? 1,
        options.pageSize ?? 10,
        options.search
      );
      set({
        deliveryZones: response.data.data.zones,
        deliveryZonePagination: {
          total: response.data.data.total,
          page: response.data.data.page,
          page_size: response.data.data.page_size,
          total_pages: response.data.data.total_pages,
        },
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch delivery zones',
        isLoading: false,
      });
      throw error;
    }
  },

  createDeliveryZone: async (payload) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.createDeliveryZone(payload);
      set({ isUpdating: false });
      await get().fetchDeliveryZones();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create delivery zone',
        isUpdating: false,
      });
      throw error;
    }
  },

  updateDeliveryZone: async (zoneId, payload) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.updateDeliveryZone(zoneId, payload);
      set({ isUpdating: false });
      await get().fetchDeliveryZones();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update delivery zone',
        isUpdating: false,
      });
      throw error;
    }
  },

  deleteDeliveryZone: async (zoneId, permanent = false) => {
    set({ isUpdating: true, error: null });
    try {
      await adminAPI.deleteDeliveryZone(zoneId, permanent);
      set({ isUpdating: false });
      await get().fetchDeliveryZones();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to delete delivery zone',
        isUpdating: false,
      });
      throw error;
    }
  },
}));
