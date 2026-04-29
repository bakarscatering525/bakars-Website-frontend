import apiClient from '../client';
import { MenuItem, MenuCategory } from '@models/menu.types';
import { MealSubscriptionPlan, DeliveryZone } from '@models/subscription.types';
import { Order } from '@models/order.types';
import { ApiResponse } from '@models/common.types';
import { DashboardStats, SalesReport, MenuItemOrdersReportRow } from '@models/admin.types';

export const adminAPI = {
  /**
   * Get dashboard statistics
   */
  getDashboardStats: () =>
    apiClient.get<ApiResponse<DashboardStats>>('/admin/dashboard'),
  /**
   * Get revenue/sales report for a date range (inclusive)
   */
  getSalesReport: (start_date: string, end_date: string) =>
    apiClient.get<ApiResponse<SalesReport>>('/admin/sales-report', {
      params: { start_date, end_date },
    }),

  /**
   * Get all orders with optional filters
   */
  getAllOrders: (filters?: {
    status?: string;
    date_from?: string;
    date_to?: string;
    order_type?: string;
    search?: string;
    page?: number;
    page_size?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.date_from) params.append('date_from', filters.date_from);
    if (filters?.date_to) params.append('date_to', filters.date_to);
    if (filters?.order_type) params.append('order_type', filters.order_type);
    if (filters?.search?.trim()) params.append('search', filters.search.trim());
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.page_size) params.append('page_size', String(filters.page_size));

    const query = params.toString();
    const suffix = query ? `?${query}` : '';

    return apiClient.get<
      ApiResponse<{
        orders: Order[];
        pagination: { total: number; page: number; page_size: number; total_pages: number };
      }>
    >(`/admin/orders${suffix}`);
  },

  /**
   * Menu item orders report (counts per item per date)
   */
  getMenuItemOrdersReport: (filters?: {
    date_from?: string;
    date_to?: string;
    order_type?: string;
    menu_item_id?: string;
    page?: number;
    page_size?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters?.date_from) params.append('date_from', filters.date_from);
    if (filters?.date_to) params.append('date_to', filters.date_to);
    if (filters?.order_type) params.append('order_type', filters.order_type);
    if (filters?.menu_item_id) params.append('menu_item_id', filters.menu_item_id);
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.page_size) params.append('page_size', String(filters.page_size));

    const query = params.toString();
    const suffix = query ? `?${query}` : '';

    return apiClient.get<
      ApiResponse<{
        results: MenuItemOrdersReportRow[];
        pagination: { total: number; page: number; page_size: number; total_pages: number };
      }>
    >(`/admin/menu-orders${suffix}`);
  },

  /**
   * Update order status (admin only)
   */
  updateOrderStatus: (orderId: string, status: string, admin_notes?: string) =>
    apiClient.patch<ApiResponse<Order>>(`/admin/orders/${orderId}/status`, {
      status,
      admin_notes,
    }),

  /**
   * Menu items (admin)
   */
  createMenuItem: (data: FormData) =>
    apiClient.post<
      ApiResponse<{ item: MenuItem; id: string; availability_scope?: string }>
    >('/admin/menu-items', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  createDailyMenuItem: (data: FormData) =>
    apiClient.post<
      ApiResponse<{ item: MenuItem; id: string; availability_scope?: string }>
    >('/admin/menu-items/daily', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  createMealPlanMenuItem: (data: FormData) =>
    apiClient.post<
      ApiResponse<{ item: MenuItem; id: string; availability_scope?: string }>
    >('/admin/menu-items/meal-plan', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateMenuItem: (itemId: string, data: FormData) =>
    apiClient.put<ApiResponse<MenuItem>>(`/admin/menu-items/${itemId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteMenuItem: (itemId: string) =>
    apiClient.delete<ApiResponse<void>>(`/admin/menu-items/${itemId}`),
  getAllMenuItems: (options?: {
    page?: number;
    pageSize?: number;
    category?: string;
    includeUnavailable?: boolean;
    search?: string;
  }) => {
    const safePage = Math.max(1, options?.page ?? 1);
    const safePageSize = Math.min(Math.max(1, options?.pageSize ?? 50), 200);
    const includeUnavailable = options?.includeUnavailable ?? true;
    const params = new URLSearchParams();
    params.append('include_unavailable', includeUnavailable ? 'true' : 'false');
    params.append('page', String(safePage));
    params.append('page_size', String(safePageSize));
    if (options?.category) params.append('category', options.category);
    if (options?.search?.trim()) params.append('search', options.search.trim());
    return apiClient.get<
      ApiResponse<{
        items: MenuItem[];
        total: number;
        page: number;
        page_size: number;
        total_pages: number;
        stats?: { total: number; available: number; unavailable: number; daily_ready: number; weekly_ready: number };
      }>
    >(`/admin/menu-items?${params.toString()}`);
  },



  /**
   * Categories (admin)
   */
  getAllCategories: (page: number = 1, pageSize: number = 100) => {
    const safePage = Math.max(1, page);
    const safePageSize = Math.min(Math.max(1, pageSize), 100);
    const params = new URLSearchParams();
    params.append('include_inactive', 'true');
    params.append('page', String(safePage));
    params.append('page_size', String(safePageSize));
    return apiClient.get<ApiResponse<{ categories: MenuCategory[]; total: number; page: number; page_size: number; total_pages: number }>>(
      `/admin/categories?${params.toString()}`
    );
  },
  createCategory: (data: FormData) =>
    apiClient.post<ApiResponse<MenuCategory>>('/admin/categories', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateCategory: (categoryId: string, data: FormData) =>
    apiClient.put<ApiResponse<MenuCategory>>(
      `/admin/categories/${categoryId}`,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    ),
  deleteCategory: (categoryId: string) =>
    apiClient.delete<ApiResponse<void>>(`/admin/categories/${categoryId}`),

  /**
   * Meal subscription plans (admin)
   */
  getMealPlans: (
    tab?: string,
    includeInactive: boolean = true,
    page: number = 1,
    pageSize: number = 10,
  ) => {
    const safePage = Math.max(1, page);
    const safePageSize = Math.min(Math.max(1, pageSize), 100);

    const params = new URLSearchParams();
    if (tab) params.append('tab', tab);
    params.append('include_inactive', includeInactive ? 'true' : 'false');
    params.append('page', String(safePage));
    params.append('page_size', String(safePageSize));

    return apiClient.get<
      ApiResponse<{
        plans: MealSubscriptionPlan[];
        total: number;
        page: number;
        page_size: number;
        total_pages: number;
      }>
    >(`/admin/meal-plans?${params.toString()}`);
  },
  createMealPlan: (payload: Partial<MealSubscriptionPlan>) =>
    apiClient.post<ApiResponse<MealSubscriptionPlan>>('/admin/meal-plans', payload),
  updateMealPlan: (
    planId: string,
    payload: Partial<MealSubscriptionPlan>
  ) =>
    apiClient.put<ApiResponse<MealSubscriptionPlan>>(
      `/admin/meal-plans/${planId}`,
      payload
    ),
  deleteMealPlan: (planId: string) =>
    apiClient.delete<ApiResponse<void>>(`/admin/meal-plans/${planId}`),

  /**
   * Weekly menu schedule (admin)
   */
  upsertWeeklySchedule: (
    delivery_date: string,
    menu_item_ids: string[],
    menu_rotation: number = 1
  ) => {
    const formData = new FormData();
    formData.append('delivery_date', delivery_date);
    formData.append('menu_rotation', String(menu_rotation));
    formData.append('menu_item_ids', JSON.stringify(menu_item_ids));
    return apiClient.post<ApiResponse<{ id: string }>>(
      '/admin/weekly-schedule',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  },

  /**
   * Delivery zones (admin)
   */
  getDeliveryZones: (
    includeInactive: boolean = true,
    page: number = 1,
    pageSize: number = 10,
    search?: string
  ) => {
    const safePage = Math.max(1, page);
    const safePageSize = Math.min(Math.max(1, pageSize), 100);

    const params = new URLSearchParams();
    params.append('include_inactive', includeInactive ? 'true' : 'false');
    params.append('page', String(safePage));
    params.append('page_size', String(safePageSize));
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    return apiClient.get<ApiResponse<{ zones: DeliveryZone[]; total: number; page: number; page_size: number; total_pages: number }>>(
      `/admin/delivery-zones?${params.toString()}`
    );
  },
  createDeliveryZone: (payload: Partial<DeliveryZone>) =>
    apiClient.post<ApiResponse<DeliveryZone>>('/admin/delivery-zones', payload),
  updateDeliveryZone: (
    zoneId: string,
    payload: Partial<DeliveryZone>
  ) =>
    apiClient.put<ApiResponse<DeliveryZone>>(
      `/admin/delivery-zones/${zoneId}`,
      payload
    ),
  deleteDeliveryZone: (zoneId: string, permanent: boolean = false) =>
    apiClient.delete<ApiResponse<void>>(
      `/admin/delivery-zones/${zoneId}?permanent=${String(permanent)}`
    ),
};
