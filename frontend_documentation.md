# Frontend Project Documentation
**Generated on:** 2025-11-13 20:11:31
**Project Type:** React + TypeScript + Vite
**Project Root:** `D:\NexusNao\CLIENTS\BAKAR\frontend`

---

## Recent Updates (2025-11-14)
- Added explicit admin APIs for creating menu items per program: `POST /admin/menu-items/daily`, `POST /admin/menu-items/meal-plan`, and the existing `POST /admin/menu-items` now treats `availability_scope` (daily/meal_plan/both) consistently.
- Admin UI now offers aligned radio-card selectors when adding or editing menu items to choose Daily, Meal Plan, or Both, automatically wiring the correct API and payload flags.
- Form submissions normalize allergens (either comma-separated or JSON) and guarantee at least one availability target so the backend and frontend stay in sync.

## Project Structure Overview

- **API Layer**: 12 files
- **Configuration**: 15 files
- **Custom Hooks**: 6 files
- **Page Components**: 18 files
- **Public Assets**: 2 files
- **React Components**: 55 files
- **Routing**: 4 files
- **State Management**: 7 files
- **Styles**: 1 files
- **TypeScript Types**: 9 files
- **Utilities**: 5 files

---

## Table of Contents


### API Layer
- [client.ts](#src-api-clientts)
- [config.ts](#src-api-configts)
- [admin.ts](#src-api-endpoints-admints)
- [auth.ts](#src-api-endpoints-authts)
- [cart.ts](#src-api-endpoints-cartts)
- [contact.ts](#src-api-endpoints-contactts)
- [delivery.ts](#src-api-endpoints-deliveryts)
- [menu.ts](#src-api-endpoints-menuts)
- [notifications.ts](#src-api-endpoints-notificationsts)
- [orders.ts](#src-api-endpoints-ordersts)
- [payments.ts](#src-api-endpoints-paymentsts)
- [index.ts](#src-api-indexts)

### Configuration
- [.eslintrc.json](#eslintrcjson)
- [.prettierrc](#prettierrc)
- [Dockerfile](#dockerfile)
- [index.html](#indexhtml)
- [nginx.conf](#nginxconf)
- [package-lock.json](#package-lockjson)
- [package.json](#packagejson)
- [postcss.config.js](#postcssconfigjs)
- [App.tsx](#src-apptsx)
- [main.tsx](#src-maintsx)
- [vite-env.d.ts](#src-vite-envdts)
- [tailwind.config.js](#tailwindconfigjs)
- [tsconfig.json](#tsconfigjson)
- [tsconfig.node.json](#tsconfignodejson)
- [vite.config.ts](#viteconfigts)

### Custom Hooks
- [useAuth.ts](#src-hooks-useauthts)
- [useCart.ts](#src-hooks-usecartts)
- [useDebounce.ts](#src-hooks-usedebouncets)
- [useMenu.ts](#src-hooks-usemenuts)
- [useOrders.ts](#src-hooks-useordersts)
- [useToast.ts](#src-hooks-usetoastts)

### Page Components
- [AdminDashboard.tsx](#src-pages-admin-admindashboardtsx)
- [CategoryManagement.tsx](#src-pages-admin-categorymanagementtsx)
- [DeliveryZonesPage.tsx](#src-pages-admin-deliveryzonespagetsx)
- [MealPlanManagement.tsx](#src-pages-admin-mealplanmanagementtsx)
- [MenuManagement.tsx](#src-pages-admin-menumanagementtsx)
- [OrderManagement.tsx](#src-pages-admin-ordermanagementtsx)
- [CartPage.tsx](#src-pages-customer-cartpagetsx)
- [CateringPage.tsx](#src-pages-customer-cateringpagetsx)
- [CheckoutPage.tsx](#src-pages-customer-checkoutpagetsx)
- [DailyMenuPage.tsx](#src-pages-customer-dailymenupagetsx)
- [MealsSubscriptionPage.tsx](#src-pages-customer-mealssubscriptionpagetsx)
- [ProfilePage.tsx](#src-pages-customer-profilepagetsx)
- [ContactPage.tsx](#src-pages-public-contactpagetsx)
- [ForgotPasswordPage.tsx](#src-pages-public-forgotpasswordpagetsx)
- [HomePage.tsx](#src-pages-public-homepagetsx)
- [LoginPage.tsx](#src-pages-public-loginpagetsx)
- [RegisterPage.tsx](#src-pages-public-registerpagetsx)
- [ResetPasswordPage.tsx](#src-pages-public-resetpasswordpagetsx)

### Public Assets
- [favicon.svg](#public-faviconsvg)
- [logo.svg](#public-logosvg)

### React Components
- [AdminSidebar.tsx](#src-components-admin-adminsidebartsx)
- [CategoryForm.tsx](#src-components-admin-categories-categoryformtsx)
- [OrderStats.tsx](#src-components-admin-dashboard-orderstatstsx)
- [RecentOrders.tsx](#src-components-admin-dashboard-recentorderstsx)
- [RevenueChart.tsx](#src-components-admin-dashboard-revenuecharttsx)
- [AddMenuItem.tsx](#src-components-admin-menu-addmenuitemtsx)
- [EditMenuItem.tsx](#src-components-admin-menu-editmenuitemtsx)
- [MenuItemsList.tsx](#src-components-admin-menu-menuitemslisttsx)
- [OrderActions.tsx](#src-components-admin-orders-orderactionstsx)
- [OrderDetails.tsx](#src-components-admin-orders-orderdetailstsx)
- [OrdersList.tsx](#src-components-admin-orders-orderslisttsx)
- [AuthModal.tsx](#src-components-auth-authmodaltsx)
- [LoginForm.tsx](#src-components-auth-loginformtsx)
- [ProtectedRoute.tsx](#src-components-auth-protectedroutetsx)
- [RegisterForm.tsx](#src-components-auth-registerformtsx)
- [RoleGuard.tsx](#src-components-auth-roleguardtsx)
- [CartItem.tsx](#src-components-cart-cartitemtsx)
- [CartSummary.tsx](#src-components-cart-cartsummarytsx)
- [DeliverySelector.tsx](#src-components-cart-deliveryselectortsx)
- [CateringMenu.tsx](#src-components-catering-cateringmenutsx)
- [CateringSummary.tsx](#src-components-catering-cateringsummarytsx)
- [EventDetails.tsx](#src-components-catering-eventdetailstsx)
- [HeadCountCalculator.tsx](#src-components-catering-headcountcalculatortsx)
- [AddressSelector.tsx](#src-components-checkout-addressselectortsx)
- [OrderReview.tsx](#src-components-checkout-orderreviewtsx)
- [PaymentForm.tsx](#src-components-checkout-paymentformtsx)
- [PlaceOrderButton.tsx](#src-components-checkout-placeorderbuttontsx)
- [Button.tsx](#src-components-common-buttontsx)
- [Card.tsx](#src-components-common-cardtsx)
- [Input.tsx](#src-components-common-inputtsx)
- [LoadingScreen.tsx](#src-components-common-loadingscreentsx)
- [Modal.tsx](#src-components-common-modaltsx)
- [Pagination.tsx](#src-components-common-paginationtsx)
- [Toast.tsx](#src-components-common-toasttsx)
- [CartIcon.tsx](#src-components-layout-carticontsx)
- [Footer.tsx](#src-components-layout-footertsx)
- [Header.tsx](#src-components-layout-headertsx)
- [Layout.tsx](#src-components-layout-layouttsx)
- [Logo.tsx](#src-components-layout-logotsx)
- [Navigation.tsx](#src-components-layout-navigationtsx)
- [UserMenu.tsx](#src-components-layout-usermenutsx)
- [CartSummary.tsx](#src-components-menu-cartsummarytsx)
- [CategoryFilter.tsx](#src-components-menu-categoryfiltertsx)
- [FilterBar.tsx](#src-components-menu-filterbartsx)
- [MenuItemCard.tsx](#src-components-menu-menuitemcardtsx)
- [MenuItemGrid.tsx](#src-components-menu-menuitemgridtsx)
- [SidelinesPanel.tsx](#src-components-menu-sidelinespaneltsx)
- [AddressCard.tsx](#src-components-profile-addresscardtsx)
- [AddressManager.tsx](#src-components-profile-addressmanagertsx)
- [OrderHistory.tsx](#src-components-profile-orderhistorytsx)
- [ProfileForm.tsx](#src-components-profile-profileformtsx)
- [DeliverySchedule.tsx](#src-components-subscription-deliveryscheduletsx)
- [MealSelection.tsx](#src-components-subscription-mealselectiontsx)
- [SubscriptionPlans.tsx](#src-components-subscription-subscriptionplanstsx)
- [SubscriptionSummary.tsx](#src-components-subscription-subscriptionsummarytsx)

### Routing
- [AdminRoutes.tsx](#src-routes-adminroutestsx)
- [CustomerRoutes.tsx](#src-routes-customerroutestsx)
- [PublicRoutes.tsx](#src-routes-publicroutestsx)
- [index.tsx](#src-routes-indextsx)

### State Management
- [addressStore.ts](#src-store-addressstorets)
- [adminStore.ts](#src-store-adminstorets)
- [authModalStore.ts](#src-store-authmodalstorets)
- [authStore.ts](#src-store-authstorets)
- [cartStore.ts](#src-store-cartstorets)
- [menuStore.ts](#src-store-menustorets)
- [orderStore.ts](#src-store-orderstorets)

### Styles
- [globals.css](#src-styles-globalscss)

### TypeScript Types
- [address.types.ts](#src-types-addresstypests)
- [admin.types.ts](#src-types-admintypests)
- [auth.types.ts](#src-types-authtypests)
- [cart.types.ts](#src-types-carttypests)
- [common.types.ts](#src-types-commontypests)
- [menu.types.ts](#src-types-menutypests)
- [order.types.ts](#src-types-ordertypests)
- [payment.types.ts](#src-types-paymenttypests)
- [subscription.types.ts](#src-types-subscriptiontypests)

### Utilities
- [constants.ts](#src-utils-constantsts)
- [formatters.ts](#src-utils-formattersts)
- [images.ts](#src-utils-imagests)
- [storage.ts](#src-utils-storagets)
- [validators.ts](#src-utils-validatorsts)

---

## File Contents

## 📂 API Layer

### 📘 client.ts
**Path:** `src\api\client.ts`

<details>
<summary>View Code (51 lines)</summary>

```typescript
// frontend/src/api/client.ts

import axios from "axios";
import { storage } from "@utils/storage";
import { apiBaseUrl } from "./config";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 15000),
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Example: Add auth token if available
    const token = localStorage.getItem(storage.keys.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Log request errors
    console.error("API request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API response error:", error.response);

      if (error.response.status === 401) {
        // Clear any stale auth token and let the app decide how to react.
        localStorage.removeItem(storage.keys.AUTH_TOKEN);
        window.dispatchEvent(new Event("bakars:auth-unauthorized"));
      }
    } else if (error.request) {
      console.error("No response from API:", error.request);
    } else {
      console.error("API error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```
</details>

---

### 📘 config.ts
**Path:** `src\api\config.ts`

<details>
<summary>View Code (38 lines)</summary>

```typescript
const FALLBACK_PATH = "/api/v1";
const DEV_FALLBACK_URL = `http://localhost:8000${FALLBACK_PATH}`;

function normalizeUrl(url?: string) {
  if (!url) return undefined;
  return url.replace(/\/+$/, "");
}

export function resolveApiBaseUrl() {
  const envApiUrl = normalizeUrl(import.meta.env.VITE_API_URL);
  if (envApiUrl) {
    return envApiUrl;
  }

  const envBaseUrl = normalizeUrl(import.meta.env.VITE_API_BASE_URL);
  if (envBaseUrl) {
    const lower = envBaseUrl.toLowerCase();
    const alreadyHasApiSegment =
      lower.includes("/api/") || lower.endsWith("/api") || lower.includes("/api?");
    return alreadyHasApiSegment ? envBaseUrl : `${envBaseUrl}${FALLBACK_PATH}`;
  }

  if (typeof window !== "undefined") {
    const sameOriginFallback = `${window.location.origin}${FALLBACK_PATH}`;
    if (import.meta.env.PROD) {
      console.warn(
        "VITE_API_URL/VITE_API_BASE_URL not set. Falling back to same-origin API path:",
        sameOriginFallback
      );
    }
    return normalizeUrl(sameOriginFallback) ?? DEV_FALLBACK_URL;
  }

  return DEV_FALLBACK_URL;
}

export const apiBaseUrl = resolveApiBaseUrl();
export const apiFallbackPath = FALLBACK_PATH;
```
</details>

---

### 📘 admin.ts
**Path:** `src\api\endpoints\admin.ts`

<details>
<summary>View Code (196 lines)</summary>

```typescript
import apiClient from '../client';
import { MenuItem, MenuCategory } from '@models/menu.types';
import { MealSubscriptionPlan, DeliveryZone } from '@models/subscription.types';
import { Order } from '@models/order.types';
import { ApiResponse } from '@models/common.types';
import { DashboardStats } from '@models/admin.types';

export const adminAPI = {
  /**
   * Get dashboard statistics
   */
  getDashboardStats: () =>
    apiClient.get<ApiResponse<DashboardStats>>('/admin/dashboard'),

  /**
   * Get all orders with optional filters
   */
  getAllOrders: (filters?: {
    status?: string;
    date_from?: string;
    date_to?: string;
    order_type?: string;
    page?: number;
    page_size?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.date_from) params.append('date_from', filters.date_from);
    if (filters?.date_to) params.append('date_to', filters.date_to);
    if (filters?.order_type) params.append('order_type', filters.order_type);
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
    apiClient.post<ApiResponse<{ ids: string[]; count: number }>>('/admin/menu-items', data, {
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
   * Delivery zones (admin)
   */
  getDeliveryZones: (includeInactive: boolean = true, page: number = 1, pageSize: number = 10) => {
    const safePage = Math.max(1, page);
    const safePageSize = Math.min(Math.max(1, pageSize), 100);

    const params = new URLSearchParams();
    params.append('include_inactive', includeInactive ? 'true' : 'false');
    params.append('page', String(safePage));
    params.append('page_size', String(safePageSize));
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
```
</details>

---

### 📘 auth.ts
**Path:** `src\api\endpoints\auth.ts`

<details>
<summary>View Code (40 lines)</summary>

```typescript
import apiClient from '../client';
import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User, 
  RegistrationResponse,
  VerifyEmailData,
  ResendVerificationData,
  ForgotPasswordData,
  ResetPasswordData,
} from '@models/auth.types';

export const authAPI = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),

  register: (data: RegisterData) =>
    apiClient.post<RegistrationResponse>('/auth/register', data),

  verifyEmail: (data: VerifyEmailData) =>
    apiClient.post<AuthResponse>('/auth/verify-email', data),

  resendVerification: (data: ResendVerificationData) =>
    apiClient.post<{ email: string }>('/auth/resend-verification', data),

  forgotPassword: (data: ForgotPasswordData) =>
    apiClient.post<{ message: string }>('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordData) =>
    apiClient.post<{ message: string }>('/auth/reset-password', data),

  getProfile: () => apiClient.get<User>('/auth/profile'),

  updateProfile: (data: Partial<User>) =>
    apiClient.put<User>('/auth/profile', data),

  logout: () => apiClient.post('/auth/logout'),
};

```
</details>

---

### 📘 cart.ts
**Path:** `src\api\endpoints\cart.ts`

<details>
<summary>View Code (68 lines)</summary>

```typescript
import apiClient from '../client'
import { ApiResponse } from '@models/common.types'

export interface CartItem {
  item_id: string;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CartSideline {
  item_id: string;
  item_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CartSummary {
  items: CartItem[];
  sidelines: CartSideline[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  items_count: number;
}

export const cartAPI = {
  /**
   * Get cart summary for current user
   */
  getCartSummary: () => 
    apiClient.get<ApiResponse<CartSummary>>('/cart/summary'),

  /**
   * Add item to cart - FIXED to match backend API
   */
  addToCart: (item_id: string, quantity: number, is_sideline: boolean = false) => {
    console.log('📤 Sending to /cart/add-item:', { item_id, quantity, is_sideline });
    return apiClient.post<ApiResponse<CartSummary>>('/cart/add-item', {
      item_id,
      quantity,
      is_sideline,
    });
  },

  /**
   * Update cart item quantity
   */
  updateCartItem: (item_id: string, quantity: number, is_sideline: boolean = false) => 
    apiClient.put<ApiResponse<CartSummary>>(`/cart/update-item/${item_id}?is_sideline=${is_sideline}`, { 
      quantity 
    }),

  /**
   * Remove item from cart
   */
  removeFromCart: (item_id: string, is_sideline: boolean = false) => 
    apiClient.delete<ApiResponse<CartSummary>>(`/cart/remove-item/${item_id}?is_sideline=${is_sideline}`),

  /**
   * Clear cart
   */
  clearCart: () => 
    apiClient.post<ApiResponse<void>>('/cart/clear'),
}
```
</details>

---

### 📘 contact.ts
**Path:** `src\api\endpoints\contact.ts`

<details>
<summary>View Code (15 lines)</summary>

```typescript
import apiClient from '../client';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const contactAPI = {
  async sendMessage(payload: ContactPayload) {
    const response = await apiClient.post('/contact', payload);
    return response.data;
  },
};
```
</details>

---

### 📘 delivery.ts
**Path:** `src\api\endpoints\delivery.ts`

<details>
<summary>View Code (85 lines)</summary>

```typescript
import apiClient from '../client'
import { Address, CreateAddressPayload, DeliveryAvailability, DeliveryValidation } from '@models/address.types'
import { DeliveryZone } from '@models/subscription.types'
import { ApiResponse } from '@models/common.types'

interface DeliveryFeeRequestPayload {
  address: string
  order_value: number
  delivery_days: number
  is_express?: boolean
}

export const deliveryAPI = {
  /**
   * Get all addresses for user
   */
  getAddresses: () => 
    apiClient.get<ApiResponse<Address[]>>('/addresses'),

  /**
   * Get address by ID
   */
  getAddressById: (addressId: string) => 
    apiClient.get<ApiResponse<Address>>(`/addresses/${addressId}`),

  /**
   * Create new address
   */
  createAddress: (payload: CreateAddressPayload) => 
    apiClient.post<ApiResponse<Address>>('/addresses', payload),

  /**
   * Update address
   */
  updateAddress: (addressId: string, payload: Partial<CreateAddressPayload>) => 
    apiClient.put<ApiResponse<Address>>(`/addresses/${addressId}`, payload),

  /**
   * Delete address
   */
  deleteAddress: (addressId: string) => 
    apiClient.delete<ApiResponse<void>>(`/addresses/${addressId}`),

  /**
   * Set default address
   */
  setDefaultAddress: (addressId: string) => 
    apiClient.put<ApiResponse<Address>>(`/addresses/${addressId}/default`),

  /**
   * Validate delivery address (wrapper around availability check)
   */
  validateDelivery: (address: string, orderType: 'daily' | 'weekly' | 'catering') => 
    apiClient.post<ApiResponse<DeliveryAvailability>>('/delivery/check-availability', {
      address,
      order_type: orderType,
    }),

  /**
   * Calculate delivery fee
   */
  calculateDeliveryFee: (payload: DeliveryFeeRequestPayload) => 
    apiClient.post<ApiResponse<{
      delivery_fee: number
      distance_km: number
      delivery_days: number
      is_express: boolean
      formatted_address?: string
    }>>('/delivery/calculate-fee', payload),

  /**
   * Check delivery availability for an address
   */
  checkAvailability: (address: string, orderType: 'daily' | 'weekly' | 'catering') =>
    apiClient.post<ApiResponse<DeliveryAvailability>>('/delivery/check-availability', {
      address,
      order_type: orderType,
    }),

  /**
   * Get configured delivery zones with pricing
   */
  getDeliveryZones: () =>
    apiClient.get<ApiResponse<DeliveryZone[]>>('/delivery/zones'),
}
```
</details>

---

### 📘 menu.ts
**Path:** `src\api\endpoints\menu.ts`

<details>
<summary>View Code (131 lines)</summary>

```typescript
import apiClient from '../client';
import { MenuItem, MenuFilters, MenuCategory } from '@models/menu.types';
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
```
</details>

---

### 📘 notifications.ts
**Path:** `src\api\endpoints\notifications.ts`

<details>
<summary>View Code (38 lines)</summary>

```typescript
import apiClient from '../client'
import { ApiResponse } from '@models/common.types'

export interface Notification {
  id: string
  user_id: string
  type: 'order_update' | 'promotion' | 'system'
  title: string
  message: string
  read: boolean
  created_at: string
}

export const notificationsAPI = {
  /**
   * Get user notifications
   */
  getNotifications: () => 
    apiClient.get<ApiResponse<Notification[]>>('/notifications'),

  /**
   * Mark notification as read
   */
  markAsRead: (notificationId: string) => 
    apiClient.put<ApiResponse<void>>(`/notifications/${notificationId}/read`),

  /**
   * Mark all notifications as read
   */
  markAllAsRead: () => 
    apiClient.put<ApiResponse<void>>('/notifications/read-all'),

  /**
   * Delete notification
   */
  deleteNotification: (notificationId: string) => 
    apiClient.delete<ApiResponse<void>>(`/notifications/${notificationId}`),
}
```
</details>

---

### 📘 orders.ts
**Path:** `src\api\endpoints\orders.ts`

<details>
<summary>View Code (67 lines)</summary>

```typescript
import apiClient from '../client';
import { Order, OrderTracking } from '@models/order.types';
import { ApiResponse } from '@models/common.types';

export const ordersAPI = {
  /**
   * Create daily order
   */
  createDailyOrder: (payload: any) =>
    apiClient.post<ApiResponse<Order>>('/orders/daily', payload),

  /**
   * Create meal subscription order
   */
  createMealSubscriptionOrder: (payload: any) =>
    apiClient.post<ApiResponse<Order>>('/orders/weekly', payload),

  /**
   * Get meal subscription order details
   */
  getMealSubscriptionDetails: (orderId: string) =>
    apiClient.get<ApiResponse<any>>(`/orders/weekly/${orderId}`),

  /**
   * Update meal subscription order
   */
  updateMealSubscriptionOrder: (orderId: string, payload: any) =>
    apiClient.put<ApiResponse<Order>>(`/orders/weekly/${orderId}`, payload),

  /**
   * Create catering order
   */
  createCateringOrder: (payload: any) =>
    apiClient.post<ApiResponse<Order>>('/orders/catering', payload),

  /**
   * Get user's order history
   */
  getOrderHistory: (page: number = 1, page_size: number = 20) =>
    apiClient.get<ApiResponse<{ orders: Order[]; total: number; page: number; page_size: number }>>(
      `/orders/my-orders?page=${page}&page_size=${page_size}`
    ),

  /**
   * Get order by ID
   */
  getOrderById: (orderId: string) =>
    apiClient.get<ApiResponse<Order>>(`/orders/${orderId}`),

  /**
   * Track order
   */
  trackOrder: (orderId: string) =>
    apiClient.get<ApiResponse<OrderTracking>>(`/orders/${orderId}/track`),

  /**
   * Cancel order
   */
  cancelOrder: (orderId: string, reason: string) =>
    apiClient.post<ApiResponse<Order>>(`/orders/${orderId}/cancel`, { reason }),

  /**
   * Update order status (admin)
   */
  updateOrderStatus: (orderId: string, status: string) =>
    apiClient.patch<ApiResponse<Order>>(`/admin/orders/${orderId}/status`, { status }),
};
```
</details>

---

### 📘 payments.ts
**Path:** `src\api\endpoints\payments.ts`

<details>
<summary>View Code (45 lines)</summary>

```typescript
import apiClient from '../client'
import { ApiResponse } from '@models/common.types'
import type {
  PaymentIntentResponse,
  ConfirmPaymentResponse,
  PaymentConfigResponse,
} from '@models/payment.types'

export const paymentsAPI = {
  /**
   * Create payment intent for order
   */
  createPaymentIntent: (orderId: string) =>
    apiClient.post<ApiResponse<PaymentIntentResponse>>(
      '/payments/create-intent',
      { order_id: orderId },
    ),

  /**
   * Confirm payment
   */
  confirmPayment: (paymentIntentId: string) =>
    apiClient.post<ApiResponse<ConfirmPaymentResponse>>(
      '/payments/confirm',
      { payment_intent_id: paymentIntentId },
    ),

  /**
   * Get payment status
   */
  getPaymentStatus: (paymentIntentId: string) => 
    apiClient.get<ApiResponse<{ status: string }>>(`/payments/${paymentIntentId}/status`),

  /**
   * Get Stripe config (publishable key + status)
   */
  getConfig: () =>
    apiClient.get<ApiResponse<PaymentConfigResponse>>('/payments/config'),

  /**
   * Request refund
   */
  requestRefund: (orderId: string, reason: string) => 
    apiClient.post<ApiResponse<void>>('/payments/refund', { order_id: orderId, reason }),
}
```
</details>

---

### 📘 index.ts
**Path:** `src\api\index.ts`

<details>
<summary>View Code (11 lines)</summary>

```typescript
export { authAPI } from './endpoints/auth'
export { menuAPI } from './endpoints/menu'
export { ordersAPI } from './endpoints/orders'
export { cartAPI } from './endpoints/cart'
export { deliveryAPI } from './endpoints/delivery'
export { paymentsAPI } from './endpoints/payments'
export { notificationsAPI } from './endpoints/notifications'
export { adminAPI } from './endpoints/admin'
export { contactAPI } from './endpoints/contact'

export { default as apiClient } from './client'
```
</details>

---

## 📂 Configuration

### 📋 .eslintrc.json
**Path:** `.eslintrc.json`

<details>
<summary>View Code (14 lines)</summary>

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "react-refresh"
  ],
  "rules": {
    "react-refresh/only-export-components": "warn"
  }
}
```
</details>

---

### 📄 .prettierrc
**Path:** `.prettierrc`

<details>
<summary>View Code (7 lines)</summary>

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```
</details>

---

### 🐳 Dockerfile
**Path:** `Dockerfile`

<details>
<summary>View Code (20 lines)</summary>

```dockerfile
# syntax=docker/dockerfile:1.4

FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
```
</details>

---

### 🌐 index.html
**Path:** `index.html`

<details>
<summary>View Code (13 lines)</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bakar's Food & Catering</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```
</details>

---

### 📄 nginx.conf
**Path:** `nginx.conf`

<details>
<summary>View Code (40 lines)</summary>

```nginx
server {
    listen 3000;
    listen [::]:3000;
    server_name _;
    client_max_body_size 20m;

    root /usr/share/nginx/html;
    index index.html;

    # Handle client-side routing by always serving index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls to the backend service to keep the browser on the same origin
    location /api/ {
        proxy_pass https://backend.bakarsfood.com;
        proxy_set_header Host backend.bakarsfood.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_buffering off;
        proxy_request_buffering off;
    }

    # Cache static assets aggressively
    location ~* \.(?:js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        try_files $uri =404;
        expires 7d;
        add_header Cache-Control "public, max-age=604800, immutable";
    }

    # Disable caching for HTML
    location ~* \.(?:html)$ {
        expires -1;
        add_header Cache-Control "no-cache";
    }
}
```
</details>

---

### 📋 package-lock.json
**Path:** `package-lock.json`

<details>
<summary>View Code (5154 lines)</summary>

```json
{
  "name": "bakars-frontend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "bakars-frontend",
      "version": "1.0.0",
      "dependencies": {
        "@hookform/resolvers": "^3.10.0",
        "@stripe/react-stripe-js": "^2.7.1",
        "@stripe/stripe-js": "^4.6.0",
        "axios": "^1.12.2",
        "clsx": "^2.1.1",
        "date-fns": "^3.6.0",
        "framer-motion": "^12.23.24",
        "jspdf": "^2.5.2",
        "jspdf-autotable": "^3.8.4",
        "leaflet": "^1.9.4",
        "lucide-react": "^0.446.0",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-hook-form": "^7.65.0",
        "react-leaflet": "^4.2.1",
        "react-router-dom": "^6.30.1",
        "tailwind-merge": "^2.6.0",
        "zod": "^3.25.76",
        "zustand": "^4.5.7"
      },
      "devDependencies": {
        "@types/node": "^24.9.1",
        "@types/react": "^18.3.10",
        "@types/react-dom": "^18.3.0",
        "@typescript-eslint/eslint-plugin": "^8.7.0",
        "@typescript-eslint/parser": "^8.7.0",
        "@vitejs/plugin-react": "^4.3.2",
        "autoprefixer": "^10.4.20",
        "eslint": "^9.11.1",
        "eslint-plugin-react-hooks": "^5.1.0-rc.0",
        "eslint-plugin-react-refresh": "^0.4.12",
        "postcss": "^8.4.47",
        "prettier": "^3.3.3",
        "tailwindcss": "^3.4.13",
        "typescript": "^5.6.2",
        "vite": "^5.4.8"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.27.1.tgz",
      "integrity": "sha512-cjQ7ZlQ0Mv3b47hABuTevyTuYN4i+loJKGeV9flcCgIK37cCXRh+L1bd3iBHlynerhQ7BhCkn2BPbQUL+rGqFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.27.1",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.28.5.tgz",
      "integrity": "sha512-6uFXyCayocRbqhZOB+6XcuZbkMNimwfVGFji8CTZnCzOHVGvDqzvitu1re2AU5LROliz7eQPhB8CpAMvnx9EjA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.28.5.tgz",
      "integrity": "sha512-e7jT4DxYvIDLk1ZHmU/m/mB19rex9sv0c2ftBtjSBv+kVM/902eh0fINUzD7UwLLNR+jU585GxUJ8/EBfAM5fw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.5",
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-module-transforms": "^7.28.3",
        "@babel/helpers": "^7.28.4",
        "@babel/parser": "^7.28.5",
        "@babel/template": "^7.27.2",
        "@babel/traverse": "^7.28.5",
        "@babel/types": "^7.28.5",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/core/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.28.5.tgz",
      "integrity": "sha512-3EwLFhZ38J4VyIP6WNtt2kUdW9dokXA9Cr4IVIFHuCpZ3H8/YFOl5JjZHisrn1fATPBmKKqXzDFvh9fUwHz6CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.28.5",
        "@babel/types": "^7.28.5",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.27.2.tgz",
      "integrity": "sha512-2+1thGUUWWjLTYTHZWK1n8Yga0ijBz1XAhUXcKy81rd5g6yh7hGqMp45v7cadSbEHc9G3OTv45SyneRN3ps4DQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.27.2",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.27.1.tgz",
      "integrity": "sha512-0gSFWUPNXNopqtIPQvlD5WgXYI5GY2kP2cCvoT8kczjbfcfuIljTbcWrulD1CIPIX2gt1wghbDy08yE1p+/r3w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.27.1",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.3.tgz",
      "integrity": "sha512-gytXUbs8k2sXS9PnQptz5o0QnpLL51SwASIORY6XaBKF88nsOT0Zw9szLqlSGQDP/4TljBAD5y98p2U1fqkdsw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.27.1",
        "@babel/traverse": "^7.28.3"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.27.1.tgz",
      "integrity": "sha512-1gn1Up5YXka3YYAHGKpbideQ5Yjf1tDa9qYcgysz+cNCXukyLl6DjPXhD3VRwSb8c0J9tA4b2+rHEZtc6R0tlw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.28.4.tgz",
      "integrity": "sha512-HFN59MmQXGHVyYadKLVumYsA9dBFun/ldYxipEjzA4196jpLZd8UjEEBLkbEkvfYreDqJhZxYAWFPtrfhNpj4w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.27.2",
        "@babel/types": "^7.28.4"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.28.5.tgz",
      "integrity": "sha512-KKBU1VGYR7ORr3At5HAtUQ+TV3SzRCXmA/8OdDZiLDBIZxVyzXuztPjfLd3BV1PRAQGCMWWSHYhL0F8d5uHBDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.5"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.27.1.tgz",
      "integrity": "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.27.1.tgz",
      "integrity": "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.28.4.tgz",
      "integrity": "sha512-Q/N6JNWvIvPnLDvjlE1OUBLPQHH6l3CltCEsHIujp45zQUSSh8K+gHnaEX45yAT1nyngnINhvWtzN+Nb9D8RAQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.27.2.tgz",
      "integrity": "sha512-LPDZ85aEJyYSd18/DkjNh4/y1ntkE5KwUHWTiqgRxruuZL2F1yuHligVHLvcHY2vMHXttKFpJn6LwfI7cw7ODw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/parser": "^7.27.2",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.28.5.tgz",
      "integrity": "sha512-TCCj4t55U90khlYkVV/0TfkJkAkUg3jZFA3Neb7unZT8CPok7iiRfaX0F+WnqWqt7OxhOn0uBKXCw4lbL8W0aQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.5",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.28.5",
        "@babel/template": "^7.27.2",
        "@babel/types": "^7.28.5",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.28.5.tgz",
      "integrity": "sha512-qQ5m48eI/MFLQ5PxQj4PFaprjyCTLI37ElWMmNs0K8Lk3dVeOdNpB3ks8jc7yM5CDmVC73eMVk/trk3fgmrUpA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.21.5.tgz",
      "integrity": "sha512-1SDgH6ZSPTlggy1yI6+Dbkiz8xzpHJEVAlF/AM1tHPLsf5STom9rwtjE4hKAF20FfXXNTFqEYXyJNWh1GiZedQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.21.5.tgz",
      "integrity": "sha512-vCPvzSjpPHEi1siZdlvAlsPxXl7WbOVUBBAowWug4rJHb68Ox8KualB+1ocNvT5fjv6wpkX6o/iEpbDrf68zcg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.21.5.tgz",
      "integrity": "sha512-c0uX9VAUBQ7dTDCjq+wdyGLowMdtR/GoC2U5IYk/7D1H1JYC0qseD7+11iMP2mRLN9RcCMRcjC4YMclCzGwS/A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.21.5.tgz",
      "integrity": "sha512-D7aPRUUNHRBwHxzxRvp856rjUHRFW1SdQATKXH2hqA0kAZb1hKmi02OpYRacl0TxIGz/ZmXWlbZgjwWYaCakTA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.21.5.tgz",
      "integrity": "sha512-DwqXqZyuk5AiWWf3UfLiRDJ5EDd49zg6O9wclZ7kUMv2WRFr4HKjXp/5t8JZ11QbQfUS6/cRCKGwYhtNAY88kQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.21.5.tgz",
      "integrity": "sha512-se/JjF8NlmKVG4kNIuyWMV/22ZaerB+qaSi5MdrXtd6R08kvs2qCN4C09miupktDitvh8jRFflwGFBQcxZRjbw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.21.5.tgz",
      "integrity": "sha512-5JcRxxRDUJLX8JXp/wcBCy3pENnCgBR9bN6JsY4OmhfUtIHe3ZW0mawA7+RDAcMLrMIZaf03NlQiX9DGyB8h4g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.21.5.tgz",
      "integrity": "sha512-J95kNBj1zkbMXtHVH29bBriQygMXqoVQOQYA+ISs0/2l3T9/kj42ow2mpqerRBxDJnmkUDCaQT/dfNXWX/ZZCQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.21.5.tgz",
      "integrity": "sha512-bPb5AHZtbeNGjCKVZ9UGqGwo8EUu4cLq68E95A53KlxAPRmUyYv2D6F0uUI65XisGOL1hBP5mTronbgo+0bFcA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.21.5.tgz",
      "integrity": "sha512-ibKvmyYzKsBeX8d8I7MH/TMfWDXBF3db4qM6sy+7re0YXya+K1cem3on9XgdT2EQGMu4hQyZhan7TeQ8XkGp4Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.21.5.tgz",
      "integrity": "sha512-YvjXDqLRqPDl2dvRODYmmhz4rPeVKYvppfGYKSNGdyZkA01046pLWyRKKI3ax8fbJoK5QbxblURkwK/MWY18Tg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.21.5.tgz",
      "integrity": "sha512-uHf1BmMG8qEvzdrzAqg2SIG/02+4/DHB6a9Kbya0XDvwDEKCoC8ZRWI5JJvNdUjtciBGFQ5PuBlpEOXQj+JQSg==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.21.5.tgz",
      "integrity": "sha512-IajOmO+KJK23bj52dFSNCMsz1QP1DqM6cwLUv3W1QwyxkyIWecfafnI555fvSGqEKwjMXVLokcV5ygHW5b3Jbg==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.21.5.tgz",
      "integrity": "sha512-1hHV/Z4OEfMwpLO8rp7CvlhBDnjsC3CttJXIhBi+5Aj5r+MBvy4egg7wCbe//hSsT+RvDAG7s81tAvpL2XAE4w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.21.5.tgz",
      "integrity": "sha512-2HdXDMd9GMgTGrPWnJzP2ALSokE/0O5HhTUvWIbD3YdjME8JwvSCnNGBnTThKGEB91OZhzrJ4qIIxk/SBmyDDA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.21.5.tgz",
      "integrity": "sha512-zus5sxzqBJD3eXxwvjN1yQkRepANgxE9lgOW2qLnmr8ikMTphkjgXu1HR01K4FJg8h1kEEDAqDcZQtbrRnB41A==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.21.5.tgz",
      "integrity": "sha512-1rYdTpyv03iycF1+BhzrzQJCdOuAOtaqHTWJZCWvijKD2N5Xu0TtVC8/+1faWqcP9iBCWOmjmhoH94dH82BxPQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.21.5.tgz",
      "integrity": "sha512-Woi2MXzXjMULccIwMnLciyZH4nCIMpWQAs049KEeMvOcNADVxo0UBIQPfSmxB3CWKedngg7sWZdLvLczpe0tLg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.21.5.tgz",
      "integrity": "sha512-HLNNw99xsvx12lFBUwoT8EVCsSvRNDVxNpjZ7bPn947b8gJPzeHWyNVhFsaerc0n3TsbOINvRP2byTZ5LKezow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.21.5.tgz",
      "integrity": "sha512-6+gjmFpfy0BHU5Tpptkuh8+uw3mnrvgs+dSPQXQOv3ekbordwnzTVEb4qnIvQcYXq6gzkyTnoZ9dZG+D4garKg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.21.5.tgz",
      "integrity": "sha512-Z0gOTd75VvXqyq7nsl93zwahcTROgqvuAcYDUr+vOv8uHhNSKROyU961kgtCD1e95IqPKSQKH7tBTslnS3tA8A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.21.5.tgz",
      "integrity": "sha512-SWXFF1CL2RVNMaVs+BBClwtfZSvDgtL//G/smwAc5oVK/UPu2Gu9tIaRgFmYFFKrmg3SyAjSrElf0TiJ1v8fYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.21.5.tgz",
      "integrity": "sha512-tQd/1efJuzPC6rCFwEvLtci/xNFcTZknmXs98FYDfGE4wP9ClFV98nyKrzJKVPMhdDnjzLhdUyMX4PsQAPjwIw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.0",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.0.tgz",
      "integrity": "sha512-ayVFHdtZ+hsq1t2Dy24wCmGXGe4q9Gu3smhLYALJrr473ZH27MsnSL+LKUlimp4BWJqMDMLmPpx/Q9R3OAlL4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.1",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.1.tgz",
      "integrity": "sha512-aw1gNayWpdI/jSYVgzN5pL0cfzU02GT3NBpeT/DXbx1/1x7ZKxFPd9bwrzygx/qiwIQiJ1sw/zD8qY/kRvlGHA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.7",
        "debug": "^4.3.1",
        "minimatch": "^3.1.2"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-array/node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/@eslint/config-array/node_modules/minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.1.tgz",
      "integrity": "sha512-csZAzkNhsgwb0I/UAV6/RGFTbiakPCf0ZrGmrIxQpYvGZ00PhTkSnyKNolphgIvmnJeGw6rcGVEXfTzUnFuEvw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.16.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.16.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.16.0.tgz",
      "integrity": "sha512-nmC8/totwobIiFcGkDza3GIKfAw1+hLiYVrh3I1nIomQ8PEr5cxg34jnkmGawul/ep52wGRAcyeDCNtWKSOj4Q==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.1.tgz",
      "integrity": "sha512-gtF186CXhIl1p4pJNGZw8Yc6RlshoePRvE0X91oPGb3vZ8pM3qOS9W9NGPat9LziaBV7XrJWGylNQXkGcnM3IQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.12.4",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.0",
        "minimatch": "^3.1.2",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.38.0",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.38.0.tgz",
      "integrity": "sha512-UZ1VpFvXf9J06YG9xQBdnzU+kthors6KjhMAl6f4gH4usHyh31rUf2DLGInT8RFYIReYXNSydgPY0V2LuWgl7A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
      "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.0.tgz",
      "integrity": "sha512-sB5uyeq+dwCWyPi31B2gQlVlo+j5brPlWx4yZBrEaRo/nhdDE8Xke1gsGgtiBdaBTxuTkceLVuVt/pclrasb0A==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.16.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@hookform/resolvers": {
      "version": "3.10.0",
      "resolved": "https://registry.npmjs.org/@hookform/resolvers/-/resolvers-3.10.0.tgz",
      "integrity": "sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag==",
      "license": "MIT",
      "peerDependencies": {
        "react-hook-form": "^7.0.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.1",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.1.tgz",
      "integrity": "sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.7",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.7.tgz",
      "integrity": "sha512-/zUx+yOsIrG4Y43Eh2peDeKCxlRt/gET6aHfaKpuq267qXdYDFViVHfMaLyygZOnl0kGWxFIgsBy8QFuTLUXEQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.1",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@isaacs/cliui": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/@isaacs/cliui/-/cliui-8.0.2.tgz",
      "integrity": "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^5.1.2",
        "string-width-cjs": "npm:string-width@^4.2.0",
        "strip-ansi": "^7.0.1",
        "strip-ansi-cjs": "npm:strip-ansi@^6.0.1",
        "wrap-ansi": "^8.1.0",
        "wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@pkgjs/parseargs": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/@pkgjs/parseargs/-/parseargs-0.11.0.tgz",
      "integrity": "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=14"
      }
    },
    "node_modules/@react-leaflet/core": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/@react-leaflet/core/-/core-2.1.0.tgz",
      "integrity": "sha512-Qk7Pfu8BSarKGqILj4x7bCSZ1pjuAPZ+qmRwH5S7mDS91VSbVVsJSrW4qA+GPrro8t69gFYVMWb1Zc4yFmPiVg==",
      "license": "Hippocratic-2.1",
      "peerDependencies": {
        "leaflet": "^1.9.0",
        "react": "^18.0.0",
        "react-dom": "^18.0.0"
      }
    },
    "node_modules/@remix-run/router": {
      "version": "1.23.0",
      "resolved": "https://registry.npmjs.org/@remix-run/router/-/router-1.23.0.tgz",
      "integrity": "sha512-O3rHJzAQKamUz1fvE0Qaw0xSFqsA/yafi2iqeE0pvdFtCO1viYx8QL6f3Ln/aCCTLxs68SLf0KPM9eSeM8yBnA==",
      "license": "MIT",
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-beta.27",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.27.tgz",
      "integrity": "sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.52.5.tgz",
      "integrity": "sha512-8c1vW4ocv3UOMp9K+gToY5zL2XiiVw3k7f1ksf4yO1FlDFQ1C2u72iACFnSOceJFsWskc2WZNqeRhFRPzv+wtQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.52.5.tgz",
      "integrity": "sha512-mQGfsIEFcu21mvqkEKKu2dYmtuSZOBMmAl5CFlPGLY94Vlcm+zWApK7F/eocsNzp8tKmbeBP8yXyAbx0XHsFNA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.52.5.tgz",
      "integrity": "sha512-takF3CR71mCAGA+v794QUZ0b6ZSrgJkArC+gUiG6LB6TQty9T0Mqh3m2ImRBOxS2IeYBo4lKWIieSvnEk2OQWA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.52.5.tgz",
      "integrity": "sha512-W901Pla8Ya95WpxDn//VF9K9u2JbocwV/v75TE0YIHNTbhqUTv9w4VuQ9MaWlNOkkEfFwkdNhXgcLqPSmHy0fA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.52.5.tgz",
      "integrity": "sha512-QofO7i7JycsYOWxe0GFqhLmF6l1TqBswJMvICnRUjqCx8b47MTo46W8AoeQwiokAx3zVryVnxtBMcGcnX12LvA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.52.5.tgz",
      "integrity": "sha512-jr21b/99ew8ujZubPo9skbrItHEIE50WdV86cdSoRkKtmWa+DDr6fu2c/xyRT0F/WazZpam6kk7IHBerSL7LDQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.52.5.tgz",
      "integrity": "sha512-PsNAbcyv9CcecAUagQefwX8fQn9LQ4nZkpDboBOttmyffnInRy8R8dSg6hxxl2Re5QhHBf6FYIDhIj5v982ATQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.52.5.tgz",
      "integrity": "sha512-Fw4tysRutyQc/wwkmcyoqFtJhh0u31K+Q6jYjeicsGJJ7bbEq8LwPWV/w0cnzOqR2m694/Af6hpFayLJZkG2VQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.52.5.tgz",
      "integrity": "sha512-a+3wVnAYdQClOTlyapKmyI6BLPAFYs0JM8HRpgYZQO02rMR09ZcV9LbQB+NL6sljzG38869YqThrRnfPMCDtZg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.52.5.tgz",
      "integrity": "sha512-AvttBOMwO9Pcuuf7m9PkC1PUIKsfaAJ4AYhy944qeTJgQOqJYJ9oVl2nYgY7Rk0mkbsuOpCAYSs6wLYB2Xiw0Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.52.5.tgz",
      "integrity": "sha512-DkDk8pmXQV2wVrF6oq5tONK6UHLz/XcEVow4JTTerdeV1uqPeHxwcg7aFsfnSm9L+OO8WJsWotKM2JJPMWrQtA==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.52.5.tgz",
      "integrity": "sha512-W/b9ZN/U9+hPQVvlGwjzi+Wy4xdoH2I8EjaCkMvzpI7wJUs8sWJ03Rq96jRnHkSrcHTpQe8h5Tg3ZzUPGauvAw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.52.5.tgz",
      "integrity": "sha512-sjQLr9BW7R/ZiXnQiWPkErNfLMkkWIoCz7YMn27HldKsADEKa5WYdobaa1hmN6slu9oWQbB6/jFpJ+P2IkVrmw==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.52.5.tgz",
      "integrity": "sha512-hq3jU/kGyjXWTvAh2awn8oHroCbrPm8JqM7RUpKjalIRWWXE01CQOf/tUNWNHjmbMHg/hmNCwc/Pz3k1T/j/Lg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.52.5.tgz",
      "integrity": "sha512-gn8kHOrku8D4NGHMK1Y7NA7INQTRdVOntt1OCYypZPRt6skGbddska44K8iocdpxHTMMNui5oH4elPH4QOLrFQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.52.5.tgz",
      "integrity": "sha512-hXGLYpdhiNElzN770+H2nlx+jRog8TyynpTVzdlc6bndktjKWyZyiCsuDAlpd+j+W+WNqfcyAWz9HxxIGfZm1Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.52.5.tgz",
      "integrity": "sha512-arCGIcuNKjBoKAXD+y7XomR9gY6Mw7HnFBv5Rw7wQRvwYLR7gBAgV7Mb2QTyjXfTveBNFAtPt46/36vV9STLNg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.52.5.tgz",
      "integrity": "sha512-QoFqB6+/9Rly/RiPjaomPLmR/13cgkIGfA40LHly9zcH1S0bN2HVFYk3a1eAyHQyjs3ZJYlXvIGtcCs5tko9Cw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.52.5.tgz",
      "integrity": "sha512-w0cDWVR6MlTstla1cIfOGyl8+qb93FlAVutcor14Gf5Md5ap5ySfQ7R9S/NjNaMLSFdUnKGEasmVnu3lCMqB7w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.52.5.tgz",
      "integrity": "sha512-Aufdpzp7DpOTULJCuvzqcItSGDH73pF3ko/f+ckJhxQyHtp67rHw3HMNxoIdDMUITJESNE6a8uh4Lo4SLouOUg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.52.5.tgz",
      "integrity": "sha512-UGBUGPFp1vkj6p8wCRraqNhqwX/4kNQPS57BCFc8wYh0g94iVIW33wJtQAx3G7vrjjNtRaxiMUylM0ktp/TRSQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.52.5.tgz",
      "integrity": "sha512-TAcgQh2sSkykPRWLrdyy2AiceMckNf5loITqXxFI5VuQjS5tSuw3WlwdN8qv8vzjLAUTvYaH/mVjSFpbkFbpTg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@stripe/react-stripe-js": {
      "version": "2.9.0",
      "resolved": "https://registry.npmjs.org/@stripe/react-stripe-js/-/react-stripe-js-2.9.0.tgz",
      "integrity": "sha512-+/j2g6qKAKuWSurhgRMfdlIdKM+nVVJCy/wl0US2Ccodlqx0WqfIIBhUkeONkCG+V/b+bZzcj4QVa3E/rXtT4Q==",
      "license": "MIT",
      "dependencies": {
        "prop-types": "^15.7.2"
      },
      "peerDependencies": {
        "@stripe/stripe-js": "^1.44.1 || ^2.0.0 || ^3.0.0 || ^4.0.0",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
        "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0"
      }
    },
    "node_modules/@stripe/stripe-js": {
      "version": "4.10.0",
      "resolved": "https://registry.npmjs.org/@stripe/stripe-js/-/stripe-js-4.10.0.tgz",
      "integrity": "sha512-KrMOL+sH69htCIXCaZ4JluJ35bchuCCznyPyrbN8JXSGQfwBI1SuIEMZNwvy8L8ykj29t6sa5BAAiL7fNoLZ8A==",
      "license": "MIT",
      "engines": {
        "node": ">=12.16"
      }
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.9.1",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.9.1.tgz",
      "integrity": "sha512-QoiaXANRkSXK6p0Duvt56W208du4P9Uye9hWLWgGMDTEoKPhuenzNcC4vGUmrNkiOKTlIrBoyNQYNpSwfEZXSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.16.0"
      }
    },
    "node_modules/@types/prop-types": {
      "version": "15.7.15",
      "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.15.tgz",
      "integrity": "sha512-F6bEyamV9jKGAFBEmlQnesRPGOQqS2+Uwi0Em15xenOxHaf2hv6L8YCVn3rPdPJOiJfPiCnLIRyvwVaqMY3MIw==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/@types/raf": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/@types/raf/-/raf-3.4.3.tgz",
      "integrity": "sha512-c4YAvMedbPZ5tEyxzQdMoOhhJ4RD3rngZIdwC2/qDN3d7JpEhB6fiBRKVY1lg5B7Wk+uPBjn5f39j1/2MY1oOw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@types/react": {
      "version": "18.3.26",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-18.3.26.tgz",
      "integrity": "sha512-RFA/bURkcKzx/X9oumPG9Vp3D3JUgus/d0b67KB0t5S/raciymilkOa66olh78MUI92QLbEJevO7rvqU/kjwKA==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "@types/prop-types": "*",
        "csstype": "^3.0.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "18.3.7",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-18.3.7.tgz",
      "integrity": "sha512-MEe3UeoENYVFXzoXEWsvcpg6ZvlrFNlOQ7EOsvhI3CfAXwzPfO8Qwuxd40nepsYKqyyVQnTdEfv68q91yLcKrQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^18.0.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin": {
      "version": "8.46.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.46.2.tgz",
      "integrity": "sha512-ZGBMToy857/NIPaaCucIUQgqueOiq7HeAKkhlvqVV4lm089zUFW6ikRySx2v+cAhKeUCPuWVHeimyk6Dw1iY3w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/regexpp": "^4.10.0",
        "@typescript-eslint/scope-manager": "8.46.2",
        "@typescript-eslint/type-utils": "8.46.2",
        "@typescript-eslint/utils": "8.46.2",
        "@typescript-eslint/visitor-keys": "8.46.2",
        "graphemer": "^1.4.0",
        "ignore": "^7.0.0",
        "natural-compare": "^1.4.0",
        "ts-api-utils": "^2.1.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "@typescript-eslint/parser": "^8.46.2",
        "eslint": "^8.57.0 || ^9.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "8.46.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.46.2.tgz",
      "integrity": "sha512-BnOroVl1SgrPLywqxyqdJ4l3S2MsKVLDVxZvjI1Eoe8ev2r3kGDo+PcMihNmDE+6/KjkTubSJnmqGZZjQSBq/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/scope-manager": "8.46.2",
        "@typescript-eslint/types": "8.46.2",
        "@typescript-eslint/typescript-estree": "8.46.2",
        "@typescript-eslint/visitor-keys": "8.46.2",
        "debug": "^4.3.4"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/project-service": {
      "version": "8.46.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.46.2.tgz",
      "integrity": "sha512-PULOLZ9iqwI7hXcmL4fVfIsBi6AN9YxRc0frbvmg8f+4hQAjQ5GYNKK0DIArNo+rOKmR/iBYwkpBmnIwin4wBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/tsconfig-utils": "^8.46.2",
        "@typescript-eslint/types": "^8.46.2",
        "debug": "^4.3.4"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "8.46.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.46.2.tgz",
      "integrity": "sha512-LF4b/NmGvdWEHD2H4MsHD8ny6JpiVNDzrSZr3CsckEgCbAGZbYM4Cqxvi9L+WqDMT+51Ozy7lt2M+d0JLEuBqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.46.2",
        "@typescript-eslint/visitor-keys": "8.46.2"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/tsconfig-utils": {
      "version": "8.46.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.46.2.tgz",
      "integrity": "sha512-a7QH6fw4S57+F5y2FIxxSDyi5M4UfGF+Jl1bCGd7+L4KsaUY80GsiF/t0UoRFDHAguKlBaACWJRmdrc6Xfkkag==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/type-utils": {
      "version": "8.46.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.46.2.tgz",
      "integrity": "sha512-HbPM4LbaAAt/DjxXaG9yiS9brOOz6fabal4uvUmaUYe6l3K1phQDMQKBRUrr06BQkxkvIZVVHttqiybM9nJsLA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.46.2",
        "@typescript-eslint/typescript-estree": "8.46.2",
        "@typescript-eslint/utils": "8.46.2",
        "debug": "^4.3.4",
        "ts-api-utils": "^2.1.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "8.46.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.46.2.tgz",
      "integrity": "sha512-lNCWCbq7rpg7qDsQrd3D6NyWYu+gkTENkG5IKYhUIcxSb59SQC/hEQ+MrG4sTgBVghTonNWq42bA/d4yYumldQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "8.46.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.46.2.tgz",
      "integrity": "sha512-f7rW7LJ2b7Uh2EiQ+7sza6RDZnajbNbemn54Ob6fRwQbgcIn+GWfyuHDHRYgRoZu1P4AayVScrRW+YfbTvPQoQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/project-service": "8.46.2",
        "@typescript-eslint/tsconfig-utils": "8.46.2",
        "@typescript-eslint/types": "8.46.2",
        "@typescript-eslint/visitor-keys": "8.46.2",
        "debug": "^4.3.4",
        "fast-glob": "^3.3.2",
        "is-glob": "^4.0.3",
        "minimatch": "^9.0.4",
        "semver": "^7.6.0",
        "ts-api-utils": "^2.1.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/utils": {
      "version": "8.46.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.46.2.tgz",
      "integrity": "sha512-sExxzucx0Tud5tE0XqR0lT0psBQvEpnpiul9XbGUB1QwpWJJAps1O/Z7hJxLGiZLBKMCutjTzDgmd1muEhBnVg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.7.0",
        "@typescript-eslint/scope-manager": "8.46.2",
        "@typescript-eslint/types": "8.46.2",
        "@typescript-eslint/typescript-estree": "8.46.2"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "8.46.2",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.46.2.tgz",
      "integrity": "sha512-tUFMXI4gxzzMXt4xpGJEsBsTox0XbNQ1y94EwlD/CuZwFcQP79xfQqMhau9HsRc/J0cAPA/HZt1dZPtGn9V/7w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.46.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys/node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.7.0.tgz",
      "integrity": "sha512-gUu9hwfWvvEDBBmgtAowQCojwZmJ5mcLn3aufeCsitijs3+f2NsrPtlAWIR6OPiqljl96GVCUbLe0HyqIpVaoA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-beta.27",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.17.0"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/acorn": {
      "version": "8.15.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.15.0.tgz",
      "integrity": "sha512-NZyJarBfL7nWwIq+FDL6Zp/yHEhePMNnnJ0y3qfieCrmNvYct8uvtiV41UvlSe6apAfk0fY1FbWx+NwfmpvtTg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.12.6",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.6.tgz",
      "integrity": "sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ansi-regex": {
      "version": "6.2.2",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.2.2.tgz",
      "integrity": "sha512-Bq3SmSpyFHaWjPk8If9yc6svM8c56dB5BAtW4Qbw5jHTwwXXcTLoRMkpDJp6VL0XzlWaCHTXrkFURMYmD0sLqg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true,
      "license": "Python-2.0"
    },
    "node_modules/asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q==",
      "license": "MIT"
    },
    "node_modules/atob": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/atob/-/atob-2.1.2.tgz",
      "integrity": "sha512-Wm6ukoaOGJi/73p/cl2GvLjTI5JM1k/O14isD73YML8StrH/7/lRFgmg8nICZgD3bZZvjwCGxtMOD3wWNAu8cg==",
      "license": "(MIT OR Apache-2.0)",
      "bin": {
        "atob": "bin/atob.js"
      },
      "engines": {
        "node": ">= 4.5.0"
      }
    },
    "node_modules/autoprefixer": {
      "version": "10.4.21",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.21.tgz",
      "integrity": "sha512-O+A6LWV5LDHSJD3LjHYoNi4VLsj/Whi7k6zG12xTYaU4cQ8oxQGckXNX8cRHK5yOZ/ppVHe0ZBXGzSV9jXdVbQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.24.4",
        "caniuse-lite": "^1.0.30001702",
        "fraction.js": "^4.3.7",
        "normalize-range": "^0.1.2",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/axios": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/axios/-/axios-1.12.2.tgz",
      "integrity": "sha512-vMJzPewAlRyOgxV2dU0Cuz2O8zzzx9VYtbJOaBgXFeLc4IV/Eg50n4LowmehOOR61S8ZMpc2K5Sa7g6A4jfkUw==",
      "license": "MIT",
      "dependencies": {
        "follow-redirects": "^1.15.6",
        "form-data": "^4.0.4",
        "proxy-from-env": "^1.1.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/base64-arraybuffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/base64-arraybuffer/-/base64-arraybuffer-1.0.2.tgz",
      "integrity": "sha512-I3yl4r9QB5ZRY3XuJVEPfc2XhZO6YweFPI+UovAzn+8/hb3oJ6lnysaFcjVpkCPfVWFUDvoZ8kmVDP7WyRtYtQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 0.6.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.8.20",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.8.20.tgz",
      "integrity": "sha512-JMWsdF+O8Orq3EMukbUN1QfbLK9mX2CkUmQBcW2T0s8OmdAUL5LLM/6wFwSrqXzlXB13yhyK9gTKS1rIizOduQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.js"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/brace-expansion": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.2.tgz",
      "integrity": "sha512-Jt0vHyM+jmUBqojB7E1NIYadt0vI0Qxjxd2TErW94wDz+E2LAm5vKMXXwg6ZZBTHPuUlDgQHKXvjGBdfcF1ZDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.27.0",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.27.0.tgz",
      "integrity": "sha512-AXVQwdhot1eqLihwasPElhX2tAZiBjWdJ9i/Zcj2S6QYIjkx62OKSfnobkriB81C3l4w0rVy3Nt4jaTBltYEpw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.8.19",
        "caniuse-lite": "^1.0.30001751",
        "electron-to-chromium": "^1.5.238",
        "node-releases": "^2.0.26",
        "update-browserslist-db": "^1.1.4"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/btoa": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/btoa/-/btoa-1.2.1.tgz",
      "integrity": "sha512-SB4/MIGlsiVkMcHmT+pSmIPoNDoHg+7cMzmt3Uxt628MTz2487DKSqK/fuhFBrkuqrYv5UCEnACpF4dTFNKc/g==",
      "license": "(MIT OR Apache-2.0)",
      "bin": {
        "btoa": "bin/btoa.js"
      },
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001751",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001751.tgz",
      "integrity": "sha512-A0QJhug0Ly64Ii3eIqHu5X51ebln3k4yTUkY1j8drqpWHVreg/VLijN48cZ1bYPiqOQuqpkIKnzr/Ul8V+p6Cw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/canvg": {
      "version": "3.0.11",
      "resolved": "https://registry.npmjs.org/canvg/-/canvg-3.0.11.tgz",
      "integrity": "sha512-5ON+q7jCTgMp9cjpu4Jo6XbvfYwSB2Ow3kzHKfIyJfaCAOHLbdKPQqGKgfED/R5B+3TFFfe8pegYA+b423SRyA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@babel/runtime": "^7.12.5",
        "@types/raf": "^3.4.0",
        "core-js": "^3.8.3",
        "raf": "^3.4.1",
        "regenerator-runtime": "^0.13.7",
        "rgbcolor": "^1.0.1",
        "stackblur-canvas": "^2.0.0",
        "svg-pathdata": "^6.0.3"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "license": "MIT",
      "dependencies": {
        "delayed-stream": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/core-js": {
      "version": "3.46.0",
      "resolved": "https://registry.npmjs.org/core-js/-/core-js-3.46.0.tgz",
      "integrity": "sha512-vDMm9B0xnqqZ8uSBpZ8sNtRtOdmfShrvT6h2TuQGLs0Is+cR0DYbj/KWP6ALVNbWPpqA/qPLoOuppJN07humpA==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/core-js"
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/css-line-break": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/css-line-break/-/css-line-break-2.1.0.tgz",
      "integrity": "sha512-FHcKFCZcAha3LwfVBhCQbW2nCNbkZXn7KVUJcsT5/P8YmfsVja0FMPJr0B903j/E69HUphKiV9iQArX8SDYA4w==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "utrie": "^1.0.2"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.1.3.tgz",
      "integrity": "sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/date-fns": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/date-fns/-/date-fns-3.6.0.tgz",
      "integrity": "sha512-fRHTG8g/Gif+kSh50gaGEdToemgfj74aRX3swtiouboip5JDLAyDE9F11nHMIcvOaXeOC6D7SpNhi7uFyB7Uww==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/kossnocorp"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/dompurify": {
      "version": "2.5.8",
      "resolved": "https://registry.npmjs.org/dompurify/-/dompurify-2.5.8.tgz",
      "integrity": "sha512-o1vSNgrmYMQObbSSvF/1brBYEQPHhV1+gsmrusO7/GXtp1T9rCS8cXFqVxK/9crT1jA6Ccv+5MTSjBNqr7Sovw==",
      "license": "(MPL-2.0 OR Apache-2.0)",
      "optional": true
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/eastasianwidth": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/eastasianwidth/-/eastasianwidth-0.2.0.tgz",
      "integrity": "sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.240",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.240.tgz",
      "integrity": "sha512-OBwbZjWgrCOH+g6uJsA2/7Twpas2OlepS9uvByJjR2datRDuKGYeD+nP8lBBks2qnB7bGJNHDUx7c/YLaT3QMQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.21.5.tgz",
      "integrity": "sha512-mg3OPMV4hXywwpoDxu3Qda5xCKQi+vCTZq8S9J/EpkhB2HzKXq4SNFZE3+NK93JYxc8VMSep+lOUSC/RVKaBqw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.21.5",
        "@esbuild/android-arm": "0.21.5",
        "@esbuild/android-arm64": "0.21.5",
        "@esbuild/android-x64": "0.21.5",
        "@esbuild/darwin-arm64": "0.21.5",
        "@esbuild/darwin-x64": "0.21.5",
        "@esbuild/freebsd-arm64": "0.21.5",
        "@esbuild/freebsd-x64": "0.21.5",
        "@esbuild/linux-arm": "0.21.5",
        "@esbuild/linux-arm64": "0.21.5",
        "@esbuild/linux-ia32": "0.21.5",
        "@esbuild/linux-loong64": "0.21.5",
        "@esbuild/linux-mips64el": "0.21.5",
        "@esbuild/linux-ppc64": "0.21.5",
        "@esbuild/linux-riscv64": "0.21.5",
        "@esbuild/linux-s390x": "0.21.5",
        "@esbuild/linux-x64": "0.21.5",
        "@esbuild/netbsd-x64": "0.21.5",
        "@esbuild/openbsd-x64": "0.21.5",
        "@esbuild/sunos-x64": "0.21.5",
        "@esbuild/win32-arm64": "0.21.5",
        "@esbuild/win32-ia32": "0.21.5",
        "@esbuild/win32-x64": "0.21.5"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "9.38.0",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.38.0.tgz",
      "integrity": "sha512-t5aPOpmtJcZcz5UJyY2GbvpDlsK5E8JqRqoKtfiKE3cNh437KIqfJr3A3AKf5k64NPx6d0G3dno6XDY05PqPtw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.1",
        "@eslint/config-array": "^0.21.1",
        "@eslint/config-helpers": "^0.4.1",
        "@eslint/core": "^0.16.0",
        "@eslint/eslintrc": "^3.3.1",
        "@eslint/js": "9.38.0",
        "@eslint/plugin-kit": "^0.4.0",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.12.4",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.4.0",
        "eslint-visitor-keys": "^4.2.1",
        "espree": "^10.4.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.2",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-5.2.0.tgz",
      "integrity": "sha512-+f15FfK64YQwZdJNELETdn5ibXEUQmW1DZL6KXhNnc2heoy/sg9VJJeT7n8TlMWouzWqSWavFkIhHyIbIAEapg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0"
      }
    },
    "node_modules/eslint-plugin-react-refresh": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-refresh/-/eslint-plugin-react-refresh-0.4.24.tgz",
      "integrity": "sha512-nLHIW7TEq3aLrEYWpVaJ1dRgFR+wLDPN8e8FpYAql/bMV2oBEfC37K0gLEGgv9fy66juNShSMV8OkTqzltcG/w==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "eslint": ">=8.40"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.4.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
      "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint/node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/eslint/node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint/node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/eslint/node_modules/minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/espree": {
      "version": "10.4.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
      "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.15.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree/node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.6.0.tgz",
      "integrity": "sha512-ca9pw9fomFcKPvFLXhBKUK90ZvGibiGOvRJNbjljY7s7uq/5YO4BOzcYtJqExdx99rF6aAcnRxHmcUHcz6sQsg==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fastq": {
      "version": "1.19.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.19.1.tgz",
      "integrity": "sha512-GwLTyxkCXjXbxqIhTsMI2Nui8huMPtnxg7krajPJAjnEG/iiOS7i+zCtWGZR9G0NBKbXKh6X9m9UIsYX/N6vvQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fflate": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/fflate/-/fflate-0.8.2.tgz",
      "integrity": "sha512-cPJU47OaAoCbg0pBvzsgpTPhmhqI5eJjh/JIu8tPj5q+T7iLvW/JAYUqmE7KOB4R1ZyEhzBaIQpQpardBF5z8A==",
      "license": "MIT"
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.3.3.tgz",
      "integrity": "sha512-GX+ysw4PBCz0PzosHDepZGANEuFCMLrnRTiEy9McGjmkCQYwRq4A/X786G/fjM/+OjsWSU1ZrY5qyARZmO/uwg==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/follow-redirects": {
      "version": "1.15.11",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.15.11.tgz",
      "integrity": "sha512-deG2P0JfjrTxl50XGCDyfI97ZGVCxIpfKYmfyrQ54n5FO/0gfIES8C/Psl6kWVDolizcaaxZJnTS0QSMxvnsBQ==",
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/RubenVerborgh"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=4.0"
      },
      "peerDependenciesMeta": {
        "debug": {
          "optional": true
        }
      }
    },
    "node_modules/foreground-child": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/foreground-child/-/foreground-child-3.3.1.tgz",
      "integrity": "sha512-gIXjKqtFuWEgzFRJA9WCQeSJLZDjgJUOMCMzxtvFq/37KojM1BFGufqsCy0r4qSQmYLsZYMeyRqzIWOMup03sw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "cross-spawn": "^7.0.6",
        "signal-exit": "^4.0.1"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/form-data": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.4.tgz",
      "integrity": "sha512-KrGhL9Q4zjj0kiUt5OO4Mr/A/jlI2jDYs5eHBpYHPcBEVSiipAvn2Ko2HnPe20rmcuuvMHNdZFp+4IlGTMF0Ow==",
      "license": "MIT",
      "dependencies": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "es-set-tostringtag": "^2.1.0",
        "hasown": "^2.0.2",
        "mime-types": "^2.1.12"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fraction.js": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.7.tgz",
      "integrity": "sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "patreon",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/framer-motion": {
      "version": "12.23.24",
      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-12.23.24.tgz",
      "integrity": "sha512-HMi5HRoRCTou+3fb3h9oTLyJGBxHfW+HnNE25tAXOvVx/IvwMHK0cx7IR4a2ZU6sh3IX1Z+4ts32PcYBOqka8w==",
      "license": "MIT",
      "dependencies": {
        "motion-dom": "^12.23.23",
        "motion-utils": "^12.23.6",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "@emotion/is-prop-valid": "*",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/is-prop-valid": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/glob": {
      "version": "10.4.5",
      "resolved": "https://registry.npmjs.org/glob/-/glob-10.4.5.tgz",
      "integrity": "sha512-7Bv8RF0k6xjo7d4A/PxYLbUCfb6c+Vpd2/mB2yRDlew7Jb5hEXiCD9ibfO7wpk8i4sevK6DFny9h7EYbM3/sHg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "foreground-child": "^3.1.0",
        "jackspeak": "^3.1.2",
        "minimatch": "^9.0.4",
        "minipass": "^7.1.2",
        "package-json-from-dist": "^1.0.0",
        "path-scurry": "^1.11.1"
      },
      "bin": {
        "glob": "dist/esm/bin.mjs"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/graphemer": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/graphemer/-/graphemer-1.4.0.tgz",
      "integrity": "sha512-EtKwoO6kxCL9WO5xipiHTZlSzBm7WLT627TqC/uVRd0HKmq8NXyebnNYxDoBi7wt8eTWrUrKXCOVaFq9x1kgag==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/html2canvas": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/html2canvas/-/html2canvas-1.4.1.tgz",
      "integrity": "sha512-fPU6BHNpsyIhr8yyMpTLLxAbkaK8ArIBcmZIRiBLiDhjeqvXolaEmDGmELFuX9I4xDcaKKcJl+TKZLqruBbmWA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "css-line-break": "^2.1.0",
        "text-segmentation": "^1.0.3"
      },
      "engines": {
        "node": ">=8.0.0"
      }
    },
    "node_modules/ignore": {
      "version": "7.0.5",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.5.tgz",
      "integrity": "sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/jackspeak": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/jackspeak/-/jackspeak-3.4.3.tgz",
      "integrity": "sha512-OGlZQpz2yfahA/Rd1Y8Cd9SIEsqvXkLVoSw/cgwhnhFMDbsQFeZYoJJ7bIZBS9BcamUW96asq/npPWugM+RQBw==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "@isaacs/cliui": "^8.0.2"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      },
      "optionalDependencies": {
        "@pkgjs/parseargs": "^0.11.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.0.tgz",
      "integrity": "sha512-wpxZs9NoxZaJESJGIZTyDEaYpl0FKSA+FB9aJiyemKhMwkxQg63h4T1KJgUGHpTqPDNRcmmYLugrRjJlBtWvRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/jspdf": {
      "version": "2.5.2",
      "resolved": "https://registry.npmjs.org/jspdf/-/jspdf-2.5.2.tgz",
      "integrity": "sha512-myeX9c+p7znDWPk0eTrujCzNjT+CXdXyk7YmJq5nD5V7uLLKmSXnlQ/Jn/kuo3X09Op70Apm0rQSnFWyGK8uEQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.23.2",
        "atob": "^2.1.2",
        "btoa": "^1.2.1",
        "fflate": "^0.8.1"
      },
      "optionalDependencies": {
        "canvg": "^3.0.6",
        "core-js": "^3.6.0",
        "dompurify": "^2.5.4",
        "html2canvas": "^1.0.0-rc.5"
      }
    },
    "node_modules/jspdf-autotable": {
      "version": "3.8.4",
      "resolved": "https://registry.npmjs.org/jspdf-autotable/-/jspdf-autotable-3.8.4.tgz",
      "integrity": "sha512-rSffGoBsJYX83iTRv8Ft7FhqfgEL2nLpGAIiqruEQQ3e4r0qdLFbPUB7N9HAle0I3XgpisvyW751VHCqKUVOgQ==",
      "license": "MIT",
      "peerDependencies": {
        "jspdf": "^2.5.1"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/leaflet": {
      "version": "1.9.4",
      "resolved": "https://registry.npmjs.org/leaflet/-/leaflet-1.9.4.tgz",
      "integrity": "sha512-nxS1ynzJOmOlHp+iL3FyWqK89GtNL8U8rvlMOsQdTTssxZwCXh8N2NB3GDQOL+YR3XnWyZAxwQixURb+FA74PA==",
      "license": "BSD-2-Clause"
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.446.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.446.0.tgz",
      "integrity": "sha512-BU7gy8MfBMqvEdDPH79VhOXSEgyG8TSPOKWaExWGCQVqnGH7wGgDngPbofu+KdtVjPQBWbEmnfMTq90CTiiDRg==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/minimatch": {
      "version": "9.0.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/minipass": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.2.tgz",
      "integrity": "sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/motion-dom": {
      "version": "12.23.23",
      "resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-12.23.23.tgz",
      "integrity": "sha512-n5yolOs0TQQBRUFImrRfs/+6X4p3Q4n1dUEqt/H58Vx7OW6RF+foWEgmTVDhIWJIMXOuNNL0apKH2S16en9eiA==",
      "license": "MIT",
      "dependencies": {
        "motion-utils": "^12.23.6"
      }
    },
    "node_modules/motion-utils": {
      "version": "12.23.6",
      "resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-12.23.6.tgz",
      "integrity": "sha512-eAWoPgr4eFEOFfg2WjIsMoqJTW6Z8MTUCgn/GZ3VRpClWBdnbjryiA3ZSNLyxCTmCQx4RmYX6jX1iWHbenUPNQ==",
      "license": "MIT"
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/node-releases": {
      "version": "2.0.26",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.26.tgz",
      "integrity": "sha512-S2M9YimhSjBSvYnlr5/+umAnPHE++ODwt5e2Ij6FoX45HA/s4vHdkDx1eax2pAPeAOqu4s9b7ppahsyEFdVqQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/normalize-range": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
      "integrity": "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/package-json-from-dist": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/package-json-from-dist/-/package-json-from-dist-1.0.1.tgz",
      "integrity": "sha512-UEZIS3/by4OC8vL3P2dTXRETpebLI2NiI5vIrjaD/5UtrkFX/tNbwjTSRAGC/+7CAo2pIcBaRgWmcBBHcsaCIw==",
      "dev": true,
      "license": "BlueOak-1.0.0"
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/path-scurry": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/path-scurry/-/path-scurry-1.11.1.tgz",
      "integrity": "sha512-Xa4Nw17FS9ApQFJ9umLiJS4orGjm7ZzwUrwamcGQuHSzDyth9boKDaycYdDcZDuqYATXw4HFXgaqWTctW/v1HA==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "lru-cache": "^10.2.0",
        "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0"
      },
      "engines": {
        "node": ">=16 || 14 >=14.18"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/path-scurry/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/performance-now": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
      "integrity": "sha512-7EAHlyLHI56VEIdK57uwHdHKIaAGbnXPiw0yWbarQZOKaKpvUIgW0jWRVLiatnM+XXlSwsanIBH/hzGMJulMow==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.6",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.6.tgz",
      "integrity": "sha512-3Ybi1tAuwAP9s0r1UQ2J4n5Y0G05bJkpUIO0/bI9MhwmD70S5aTWbXGBwxHrelT+XM1k6dM0pk+SwNkpTRN7Pg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-6.0.1.tgz",
      "integrity": "sha512-oPtTM4oerL+UXmx+93ytZVN82RrlY/wPUV8IeDxFrzIjXOLF1pN+EmKPLbubvKHT2HC20xXsCAH2Z+CKV6Oz/g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.1.1"
      },
      "engines": {
        "node": ">= 18"
      },
      "peerDependencies": {
        "jiti": ">=1.21.0",
        "postcss": ">=8.0.9",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.2.tgz",
      "integrity": "sha512-Q8qQfPiZ+THO/3ZrOrO0cJJKfpYCagtMUkXbnEfmgUjwXg6z/WBeOyS9APBBPCTSiDV+s4SwQGu8yFsiMRIudg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/prettier": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/prettier/-/prettier-3.6.2.tgz",
      "integrity": "sha512-I7AIg5boAr5R0FFtJ6rCfD+LFsWHp81dolrFD8S79U9tb8Az2nGrJncnMSnys+bpQJfRUzqs9hnA81OAA3hCuQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "prettier": "bin/prettier.cjs"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/prettier/prettier?sponsor=1"
      }
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
    },
    "node_modules/proxy-from-env": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/proxy-from-env/-/proxy-from-env-1.1.0.tgz",
      "integrity": "sha512-D+zkORCbA9f1tdWRK0RaCR3GPv50cMxcrz4X8k5LTSUD1Dkw47mKJEZQNunItRTkWwgtaUSo1RVFRIG9ZXiFYg==",
      "license": "MIT"
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/raf": {
      "version": "3.4.1",
      "resolved": "https://registry.npmjs.org/raf/-/raf-3.4.1.tgz",
      "integrity": "sha512-Sq4CW4QhwOHE8ucn6J34MqtZCeWFP2aQSmrlroYgqAV1PjStIhJXxYuTgUIfkEk7zTLjmIjLmU5q+fbD1NnOJA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "performance-now": "^2.1.0"
      }
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
      }
    },
    "node_modules/react-hook-form": {
      "version": "7.65.0",
      "resolved": "https://registry.npmjs.org/react-hook-form/-/react-hook-form-7.65.0.tgz",
      "integrity": "sha512-xtOzDz063WcXvGWaHgLNrNzlsdFgtUWcb32E6WFaGTd7kPZG3EeDusjdZfUsPwKCKVXy1ZlntifaHZ4l8pAsmw==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/react-hook-form"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17 || ^18 || ^19"
      }
    },
    "node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "license": "MIT"
    },
    "node_modules/react-leaflet": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/react-leaflet/-/react-leaflet-4.2.1.tgz",
      "integrity": "sha512-p9chkvhcKrWn/H/1FFeVSqLdReGwn2qmiobOQGO3BifX+/vV/39qhY8dGqbdcPh1e6jxh/QHriLXr7a4eLFK4Q==",
      "license": "Hippocratic-2.1",
      "dependencies": {
        "@react-leaflet/core": "^2.1.0"
      },
      "peerDependencies": {
        "leaflet": "^1.9.0",
        "react": "^18.0.0",
        "react-dom": "^18.0.0"
      }
    },
    "node_modules/react-refresh": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.17.0.tgz",
      "integrity": "sha512-z6F7K9bV85EfseRCp2bzrpyQ0Gkw1uLoCel9XBVWPg/TjRj94SkJzUTGfOa4bs7iJvBWtQG0Wq7wnI0syw3EBQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-router": {
      "version": "6.30.1",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-6.30.1.tgz",
      "integrity": "sha512-X1m21aEmxGXqENEPG3T6u0Th7g0aS4ZmoNynhbs+Cn+q+QGTLt+d5IQ2bHAXKzKcxGJjxACpVbnYQSCRcfxHlQ==",
      "license": "MIT",
      "dependencies": {
        "@remix-run/router": "1.23.0"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8"
      }
    },
    "node_modules/react-router-dom": {
      "version": "6.30.1",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-6.30.1.tgz",
      "integrity": "sha512-llKsgOkZdbPU1Eg3zK8lCn+sjD9wMRZZPuzmdWWX5SUs8OFkN5HnFVC0u5KMeMaC9aoancFI/KoLuKPqN+hxHw==",
      "license": "MIT",
      "dependencies": {
        "@remix-run/router": "1.23.0",
        "react-router": "6.30.1"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8",
        "react-dom": ">=16.8"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "pify": "^2.3.0"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/regenerator-runtime": {
      "version": "0.13.11",
      "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.11.tgz",
      "integrity": "sha512-kY1AZVr2Ra+t+piVaJ4gxaFaReZVH40AKNo7UCX6W+dEwBo/2oZJzqfuN1qLq1oL45o56cPaTXELwrTh8Fpggg==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/resolve": {
      "version": "1.22.11",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.11.tgz",
      "integrity": "sha512-RfqAvLnMl313r7c9oclB1HhUEAezcpLjz95wFH4LVuhk9JF/r22qmVP9AMmOU4vMX7Q8pN8jwNg/CSpdFnMjTQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rgbcolor": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/rgbcolor/-/rgbcolor-1.0.1.tgz",
      "integrity": "sha512-9aZLIrhRaD97sgVhtJOW6ckOEh6/GnvQtdVNfdZ6s67+3/XwLS9lBcQYzEEhYVeUowN7pRzMLsyGhK2i/xvWbw==",
      "license": "MIT OR SEE LICENSE IN FEEL-FREE.md",
      "optional": true,
      "engines": {
        "node": ">= 0.8.15"
      }
    },
    "node_modules/rollup": {
      "version": "4.52.5",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.52.5.tgz",
      "integrity": "sha512-3GuObel8h7Kqdjt0gxkEzaifHTqLVW56Y/bjN7PSQtkKr0w3V/QYSdt6QWYtd7A1xUtYQigtdUfgj1RvWVtorw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.8"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.52.5",
        "@rollup/rollup-android-arm64": "4.52.5",
        "@rollup/rollup-darwin-arm64": "4.52.5",
        "@rollup/rollup-darwin-x64": "4.52.5",
        "@rollup/rollup-freebsd-arm64": "4.52.5",
        "@rollup/rollup-freebsd-x64": "4.52.5",
        "@rollup/rollup-linux-arm-gnueabihf": "4.52.5",
        "@rollup/rollup-linux-arm-musleabihf": "4.52.5",
        "@rollup/rollup-linux-arm64-gnu": "4.52.5",
        "@rollup/rollup-linux-arm64-musl": "4.52.5",
        "@rollup/rollup-linux-loong64-gnu": "4.52.5",
        "@rollup/rollup-linux-ppc64-gnu": "4.52.5",
        "@rollup/rollup-linux-riscv64-gnu": "4.52.5",
        "@rollup/rollup-linux-riscv64-musl": "4.52.5",
        "@rollup/rollup-linux-s390x-gnu": "4.52.5",
        "@rollup/rollup-linux-x64-gnu": "4.52.5",
        "@rollup/rollup-linux-x64-musl": "4.52.5",
        "@rollup/rollup-openharmony-arm64": "4.52.5",
        "@rollup/rollup-win32-arm64-msvc": "4.52.5",
        "@rollup/rollup-win32-ia32-msvc": "4.52.5",
        "@rollup/rollup-win32-x64-gnu": "4.52.5",
        "@rollup/rollup-win32-x64-msvc": "4.52.5",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/semver": {
      "version": "7.7.3",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.3.tgz",
      "integrity": "sha512-SdsKMrI9TdgjdweUSR9MweHA4EJ8YxHn8DFaDisvhVlUOe4BF1tLD7GAj0lIqWVl+dPb/rExr0Btby5loQm20Q==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/signal-exit": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
      "integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/stackblur-canvas": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/stackblur-canvas/-/stackblur-canvas-2.7.0.tgz",
      "integrity": "sha512-yf7OENo23AGJhBriGx0QivY5JP6Y1HbrrDI6WLt6C5auYZXlQrheoY8hD4ibekFKz1HOfE48Ww8kMWMnJD/zcQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=0.1.14"
      }
    },
    "node_modules/string-width": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
      "integrity": "sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eastasianwidth": "^0.2.0",
        "emoji-regex": "^9.2.2",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/string-width-cjs": {
      "name": "string-width",
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/string-width-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.1.2.tgz",
      "integrity": "sha512-gmBGslpoQJtgnMAvOVqGZpEz9dyoKTCzy2nfz/n8aIFhN/jCE/rCmcxabB6jOOHV+0WNnylOxaxBQPSvcWklhA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/strip-ansi-cjs": {
      "name": "strip-ansi",
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.0",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.0.tgz",
      "integrity": "sha512-8EbVDiu9iN/nESwxeSxDKe0dunta1GOlHufmSSXxMD2z2/tMZpDMpvXQGsc+ajGo8y2uYUmixaSRUc/QPoQ0GA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "glob": "^10.3.10",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/svg-pathdata": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/svg-pathdata/-/svg-pathdata-6.0.3.tgz",
      "integrity": "sha512-qsjeeq5YjBZ5eMdFuUa4ZosMLxgr5RZ+F+Y1OrDhuOCEInRMA3x74XdBtggJcj9kOeInz0WE+LgCPDkZFlBYJw==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "2.6.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-2.6.0.tgz",
      "integrity": "sha512-P+Vu1qXfzediirmHOC3xKGAYeZtPcV9g76X+xg2FD4tYgR71ewMA35Y3sCz3zhiN/dwefRpJX0yBcgwi1fXNQA==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.18",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.18.tgz",
      "integrity": "sha512-6A2rnmW5xZMdw11LYjhcI5846rt9pbLSabY5XPxo+XWdxwZaFEn47Go4NzFiHu9sNNmr/kXivP1vStfvMaK1GQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.7",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2 || ^5.0 || ^6.0",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/text-segmentation": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/text-segmentation/-/text-segmentation-1.0.3.tgz",
      "integrity": "sha512-iOiPUo/BGnZ6+54OsWxZidGCsdU8YbE4PSpdPinp7DeMtUJNJBoJ/ouUSTJjHkh1KntHaltHl/gDs2FC4i5+Nw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "utrie": "^1.0.2"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-api-utils": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.1.0.tgz",
      "integrity": "sha512-CUgTZL1irw8u29bzrOD/nH85jqyc74D6SshFgujOIA7osm2Rz7dYH77agkx7H4FBNxDq7Cjf+IjaX/8zwFW+ZQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.12"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "7.16.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.16.0.tgz",
      "integrity": "sha512-Zz+aZWSj8LE6zoxD+xrjh4VfkIG8Ya6LvYkZqtUQGJPZjYl53ypCaUwWqo7eI0x66KBGeRo+mlBEkMSeSZ38Nw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.1.4.tgz",
      "integrity": "sha512-q0SPT4xyU84saUX+tomz1WLkxUbuaJnR1xWt17M7fJtEJigJeWUNGUqrauFXsHnqev9y9JTRGwk13tFBuKby4A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.6.0.tgz",
      "integrity": "sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/utrie": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/utrie/-/utrie-1.0.2.tgz",
      "integrity": "sha512-1MLa5ouZiOmQzUbjbu9VmjLzn1QLXBhwpUa7kdLUQK+KQ5KA9I1vk5U4YHe/X2Ch7PYnJfWuWT+VbuxbGwljhw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "base64-arraybuffer": "^1.0.2"
      }
    },
    "node_modules/vite": {
      "version": "5.4.21",
      "resolved": "https://registry.npmjs.org/vite/-/vite-5.4.21.tgz",
      "integrity": "sha512-o5a9xKjbtuhY6Bi5S3+HvbRERmouabWbyUcpXXUA1u+GNUKoROi9byOJ8M0nHbHYHkYICiMlqxkg1KkYmm25Sw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.21.3",
        "postcss": "^8.4.43",
        "rollup": "^4.20.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || >=20.0.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.4.0"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        }
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-8.1.0.tgz",
      "integrity": "sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.1.0",
        "string-width": "^5.0.1",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs": {
      "name": "wrap-ansi",
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/wrap-ansi-cjs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/ansi-styles": {
      "version": "6.2.3",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-6.2.3.tgz",
      "integrity": "sha512-4Dj6M28JB+oAH8kFkTLUo+a2jwOFkuqb3yucU0CANcRRUbxS0cP0nZYCGjcc3BNXwRIsUVmDGgzawme7zvJHvg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "3.25.76",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.25.76.tgz",
      "integrity": "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zustand": {
      "version": "4.5.7",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-4.5.7.tgz",
      "integrity": "sha512-CHOUy7mu3lbD6o6LJLfllpjkzhHXSBlX8B9+qPddUsIfeF5S/UZ5q0kmCsnRqT1UHFQZchNFDDzMbQsuesHWlw==",
      "license": "MIT",
      "dependencies": {
        "use-sync-external-store": "^1.2.2"
      },
      "engines": {
        "node": ">=12.7.0"
      },
      "peerDependencies": {
        "@types/react": ">=16.8",
        "immer": ">=9.0.6",
        "react": ">=16.8"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        }
      }
    }
  }
}
```
</details>

---

### 📋 package.json
**Path:** `package.json`

<details>
<summary>View Code (52 lines)</summary>

```json
{
  "name": "bakars-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@stripe/react-stripe-js": "^2.7.1",
    "@stripe/stripe-js": "^4.6.0",
    "axios": "^1.12.2",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "framer-motion": "^12.23.24",
    "jspdf": "^2.5.2",
    "jspdf-autotable": "^3.8.4",
    "leaflet": "^1.9.4",
    "lucide-react": "^0.446.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.65.0",
    "react-leaflet": "^4.2.1",
    "react-router-dom": "^6.30.1",
    "tailwind-merge": "^2.6.0",
    "zod": "^3.25.76",
    "zustand": "^4.5.7"
  },
  "devDependencies": {
    "@types/node": "^24.9.1",
    "@types/react": "^18.3.10",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^8.7.0",
    "@typescript-eslint/parser": "^8.7.0",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.11.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.12",
    "postcss": "^8.4.47",
    "prettier": "^3.3.3",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.2",
    "vite": "^5.4.8"
  }
}
```
</details>

---

### 📄 postcss.config.js
**Path:** `postcss.config.js`

<details>
<summary>View Code (6 lines)</summary>

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```
</details>

---

### ⚛️ App.tsx
**Path:** `src\App.tsx`

<details>
<summary>View Code (118 lines)</summary>

```tsx
import { useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastProvider } from '@components/common/Toast';
import { useAuthStore } from '@store/authStore';
import Layout from '@components/layout/Layout';
import ProtectedRoute from '@components/auth/ProtectedRoute';
import RoleGuard from '@components/auth/RoleGuard';
import LoadingScreen from '@components/common/LoadingScreen';
import AuthModal from '@components/auth/AuthModal';
import DeliveryZonesPage from '@pages/admin/DeliveryZonesPage';

// Public Pages
import HomePage from '@pages/public/HomePage';
import LoginPage from '@pages/public/LoginPage';
import RegisterPage from '@pages/public/RegisterPage';
import ContactPage from '@pages/public/ContactPage';
import ForgotPasswordPage from '@pages/public/ForgotPasswordPage';
import ResetPasswordPage from '@pages/public/ResetPasswordPage';

// Customer Pages
import DailyMenuPage from '@pages/customer/DailyMenuPage';
import MealsSubscriptionPage from '@pages/customer/MealsSubscriptionPage';
import CateringPage from '@pages/customer/CateringPage';
import CartPage from '@pages/customer/CartPage';
import CheckoutPage from '@pages/customer/CheckoutPage';
import ProfilePage from '@pages/customer/ProfilePage';

// Admin Pages
import AdminDashboard from '@pages/admin/AdminDashboard';
import MenuManagement from '@pages/admin/MenuManagement';
import OrderManagement from '@pages/admin/OrderManagement';
import CategoryManagement from '@pages/admin/CategoryManagement';
import MealPlanManagement from '@pages/admin/MealPlanManagement';

function App() {
  const { checkAuth, isLoading, logout } = useAuthStore();
  const hasTriggeredAuth = useRef(false);

  useEffect(() => {
    if (hasTriggeredAuth.current) {
      return;
    }
    hasTriggeredAuth.current = true;
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('bakars:auth-unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('bakars:auth-unauthorized', handleUnauthorized);
    };
  }, [logout]);

  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Layout wrapper for all pages */}
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="contact" element={<ContactPage />} />

            {/* Menu Routes (Public) */}
            <Route path="menu/daily" element={<DailyMenuPage />} />
            <Route path="menu/meals/*" element={<MealsSubscriptionPage />} />
            <Route path="catering" element={<CateringPage />} />

            {/* Protected Customer Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<RoleGuard requiredRole="admin" />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/menu" element={<MenuManagement />} />
              <Route path="admin/orders" element={<OrderManagement />} />
              <Route path="admin/categories" element={<CategoryManagement />} />
              <Route path="admin/meal-plans" element={<MealPlanManagement />} />
              <Route
                path="/admin/delivery-zones"
                element={<DeliveryZonesPage />}
              />
            </Route>
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Auth Modal */}
        <AuthModal />
      </Router>
    </ToastProvider>
  );
}

export default App;
```
</details>

---

### ⚛️ main.tsx
**Path:** `src\main.tsx`

<details>
<summary>View Code (10 lines)</summary>

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
</details>

---

### 📘 vite-env.d.ts
**Path:** `src\vite-env.d.ts`

<details>
<summary>View Code (1 lines)</summary>

```typescript
/// <reference types="vite/client" />
```
</details>

---

### 📄 tailwind.config.js
**Path:** `tailwind.config.js`

<details>
<summary>View Code (50 lines)</summary>

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFE8E0',
          100: '#FFD5C6',
          200: '#FFAF93',
          300: '#FF8A60',
          400: '#FF6B35',
          500: '#FF4800',
          600: '#CC3A00',
          700: '#992B00',
          800: '#661D00',
          900: '#330E00',
        },
        secondary: {
          DEFAULT: '#4B6043',
          50: '#E8EBE6',
          100: '#D1D7CD',
          200: '#A3AF9B',
          300: '#758769',
          400: '#4B6043',
          500: '#3D4D36',
          600: '#2F3A29',
          700: '#21271C',
          800: '#13140F',
          900: '#050602',
        },
        background: '#F9F9F9',
        text: '#2E2E2E',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}
```
</details>

---

### 📋 tsconfig.json
**Path:** `tsconfig.json`

<details>
<summary>View Code (45 lines)</summary>

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@store/*": ["./src/store/*"],
      "@api": ["./src/api/index"],
      "@api/*": ["./src/api/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@models/*": ["./src/types/*"],
      "@utils/*": ["./src/utils/*"],
      "@assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
</details>

---

### 📋 tsconfig.node.json
**Path:** `tsconfig.node.json`

<details>
<summary>View Code (9 lines)</summary>

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```
</details>

---

### 📘 vite.config.ts
**Path:** `vite.config.ts`

<details>
<summary>View Code (30 lines)</summary>

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@api': path.resolve(__dirname, './src/api'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```
</details>

---

## 📂 Custom Hooks

### 📘 useAuth.ts
**Path:** `src\hooks\useAuth.ts`

<details>
<summary>View Code (35 lines)</summary>

```typescript
import { useAuthStore } from '@store/authStore'

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    role,
    login,
    register,
    verifyEmail,
    resendVerification,
    requestPasswordReset,
    resetPassword,
    logout,
    updateProfile,
  } = useAuthStore()

  return {
    user,
    isAuthenticated,
    isLoading,
    role,
    isAdmin: role === 'admin',
    isCustomer: role === 'customer',
    login,
    register,
    verifyEmail,
    resendVerification,
    requestPasswordReset,
    resetPassword,
    logout,
    updateProfile,
  }
}
```
</details>

---

### 📘 useCart.ts
**Path:** `src\hooks\useCart.ts`

<details>
<summary>View Code (139 lines)</summary>

```typescript
import { useEffect } from 'react';
import { useCartStore } from '@store/cartStore';
import { useAuthStore } from '@store/authStore';
import { useToast } from '@components/common/Toast';
import { MenuItem } from '@models/menu.types';

export const useCart = () => {
  const cartStore = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { showToast } = useToast();

  // Fetch cart on mount if authenticated
  useEffect(() => {
    if (isAuthenticated && !cartStore.cartSummary && !cartStore.isLoading) {
      cartStore.fetchCart().catch(console.error);
    }
  }, [isAuthenticated]);

  /**
   * Add menu item to cart
   */
  const addToCart = async (menuItem: MenuItem, quantity: number = 1, specialInstructions?: string) => {
    if (!isAuthenticated) {
      // For unauthenticated users, use local cart
      cartStore.addLocalItem(menuItem, quantity, specialInstructions);
      showToast(`${menuItem.name} added to cart!`, 'success');
      return;
    }

    try {
      await cartStore.addItem(menuItem, quantity, specialInstructions);
      showToast(`${menuItem.name} added to cart!`, 'success');
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
    }
  };



  /**
   * Remove item from cart
   */
  const removeFromCart = async (itemId: string) => {
    if (!isAuthenticated) {
      cartStore.removeLocalItem(itemId);
      showToast('Item removed from cart', 'info');
      return;
    }

    try {
      await cartStore.removeItem(itemId);
      showToast('Item removed from cart', 'info');
    } catch (error) {
      showToast('Failed to remove item', 'error');
    }
  };

  /**
   * Update cart item quantity
   */
  const updateCartQuantity = async (itemId: string, quantity: number) => {
    if (!isAuthenticated) {
      cartStore.updateLocalQuantity(itemId, quantity);
      if (quantity === 0) {
        showToast('Item removed from cart', 'info');
      }
      return;
    }

    try {
      await cartStore.updateQuantity(itemId, quantity);
      if (quantity === 0) {
        showToast('Item removed from cart', 'info');
      }
    } catch (error) {
      showToast('Failed to update quantity', 'error');
    }
  };

  /**
   * Clear the cart
   */
  const clearCart = async () => {
    if (!isAuthenticated) {
      cartStore.clearLocalCart();
      showToast('Cart cleared', 'info');
      return;
    }

    try {
      await cartStore.clearCart();
      showToast('Cart cleared', 'info');
    } catch (error) {
      showToast('Failed to clear cart', 'error');
    }
  };

  // Get cart data based on authentication status
  const cartSummary = isAuthenticated
    ? cartStore.cartSummary
    : cartStore.getLocalSummary();
  const items = isAuthenticated
    ? cartStore.cartSummary?.items || []
    : cartStore.localItems;
  const sidelines = isAuthenticated ? cartStore.cartSummary?.sidelines || [] : [];

  // Return formatted data for components
  return {
    // Cart items
    items,
    
    // Summary
    summary: {
      item_count: cartSummary?.items_count || 0,
      subtotal: cartSummary?.subtotal || 0,
      delivery_fee: cartSummary?.delivery_fee || 0,
      tax: ((cartSummary?.subtotal || 0) * 0.1), // 10% GST
      total: cartSummary?.total || 0,
    },
    sidelines,
    
    // Loading states
    isLoading: cartStore.isLoading,
    isUpdating: cartStore.isUpdating,
    
    // Local state
    orderType: cartStore.orderType,
    deliveryOption: cartStore.deliveryOption,
    
    // Actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    refreshCart: cartStore.fetchCart,
    setOrderType: cartStore.setOrderType,
    setDeliveryOption: cartStore.setDeliveryOption,
  };
};
```
</details>

---

### 📘 useDebounce.ts
**Path:** `src\hooks\useDebounce.ts`

<details>
<summary>View Code (17 lines)</summary>

```typescript
import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```
</details>

---

### 📘 useMenu.ts
**Path:** `src\hooks\useMenu.ts`

<details>
<summary>View Code (18 lines)</summary>

```typescript
import { useEffect } from 'react';
import { useMenuStore } from '@store/menuStore';

export const useMenu = (orderType?: 'daily_menu' | 'meal_subscription') => {
  const menuStore = useMenuStore();

  useEffect(() => {
    if (orderType === 'daily_menu' || !orderType) {
      menuStore.fetchDailyMenu();
    } else if (orderType === 'meal_subscription') {
      menuStore.fetchMealPlanMenu();
    }

    menuStore.fetchCategories();
  }, [orderType]);

  return menuStore;
};
```
</details>

---

### 📘 useOrders.ts
**Path:** `src\hooks\useOrders.ts`

<details>
<summary>View Code (41 lines)</summary>

```typescript
import { useEffect } from 'react';
import { useOrderStore } from '@store/orderStore';
import { useToast } from './useToast'; // This will now properly import from Toast component

export const useOrders = () => {
  const orderStore = useOrderStore();
  const { showToast } = useToast();

  useEffect(() => {
    if (orderStore.orderHistory.length === 0) {
      orderStore.fetchOrderHistory();
    }
  }, []);

  const placeOrder = async (payload: any) => {
    try {
      const order = await orderStore.createOrder(payload);
      showToast('Order placed successfully!', 'success');
      return order;
    } catch (error: any) {
      showToast(error.message || 'Failed to place order', 'error');
      throw error;
    }
  };

  const cancelOrder = async (orderId: string, reason: string) => {
    try {
      await orderStore.cancelOrder(orderId, reason);
      showToast('Order cancelled successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to cancel order', 'error');
      throw error;
    }
  };

  return {
    ...orderStore,
    placeOrder,
    cancelOrder,
  };
};
```
</details>

---

### 📘 useToast.ts
**Path:** `src\hooks\useToast.ts`

<details>
<summary>View Code (3 lines)</summary>

```typescript
// src/hooks/useToast.ts
// Simply re-export the useToast hook from the Toast component
export { useToast, ToastProvider } from '@components/common/Toast';
```
</details>

---

## 📂 Page Components

### ⚛️ AdminDashboard.tsx
**Path:** `src\pages\admin\AdminDashboard.tsx`

<details>
<summary>View Code (479 lines)</summary>

```tsx
﻿import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '@store/adminStore';
import { useAuthStore } from '@store/authStore'; // âœ… Import authStore
import { formatCurrency } from '@utils/formatters';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock,
  RefreshCcw,
  Calendar,
  Package,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle,
} from 'lucide-react';
import AdminSidebar from '@components/admin/AdminSidebar';
import LoadingScreen from '@components/common/LoadingScreen';

// ===========================
// SIMPLE COMPONENTS (No External Dependencies)
// ===========================

// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-100 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

// Button Component
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const baseClasses =
    'px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-[#FF6B35] text-white hover:bg-[#E55A2B] shadow-md hover:shadow-lg',
    outline:
      'border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white',
    ghost: 'text-[#FF6B35] hover:bg-[#FFF5F2]',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// ===========================
// MAIN ADMIN DASHBOARD COMPONENT
// ===========================

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, role, isAuthenticated } = useAuthStore(); // âœ… Get auth state
  const { orderStats, fetchDashboardStats, isLoading } = useAdminStore();
  const [refreshing, setRefreshing] = useState(false);

  // âœ… Debug log on mount
  useEffect(() => {
    console.log('ðŸŽ¯ AdminDashboard mounted', {
      isAuthenticated,
      role,
      userEmail: user?.email,
      userRole: user?.role,
    });
  }, [isAuthenticated, role, user]);

  // âœ… Load dashboard data
  useEffect(() => {
    if (role === 'admin') {
      console.log('ðŸ“¡ Loading dashboard data...');
      loadDashboardData();
    }
  }, [role]);

  const loadDashboardData = async () => {
    console.log('ðŸ“¡ Fetching dashboard stats...');
    try {
      await fetchDashboardStats();
      console.log('âœ… Dashboard data loaded:', orderStats);
    } catch (error) {
      console.error('âŒ Failed to load dashboard data:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  // âœ… Show access denied if not admin
  if (role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <Card padding="lg" className="max-w-md text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#2E2E2E] mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-2">
            You need admin privileges to access this page.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              <strong>Current role:</strong>{' '}
              <span className="text-red-600 font-semibold">
                {role || 'None'}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <strong>Required role:</strong>{' '}
              <span className="text-green-600 font-semibold">admin</span>
            </p>
          </div>
          <Button onClick={() => navigate('/')} className="w-full">
            Go to Homepage
          </Button>
        </Card>
      </div>
    );
  }

  // Show loading state only on initial load
  if (isLoading && !orderStats) {
    return <LoadingScreen message="Loading dashboard..." />;
  }

  // Default stats if API fails
  const stats = orderStats || {
    total_orders: 0,
    total_orders_growth_percent: 0,
    pending_orders: 0,
    pending_orders_weekly_change_percent: 0,
    confirmed_orders: 0,
    preparing_orders: 0,
    out_for_delivery_orders: 0,
    completed_orders: 0,
    cancelled_orders: 0,
    today_revenue: 0,
    today_vs_yesterday_percent: 0,
    weekly_revenue: 0,
    weekly_growth_percent: 0,
    monthly_revenue: 0,
    monthly_growth_percent: 0,
    total_revenue: 0,
    total_revenue_growth_percent: 0,
    weekly_revenue_breakdown: [],
    active_subscriptions: 0,
    upcoming_catering_events: 0,
  };

  const formatPercent = (value?: number) => {
    if (
      value === undefined ||
      value === null ||
      Number.isNaN(value) ||
      !Number.isFinite(value)
    ) {
      return 'â€”';
    }
    const rounded = value.toFixed(1);
    const numeric = Number(rounded);
    const sign = numeric > 0 ? '+' : '';
    return `${sign}${rounded}%`;
  };

  const statsCards = [
    {
      title: 'Total Orders',
      value: stats.total_orders || 0,
      icon: <ShoppingBag size={32} />,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: formatPercent(stats.total_orders_growth_percent),
    },
    {
      title: 'Pending Orders',
      value: stats.pending_orders || 0,
      icon: <Clock size={32} />,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: formatPercent(stats.pending_orders_weekly_change_percent),
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(stats.today_revenue || 0),
      icon: <DollarSign size={32} />,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      change: formatPercent(stats.today_vs_yesterday_percent),
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.total_revenue || 0),
      icon: <TrendingUp size={32} />,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: formatPercent(stats.total_revenue_growth_percent),
    },
  ];

  const orderStatusCards = [
    {
      label: 'Pending',
      count: stats.pending_orders || 0,
      icon: <Clock size={24} />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Confirmed',
      count: stats.confirmed_orders || 0,
      icon: <Package size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Out for Delivery',
      count: stats.out_for_delivery_orders || 0,
      icon: <Truck size={24} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Completed',
      count: stats.completed_orders || 0,
      icon: <CheckCircle size={24} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Cancelled',
      count: stats.cancelled_orders || 0,
      icon: <XCircle size={24} />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const weeklyRevenueBreakdown =
    stats.weekly_revenue_breakdown && stats.weekly_revenue_breakdown.length
      ? stats.weekly_revenue_breakdown
      : [
          { label: 'Mon', date: '', total: 0 },
          { label: 'Tue', date: '', total: 0 },
          { label: 'Wed', date: '', total: 0 },
          { label: 'Thu', date: '', total: 0 },
          { label: 'Fri', date: '', total: 0 },
          { label: 'Sat', date: '', total: 0 },
          { label: 'Sun', date: '', total: 0 },
        ];

  const maxDailyRevenue = Math.max(
    ...weeklyRevenueBreakdown.map((day) => day.total || 0),
    1
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="w-full sm:w-auto">
              <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#2E2E2E] mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 flex items-center space-x-2">
                <Calendar size={16} />
                <span>
                  {new Date().toLocaleDateString('en-AU', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              className="w-full sm:w-auto flex items-center justify-center"
            >
              <RefreshCcw
                size={18}
                className={`mr-2 ${refreshing ? 'animate-spin' : ''}`}
              />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${stat.bgColor} flex items-center justify-center ${stat.textColor}`}
                  >
                    {stat.icon}
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="font-['Playfair_Display'] text-3xl font-bold text-[#2E2E2E]">
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>

          {/* Order Status Overview */}
          <Card className="mb-8">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#2E2E2E] mb-6">
              Order Status Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {orderStatusCards.map((status, index) => (
                <div
                  key={index}
                  className={`${status.bgColor} rounded-lg p-4 text-center transition-transform hover:scale-105`}
                >
                  <div className={`${status.color} flex justify-center mb-3`}>
                    {status.icon}
                  </div>
                  <p className="font-['Playfair_Display'] text-3xl font-bold text-[#2E2E2E] mb-1">
                    {status.count}
                  </p>
                  <p className="text-sm text-gray-600">{status.label}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Revenue */}
          <div className="space-y-8">
            <Card>
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#2E2E2E] mb-6">
                Weekly Revenue
              </h3>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">This Week</p>
                  <p className="font-['Playfair_Display'] text-2xl font-bold text-blue-600">
                    {formatCurrency(stats.weekly_revenue || 0)}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="font-['Playfair_Display'] text-2xl font-bold text-green-600">
                    {formatCurrency(stats.monthly_revenue || 0)}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    {formatPercent(stats.monthly_growth_percent)}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Growth</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="text-purple-600" size={20} />
                    <p className="font-['Playfair_Display'] text-2xl font-bold text-purple-600">
                      {formatPercent(stats.weekly_growth_percent)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Revenue by Day */}
              <div className="space-y-4">
                {weeklyRevenueBreakdown.map((day) => {
                  const revenue = day.total || 0;
                  const width =
                    revenue > 0
                      ? Math.max((revenue / maxDailyRevenue) * 100, 8)
                      : 0;

                  return (
                    <div key={day.label} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium text-gray-700">
                        {day.label}
                      </div>
                      <div className="flex-1">
                        <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] rounded-lg flex items-center justify-end px-3 transition-all duration-500"
                            style={{ width: `${width}%` }}
                          >
                            {revenue > 0 && (
                              <span className="text-white font-semibold text-sm">
                                {formatCurrency(revenue)}
                              </span>
                            )}
                          </div>
                          {revenue === 0 && (
                            <div className="absolute inset-0 flex items-center justify-end px-3">
                              <span className="text-gray-400 text-sm">
                                {formatCurrency(0)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
```
</details>

---

### ⚛️ CategoryManagement.tsx
**Path:** `src\pages\admin\CategoryManagement.tsx`

<details>
<summary>View Code (368 lines)</summary>

```tsx
﻿import React, { useEffect, useMemo, useState } from 'react';
import { MenuCategory } from '@models/menu.types';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import AdminSidebar from '@components/admin/AdminSidebar';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';
import LoadingScreen from '@components/common/LoadingScreen';
import {
  CategoryForm,
  CategoryFormValues,
} from '@components/admin/categories/CategoryForm';
import { Layers, FolderPlus, Pencil, Trash2, RefreshCcw } from 'lucide-react';

const createInitialFormValues = (
  categories: MenuCategory[]
): CategoryFormValues => ({
  name: '',
  display_name: '',
  description: '',
  is_active: true,
  sort_order: categories.length + 1,
  imageFile: null,
});

const mapCategoryToFormValues = (
  category: MenuCategory
): CategoryFormValues => ({
  name: category.name,
  display_name: category.display_name,
  description: category.description || '',
  is_active: category.is_active,
  sort_order: category.sort_order,
  imageFile: null,
});

const CategoryManagement: React.FC = () => {
  const {
    managedCategories,
    fetchManagedCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading,
    isUpdating,
  } = useAdminStore();
  const { showToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchManagedCategories().catch((error) => {
      console.error('Failed to load categories', error);
    });
  }, [fetchManagedCategories]);

  const sortedCategories = useMemo(
    () =>
      [...managedCategories].sort((a, b) => {
        const orderA = a.sort_order ?? 0;
        const orderB = b.sort_order ?? 0;
        if (orderA === orderB) {
          return a.display_name.localeCompare(b.display_name);
        }
        return orderA - orderB;
      }),
    [managedCategories]
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchManagedCategories();
      showToast('Categories refreshed', 'success');
    } catch (error) {
      console.error('Failed to refresh categories', error);
      showToast('Failed to refresh categories', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  const buildCategoryFormData = (
    values: CategoryFormValues,
    { includeName }: { includeName: boolean }
  ) => {
    const formData = new FormData();
    if (includeName) {
      formData.append('name', values.name);
    }
    formData.append('display_name', values.display_name);
    formData.append('description', values.description ?? '');
    formData.append('is_active', String(values.is_active));
    if (values.sort_order !== undefined && values.sort_order !== null) {
      formData.append('sort_order', String(values.sort_order));
    }
    if (values.imageFile) {
      formData.append('image', values.imageFile);
    }
    return formData;
  };

  const handleCreateCategory = async (values: CategoryFormValues) => {
    try {
      const formData = buildCategoryFormData(values, { includeName: true });
      await createCategory(formData);
      setShowAddModal(false);
      showToast('Category created successfully', 'success');
    } catch (error) {
      showToast('Failed to create category', 'error');
    }
  };

  const handleUpdateCategory = async (values: CategoryFormValues) => {
    if (!editingCategory) return;
    const categoryId =
      editingCategory._id || editingCategory.id || editingCategory.name;
    if (!categoryId) {
      showToast('Category identifier missing. Please refresh and try again.', 'error');
      return;
    }

    try {
      const formData = buildCategoryFormData(values, { includeName: false });
      await updateCategory(categoryId, formData);
      setEditingCategory(null);
      showToast('Category updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update category', 'error');
    }
  };

  const handleDeleteCategory = async (category: MenuCategory) => {
    const confirmed = window.confirm(
      `Delete category "${category.display_name}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(category._id);
      showToast('Category deleted', 'success');
    } catch (error) {
      showToast('Failed to delete category', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#2E2E2E] mb-2 flex items-center space-x-3">
                <Layers className="text-primary" size={32} />
                <span>Category Management</span>
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Create and maintain the categories that customers see on the
                menu. Categories can be re-used across daily, weekly, and
                catering experiences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center justify-center w-full sm:w-auto"
              >
                <RefreshCcw
                  size={18}
                  className={refreshing ? 'animate-spin mr-2' : 'mr-2'}
                />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button
                variant="primary"
                className="flex items-center justify-center w-full sm:w-auto"
                onClick={() => setShowAddModal(true)}
              >
                <FolderPlus size={18} className="mr-2" />
                Add Category
              </Button>
            </div>
          </header>

          <Card>
            {isLoading && managedCategories.length === 0 ? (
              <div className="py-16">
                <LoadingScreen
                  variant="section"
                  message="Loading categories..."
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Internal Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Sort Order
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Updated
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedCategories.length === 0 ? (
                      <tr>
                        <td
                          className="px-4 py-6 text-center text-sm text-gray-500"
                          colSpan={6}
                        >
                          No categories found. Create your first category to
                          organise menu items.
                        </td>
                      </tr>
                    ) : (
                      sortedCategories.map((category) => (
                        <tr
                          key={category._id || category.id || category.name}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              {category.image_url ? (
                                <img
                                  src={category.image_url}
                                  alt={category.display_name}
                                  className="w-12 h-12 rounded-lg object-cover border"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
                                  {category.display_name
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {category.display_name}
                                </p>
                                {category.description && (
                                  <p className="text-sm text-gray-500 max-w-xs truncate">
                                    {category.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                            {category.name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {category.sort_order ?? '—'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                category.is_active
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {category.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {category.updated_at
                              ? new Date(
                                  category.updated_at
                                ).toLocaleDateString()
                              : '—'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center text-sm"
                                onClick={() => setEditingCategory(category)}
                              >
                                <Pencil size={16} className="mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center text-sm text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteCategory(category)}
                              >
                                <Trash2 size={16} className="mr-1" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Category"
        size="md"
      >
        <CategoryForm
          mode="create"
          initialValues={createInitialFormValues(managedCategories)}
          isSubmitting={isUpdating}
          onSubmit={handleCreateCategory}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Edit Category"
        size="md"
      >
        {editingCategory && (
          <CategoryForm
            mode="edit"
            initialValues={mapCategoryToFormValues(editingCategory)}
            existingCategory={editingCategory}
            isSubmitting={isUpdating}
            onSubmit={handleUpdateCategory}
            onCancel={() => setEditingCategory(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default CategoryManagement;
```
</details>

---

### ⚛️ DeliveryZonesPage.tsx
**Path:** `src\pages\admin\DeliveryZonesPage.tsx`

<details>
<summary>View Code (417 lines)</summary>

```tsx
import React, { useEffect, useState } from 'react';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import AdminSidebar from '@components/admin/AdminSidebar';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Input from '@components/common/Input';
import Modal from '@components/common/Modal';
import LoadingScreen from '@components/common/LoadingScreen';
import Pagination from '@components/common/Pagination';
import { DeliveryZone } from '@models/subscription.types';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';

const ZONES_PAGE_SIZE = 10;

const DeliveryZonesPage: React.FC = () => {
  const { showToast } = useToast();
  const {
    deliveryZones,
    deliveryZonePagination,
    fetchDeliveryZones,
    createDeliveryZone,
    updateDeliveryZone,
    deleteDeliveryZone,
    isLoading,
    isUpdating,
    error,
    clearError,
  } = useAdminStore();

  const [zoneModalOpen, setZoneModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);
  const [zonesPage, setZonesPage] = useState(1);

  const [zoneForm, setZoneForm] = useState({
    postcode: '',
    zone_label: '',
    suburbs: '',
    base_delivery_fee: '10',
    express_delivery_fee: '',
    notes: '',
    is_active: true,
  });

  useEffect(() => {
    fetchDeliveryZones({
      includeInactive: true,
      page: zonesPage,
      pageSize: ZONES_PAGE_SIZE,
    }).catch(console.error);
  }, [fetchDeliveryZones, zonesPage]);

  // ✅ FIX: Add null check for deliveryZonePagination
  useEffect(() => {
    if (!deliveryZonePagination) return;

    if (
      deliveryZonePagination.totalPages > 0 &&
      zonesPage > deliveryZonePagination.totalPages
    ) {
      setZonesPage(deliveryZonePagination.totalPages);
    }
  }, [deliveryZonePagination?.totalPages, zonesPage]);

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
      clearError();
    }
  }, [error, showToast, clearError]);

  const handleOpenZoneModal = (zone?: DeliveryZone) => {
    if (zone) {
      setEditingZone(zone);
      setZoneForm({
        postcode: zone.postcode,
        zone_label: zone.zone_label || '',
        suburbs: zone.suburbs.join(', '),
        base_delivery_fee: String(zone.base_delivery_fee || 10),
        express_delivery_fee: zone.express_delivery_fee
          ? String(zone.express_delivery_fee)
          : '',
        notes: zone.notes || '',
        is_active: zone.is_active,
      });
    } else {
      setEditingZone(null);
      setZoneForm({
        postcode: '',
        zone_label: '',
        suburbs: '',
        base_delivery_fee: '10',
        express_delivery_fee: '',
        notes: '',
        is_active: true,
      });
    }
    setZoneModalOpen(true);
  };

  const handleZoneFormChange = (field: string, value: string | boolean) => {
    setZoneForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitZone = async () => {
    if (!zoneForm.postcode) {
      showToast('Postcode is required.', 'error');
      return;
    }

    const suburbsArray = zoneForm.suburbs
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Partial<DeliveryZone> = {
      postcode: zoneForm.postcode,
      zone_label: zoneForm.zone_label || undefined,
      suburbs: suburbsArray,
      base_delivery_fee: Number(zoneForm.base_delivery_fee || 10),
      express_delivery_fee: zoneForm.express_delivery_fee
        ? Number(zoneForm.express_delivery_fee)
        : undefined,
      notes: zoneForm.notes || undefined,
      is_active: zoneForm.is_active,
    };

    try {
      if (editingZone?._id) {
        await updateDeliveryZone(editingZone._id, payload);
        showToast('Delivery zone updated successfully', 'success');
      } else {
        await createDeliveryZone(payload);
        showToast('Delivery zone created successfully', 'success');
      }
      setZoneModalOpen(false);
      fetchDeliveryZones({
        includeInactive: true,
        page: zonesPage,
        pageSize: ZONES_PAGE_SIZE,
      });
    } catch (err) {
      console.error(err);
      showToast('Failed to save delivery zone', 'error');
    }
  };

  const handleDeleteZone = async (zoneId: string) => {
    if (
      !window.confirm('Are you sure you want to deactivate this delivery zone?')
    ) {
      return;
    }
    try {
      await deleteDeliveryZone(zoneId, false);
      showToast('Delivery zone deactivated', 'success');
      fetchDeliveryZones({
        includeInactive: true,
        page: zonesPage,
        pageSize: ZONES_PAGE_SIZE,
      });
    } catch (err) {
      console.error(err);
      showToast('Failed to deactivate zone', 'error');
    }
  };

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('en-AU', {
          style: 'currency',
          currency: 'AUD',
        }).format(value)
      : '—';

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      {(isLoading || isUpdating) && (
        <LoadingScreen
          message={
            isLoading ? 'Loading delivery zones...' : 'Saving changes...'
          }
        />
      )}
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text flex items-center space-x-3">
                <MapPin className="text-primary" />
                <span>Delivery Zones & Postal Codes</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Configure base delivery fees per postcode and control
                availability for meal subscriptions.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => handleOpenZoneModal()}
              className="w-full sm:w-auto flex items-center justify-center"
            >
              <Plus size={20} className="mr-2" />
              Add Delivery Zone
            </Button>
          </div>

          <Card className="p-6 shadow-lg border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Postcode
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Zone Label
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Suburbs
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Base Fee
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Express Fee
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Active
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deliveryZones.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-gray-500 italic"
                      >
                        No delivery zones configured yet.
                      </td>
                    </tr>
                  )}
                  {deliveryZones.map((zone) => (
                    <tr key={zone._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-text">
                        {zone.postcode}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {zone.zone_label || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                        {zone.suburbs.join(', ')}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatCurrency(zone.base_delivery_fee)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {zone.express_delivery_fee
                          ? formatCurrency(zone.express_delivery_fee)
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {zone.is_active ? (
                          <span className="text-emerald-600 font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="text-gray-400">Inactive</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenZoneModal(zone)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteZone(zone._id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ FIX: Only render Pagination when deliveryZonePagination is not null */}
            {deliveryZonePagination && deliveryZonePagination.total > 0 && (
              <Pagination
                currentPage={deliveryZonePagination.page || 1}
                totalItems={deliveryZonePagination.total}
                pageSize={deliveryZonePagination.pageSize || ZONES_PAGE_SIZE}
                onPageChange={setZonesPage}
                showSummary
                className="mt-4"
              />
            )}
          </Card>

          {/* Zone Modal */}
          <Modal
            isOpen={zoneModalOpen}
            onClose={() => setZoneModalOpen(false)}
            title={editingZone ? 'Edit Delivery Zone' : 'Add Delivery Zone'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Postcode *"
                value={zoneForm.postcode}
                onChange={(e) =>
                  handleZoneFormChange('postcode', e.target.value)
                }
                required
                disabled={!!editingZone}
              />
              <Input
                label="Zone Label"
                value={zoneForm.zone_label}
                onChange={(e) =>
                  handleZoneFormChange('zone_label', e.target.value)
                }
                placeholder="e.g., Zone 1 (0-14km)"
              />
              <label className="flex flex-col text-sm font-medium text-gray-700 md:col-span-2">
                Suburbs (comma separated) *
                <textarea
                  className="mt-1 rounded-lg border border-gray-300 px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={zoneForm.suburbs}
                  onChange={(e) =>
                    handleZoneFormChange('suburbs', e.target.value)
                  }
                  placeholder="Guildford, Merrylands, Fairfield"
                />
              </label>
              <Input
                label="Base Delivery Fee *"
                type="number"
                step="0.01"
                value={zoneForm.base_delivery_fee}
                onChange={(e) =>
                  handleZoneFormChange('base_delivery_fee', e.target.value)
                }
                required
              />
              <Input
                label="Express Delivery Fee"
                type="number"
                step="0.01"
                value={zoneForm.express_delivery_fee}
                onChange={(e) =>
                  handleZoneFormChange('express_delivery_fee', e.target.value)
                }
                placeholder="Optional express fee"
              />
              <label className="flex flex-col text-sm font-medium text-gray-700 md:col-span-2">
                Notes
                <textarea
                  className="mt-1 rounded-lg border border-gray-300 px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={zoneForm.notes}
                  onChange={(e) =>
                    handleZoneFormChange('notes', e.target.value)
                  }
                  placeholder="Optional notes about this delivery zone"
                />
              </label>
              <label className="flex items-center space-x-2 mt-2 md:col-span-2">
                <input
                  type="checkbox"
                  checked={zoneForm.is_active}
                  onChange={(e) =>
                    handleZoneFormChange('is_active', e.target.checked)
                  }
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">
                  Zone is active and available
                </span>
              </label>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setZoneModalOpen(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitZone}
                isLoading={isUpdating}
                disabled={isUpdating}
              >
                {editingZone ? 'Save Changes' : 'Create Zone'}
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DeliveryZonesPage;
```
</details>

---

### ⚛️ MealPlanManagement.tsx
**Path:** `src\pages\admin\MealPlanManagement.tsx`

<details>
<summary>View Code (1594 lines)</summary>

```tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useAdminStore } from '@store/adminStore';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Input from '@components/common/Input';
import Modal from '@components/common/Modal';
import LoadingScreen from '@components/common/LoadingScreen';
import Pagination from '@components/common/Pagination';
import { useToast } from '@components/common/Toast';
import AdminSidebar from '@components/admin/AdminSidebar';
import {
  MealSubscriptionPlan,
  UpsellCondition,
  ReminderSettings,
} from '@models/subscription.types';

type PlanFormState = Partial<MealSubscriptionPlan> & {
  suburbs?: string;
};

const WEEK_DAYS: Array<{ value: string; label: string }> = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

const MEAL_PLANS_PAGE_SIZE = 10;

const DAY_SEQUENCE = WEEK_DAYS.map((day) => day.value);

const defaultPlanForm: PlanFormState = {
  code: '',
  name: '',
  tab: 'regular',
  description: '',
  included_meals: 0,
  deliveries_per_cycle: 1,
  weeks_in_cycle: 1,
  boxes_per_delivery: 1,
  max_boxes_per_meal: null,
  price_per_plan: 0,
  price_per_box: null,
  allow_multiple: true,
  min_boxes_delivery: 4,
  min_boxes_pickup: 1,
  display_badge: '',
  display_order: 0,
  highlight: false,
  require_terms_ack: false,
  acknowledgement_label: '',
  terms_and_conditions: [],
  week_selection_rules: undefined,
  customer_notifications: {
    upsell_message: '',
    reminder_message: '',
    upsell_condition: 'always',
  },
  reminder_settings: {
    enabled: false,
    frequency_days: 7,
    channel: 'in_app',
    threshold_unselected_boxes: null,
  },
  is_active: true,
  available_delivery_days: [],
  menu_item_ids_by_day: {},
  metadata: {
    menu_item_scope: 'meal_plan_only',
  },
};

type PlanTabTemplate = {
  value: MealSubscriptionPlan['tab'];
  label: string;
  helper: string;
  template: Partial<PlanFormState>;
};

const PLAN_TAB_CONFIGS: Record<string, PlanTabTemplate> = {
  regular: {
    value: 'regular',
    label: 'Regular Order',
    helper: 'No meal limit, MOQ 4 boxes for delivery / 1 for pickup.',
    template: {
      included_meals: 0,
      deliveries_per_cycle: 1,
      weeks_in_cycle: 1,
      boxes_per_delivery: 1,
      max_boxes_per_meal: null,
      price_per_plan: 0,
      price_per_box: null,
      min_boxes_delivery: 4,
      min_boxes_pickup: 1,
      require_terms_ack: false,
      acknowledgement_label: '',
      terms_and_conditions: [],
      customer_notifications: {
        upsell_message:
          'You can select the 10-meal deal offer to get a discount.',
        reminder_message: '',
        upsell_condition: 'when_plan_selected',
      },
      reminder_settings: {
        enabled: false,
        frequency_days: 7,
        channel: 'in_app',
        threshold_unselected_boxes: null,
      },
      metadata: {
        menu_item_scope: 'meal_plan_only',
      },
      available_delivery_days: ['monday', 'thursday'],
    },
  },
  weekly: {
    value: 'weekly',
    label: 'Weekly 10-Meal Plan',
    helper: 'Two deliveries every week (Monday & Thursday).',
    template: {
      included_meals: 10,
      deliveries_per_cycle: 2,
      weeks_in_cycle: 1,
      boxes_per_delivery: 5,
      max_boxes_per_meal: 2,
      price_per_plan: 129,
      price_per_box: 12.9,
      require_terms_ack: true,
      acknowledgement_label: 'I agree to the Weekly 10-Meal Plan terms.',
      terms_and_conditions: [
        'Two deliveries per week (Monday & Thursday).',
        'Maximum of 2 boxes per meal per 10-meal plan.',
        'Additional plans unlock more boxes per meal.',
        'Changes must be submitted before the weekly cut-off.',
      ],
      week_selection_rules: {
        available_weeks: 2,
        required_weeks: 1,
        deliveries_per_week: 2,
        allow_partial_weeks: false,
      },
      customer_notifications: {
        upsell_message: '',
        reminder_message: '',
        upsell_condition: 'hidden',
      },
      reminder_settings: {
        enabled: false,
        frequency_days: 7,
        channel: 'in_app',
        threshold_unselected_boxes: null,
      },
      metadata: {
        menu_item_scope: 'meal_plan_only',
      },
      available_delivery_days: ['monday', 'thursday'],
    },
  },
  fortnight: {
    value: 'fortnight',
    label: 'Fortnight Plan',
    helper: 'Pick any 2 weeks out of the upcoming 4.',
    template: {
      included_meals: 20,
      deliveries_per_cycle: 4,
      weeks_in_cycle: 2,
      boxes_per_delivery: 5,
      max_boxes_per_meal: 2,
      price_per_plan: 249,
      price_per_box: 12.45,
      require_terms_ack: true,
      acknowledgement_label:
        'I understand I must choose 2 weeks within the next 4.',
      terms_and_conditions: [
        'Pick any two upcoming weeks (Monday & Thursday deliveries).',
        'Ten meals per selected week (two deliveries).',
        'Changes lock 48 hours before each delivery.',
      ],
      week_selection_rules: {
        available_weeks: 4,
        required_weeks: 2,
        deliveries_per_week: 2,
        allow_partial_weeks: false,
      },
      customer_notifications: {
        upsell_message: '',
        reminder_message: '',
        upsell_condition: 'hidden',
      },
      reminder_settings: {
        enabled: false,
        frequency_days: 7,
        channel: 'in_app',
        threshold_unselected_boxes: null,
      },
      metadata: {
        menu_item_scope: 'meal_plan_only',
      },
      available_delivery_days: ['monday', 'thursday'],
    },
  },
  monthly: {
    value: 'monthly',
    label: 'Monthly Plan',
    helper: 'Select 4 weeks out of the next 6 and receive reminders.',
    template: {
      included_meals: 40,
      deliveries_per_cycle: 8,
      weeks_in_cycle: 4,
      boxes_per_delivery: 5,
      max_boxes_per_meal: 2,
      price_per_plan: 479,
      price_per_box: 11.98,
      require_terms_ack: true,
      acknowledgement_label:
        'I will complete my 4 weekly selections within 6 weeks.',
      terms_and_conditions: [
        'Select four weeks (Monday & Thursday deliveries) within the next six-week window.',
        'Each selected week includes ten meals (two deliveries).',
        "We'll remind you about any remaining meal selections.",
      ],
      week_selection_rules: {
        available_weeks: 6,
        required_weeks: 4,
        deliveries_per_week: 2,
        allow_partial_weeks: false,
      },
      customer_notifications: {
        upsell_message: '',
        reminder_message:
          'Monthly plan reminder: keep an eye on how many meals are still unassigned.',
        upsell_condition: 'hidden',
      },
      reminder_settings: {
        enabled: true,
        frequency_days: 7,
        channel: 'both',
        threshold_unselected_boxes: 4,
      },
      metadata: {
        menu_item_scope: 'meal_plan_only',
      },
      available_delivery_days: ['monday', 'thursday'],
    },
  },
};

const PLAN_TAB_OPTIONS = Object.values(PLAN_TAB_CONFIGS);

const formatCurrency = (value: number | undefined) =>
  value !== undefined
    ? new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
      }).format(value)
    : '-';

const MealPlanManagement: React.FC = () => {
  const { showToast } = useToast();
  const {
    mealPlans,
    mealPlanPagination,
    managedMenuItems,
    fetchMealPlans,
    fetchManagedMenuItems,
    createMealPlan,
    updateMealPlan,
    deleteMealPlan,
    isLoading,
    isUpdating,
    error,
    clearError,
  } = useAdminStore();

  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MealSubscriptionPlan | null>(
    null
  );
  const [planForm, setPlanForm] = useState<PlanFormState>(defaultPlanForm);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dayMenuSelections, setDayMenuSelections] = useState<
    Record<string, string[]>
  >({});
  const [planTermsDraft, setPlanTermsDraft] = useState('');
  const [plansPage, setPlansPage] = useState(1);

  useEffect(() => {
    fetchManagedMenuItems().catch(console.error);
  }, [fetchManagedMenuItems]);

  useEffect(() => {
    fetchMealPlans({
      includeInactive: true,
      page: plansPage,
      pageSize: MEAL_PLANS_PAGE_SIZE,
    }).catch(console.error);
  }, [fetchMealPlans, plansPage]);

  // ? FIX: Add null check for mealPlanPagination
  useEffect(() => {
    if (!mealPlanPagination) return;

    if (
      mealPlanPagination.totalPages > 0 &&
      plansPage > mealPlanPagination.totalPages
    ) {
      setPlansPage(mealPlanPagination.totalPages);
    } else if (
      mealPlanPagination.page > 0 &&
      mealPlanPagination.page !== plansPage
    ) {
      setPlansPage(mealPlanPagination.page);
    }
  }, [mealPlanPagination?.page, mealPlanPagination?.totalPages, plansPage]);

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
      clearError();
    }
  }, [error, showToast, clearError]);

  const mealPlanEligibleItems = useMemo(
    () =>
      (managedMenuItems ?? []).filter(
        (item) => item.is_available_for_meal_plan === true
      ),
    [managedMenuItems]
  );

  const resolveMenuScope = (
    _metadata?: Record<string, unknown>
  ): 'meal_plan_only' => {
    return 'meal_plan_only';
  };

  const availableMenuItems = useMemo(
    () => [...mealPlanEligibleItems],
    [mealPlanEligibleItems]
  );

  const mealPlanItemIdSet = useMemo(
    () =>
      new Set(
        mealPlanEligibleItems
          .map((item) => item._id || item.id)
          .filter((id): id is string => !!id)
          .map((id) => id.toString())
      ),
    [mealPlanEligibleItems]
  );

  const sortedMenuItems = useMemo(
    () => [...availableMenuItems].sort((a, b) => a.name.localeCompare(b.name)),
    [availableMenuItems]
  );
  const multiSelectSize = Math.min(
    10,
    Math.max(4, sortedMenuItems.length || 0)
  );

  const sortedPlans = useMemo(
    () =>
      [...mealPlans].sort(
        (a, b) =>
          (a.display_order ?? 0) - (b.display_order ?? 0) ||
          a.name.localeCompare(b.name)
      ),
    [mealPlans]
  );

  const handleOpenPlanModal = (plan?: MealSubscriptionPlan) => {
    if (plan) {
      setEditingPlan(plan);
      const planDaysRaw =
        Array.isArray(plan.available_delivery_days) &&
        plan.available_delivery_days.length > 0
          ? plan.available_delivery_days
          : Object.keys(plan.menu_item_ids_by_day ?? {});
      const normalizedDays = planDaysRaw
        .map((day) => day?.toString().toLowerCase())
        .filter((day): day is string => !!day && DAY_SEQUENCE.includes(day));
      normalizedDays.sort(
        (a, b) => DAY_SEQUENCE.indexOf(a) - DAY_SEQUENCE.indexOf(b)
      );

      const idMapping = plan.menu_item_ids_by_day ?? {};
      const fallbackMapping = plan.menu_items_by_day ?? {};
      const normalizedMenus: Record<string, string[]> = {};
      const allowedMenuItemIds = mealPlanItemIdSet;
      normalizedDays.forEach((day) => {
        const idsFromMapping = Array.isArray(idMapping[day])
          ? idMapping[day]
          : [];
        let resolvedIds = idsFromMapping
          .map((id) => (id != null ? String(id) : ''))
          .filter((id): id is string => id.length > 0);
        if (resolvedIds.length === 0 && Array.isArray(fallbackMapping[day])) {
          resolvedIds = (fallbackMapping[day] ?? [])
            .map((item) => item?._id || item?.id)
            .filter((id): id is string => !!id)
            .map((id) => String(id));
        }
        const sanitizedIds = allowedMenuItemIds
          ? resolvedIds.filter((id) => allowedMenuItemIds.has(id))
          : resolvedIds;
        normalizedMenus[day] = Array.from(new Set(sanitizedIds));
      });

      setSelectedDays(normalizedDays);
      setDayMenuSelections(normalizedMenus);
      const notifications = plan.customer_notifications ?? {};
      const reminderSettings = plan.reminder_settings ?? undefined;
      setPlanForm({
        ...plan,
        tab: plan.tab ?? defaultPlanForm.tab,
        weeks_in_cycle: plan.weeks_in_cycle ?? defaultPlanForm.weeks_in_cycle,
        customer_notifications: {
          upsell_message: notifications.upsell_message ?? '',
          reminder_message: notifications.reminder_message ?? '',
          upsell_condition: notifications.upsell_condition ?? 'always',
        },
        reminder_settings: {
          enabled: reminderSettings?.enabled ?? false,
          frequency_days: reminderSettings?.frequency_days ?? 7,
          channel: reminderSettings?.channel ?? 'in_app',
          threshold_unselected_boxes:
            reminderSettings?.threshold_unselected_boxes ?? null,
        },
        suburbs: Array.isArray(plan.metadata?.suburbs)
          ? (plan.metadata?.suburbs as string[]).join(', ')
          : '',
        available_delivery_days: normalizedDays,
        menu_item_ids_by_day: normalizedMenus,
        metadata: {
          ...(plan.metadata ?? {}),
          menu_item_scope: 'meal_plan_only',
        },
      });
      setPlanTermsDraft((plan.terms_and_conditions ?? []).join('\n'));
    } else {
      setEditingPlan(null);
      const template = PLAN_TAB_CONFIGS[defaultPlanForm.tab]?.template ?? {};
      const mergedForm: PlanFormState = {
        ...defaultPlanForm,
        ...template,
        tab: defaultPlanForm.tab,
        customer_notifications: {
          upsell_message: template.customer_notifications?.upsell_message ?? '',
          reminder_message:
            template.customer_notifications?.reminder_message ?? '',
          upsell_condition:
            template.customer_notifications?.upsell_condition ?? 'always',
        },
        reminder_settings: template.reminder_settings ?? {
          enabled: false,
          frequency_days: 7,
          channel: 'in_app',
          threshold_unselected_boxes: null,
        },
        metadata: {
          menu_item_scope: 'meal_plan_only',
        },
        terms_and_conditions: template.terms_and_conditions ?? [],
      };
      setPlanForm(mergedForm);
      applyTemplateDays(template.available_delivery_days);
      setDayMenuSelections({});
      setPlanTermsDraft((template.terms_and_conditions ?? []).join('\n'));
    }
    setPlanModalOpen(true);
  };

  const handlePlanFormChange = (
    field: keyof PlanFormState,
    value: string | number | boolean
  ) => {
    setPlanForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleDaySelection = (day: string) => {
    const normalizedDay = day.toLowerCase();
    const orderIndex = (value: string) => DAY_SEQUENCE.indexOf(value);

    setSelectedDays((prev) => {
      const isSelected = prev.includes(normalizedDay);
      if (isSelected) {
        const updated = prev.filter((value) => value !== normalizedDay);
        setDayMenuSelections((current) => {
          const updatedMenus = { ...current };
          delete updatedMenus[normalizedDay];
          return updatedMenus;
        });
        return updated;
      }
      const updated = [...prev, normalizedDay].sort(
        (a, b) => orderIndex(a) - orderIndex(b)
      );
      return updated;
    });
  };

  const handleDayMenuSelectChange = (day: string, values: string[]) => {
    const normalizedDay = day.toLowerCase();
    const sanitizedValues = values
      .map((value) => (value != null ? String(value) : ''))
      .filter((value) => value.length > 0);
    const uniqueValues = Array.from(new Set(sanitizedValues)).filter((value) =>
      mealPlanItemIdSet.has(value)
    );
    setDayMenuSelections((prev) => ({
      ...prev,
      [normalizedDay]: uniqueValues,
    }));
  };

  const handleMenuItemToggle = (day: string, itemId: string) => {
    const normalizedDay = day.toLowerCase();
    const normalizedItemId = itemId ? String(itemId) : '';
    if (!normalizedItemId) {
      return;
    }

    if (!mealPlanItemIdSet.has(normalizedItemId)) {
      showToast(
        'Selected dish is not marked as available for Meal Plans.',
        'error'
      );
      return;
    }

    setDayMenuSelections((prev) => {
      const current = prev[normalizedDay] ?? [];
      const exists = current.includes(normalizedItemId);
      const nextItems = exists
        ? current.filter((value) => value !== normalizedItemId)
        : [...current, normalizedItemId];
      return {
        ...prev,
        [normalizedDay]: nextItems,
      };
    });
  };

  const handleMenuOptionMouseDown = (
    event: React.MouseEvent<HTMLOptionElement>,
    day: string,
    itemId: string
  ) => {
    event.preventDefault();
    handleMenuItemToggle(day, itemId);
  };

  const getDayLabel = (day: string) =>
    WEEK_DAYS.find((option) => option.value === day)?.label ?? day;

  const normalizeTemplateDays = (days?: string[]) =>
    (days ?? [])
      .map((day) => day?.toString().toLowerCase())
      .filter((day): day is string => !!day && DAY_SEQUENCE.includes(day))
      .sort((a, b) => DAY_SEQUENCE.indexOf(a) - DAY_SEQUENCE.indexOf(b));

  const applyTemplateDays = (days?: string[]) => {
    const normalized = normalizeTemplateDays(days);
    setSelectedDays(normalized);
    setDayMenuSelections((prev) => {
      const next: Record<string, string[]> = {};
      normalized.forEach((day) => {
        next[day] = prev[day] ?? [];
      });
      return next;
    });
  };

  const handlePlanTabChange = (tabValue: MealSubscriptionPlan['tab']) => {
    const config = PLAN_TAB_CONFIGS[tabValue];
    if (!config) {
      setPlanForm((prev) => ({ ...prev, tab: tabValue }));
      return;
    }
    const template = config.template;
    applyTemplateDays(template.available_delivery_days);
    setPlanTermsDraft((template.terms_and_conditions ?? []).join('\n'));

    setPlanForm((prev) => ({
      ...prev,
      tab: tabValue,
      ...template,
      customer_notifications: {
        upsell_message: template.customer_notifications?.upsell_message ?? '',
        reminder_message:
          template.customer_notifications?.reminder_message ?? '',
        upsell_condition:
          template.customer_notifications?.upsell_condition ??
          prev.customer_notifications?.upsell_condition ??
          'always',
      },
      reminder_settings: template.reminder_settings ?? prev.reminder_settings,
      metadata: {
        ...prev.metadata,
        menu_item_scope: 'meal_plan_only',
      },
      terms_and_conditions: template.terms_and_conditions ?? [],
    }));
  };

  const handleTermsDraftChange = (value: string) => {
    setPlanTermsDraft(value);
    const terms = value
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    setPlanForm((prev) => ({
      ...prev,
      terms_and_conditions: terms,
    }));
  };

  const handleWeekRuleChange = (
    field:
      | 'available_weeks'
      | 'required_weeks'
      | 'deliveries_per_week'
      | 'allow_partial_weeks',
    value: number | boolean | null
  ) => {
    setPlanForm((prev) => {
      const existing = prev.week_selection_rules ?? {};
      const nextRules = { ...existing };
      if (field === 'allow_partial_weeks') {
        nextRules.allow_partial_weeks = Boolean(value);
      } else if (typeof value === 'number' && !Number.isNaN(value)) {
        nextRules[field] = value;
      } else {
        delete nextRules[field];
      }
      return {
        ...prev,
        week_selection_rules: nextRules,
      };
    });
  };

  const handleNotificationChange = (
    field: 'upsell_message' | 'reminder_message' | 'upsell_condition',
    value: string
  ) => {
    setPlanForm((prev) => ({
      ...prev,
      customer_notifications: {
        upsell_message:
          field === 'upsell_message'
            ? value
            : (prev.customer_notifications?.upsell_message ?? ''),
        reminder_message:
          field === 'reminder_message'
            ? value
            : (prev.customer_notifications?.reminder_message ?? ''),
        upsell_condition:
          field === 'upsell_condition'
            ? (value as UpsellCondition)
            : prev.customer_notifications?.upsell_condition ?? 'always',
      },
    }));
  };

  const handleReminderSettingsChange = <
    K extends keyof ReminderSettings,
    V = ReminderSettings[K]
  >(
    field: K,
    value: V
  ) => {
    setPlanForm((prev) => ({
      ...prev,
      reminder_settings: {
        enabled: prev.reminder_settings?.enabled ?? false,
        frequency_days: prev.reminder_settings?.frequency_days ?? 7,
        channel: prev.reminder_settings?.channel ?? 'in_app',
        threshold_unselected_boxes:
          prev.reminder_settings?.threshold_unselected_boxes ?? null,
        ...prev.reminder_settings,
        [field]: value,
      },
    }));
  };

  const handleSubmitPlan = async () => {
    const {
      suburbs: _suburbs,
      _id: _ignoredPlanId,
      id: _ignoredClientPlanId,
      created_at: _ignoredCreatedAt,
      updated_at: _ignoredUpdatedAt,
      menu_items_by_day: _ignoredMenuItemsByDay,
      ...planBase
    } = planForm;

    const payload: Partial<MealSubscriptionPlan> = {
      ...planBase,
      included_meals: Number(planForm.included_meals ?? 0),
      deliveries_per_cycle: Number(planForm.deliveries_per_cycle ?? 0),
      weeks_in_cycle: Number(planForm.weeks_in_cycle ?? 0),
      boxes_per_delivery: Number(planForm.boxes_per_delivery ?? 0),
      max_boxes_per_meal:
        planForm.max_boxes_per_meal !== undefined &&
        planForm.max_boxes_per_meal !== null
          ? Number(planForm.max_boxes_per_meal)
          : null,
      price_per_plan: Number(planForm.price_per_plan ?? 0),
      price_per_box:
        planForm.price_per_box !== undefined && planForm.price_per_box !== null
          ? Number(planForm.price_per_box)
          : null,
      min_boxes_delivery:
        planForm.min_boxes_delivery !== undefined &&
        planForm.min_boxes_delivery !== null
          ? Number(planForm.min_boxes_delivery)
          : null,
      min_boxes_pickup:
        planForm.min_boxes_pickup !== undefined &&
        planForm.min_boxes_pickup !== null
          ? Number(planForm.min_boxes_pickup)
          : null,
    };

    payload.require_terms_ack = planForm.require_terms_ack ?? false;
    payload.acknowledgement_label = payload.require_terms_ack
      ? (planForm.acknowledgement_label ?? '').trim() || undefined
      : undefined;
    payload.terms_and_conditions = planForm.terms_and_conditions ?? [];

    const normalizedSuburbs = (_suburbs ?? '')
      .split(',')
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);

    const normalizedMetadataScope = resolveMenuScope(planForm.metadata);
    payload.metadata = {
      ...(planForm.metadata ?? {}),
      menu_item_scope: normalizedMetadataScope,
      ...(normalizedSuburbs.length ? { suburbs: normalizedSuburbs } : {}),
    };

    if (planForm.week_selection_rules) {
      const weekRules = planForm.week_selection_rules;
      const cleanedRules = {
        available_weeks: weekRules.available_weeks ?? undefined,
        required_weeks: weekRules.required_weeks ?? undefined,
        deliveries_per_week: weekRules.deliveries_per_week ?? undefined,
        allow_partial_weeks: weekRules.allow_partial_weeks ?? false,
      };
      const hasRule =
        cleanedRules.available_weeks ||
        cleanedRules.required_weeks ||
        cleanedRules.deliveries_per_week ||
        cleanedRules.allow_partial_weeks;
      payload.week_selection_rules = hasRule ? cleanedRules : undefined;
    } else {
      payload.week_selection_rules = undefined;
    }

    if (planForm.customer_notifications) {
      const upsell = (
        planForm.customer_notifications.upsell_message ?? ''
      ).trim();
      const reminder = (
        planForm.customer_notifications.reminder_message ?? ''
      ).trim();
      const upsellCondition =
        planForm.customer_notifications.upsell_condition ?? 'always';

      const shouldPersist =
        upsell.length > 0 ||
        reminder.length > 0 ||
        upsellCondition !== 'always' ||
        Boolean(editingPlan?.customer_notifications);

      payload.customer_notifications = shouldPersist
        ? {
            upsell_message: upsell || undefined,
            reminder_message: reminder || undefined,
            upsell_condition: upsellCondition,
          }
        : undefined;
    } else {
      payload.customer_notifications = undefined;
    }

    if (planForm.reminder_settings) {
      const reminder = planForm.reminder_settings;
      let frequency = Number(reminder.frequency_days ?? 7);
      if (!Number.isFinite(frequency) || frequency <= 0) {
        frequency = 7;
      }
      const threshold =
        reminder.threshold_unselected_boxes !== null &&
        reminder.threshold_unselected_boxes !== undefined
          ? Number(reminder.threshold_unselected_boxes)
          : null;

      payload.reminder_settings = {
        enabled: Boolean(reminder.enabled),
        frequency_days: frequency,
        channel: reminder.channel ?? 'in_app',
        threshold_unselected_boxes:
          threshold !== null && !Number.isNaN(threshold) ? threshold : null,
      };
    } else {
      payload.reminder_settings = undefined;
    }

    if (payload.code) {
      payload.code = payload.code.trim();
    }

    if (!payload.code || !payload.name) {
      showToast('Plan name and code are required.', 'error');
      return;
    }

    const normalizedDays = [...selectedDays].sort(
      (a, b) => DAY_SEQUENCE.indexOf(a) - DAY_SEQUENCE.indexOf(b)
    );

    if (normalizedDays.length === 0) {
      showToast('Select at least one delivery day for this plan.', 'error');
      return;
    }

    const normalizedWeeks = Number(planForm.weeks_in_cycle ?? 0);
    if (normalizedWeeks < 0) {
      showToast('Number of weeks cannot be negative.', 'error');
      return;
    }

    payload.weeks_in_cycle = normalizedWeeks;
    payload.tab = planForm.tab || 'custom';

    const expectedDeliveries = Number(planForm.deliveries_per_cycle ?? 0);
    if (
      expectedDeliveries > 0 &&
      normalizedDays.length !== expectedDeliveries
    ) {
      showToast(
        `This plan expects ${expectedDeliveries} delivery day${
          expectedDeliveries === 1 ? '' : 's'
        }. Adjust the selection before saving.`,
        'error'
      );
      return;
    }

    const menuMapping: Record<string, string[]> = {};
    for (const day of normalizedDays) {
      const rawSelections = dayMenuSelections[day] ?? [];
      const selections = rawSelections
        .map((id) => (id != null ? String(id) : ''))
        .filter((id) => id.length > 0)
        .filter((id) => mealPlanItemIdSet.has(id));
      if (selections.length === 0) {
        showToast(
          `Assign at least one menu item for ${getDayLabel(day)}.`,
          'error'
        );
        return;
      }
      menuMapping[day] = Array.from(new Set(selections));
    }

    payload.available_delivery_days = normalizedDays;
    payload.menu_item_ids_by_day = menuMapping;

    try {
      if (editingPlan?._id) {
        await updateMealPlan(editingPlan._id, payload);
        showToast('Plan updated successfully', 'success');
      } else {
        await createMealPlan(payload);
        showToast('Plan created successfully', 'success');
      }
      setPlanModalOpen(false);
    } catch (err) {
      console.error(err);
      const message =
        (err as any)?.response?.data?.detail ||
        (err as any)?.response?.data?.message ||
        'Failed to save meal plan.';
      showToast(message, 'error');
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!window.confirm('Are you sure you want to delete this meal plan?')) {
      return;
    }
    try {
      await deleteMealPlan(planId);
      showToast('Plan deleted', 'success');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      {(isLoading || isUpdating) && (
        <LoadingScreen
          message={
            isLoading ? 'Loading meal plan data...' : 'Saving changes...'
          }
        />
      )}
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text">
                Meal Subscription Plans
              </h1>
              <p className="text-gray-600 mt-2">
                Create and manage weekly, fortnightly, monthly, and regular meal
                plans.
              </p>
            </div>
          </div>

          {/* Meal Plans Section */}
          <Card className="p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-text">
                  Active Plans
                </h2>
                <p className="text-sm text-gray-500">
                  Create and manage weekly, fortnightly, monthly, and regular
                  deals displayed to customers.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() => handleOpenPlanModal()}
                className="w-full sm:w-auto"
              >
                Add Meal Plan
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Tab
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Included Meals
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Weeks
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Highlight
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Active
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedPlans.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-6 text-center text-gray-500 italic"
                      >
                        No meal plans configured yet.
                      </td>
                    </tr>
                  )}
                  {sortedPlans.map((plan) => (
                    <tr key={plan._id}>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-text">
                          {plan.name}
                        </div>
                        <div className="text-xs text-gray-500">{plan.code}</div>
                        {(plan.available_delivery_days?.length ?? 0) > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            Delivery days:{' '}
                            {plan.available_delivery_days
                              ?.map((day) => {
                                const label = getDayLabel(day);
                                const count =
                                  plan.menu_item_ids_by_day?.[day]?.length ??
                                  plan.menu_items_by_day?.[day]?.length ??
                                  0;
                                return count > 0
                                  ? `${label} (${count})`
                                  : label;
                              })
                              .join(', ')}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {PLAN_TAB_CONFIGS[plan.tab]?.label ?? plan.tab}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {plan.included_meals ?? 0}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {plan.weeks_in_cycle && plan.weeks_in_cycle > 0
                          ? plan.weeks_in_cycle
                          : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatCurrency(plan.price_per_plan)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {plan.highlight ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                            Highlighted
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {plan.is_active ? (
                          <span className="text-emerald-600 font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="text-gray-400">Hidden</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenPlanModal(plan)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePlan(plan._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ? FIX: Only render Pagination when mealPlanPagination is not null */}
            {mealPlanPagination && mealPlanPagination.total > 0 && (
              <Pagination
                currentPage={mealPlanPagination.page || 1}
                totalItems={mealPlanPagination.total}
                pageSize={mealPlanPagination.pageSize || MEAL_PLANS_PAGE_SIZE}
                onPageChange={setPlansPage}
                showSummary
                className="mt-4"
              />
            )}
          </Card>

          {/* Plan Modal */}
          <Modal
            isOpen={planModalOpen}
            onClose={() => setPlanModalOpen(false)}
            title={editingPlan ? 'Edit Meal Plan' : 'Create Meal Plan'}
            size="xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col text-sm font-medium text-gray-700">
                Plan Tab & Template
                <select
                  className="mt-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={planForm.tab ?? 'regular'}
                  onChange={(e) =>
                    handlePlanTabChange(
                      e.target.value as MealSubscriptionPlan['tab']
                    )
                  }
                >
                  {PLAN_TAB_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-gray-500 mt-1">
                  {PLAN_TAB_CONFIGS[planForm.tab ?? 'regular']?.helper ??
                    'Choose how this plan behaves for customers.'}
                </span>
              </label>
              <Input
                label="Plan Name"
                value={planForm.name ?? ''}
                onChange={(e) => handlePlanFormChange('name', e.target.value)}
                required
              />
              <Input
                label="Plan Code"
                value={planForm.code ?? ''}
                onChange={(e) => handlePlanFormChange('code', e.target.value)}
                helperText="Slug used by the system (e.g., weekly_10)"
                required
              />
              <Input
                label="Display Badge"
                value={planForm.display_badge ?? ''}
                onChange={(e) =>
                  handlePlanFormChange('display_badge', e.target.value)
                }
                placeholder="e.g., Best Value"
              />
              <Input
                label="Included Meals"
                type="number"
                min={0}
                value={planForm.included_meals ?? 0}
                onChange={(e) =>
                  handlePlanFormChange('included_meals', Number(e.target.value))
                }
              />
              <Input
                label="Deliveries per Cycle"
                type="number"
                min={0}
                value={planForm.deliveries_per_cycle ?? 0}
                onChange={(e) =>
                  handlePlanFormChange(
                    'deliveries_per_cycle',
                    Number(e.target.value)
                  )
                }
              />
              <Input
                label="Number of Weeks"
                type="number"
                min={0}
                value={planForm.weeks_in_cycle ?? 0}
                onChange={(e) =>
                  handlePlanFormChange('weeks_in_cycle', Number(e.target.value))
                }
              />
              <Input
                label="Boxes per Delivery"
                type="number"
                min={0}
                value={planForm.boxes_per_delivery ?? 0}
                onChange={(e) =>
                  handlePlanFormChange(
                    'boxes_per_delivery',
                    Number(e.target.value)
                  )
                }
              />
              <Input
                label="Max Boxes per Meal"
                type="number"
                min={0}
                value={planForm.max_boxes_per_meal ?? 0}
                onChange={(e) =>
                  handlePlanFormChange(
                    'max_boxes_per_meal',
                    Number(e.target.value)
                  )
                }
              />
              <Input
                label="Plan Price"
                type="number"
                min={0}
                step="0.01"
                value={planForm.price_per_plan ?? 0}
                onChange={(e) =>
                  handlePlanFormChange('price_per_plan', Number(e.target.value))
                }
              />
              <Input
                label="Price per Meal"
                type="number"
                min={0}
                step="0.01"
                value={planForm.price_per_box ?? 0}
                onChange={(e) =>
                  handlePlanFormChange('price_per_box', Number(e.target.value))
                }
              />
              <Input
                label="Min Boxes (Delivery)"
                type="number"
                min={0}
                value={planForm.min_boxes_delivery ?? 0}
                onChange={(e) =>
                  handlePlanFormChange(
                    'min_boxes_delivery',
                    Number(e.target.value)
                  )
                }
              />
              <Input
                label="Min Boxes (Pickup)"
                type="number"
                min={0}
                value={planForm.min_boxes_pickup ?? 0}
                onChange={(e) =>
                  handlePlanFormChange(
                    'min_boxes_pickup',
                    Number(e.target.value)
                  )
                }
              />
              <Input
                label="Display Order"
                type="number"
                value={planForm.display_order ?? 0}
                onChange={(e) =>
                  handlePlanFormChange('display_order', Number(e.target.value))
                }
              />
              <div className="md:col-span-2 border-t border-gray-200 pt-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Terms & Conditions
                    <textarea
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={planTermsDraft}
                      placeholder="Add one term per line"
                      onChange={(e) => handleTermsDraftChange(e.target.value)}
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      These terms are shown to customers before they accept the
                      plan.
                    </span>
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={planForm.require_terms_ack ?? false}
                        onChange={(e) =>
                          handlePlanFormChange(
                            'require_terms_ack',
                            e.target.checked
                          )
                        }
                      />
                      <span>Require customers to accept the terms</span>
                    </label>
                    {planForm.require_terms_ack ? (
                      <Input
                        label="Acknowledgement Label"
                        value={planForm.acknowledgement_label ?? ''}
                        onChange={(e) =>
                          handlePlanFormChange(
                            'acknowledgement_label',
                            e.target.value
                          )
                        }
                        placeholder="e.g., I agree to the Weekly 10-Meal Plan terms."
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 border-t border-gray-200 pt-4 mt-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h3 className="font-semibold text-text text-sm">
                    Week selection rules
                  </h3>
                  <p className="text-xs text-gray-500">
                    Control how many delivery weeks a customer can pick for this
                    plan.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    label="Weeks available"
                    type="number"
                    min={1}
                    value={planForm.week_selection_rules?.available_weeks ?? ''}
                    onChange={(e) =>
                      handleWeekRuleChange(
                        'available_weeks',
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                  <Input
                    label="Weeks required"
                    type="number"
                    min={1}
                    value={planForm.week_selection_rules?.required_weeks ?? ''}
                    onChange={(e) =>
                      handleWeekRuleChange(
                        'required_weeks',
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                  <Input
                    label="Deliveries per selected week"
                    type="number"
                    min={1}
                    value={
                      planForm.week_selection_rules?.deliveries_per_week ?? ''
                    }
                    onChange={(e) =>
                      handleWeekRuleChange(
                        'deliveries_per_week',
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                  <label className="flex items-center space-x-2 mt-6 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={
                        planForm.week_selection_rules?.allow_partial_weeks ??
                        false
                      }
                      onChange={(e) =>
                        handleWeekRuleChange(
                          'allow_partial_weeks',
                          e.target.checked
                        )
                      }
                    />
                    <span>Allow partial weeks</span>
                  </label>
                </div>
              </div>
              <div className="md:col-span-2 border-t border-gray-200 pt-4 mt-2">
                <h3 className="font-semibold text-text text-sm mb-3">
                  Customer notices
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Upsell or helper message
                    <textarea
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={
                        planForm.customer_notifications?.upsell_message ?? ''
                      }
                      onChange={(e) =>
                        handleNotificationChange(
                          'upsell_message',
                          e.target.value
                        )
                      }
                      placeholder="Shown on the Regular tab to nudge customers towards the 10-meal deal."
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Reminder message
                    <textarea
                      className="mt-1 rounded-lg border border-gray-300 px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={
                        planForm.customer_notifications?.reminder_message ?? ''
                      }
                      onChange={(e) =>
                        handleNotificationChange(
                          'reminder_message',
                          e.target.value
                        )
                      }
                      placeholder="Displayed on customer pages to remind them about remaining selections."
                    />
                  </label>
                </div>
              </div>
              <div className="md:col-span-2 border-t border-gray-200 pt-4 mt-2">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-text text-sm">
                      Delivery days & curated menus
                    </h3>
                    <p className="text-xs text-gray-500">
                      Select which weekdays this plan runs and assign the dishes
                      customers can choose from on each day.
                    </p>
                  </div>
                  {planForm.deliveries_per_cycle ? (
                    <div className="text-xs text-gray-500">
                      Expected deliveries per cycle:{' '}
                      <span className="font-semibold text-text">
                        {planForm.deliveries_per_cycle}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-text mb-2">
                    Menu item source
                  </label>
                  <div className="rounded-lg border border-primary bg-primary/5 px-4 py-3 text-sm text-primary">
                    <p className="font-semibold">Meal Plan items</p>
                    <p className="text-xs text-primary/80">
                      Only dishes flagged as available for Meal Plans can be
                      assigned to each delivery day.
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {WEEK_DAYS.map((day) => {
                    const isChecked = selectedDays.includes(day.value);
                    return (
                      <label
                        key={day.value}
                        className={`flex items-center space-x-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          isChecked
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 text-gray-600 hover:border-primary/60'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={isChecked}
                          onChange={() => toggleDaySelection(day.value)}
                        />
                        <span>{day.label}</span>
                      </label>
                    );
                  })}
                </div>

                {selectedDays.length === 0 && (
                  <p className="text-xs text-amber-600 mt-3">
                    Select at least one delivery day to configure the menu.
                  </p>
                )}

                {selectedDays.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {selectedDays.map((day) => (
                      <div
                        key={day}
                        className="rounded-lg border border-gray-200 p-3 bg-white/60"
                      >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <div className="font-medium text-sm text-text">
                            {getDayLabel(day)}
                          </div>
                          <div className="text-xs text-gray-500 sm:text-right">
                            {dayMenuSelections[day]?.length ?? 0} item
                            {(dayMenuSelections[day]?.length ?? 0) === 1
                              ? ''
                              : 's'}{' '}
                            selected
                          </div>
                        </div>
                        {sortedMenuItems.length > 0 ? (
                          <select
                            multiple
                            size={multiSelectSize}
                            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={dayMenuSelections[day] ?? []}
                            onChange={(e) =>
                              handleDayMenuSelectChange(
                                day,
                                Array.from(e.target.selectedOptions).map(
                                  (option) => option.value
                                )
                              )
                            }
                          >
                            {sortedMenuItems.map((item) => {
                              const optionRawId = item._id ?? item.id;
                              if (!optionRawId) {
                                return null;
                              }
                              const optionValue = String(optionRawId);
                              return (
                                <option
                                  key={`${day}-${optionValue}`}
                                  value={optionValue}
                                  onMouseDown={(event) =>
                                    handleMenuOptionMouseDown(
                                      event,
                                      day,
                                      optionValue
                                    )
                                  }
                                >
                                  {item.name}
                                  {item.category ? ` - ${item.category}` : ''}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <div className="mt-2 text-xs text-amber-600">
                            No menu items currently marked for Meal Plans. Update
                            dishes in Menu Management to enable their Meal Plan
                            availability.
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          Click items to toggle them, or hold Ctrl/Command for
                          advanced selection.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  checked={planForm.allow_multiple ?? true}
                  onChange={(e) =>
                    handlePlanFormChange('allow_multiple', e.target.checked)
                  }
                />
                <span className="text-sm text-gray-700">
                  Allow customers to choose multiple plans
                </span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  checked={planForm.highlight ?? false}
                  onChange={(e) =>
                    handlePlanFormChange('highlight', e.target.checked)
                  }
                />
                <span className="text-sm text-gray-700">
                  Highlight this plan
                </span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  checked={planForm.is_active ?? true}
                  onChange={(e) =>
                    handlePlanFormChange('is_active', e.target.checked)
                  }
                />
                <span className="text-sm text-gray-700">Plan is active</span>
              </label>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setPlanModalOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitPlan}
                className="w-full sm:w-auto"
              >
                {editingPlan ? 'Save Changes' : 'Create Plan'}
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
);
};

export default MealPlanManagement;
```
</details>

---

### ⚛️ MenuManagement.tsx
**Path:** `src\pages\admin\MenuManagement.tsx`

<details>
<summary>View Code (486 lines)</summary>

```tsx
﻿import React, { useCallback, useEffect, useState } from 'react';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import { MenuItemsList } from '@components/admin/menu/MenuItemsList';
import { AddMenuItem } from '@components/admin/menu/AddMenuItem';
import { EditMenuItem } from '@components/admin/menu/EditMenuItem';
import LoadingScreen from '@components/common/LoadingScreen';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Modal from '@components/common/Modal';
import Pagination from '@components/common/Pagination';
import { useDebounce } from '@hooks/useDebounce';
import {
  Plus,
  Search,
  Filter,
  RefreshCcw,
  Eye,
  EyeOff,
  Info,
} from 'lucide-react';
import { MenuItem } from '@models/menu.types';
import AdminSidebar from '@components/admin/AdminSidebar';

const MENU_ITEMS_PER_PAGE = 9;

const MenuManagement: React.FC = () => {
  const { showToast } = useToast();
  const {
    managedMenuItems,
    managedCategories,
    menuItemPagination,
    menuItemStats,
    fetchManagedMenuItems,
    fetchManagedCategories,
    deleteMenuItem,
    isLoading,
    error,
    clearError,
  } = useAdminStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUnavailable, setShowUnavailable] = useState(true); // âœ… DEFAULT: Show ALL items including unavailable
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    if (!error) return;
    const normalizedMessage =
      error === 'Invalid input data'
        ? 'Failed to load menu data from the server. Please refresh to try again.'
        : error;
    showToast(normalizedMessage, 'error');
    clearError();
  }, [error, clearError, showToast]);

  const handleMenuError = useCallback(
    (err: unknown) => {
      console.error('❌ Failed to load menu data:', err);
      showToast('Failed to load menu data', 'error');
    },
    [showToast]
  );

  const loadMenuItems = useCallback(
    (pageValue: number) => {
      const safePage = Math.max(1, pageValue);
      return fetchManagedMenuItems({
        page: safePage,
        pageSize: MENU_ITEMS_PER_PAGE,
        category: selectedCategory || undefined,
        includeUnavailable: showUnavailable,
        search: debouncedSearch || undefined,
      });
    },
    [debouncedSearch, fetchManagedMenuItems, selectedCategory, showUnavailable]
  );

  const loadData = useCallback(
    async (pageOverride?: number, reloadCategories: boolean = false) => {
      const targetPage = Math.max(1, pageOverride ?? currentPage);
      try {
        console.log('🔄 Loading menu management data...');
        const tasks: Promise<unknown>[] = [loadMenuItems(targetPage)];
        if (reloadCategories) {
          tasks.push(fetchManagedCategories());
        }
        await Promise.all(tasks);
        console.log('✅ Menu management data loaded');
      } catch (err) {
        handleMenuError(err);
        throw err;
      }
    },
    [currentPage, fetchManagedCategories, handleMenuError, loadMenuItems]
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadData(currentPage, true);
      showToast('Menu items refreshed', 'success');
    } catch {
      // Error already handled in loadData
    } finally {
      setRefreshing(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const initCategories = async () => {
      try {
        await fetchManagedCategories();
      } catch (err) {
        handleMenuError(err);
      }
    };

    initCategories();
  }, [fetchManagedCategories, handleMenuError]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        await loadMenuItems(currentPage);
      } catch (err) {
        handleMenuError(err);
      }
    };

    fetchPage();
  }, [currentPage, handleMenuError, loadMenuItems]);

  useEffect(() => {
    if (!menuItemPagination?.total_pages) return;
    if (currentPage > menuItemPagination.total_pages) {
      setCurrentPage(menuItemPagination.total_pages);
    }
  }, [currentPage, menuItemPagination]);

  const handleDelete = async (itemId: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this menu item? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      await deleteMenuItem(itemId);
      showToast('Menu item deleted successfully', 'success');
      try {
        await loadData(currentPage);
      } catch {
        // handled in loadData
      }
    } catch (error) {
      showToast('Failed to delete menu item', 'error');
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
  };

  const handleCloseEdit = async () => {
    setEditingItem(null);
    try {
      await loadData(currentPage);
    } catch {
      // handled in loadData
    }
  };

  const handleCloseAdd = async () => {
    setShowAddModal(false);
    setCurrentPage(1);
    try {
      await loadData(1, true);
    } catch {
      // handled in loadData
    }
  };

  const totalItems =
    menuItemStats?.total ??
    menuItemPagination?.total ??
    managedMenuItems.length;
  const availableItems =
    menuItemStats?.available ??
    managedMenuItems.filter((item) => item.is_available).length;
  const unavailableItems =
    menuItemStats?.unavailable ?? Math.max(totalItems - availableItems, 0);
  const filteredCount = menuItemPagination?.total ?? managedMenuItems.length;
  const overallCount = menuItemStats?.total ?? filteredCount;

  console.log('📊 Menu Management Stats:', {
    total: totalItems,
    available: availableItems,
    unavailable: unavailableItems,
    filtersTotal: menuItemPagination?.total ?? managedMenuItems.length,
    showingUnavailable: showUnavailable,
  });

  if (isLoading && managedMenuItems.length === 0) {
    return <LoadingScreen message="Loading menu items..." />;
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="w-full sm:w-auto">
              <h1 className="font-heading text-4xl font-bold text-text mb-2">
                Menu Management
              </h1>
              <p className="text-gray-600">Manage your restaurant menu items</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-end">
              <Button
                variant="outline"
                size="md"
                onClick={handleRefresh}
                disabled={refreshing}
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <RefreshCcw
                  size={18}
                  className={`mr-2 ${refreshing ? 'animate-spin' : ''}`}
                />
                Refresh
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowAddModal(true)}
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <Plus size={20} className="mr-2" />
                Add Menu Item
              </Button>
            </div>
          </div>

          {/* âœ… Stats Cards - Shows counts of ALL items */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card padding="lg">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  {totalItems}
                </h3>
                <p className="text-sm text-gray-600">Total Items</p>
              </div>
            </Card>

            <Card padding="lg">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-600 mb-2">
                  {availableItems}
                </h3>
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </Card>

            <Card padding="lg">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-orange-600 mb-2">
                  {unavailableItems}
                </h3>
                <p className="text-sm text-gray-600">Unavailable</p>
              </div>
            </Card>

            <Card padding="lg">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-600 mb-2">
                  {managedCategories.length}
                </h3>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card padding="lg" className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="w-full md:w-64">
                <div className="relative">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                  >
                    <option value="">All Categories</option>
                    {managedCategories.map((cat) => (
                      <option key={cat._id || cat.name} value={cat.name}>
                        {cat.display_name || cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* âœ… FIXED: Availability Toggle - Default shows all */}
              <div className="w-full md:w-auto">
                <button
                  onClick={() => {
                    setShowUnavailable((prev) => !prev);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center justify-center space-x-2 px-4 py-3 border-2 rounded-lg transition-all w-full ${
                    showUnavailable
                      ? 'border-primary bg-primary text-white'
                      : 'border-orange-500 bg-orange-500 text-white'
                  }`}
                >
                  {showUnavailable ? (
                    <>
                      <Eye size={20} />
                      <span>Showing All</span>
                    </>
                  ) : (
                    <>
                      <EyeOff size={20} />
                      <span>Available Only</span>
                    </>
                  )}
                </button>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory || !showUnavailable) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setShowUnavailable(true);
                    setCurrentPage(1);
                  }}
                  className="w-full md:w-auto"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Active Filters Display */}
            {(searchQuery || selectedCategory || !showUnavailable) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchQuery && (
                  <span className="inline-block px-3 py-1 bg-primary-50 text-primary rounded-full text-sm">
                    Search: {searchQuery}
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-block px-3 py-1 bg-primary-50 text-primary rounded-full text-sm">
                    Category: {selectedCategory}
                  </span>
                )}
                {!showUnavailable && (
                  <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
                    Available Only
                  </span>
                )}
                <span className="text-sm text-gray-600 ml-2">
                  ({filteredCount} of {overallCount} items)
                </span>
              </div>
            )}

            {/* âœ… IMPROVED: Info Message for Admin */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800 flex items-start space-x-2">
                <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Admin View:</strong> You can see and manage ALL menu
                  items regardless of their availability status. Items marked as{' '}
                  <span className="font-semibold">unavailable</span> will not be
                  shown to customers but remain visible here for management. Use
                  the toggle above to filter your view.
                </span>
              </p>
            </div>
          </Card>

          {/* Menu Items List */}
          <MenuItemsList
            items={managedMenuItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />

          {menuItemPagination && menuItemPagination.total > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalItems={menuItemPagination.total}
                pageSize={menuItemPagination.page_size}
                onPageChange={handlePageChange}
                showSummary
              />
            </div>
          )}

          {/* Add Modal */}
          <Modal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            title="Add New Menu Item"
            size="lg"
          >
            <AddMenuItem
              onSuccess={handleCloseAdd}
              onCancel={() => setShowAddModal(false)}
            />
          </Modal>

          {/* Edit Modal */}
          <Modal
            isOpen={!!editingItem}
            onClose={() => setEditingItem(null)}
            title="Edit Menu Item"
            size="lg"
          >
            {editingItem && (
              <EditMenuItem
                item={editingItem}
                onSuccess={handleCloseEdit}
                onCancel={() => setEditingItem(null)}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;

```
</details>

---

### ⚛️ OrderManagement.tsx
**Path:** `src\pages\admin\OrderManagement.tsx`

<details>
<summary>View Code (548 lines)</summary>

```tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import { OrdersList } from '@components/admin/orders/OrdersList';
import { OrderDetails } from '@components/admin/orders/OrderDetails';
import LoadingScreen from '@components/common/LoadingScreen';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Modal from '@components/common/Modal';
import Pagination from '@components/common/Pagination';
import { Filter, RefreshCcw, Download } from 'lucide-react';
import { Order } from '@models/order.types';
import AdminSidebar from '@components/admin/AdminSidebar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ✅ UPDATED: Changed from 20 to 8 orders per page
const ORDERS_PER_PAGE = 8;

const OrderManagement: React.FC = () => {
  const { showToast } = useToast();
  const {
    allOrders,
    orderPagination,
    fetchAllOrders,
    updateOrderStatus,
    isLoading,
    isUpdating,
  } = useAdminStore();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    order_type: '',
  });
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  // Load orders when page or filters change
  useEffect(() => {
    loadOrders();
  }, [currentPage, filters]);

  // ✅ FIXED: Add null check for orderPagination
  useEffect(() => {
    if (!orderPagination) return;

    if (
      orderPagination.total_pages > 0 &&
      currentPage > orderPagination.total_pages
    ) {
      setCurrentPage(orderPagination.total_pages);
    }
  }, [orderPagination?.total_pages, currentPage]);

  const loadOrders = async () => {
    try {
      const params: {
        status?: string;
        order_type?: string;
        date_from?: string;
        date_to?: string;
        page: number;
        page_size: number;
      } = {
        page: currentPage,
        page_size: ORDERS_PER_PAGE,
      };

      if (filters.status) {
        params.status = filters.status;
      }
      if (filters.order_type) {
        params.order_type = filters.order_type;
      }
      if (filters.date) {
        params.date_from = filters.date;
        params.date_to = filters.date;
      }

      await fetchAllOrders(params);
    } catch (error: any) {
      console.error('Failed to load orders:', error);
      showToast(
        error.response?.data?.message || 'Failed to load orders',
        'error'
      );
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
    showToast('Orders refreshed', 'success');
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    loadOrders();
  };

  const handleClearFilters = () => {
    setFilters({ status: '', date: '', order_type: '' });
    setCurrentPage(1);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      showToast(`Order status updated to ${newStatus}`, 'success');
      loadOrders();
    } catch (error: any) {
      showToast(
        error.response?.data?.message || 'Failed to update order status',
        'error'
      );
    }
  };

  const formatCurrency = (value?: number) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(Number(value ?? 0));

  const formatStatus = (status?: string) => {
    if (!status) return 'N/A';
    return status
      .split('_')
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(' ');
  };

  const formatOrderType = (type?: string) => {
    if (type === 'meal_subscription') {
      return 'Meals Subscription';
    }
    return 'Daily Menu';
  };

  const formatDateTime = (value?: string) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString();
  };

  const getOrderIdentifier = (order: Order) =>
    order.order_number || order._id?.slice(-6).toUpperCase() || '—';

  const loadLogoAsset = useCallback(async () => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const response = await fetch('/logo.svg');
      if (!response.ok) {
        return null;
      }
      const svgText = await response.text();
      const encodedSvg = window
        .btoa(
          encodeURIComponent(svgText).replace(/%([0-9A-F]{2})/g, (_match, p1) =>
            String.fromCharCode(Number.parseInt(p1, 16))
          )
        );
      const imageSrc = `data:image/svg+xml;base64,${encodedSvg}`;

      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imageSrc;
      });

      const targetWidth = 200;
      const aspectRatio =
        image.naturalWidth && image.naturalHeight
          ? image.naturalHeight / image.naturalWidth
          : 0.35;
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = Math.max(50, targetWidth * aspectRatio || 60);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return null;
      }
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      return {
        dataUrl: canvas.toDataURL('image/png'),
        width: canvas.width,
        height: canvas.height,
      };
    } catch (error) {
      console.warn('Failed to load logo for export', error);
      return null;
    }
  }, []);

  const handleExportOrders = async () => {
    if (!allOrders.length) {
      showToast('There are no orders to export right now.', 'info');
      return;
    }

    setIsExporting(true);
    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      let startY = 40;

      const logoAsset = await loadLogoAsset();
      if (logoAsset) {
        const displayWidth = Math.min(logoAsset.width, 180);
        const displayHeight =
          (logoAsset.height / logoAsset.width) * displayWidth || 60;
        const xPosition = (pageWidth - displayWidth) / 2;
        doc.addImage(
          logoAsset.dataUrl,
          'PNG',
          xPosition,
          startY,
          displayWidth,
          displayHeight
        );
        startY += displayHeight + 25;
      } else {
        doc.setFontSize(24);
        doc.setTextColor(244, 114, 37);
        doc.setFont('helvetica', 'bold');
        doc.text("Bakar's Food & Catering", pageWidth / 2, startY + 20, {
          align: 'center',
        });
        startY += 40;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(33, 37, 41);
      doc.text('Orders Export', pageWidth / 2, startY, { align: 'center' });
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(90);
      doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        pageWidth / 2,
        startY + 18,
        {
          align: 'center',
        }
      );
      startY += 40;

      const tableRows = allOrders.map((order, index) => {
        const totalValue = Number(order.total ?? order.subtotal ?? 0);
        return [
          (index + 1).toString(),
          getOrderIdentifier(order),
          order.user_name || order.user_email || 'Guest',
          formatOrderType(order.order_type),
          formatStatus(order.status),
          formatCurrency(totalValue),
          formatDateTime(order.created_at),
        ];
      });

      autoTable(doc, {
        startY,
        head: [['#', 'Order #', 'Customer', 'Type', 'Status', 'Total', 'Placed']],
        body: tableRows,
        styles: {
          fontSize: 10,
          cellPadding: 6,
          textColor: [55, 65, 81],
        },
        headStyles: {
          fillColor: [244, 114, 37],
          textColor: [255, 255, 255],
          fontSize: 11,
        },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        columnStyles: {
          0: { halign: 'center', cellWidth: 30 },
          5: { halign: 'right', cellWidth: 80 },
          6: { cellWidth: 120 },
        },
      });

      const tableContext = doc as jsPDF & {
        lastAutoTable?: { finalY?: number };
      };
      const finalY = (tableContext.lastAutoTable?.finalY ?? startY) + 28;
      const totalRevenue = allOrders.reduce(
        (sum, order) => sum + Number(order.total ?? order.subtotal ?? 0),
        0
      );

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(33, 37, 41);
      doc.text(`Total Orders: ${allOrders.length}`, 40, finalY);
      doc.text(`Total Revenue: ${formatCurrency(totalRevenue)}`, 40, finalY + 18);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("Generated by Bakar's Admin Dashboard", 40, finalY + 36);

      const filename = `bakars-orders-${new Date()
        .toISOString()
        .split('T')[0]}.pdf`;
      doc.save(filename);
      showToast('Orders exported successfully.', 'success');
    } catch (error) {
      console.error('Failed to export orders', error);
      showToast('Failed to export orders. Please try again.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && allOrders.length === 0) {
    return <LoadingScreen message="Loading orders..." />;
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="w-full sm:w-auto">
              <h1 className="font-heading text-4xl font-bold text-text mb-2">
                Order Management
              </h1>
              <p className="text-gray-600">
                Manage and track all customer orders ({ORDERS_PER_PAGE} per
                page)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-end">
              <Button
                variant="outline"
                size="md"
                onClick={handleExportOrders}
                isLoading={isExporting}
                disabled={isExporting || allOrders.length === 0 || isLoading}
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <Download size={18} className="mr-2" />
                {isExporting ? 'Preparing...' : 'Export'}
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={handleRefresh}
                disabled={refreshing}
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <RefreshCcw
                  size={18}
                  className={`mr-2 ${refreshing ? 'animate-spin' : ''}`}
                />
                Refresh
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card padding="lg" className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Filter size={20} className="text-primary" />
              <h3 className="font-semibold text-text">Filters</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Order Type Filter */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Order Type
                </label>
                <select
                  value={filters.order_type}
                  onChange={(e) =>
                    handleFilterChange('order_type', e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="daily_menu">Daily Menu</option>
                  <option value="meal_subscription">Meals Subscription</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-2">
                <Button
                  variant="primary"
                  onClick={handleApplyFilters}
                  className="w-full sm:flex-1"
                >
                  Apply
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleClearFilters}
                  className="w-full sm:w-auto"
                >
                  Clear
                </Button>
              </div>
            </div>
          </Card>

          {/* Orders List */}
          <OrdersList
            orders={allOrders}
            onViewOrder={handleViewOrder}
            onStatusUpdate={handleStatusUpdate}
            isLoading={isLoading}
            isUpdating={isUpdating}
          />

          {/* ✅ FIXED: Only render Pagination when orderPagination is not null */}
          {orderPagination && orderPagination.total > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalItems={orderPagination.total}
                pageSize={ORDERS_PER_PAGE}
                onPageChange={handlePageChange}
                showSummary
              />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && allOrders.length === 0 && (
            <Card padding="xl" className="text-center">
              <div className="py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-500">
                  {Object.values(filters).some((f) => f)
                    ? 'Try adjusting your filters to see more results.'
                    : 'Orders will appear here once customers start placing them.'}
                </p>
              </div>
            </Card>
          )}

          {/* Order Details Modal */}
          <Modal
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            title="Order Details"
            size="xl"
          >
            {selectedOrder && (
              <OrderDetails
                order={selectedOrder}
                onStatusUpdate={handleStatusUpdate}
                onClose={() => setShowDetailsModal(false)}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
```
</details>

---

### ⚛️ CartPage.tsx
**Path:** `src\pages\customer\CartPage.tsx`

<details>
<summary>View Code (631 lines)</summary>

```tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@hooks/useCart';
import { useAuthStore } from '@store/authStore';
import { formatCurrency } from '@utils/formatters';
import { getImageUrl, handleImageError } from '@utils/images';
import { menuAPI } from '@api/endpoints/menu';
import { MenuItem } from '@models/menu.types';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  ArrowLeft,
  Tag,
  Truck,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import LoadingScreen from '@components/common/LoadingScreen';
import { useToast } from '@components/common/Toast';

const areSetsEqual = (a: Set<string>, b: Set<string>) => {
  if (a.size !== b.size) {
    return false;
  }

  for (const value of a) {
    if (!b.has(value)) {
      return false;
    }
  }

  return true;
};

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { showToast } = useToast();
  const {
    items,
    summary,
    isLoading,
    isUpdating,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    addToCart,
  } = useCart();

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [addOnItems, setAddOnItems] = useState<MenuItem[]>([]);
  const [addOnsLoading, setAddOnsLoading] = useState(false);
  const [addOnsError, setAddOnsError] = useState<string | null>(null);
  const [itemImageMap, setItemImageMap] = useState<Record<string, string>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    refreshCart();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchAddOns = async () => {
      setAddOnsLoading(true);
      setAddOnsError(null);
      try {
        const response = await menuAPI.getDailyMenu({ category: 'add_ons' });
        const payload = response.data?.data ?? response.data;
        let addons: MenuItem[] = [];
        if (Array.isArray(payload)) {
          addons = payload;
        } else if (payload?.items && Array.isArray(payload.items)) {
          addons = payload.items;
        }
        setAddOnItems(addons);
      } catch (error: any) {
        console.error('Failed to load add-ons', error);
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'Failed to load add-ons';
        setAddOnsError(message);
      } finally {
        setAddOnsLoading(false);
      }
    };

    fetchAddOns();
  }, []);

  const hasValidImageSource = (value?: string | null): boolean => {
    if (!value) return false;
    const trimmed = value.trim();
    return trimmed !== '' && trimmed !== 'null' && trimmed !== 'undefined';
  };

  useEffect(() => {
    const missingImageItemIds = items
      .filter(
        (item: any) =>
          !hasValidImageSource(item.image_url) && !itemImageMap[item.item_id]
      )
      .map((item: any) => item.item_id);

    if (missingImageItemIds.length === 0) {
      return;
    }

    let isActive = true;

    const fetchMissingImages = async () => {
      try {
        await Promise.all(
          missingImageItemIds.map(async (itemId: string) => {
            try {
              const response = await menuAPI.getMenuItemById(itemId);
              const menuItem = response.data?.data ?? response.data;
              const imageUrl = menuItem?.image_url;

              if (imageUrl && isActive) {
                setItemImageMap((prev) => ({
                  ...prev,
                  [itemId]: imageUrl,
                }));
                setImageErrors((prev) => {
                  if (!prev[itemId]) return prev;
                  const { [itemId]: _, ...rest } = prev;
                  return rest;
                });
              }
            } catch (error) {
              console.error(
                `Failed to fetch image for cart item ${itemId}`,
                error
              );
            }
          })
        );
      } catch (error) {
        console.error('Failed to backfill cart item images', error);
      }
    };

    fetchMissingImages();

    return () => {
      isActive = false;
    };
  }, [items, itemImageMap]);

  useEffect(() => {
    const currentItemIds = new Set(items.map((item: any) => item.item_id));

    setSelectedItems((prevSelected) => {
      if (selectAll) {
        return areSetsEqual(prevSelected, currentItemIds)
          ? prevSelected
          : currentItemIds;
      }

      const filtered = new Set<string>();
      prevSelected.forEach((id) => {
        if (currentItemIds.has(id)) {
          filtered.add(id);
        }
      });

      return areSetsEqual(prevSelected, filtered) ? prevSelected : filtered;
    });

    if (selectAll && currentItemIds.size === 0) {
      setSelectAll(false);
    }
  }, [items, selectAll]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
      setSelectAll(false);
    } else {
      const allItemIds = new Set([
        ...items.map((item: any) => item.item_id),
      ]);
      setSelectedItems(allItemIds);
      setSelectAll(true);
    }
  };

  const handleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);

    // Update selectAll state
    const totalItems = items.length;
    setSelectAll(newSelected.size === totalItems && totalItems > 0);
  };

  const handleImageLoadError =
    (key: string) =>
    (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
      setImageErrors((prev) => ({ ...prev, [key]: true }));
      handleImageError(event);
    };

  const handleDeleteSelected = async () => {
    if (selectedItems.size === 0) {
      showToast('Please select items to delete', 'warning');
      return;
    }

    if (!window.confirm(`Delete ${selectedItems.size} selected item(s)?`)) {
      return;
    }

    for (const itemId of selectedItems) {
      await removeFromCart(itemId);
    }

    setSelectedItems(new Set());
    setSelectAll(false);
    showToast('Selected items removed', 'success');
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      if (window.confirm('Remove this item from cart?')) {
        await removeFromCart(itemId);
      }
    } else {
      await updateCartQuantity(itemId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }
    navigate('/checkout');
  };

  if (isLoading) {
    return <LoadingScreen message="Loading cart..." />;
  }

  const isCartEmpty = items.length === 0;

  if (isCartEmpty) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container-custom">
          <Card padding="lg" className="max-w-2xl mx-auto text-center">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
            <h2 className="font-heading text-3xl font-bold text-text mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/menu/daily')}
            >
              Start Shopping
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-primary hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-heading text-4xl font-bold text-text">
            Shopping Cart
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <Card padding="lg">
              {/* Select All & Delete Selected */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-600">
                      SELECT ALL ({items.length} ITEM(S))
                    </span>
                  </label>
                </div>

                {selectedItems.size > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                    <span>DELETE</span>
                  </button>
                )}
              </div>

              {/* Main Items */}
              <div className="space-y-4">
                {items.map((item: any) => {
                  const imageKey = `cart-${item.item_id}`;
                  const rawImageSource = hasValidImageSource(item.image_url)
                    ? item.image_url
                    : itemImageMap[item.item_id];
                  const imageUrl = getImageUrl(rawImageSource);
                  const hasImage = Boolean(imageUrl) && !imageErrors[imageKey];

                  return (
                    <div
                      key={item.item_id}
                      className="border-b border-gray-100 pb-4 last:border-0"
                    >
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.item_id)}
                        onChange={() => handleSelectItem(item.item_id)}
                        className="mt-8 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />

                      {/* Item Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        {hasImage ? (
                          <img
                            src={imageUrl}
                            alt={item.item_name}
                            className="w-full h-full object-cover"
                            onError={handleImageLoadError(imageKey)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-text mb-1">
                              {item.item_name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {item.category}
                            </p>

                            {/* Special instructions if any */}
                            {item.special_instructions && (
                              <p className="text-xs text-gray-600 italic mb-2">
                                Note: {item.special_instructions}
                              </p>
                            )}

                            {/* Price */}
                            <div className="flex items-center space-x-3">
                              <span className="font-heading text-xl font-bold text-primary">
                                {formatCurrency(item.price)}
                              </span>
                              {item.original_price &&
                                item.original_price > item.price && (
                                  <span className="text-sm text-gray-400 line-through">
                                    {formatCurrency(item.original_price)}
                                  </span>
                                )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col items-end space-y-2">
                            <button
                              onClick={() => removeFromCart(item.item_id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-2 py-1">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.item_id,
                                    item.quantity - 1
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                                disabled={isUpdating}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-10 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.item_id,
                                    item.quantity + 1
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                                disabled={isUpdating}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  );
                })}

                {/* Sidelines */}
              </div>
            </Card>

            <Card
              padding="lg"
              className="overflow-hidden bg-gradient-to-r from-orange-50 via-rose-50 to-white border-transparent mt-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-orange-500 font-semibold">
                    Pair With
                  </p>
                  <h2 className="font-heading text-2xl font-bold text-text">
                    Chef’s Favorite Add-ons
                  </h2>
                  <p className="text-sm text-gray-600">
                    Quick bites and sides curated to elevate your order.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Freshly made daily
                </div>
              </div>

              {addOnsLoading ? (
                <div className="py-10 text-center text-gray-500 text-sm">
                  Loading add-ons...
                </div>
              ) : addOnsError ? (
                <div className="py-8 text-center text-red-500 text-sm">
                  {addOnsError}
                </div>
              ) : addOnItems.length === 0 ? (
                <div className="py-8 text-center text-gray-500 text-sm">
                  No add-ons are available right now.
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-2 mt-2 custom-scrollbar">
                  {addOnItems.map((addOn) => {
                    const addOnKey = `addon-${addOn._id || addOn.id}`;
                    const imageUrl = getImageUrl(addOn.image_url);
                    const hasImage = Boolean(imageUrl) && !imageErrors[addOnKey];

                    return (
                      <div
                        key={addOn._id || addOn.id}
                        className="min-w-[240px] max-w-[260px] bg-white rounded-2xl shadow-sm border border-orange-100/70 p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                      >
                      <div className="flex items-start gap-3">
                          <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                            {hasImage ? (
                              <img
                                src={imageUrl}
                                alt={addOn.name}
                                className="w-full h-full object-cover"
                                onError={handleImageLoadError(addOnKey)}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500 px-2 text-center">
                                No image
                              </div>
                            )}
                          </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 leading-tight">
                            {addOn.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {addOn.description || 'Perfect pairing for any meal.'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-base font-bold text-primary">
                          {formatCurrency(addOn.price)}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary text-primary hover:bg-primary hover:text-white"
                          onClick={() => addToCart(addOn, 1)}
                          disabled={isUpdating}
                        >
                          Add
                        </Button>
                      </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card padding="lg" className="sticky top-24">
              <h2 className="font-heading text-2xl font-bold text-text mb-6">
                Order Summary
              </h2>

              {/* Summary Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({summary.item_count} items)</span>
                  <span className="font-semibold">
                    {formatCurrency(summary.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping Fee</span>
                  <span className="font-semibold">
                    {summary.delivery_fee > 0
                      ? formatCurrency(summary.delivery_fee)
                      : formatCurrency(0)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-text">Total</span>
                  <span className="font-heading text-3xl font-bold text-primary">
                    {formatCurrency(summary.total)}
                  </span>
                </div>

                {/* Proceed to Checkout */}
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleProceedToCheckout}
                  disabled={isCartEmpty}
                >
                  PROCEED TO CHECKOUT({summary.item_count})
                </Button>
              </div>

              {/* Info Messages */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <Truck
                    className="text-green-500 flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <p>Free delivery on orders above $50 within 6km</p>
                </div>

                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle
                    className="text-green-500 flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <p>100% secure payment</p>
                </div>

                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <AlertCircle
                    className="text-blue-500 flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <p>Need help? Contact us at support@bakars.com</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
```
</details>

---

### ⚛️ CateringPage.tsx
**Path:** `src\pages\customer\CateringPage.tsx`

<details>
<summary>View Code (698 lines)</summary>

```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  ChefHat,
  Award,
  Heart,
  Sparkles,
  Send,
  Calendar,
  Building2,
  Cake,
  Church,
  UsersRound,
  PartyPopper,
  GraduationCap,
} from 'lucide-react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Card from '@/components/common/Card';
import { useToast } from '@/components/common/Toast';
import apiClient from '@/api/client';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const CateringPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Phone validation (Australian format)
    const phoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      showToast('Please enter a valid Australian phone number', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.post('/contact', formData);

      showToast(
        "Thank you! Your catering enquiry has been sent successfully. We'll get back to you within 24 hours!",
        'success'
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error: any) {
      console.error('Contact form error:', error);
      showToast(
        error.response?.data?.message ||
          'Failed to send message. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const packages = [
    {
      name: 'Basic Package',
      price: '$25',
      perPerson: 'per person',
      features: [
        '2 Rice dishes',
        '3 Curry selections',
        '1 BBQ option',
        'Fresh salad',
        'Disposable plates & cutlery',
      ],
      color: 'from-blue-500 to-blue-600',
      icon: <ChefHat className="w-8 h-8" />,
    },
    {
      name: 'Premium Package',
      price: '$35',
      perPerson: 'per person',
      features: [
        '3 Rice varieties',
        '5 Curry selections',
        '2 BBQ options',
        'Fresh salad & raita',
        'Dessert included',
        'Premium serving setup',
      ],
      color: 'from-orange-500 to-orange-600',
      icon: <Award className="w-8 h-8" />,
      popular: true,
    },
    {
      name: 'Diamond Package',
      price: '$50',
      perPerson: 'per person',
      features: [
        '4 Premium rice dishes',
        '7 Specialty curries',
        '3 BBQ options',
        'Gourmet salads',
        'Premium desserts',
        'Full table service',
        'Elegant presentation',
      ],
      color: 'from-purple-500 to-purple-600',
      icon: <Sparkles className="w-8 h-8" />,
    },
  ];

  const features = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: 'Any Event Size',
      description:
        'From intimate gatherings of 10 to grand celebrations of 500+',
    },
    {
      icon: <Heart className="w-12 h-12 text-primary" />,
      title: '100% Halal',
      description:
        'All our ingredients are halal-certified for your peace of mind',
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: 'Fresh & On-Time',
      description:
        'Prepared fresh on the day and delivered right when you need it',
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: 'Award-Winning',
      description: 'Authentic Pakistani & Indian cuisine loved by thousands',
    },
  ];

  const eventTypes = [
    {
      name: 'Weddings',
      icon: <Heart className="w-12 h-12" />,
      color: 'text-pink-500',
    },
    {
      name: 'Corporate Events',
      icon: <Building2 className="w-12 h-12" />,
      color: 'text-blue-600',
    },
    {
      name: 'Birthday Parties',
      icon: <Cake className="w-12 h-12" />,
      color: 'text-purple-500',
    },
    {
      name: 'Religious Ceremonies',
      icon: <Church className="w-12 h-12" />,
      color: 'text-indigo-600',
    },
    {
      name: 'Family Gatherings',
      icon: <UsersRound className="w-12 h-12" />,
      color: 'text-green-600',
    },
    {
      name: 'Community Events',
      icon: <PartyPopper className="w-12 h-12" />,
      color: 'text-orange-500',
    },
    {
      name: 'Engagement Parties',
      icon: <Heart className="w-12 h-12" />,
      color: 'text-rose-500',
    },
    {
      name: 'Graduation Parties',
      icon: <GraduationCap className="w-12 h-12" />,
      color: 'text-teal-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-primary to-orange-600 overflow-hidden py-12 sm:py-16 min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 107, 53, 0.9), rgba(255, 107, 53, 0.85)), url('https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
        }}
      >
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex items-center">
          <div className="max-w-3xl text-white text-center md:text-left space-y-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                Catering Services
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-white/95 drop-shadow-md">
                Exceptional Pakistani & Indian cuisine for your special events
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg">
                <div className="flex items-center backdrop-blur-sm bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>100% Halal</span>
                </div>
                <div className="flex items-center backdrop-blur-sm bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Fresh Ingredients</span>
                </div>
                <div className="flex items-center backdrop-blur-sm bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Authentic Flavours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-auto"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-text mb-4">
              Why Choose Bakar's Catering?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We bring authentic flavours and professional service to make your
              event unforgettable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-xl text-text mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-text mb-4">
              Our Catering Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our curated packages or let us create a custom menu
              for your event
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <Card
                  className={`p-8 h-full ${
                    pkg.popular
                      ? 'border-2 border-orange-500 shadow-2xl transform scale-105'
                      : 'shadow-lg'
                  } hover:shadow-xl transition-all duration-300`}
                >
                  <div
                    className={`bg-gradient-to-r ${pkg.color} text-white rounded-2xl p-6 mb-6 text-center`}
                  >
                    <div className="flex justify-center mb-4">{pkg.icon}</div>
                    <h3 className="font-heading text-2xl font-bold mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-4xl font-bold">{pkg.price}</div>
                    <div className="text-sm opacity-90">{pkg.perPerson}</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={pkg.popular ? 'primary' : 'outline'}
                    fullWidth
                    onClick={() => {
                      const formElement =
                        document.getElementById('contact-form');
                      formElement?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Enquire Now
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Card className="bg-gradient-to-r from-primary/5 to-orange-500/5 p-8 max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Minimum Order:</strong> 10 guests |{' '}
                <strong>Delivery Fee:</strong> Calculated based on distance
              </p>
              <p className="text-gray-600">
                All packages can be customized to suit your preferences and
                dietary requirements
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl font-bold text-text mb-4">
              Get Your Custom Quote
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
              with a tailored proposal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-primary to-orange-600 text-white">
                <h3 className="font-heading text-2xl font-bold mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Call Us</h4>
                      <p className="text-white/90">
                        Speak with our catering team
                      </p>
                      <a
                        href="tel:+61XXXXXXXXX"
                        className="text-white font-semibold hover:underline"
                      >
                        +61 XXX XXX XXX
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-white/90">Send us your requirements</p>
                      <a
                        href="mailto:bakarsfoods@gmail.com"
                        className="text-white font-semibold hover:underline"
                      >
                        bakarsfoods@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-white/90">
                        504-508 Woodville Rd
                        <br />
                        Guildford, NSW 2161
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Response Time</h4>
                      <p className="text-white/90">
                        We respond to all enquiries within
                        <br />
                        24 hours on business days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Booking Notice
                  </h4>
                  <p className="text-sm text-white/90">
                    We recommend booking at least 7 days in advance for events.
                    For urgent requests, please call us directly.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />

                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0X XXXX XXXX"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Event Details & Requirements
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Please include:
• Event type (wedding, corporate, birthday, etc.)
• Date and time
• Expected number of guests
• Venue location
• Package preference or custom requirements
• Any dietary requirements or preferences"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl font-bold text-text mb-4">
              Perfect For Every Occasion
            </h2>
            <p className="text-lg text-gray-600">
              We cater to all types of events, big or small
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {eventTypes.map((event, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div
                    className={`flex justify-center mb-3 ${event.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {event.icon}
                  </div>
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors duration-300">
                    {event.name}
                  </h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-orange-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl font-bold mb-6">
              Ready to Make Your Event Memorable?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Let us handle the food while you enjoy the celebration
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const formElement = document.getElementById('contact-form');
                formElement?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Your Free Quote
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CateringPage;
```
</details>

---

### ⚛️ CheckoutPage.tsx
**Path:** `src\pages\customer\CheckoutPage.tsx`

<details>
<summary>View Code (1690 lines)</summary>

```tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type {
  Stripe,
  StripeElements,
  StripeCardNumberElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardCvcElementOptions,
  StripeCardElementStyle,
} from '@stripe/stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@hooks/useCart';
import { useAuthStore } from '@store/authStore';
import { useAddressStore } from '@store/addressStore';
import { useToast } from '@components/common/Toast';
import { ordersAPI, paymentsAPI } from '@api';
import { deliveryAPI } from '@api/endpoints/delivery';
import { MealSubscriptionSelection } from '@models/cart.types';
import { formatCurrency } from '@utils/formatters';
import { Address, DeliveryAvailability } from '@models/address.types';
import { DAILY_DELIVERY_FEE } from '@utils/constants';
import {
  MapPin,
  Calendar,
  ArrowLeft,
  Truck,
  Store,
  CheckCircle,
  CreditCard,
  Package,
  FileText,
  ShoppingCart,
} from 'lucide-react';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Input from '@components/common/Input';
import LoadingScreen from '@components/common/LoadingScreen';
import Modal from '@components/common/Modal';

const DEFAULT_COUNTRY = 'Australia';
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';

const formatScheduleDate = (dateString: string) => {
  if (!dateString) {
    return 'Date to be confirmed';
  }

  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) {
    return dateString;
  }

  return parsed.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

const getInitialAddressForm = () => ({
  label: 'Home',
  street: '',
  suburb: '',
  postcode: '',
  state: 'NSW',
  country: DEFAULT_COUNTRY,
  is_default: false,
  delivery_instructions: '',
});

interface CheckoutState {
  cateringDetails?: any;
  subscriptionDetails?: MealSubscriptionSelection;
}

interface CheckoutPageContentProps {
  isStripeAvailable: boolean;
  stripe?: Stripe | null;
  elements?: StripeElements | null;
}

const CheckoutPageContent: React.FC<CheckoutPageContentProps> = ({
  isStripeAvailable,
  stripe,
  elements,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  const {
    items = [],
    sidelines = [],
    summary = {
      item_count: 0,
      subtotal: 0,
      delivery_fee: 0,
      tax: 0,
      total: 0,
    },
    clearCart,
    isLoading: cartLoading,
  } = useCart();
  const { showToast } = useToast();
  const {
    addresses,
    fetchAddresses,
    addAddress,
    calculateDeliveryFee,
    isLoading: addressStoreLoading,
    isValidating: isCalculatingDeliveryFee,
    error: addressStoreError,
    clearError: clearAddressError,
  } = useAddressStore();

  const state = (location.state as CheckoutState) || {};
  const { cateringDetails, subscriptionDetails } = state;

  const sidelineTotal = useMemo(() => {
    if (!Array.isArray(sidelines) || sidelines.length === 0) {
      return 0;
    }

    return sidelines.reduce((sum: number, entry: any) => {
      const sidelineData = entry?.sideline || entry;
      const price = Number(sidelineData?.price) || 0;
      const quantity =
        Number(entry?.quantity ?? sidelineData?.quantity ?? 1) || 1;
      return sum + price * quantity;
    }, 0);
  }, [sidelines]);

  const subscriptionPricing = useMemo(() => {
    if (!subscriptionDetails) {
      return null;
    }

    const planPrice =
      Number(subscriptionDetails.plan?.price_per_plan) || 0;
    const planQuantity = subscriptionDetails.planQuantity || 1;
    const planSubtotal = planPrice * planQuantity;

    const extraBoxesCount = subscriptionDetails.extraBoxes || 0;
    const extraBoxUnit =
      Number(
        subscriptionDetails.plan?.extra_box_price ??
          subscriptionDetails.plan?.price_per_box
      ) || 0;
    const extraBoxesCost = extraBoxesCount * extraBoxUnit;

    const subtotalBeforeDelivery =
      planSubtotal + extraBoxesCost + sidelineTotal;

    return {
      planSubtotal,
      extraBoxesCost,
      extraBoxUnit,
      subtotalBeforeDelivery,
      tax: subtotalBeforeDelivery * 0.1,
    };
  }, [subscriptionDetails, sidelineTotal]);

  const subscriptionScheduleSummary = useMemo(() => {
    if (!subscriptionDetails?.schedule?.length) {
      return [];
    }

    return subscriptionDetails.schedule.map((slot) => {
      const totalBoxes = slot.items?.reduce(
        (sum, entry) => sum + (entry.quantity || 0),
        0
      );

      return {
        date: slot.date,
        displayDate: formatScheduleDate(slot.date),
        totalBoxes: totalBoxes || 0,
      };
    });
  }, [subscriptionDetails]);

  const cardElementStyle = useMemo<StripeCardElementStyle>(
    () => ({
      base: {
        fontSize: '16px',
        color: '#1f2937',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#ef4444',
      },
    }),
    [],
  );

  const cardNumberOptions = useMemo<StripeCardNumberElementOptions>(
    () => ({
      style: cardElementStyle,
      showIcon: true,
      placeholder: '1234 1234 1234 1234',
    }),
    [cardElementStyle],
  );

  const cardExpiryOptions = useMemo<StripeCardExpiryElementOptions>(
    () => ({
      style: cardElementStyle,
    }),
    [cardElementStyle],
  );

  const cardCvcOptions = useMemo<StripeCardCvcElementOptions>(
    () => ({
      style: cardElementStyle,
      placeholder: '123',
    }),
    [cardElementStyle],
  );

  useEffect(() => {
    if (subscriptionDetails) {
      setDeliveryMethod(subscriptionDetails.fulfilment);
    }
  }, [subscriptionDetails]);

  const initialPaymentMethod: 'card' | 'cash' = isStripeAvailable ? 'card' : 'cash';

  // State
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>(
    'delivery'
  );
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] =
    useState<'card' | 'cash'>(initialPaymentMethod);
  const [deliveryFee, setDeliveryFee] = useState(
    summary.delivery_fee ?? DAILY_DELIVERY_FEE
  );
  const [addressError, setAddressError] = useState<string | null>(null);
  const [cardError, setCardError] = useState<string | null>(null);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [cardholderName, setCardholderName] = useState(() => {
    const fallbackName =
      user?.full_name?.trim() ||
      `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
    return fallbackName || '';
  });
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);

  useEffect(() => {
    if (!isStripeAvailable) {
      setPaymentMethod('cash');
    }
  }, [isStripeAvailable]);

  useEffect(() => {
    if (!cardholderName && user) {
      const derivedName =
        user.full_name?.trim() ||
        `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
      if (derivedName) {
        setCardholderName(derivedName);
      }
    }
  }, [user, cardholderName]);

  useEffect(() => {
    if (paymentMethod !== 'card') {
      setCardError(null);
      setIsCardComplete(false);
      setCardNumberComplete(false);
      setCardExpiryComplete(false);
      setCardCvcComplete(false);
    }
  }, [paymentMethod]);

  useEffect(() => {
    setIsCardComplete(
      cardNumberComplete && cardExpiryComplete && cardCvcComplete,
    );
  }, [cardNumberComplete, cardExpiryComplete, cardCvcComplete]);

  // Address modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(getInitialAddressForm);

  // Fetch saved addresses on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses().catch((error: any) => {
        console.error('Failed to fetch addresses:', error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const selectedAddressId = selectedAddress?._id ?? '';

  useEffect(() => {
    if (!addresses || addresses.length === 0) {
      setSelectedAddress(null);
      return;
    }

    if (
      !selectedAddressId ||
      !addresses.some((addr) => addr._id === selectedAddressId)
    ) {
      const nextAddress =
        addresses.find((addr) => addr.is_default) || addresses[0];
      setSelectedAddress(nextAddress);
    }
  }, [addresses, selectedAddressId]);

  useEffect(() => {
    if (
      deliveryMethod === 'delivery' &&
      !addressStoreLoading &&
      addresses.length === 0
    ) {
      setIsAddressModalOpen(true);
    }
  }, [deliveryMethod, addressStoreLoading, addresses.length]);

  useEffect(() => {
    const evaluateDeliveryFee = async () => {
      if (deliveryMethod !== 'delivery') {
        setAddressError(null);
        setDeliveryFee(0);
        return;
      }

      if (!selectedAddressId || !selectedAddress) {
        setAddressError(null);
        setDeliveryFee(0);
        return;
      }

      clearAddressError();
      setAddressError(null);

      const isDailyOrder = !subscriptionDetails && !cateringDetails;

      if (isDailyOrder) {
        try {
          const formattedAddress = [
            selectedAddress.street,
            selectedAddress.suburb,
            selectedAddress.state,
            selectedAddress.postcode,
            selectedAddress.country || DEFAULT_COUNTRY,
          ]
            .filter(Boolean)
            .join(', ');

          const availabilityResponse = await deliveryAPI.checkAvailability(
            formattedAddress,
            'daily'
          );
          const availability = availabilityResponse.data.data as DeliveryAvailability | undefined;

          if (availability?.available) {
            const fee =
              availability.delivery_fee !== undefined
                ? availability.delivery_fee
                : DAILY_DELIVERY_FEE;
            setDeliveryFee(fee);
          } else {
            const message =
              availability?.message ||
              availabilityResponse.data.message ||
              'Delivery service is not available for this address.';
            setAddressError(message);
            setDeliveryFee(0);
          }
        } catch (error: any) {
          console.error('Delivery availability check failed:', error);
          const message =
            error?.response?.data?.message ||
            error?.response?.data?.detail ||
            error?.message ||
            'Delivery service is not available for this address.';
          setAddressError(message);
          setDeliveryFee(0);
        }
        return;
      }

      try {
        const deliveryDays =
          subscriptionDetails?.schedule?.length ||
          subscriptionDetails?.plan?.deliveries_per_cycle ||
          1;
        const orderValue =
          subscriptionPricing?.subtotalBeforeDelivery ??
          summary.subtotal ??
          0;
        const result = await calculateDeliveryFee(selectedAddressId, {
          deliveryDays,
          orderValue,
          isExpress: false,
        });
        if (result && typeof result.fee === 'number') {
          setDeliveryFee(result.fee);
        }
      } catch (error: any) {
        console.error('Delivery fee calculation failed:', error);
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.detail ||
          error?.message ||
          'Delivery service is not available for this address.';
        setAddressError(message);
        setDeliveryFee(0);
      }
    };

    evaluateDeliveryFee();
  }, [
    selectedAddressId,
    selectedAddress,
    deliveryMethod,
    calculateDeliveryFee,
    subscriptionPricing,
    clearAddressError,
    subscriptionDetails,
    cateringDetails,
  ]);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    // Set minimum delivery date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDeliveryDate(tomorrow.toISOString().split('T')[0]);

    // Set default time
    setDeliveryTime('12:00');
  }, [isAuthenticated, navigate]);

  // Helper function to safely get item data
  const getItemData = (item: any) => {
    // Handle different item structures
    const nestedItem = item.menu_item || item.sideline;
    if (nestedItem) {
      return {
        id: nestedItem.id || nestedItem._id,
        name: nestedItem.name || 'Unknown Item',
        price: nestedItem.price || 0,
        quantity: item.quantity || 1,
      };
    } else if (item.item_name) {
      return {
        id: item.item_id,
        name: item.item_name || 'Unknown Item',
        price: item.price || 0,
        quantity: item.quantity || 1,
      };
    } else {
      return {
        id:
          item.item_id ||
          item.id ||
          item._id ||
          item.menu_item?.id ||
          item.menu_item?._id,
        name: item.name || 'Unknown Item',
        price: item.price || 0,
        quantity: item.quantity || 1,
      };
    }
  };

  const mapItemsToPayload = (entries: any[] = []) => {
    return entries
      .map((entry) => {
        const itemData = getItemData(entry);
        const itemId =
          itemData.id ||
          entry.item_id ||
          entry.id ||
          entry._id ||
          entry.menu_item?.id ||
          entry.menu_item?._id;
        const quantity = Number(itemData.quantity || entry.quantity || 0);

        if (!itemId || quantity <= 0) {
          console.warn('Skipping invalid cart entry', entry);
          return null;
        }

        return {
          item_id: itemId,
          quantity,
        };
      })
      .filter(Boolean);
  };

  // Check if cart is empty (excluding loading state)
  const isCartEmpty =
    !cartLoading &&
    (!items || items.length === 0) &&
    !cateringDetails &&
    !subscriptionDetails;

  const handleSaveAddress = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedPayload = {
      label: newAddress.label.trim() || 'Home',
      street: newAddress.street.trim(),
      suburb: newAddress.suburb.trim(),
      postcode: newAddress.postcode.trim(),
      state: newAddress.state.trim() || 'NSW',
      country: newAddress.country || DEFAULT_COUNTRY,
      is_default: newAddress.is_default || addresses.length === 0,
      delivery_instructions: newAddress.delivery_instructions?.trim() || undefined,
    };

    if (!trimmedPayload.street || !trimmedPayload.suburb || !trimmedPayload.postcode) {
      showToast('Please complete the required address fields.', 'error');
      return;
    }

    setIsSavingAddress(true);
    try {
      const createdAddress = await addAddress(trimmedPayload);
      setIsAddressModalOpen(false);
      setNewAddress(getInitialAddressForm());
      setSelectedAddress(createdAddress);
      showToast('Address saved successfully', 'success');
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        'Failed to save address';
      showToast(message, 'error');
    } finally {
      setIsSavingAddress(false);
    }
  };

  const processCardPayment = async (orderId: string) => {
    if (!isStripeAvailable) {
      throw new Error(
        'Card payments are currently unavailable. Please choose cash or try again later.',
      );
    }

    if (!stripe || !elements) {
      throw new Error(
        'Secure payment form is still loading. Please wait a moment and try again.',
      );
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      throw new Error(
        'Card number input is not ready yet. Please refresh the page and try again.',
      );
    }

    setCardError(null);

    const intentResponse = await paymentsAPI.createPaymentIntent(orderId);
    const paymentIntent = intentResponse.data.data;

    const normalizedCardholder = cardholderName.trim();
    const fallbackName =
      user?.full_name?.trim() ||
      `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
    const billingName = normalizedCardholder || fallbackName || undefined;

    const confirmation = await stripe.confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: billingName,
            email: user?.email || undefined,
            phone: user?.phone || undefined,
          },
        },
      },
    );

    if (confirmation.error) {
      setCardError(
        confirmation.error.message ||
          'Payment failed. Please check your card details.',
      );
      throw new Error(
        confirmation.error.message ||
          'Card payment failed. Please try another card or use cash on delivery.',
      );
    }

    await paymentsAPI.confirmPayment(paymentIntent.payment_intent_id);
    cardNumberElement.clear();
    elements.getElement(CardExpiryElement)?.clear();
    elements.getElement(CardCvcElement)?.clear();
    setCardNumberComplete(false);
    setCardExpiryComplete(false);
    setCardCvcComplete(false);
    setIsCardComplete(false);
    setCardError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      if (!isStripeAvailable) {
        showToast(
          'Card payments are currently unavailable. Please choose cash or try again later.',
          'error',
        );
        return;
      }

      if (!cardholderName.trim()) {
        showToast('Please enter the name on the card.', 'error');
        return;
      }

      if (!isCardComplete) {
        showToast('Please enter your card details to continue.', 'error');
        return;
      }
    }

    // Validation
    if (isCartEmpty) {
      showToast('Your cart is empty', 'error');
      navigate('/menu/daily');
      return;
    }

      if (subscriptionDetails) {
        if (
          subscriptionDetails.fulfilment === 'delivery' &&
          !selectedAddress
        ) {
          showToast('Please select a delivery address', 'error');
        return;
      }
    } else {
      if (
        deliveryMethod === 'delivery' &&
        !selectedAddress
      ) {
        showToast('Please select or add a delivery address', 'error');
        return;
      }

      if (!deliveryDate || !deliveryTime) {
        showToast('Please select delivery/pickup date and time', 'error');
        return;
      }
    }

    if (
      addressError &&
      ((subscriptionDetails &&
        subscriptionDetails.fulfilment === 'delivery') ||
        (!subscriptionDetails && deliveryMethod === 'delivery'))
    ) {
      showToast(addressError, 'error');
      return;
    }

    setIsProcessing(true);

    try {
      let orderPayload: any = {};
      const deliveryAddressId = selectedAddressId;
      const backendDeliveryMethod =
        deliveryMethod === 'delivery' ? 'standard' : 'pickup';
      const sidelinePayload = mapItemsToPayload(sidelines);

      if (cateringDetails) {
        // Catering order
        orderPayload = {
          package_type: cateringDetails.package.id,
          guest_count: cateringDetails.eventDetails.head_count,
          event_date: cateringDetails.eventDetails.event_date,
          event_time: cateringDetails.eventDetails.event_time,
          venue_address: cateringDetails.eventDetails.venue_address,
          selected_items: cateringDetails.selectedItems,
          special_requests: specialInstructions,
          payment_method: paymentMethod,
        };
      } else if (subscriptionDetails) {
        const plan = subscriptionDetails.plan;
        const planId = (plan as any)._id || (plan as any).id;

        const planSelections = [
          {
            plan_id: planId,
            quantity: subscriptionDetails.planQuantity,
          },
        ];

        const deliverySlots = subscriptionDetails.schedule.map((slot) => ({
          delivery_date: slot.date,
          menu_items: slot.items.reduce(
            (acc: Record<string, number>, entry) => {
              const id = (entry.item as any)._id || entry.item.id;
              if (id) {
                acc[id] = entry.quantity;
              }
              return acc;
            },
            {} as Record<string, number>
          ),
        }));

        orderPayload = {
          plan_selections: planSelections,
          delivery_slots: deliverySlots,
          sidelines: sidelinePayload,
          delivery_address_id:
            subscriptionDetails.fulfilment === 'delivery'
              ? deliveryAddressId
              : undefined,
          fulfilment_method: subscriptionDetails.fulfilment,
          is_express: false,
          delivery_instructions: specialInstructions,
          notes: '',
          payment_method: paymentMethod,
        };
      } else {
        // Daily order
        const dailyItemsPayload = mapItemsToPayload(items);

        if (dailyItemsPayload.length === 0) {
          showToast(
            'We could not detect any valid menu items in your cart. Please add at least one item and try again.',
            'error'
          );
          setIsProcessing(false);
          return;
        }

        orderPayload = {
          items: dailyItemsPayload,
          sidelines: sidelinePayload,
          delivery_method: backendDeliveryMethod,
          delivery_address_id:
            backendDeliveryMethod === 'standard' ? deliveryAddressId : undefined,
          delivery_instructions: specialInstructions,
          notes: '',
          payment_method: paymentMethod,
        };
      }

      console.log('Submitting order:', orderPayload);

      // Create order based on type
      let orderResponse;
      if (cateringDetails) {
        orderResponse = await ordersAPI.createCateringOrder(orderPayload);
      } else if (subscriptionDetails) {
        orderResponse = await ordersAPI.createMealSubscriptionOrder(orderPayload);
      } else {
        orderResponse = await ordersAPI.createDailyOrder(orderPayload);
      }

      const order = orderResponse.data.data;
      const orderId = order.id || order._id;

      if (!orderId) {
        throw new Error('Unable to determine the order ID for payment processing.');
      }

      if (paymentMethod === 'card') {
        await processCardPayment(orderId);
      }

      // Clear cart after successful order and payment
      await clearCart();

      showToast('Order placed successfully!', 'success');

      // Navigate to order confirmation or home
      navigate('/', {
        state: { orderPlaced: true, orderId },
      });
    } catch (error: any) {
      console.error('Checkout error:', error);
      const errorMessage =
        error?.message ||
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        'Failed to place order. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotalAmount = subscriptionPricing
    ? subscriptionPricing.subtotalBeforeDelivery
    : summary.subtotal;
  const taxAmount = subscriptionPricing
    ? subscriptionPricing.tax
    : summary.tax !== undefined
      ? summary.tax
      : summary.subtotal * 0.1;
  const effectiveDeliveryFee = subscriptionDetails
    ? subscriptionDetails.fulfilment === 'delivery'
      ? deliveryFee
      : 0
    : deliveryMethod === 'delivery'
      ? deliveryFee
      : 0;
  const totalAmount = subtotalAmount + taxAmount + effectiveDeliveryFee;
  const isCardPaymentSelected = paymentMethod === 'card';
  const isSubmitDisabled =
    isProcessing ||
    (isCardPaymentSelected && (!isStripeAvailable || !isCardComplete));
  const submitLabel = isProcessing
    ? isCardPaymentSelected
      ? 'Processing Payment...'
      : 'Processing...'
    : 'Place Order';

  // Show loading while cart data is loading
  if (cartLoading) {
    return <LoadingScreen message="Loading checkout..." />;
  }

  // Show empty cart message
  if (isCartEmpty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card padding="lg" className="text-center max-w-md">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-text mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some delicious items to your cart before checking out
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate('/menu/daily')}
          >
            Browse Menu
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-primary hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1 className="font-heading text-4xl font-bold text-text mb-8">
          Complete Your Order
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Method */}
              <Card padding="lg">
                <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center space-x-2">
                  <Truck size={24} className="text-primary" />
                  <span>Delivery Method</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      deliveryMethod === 'delivery'
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <MapPin
                      className={`mx-auto mb-2 ${
                        deliveryMethod === 'delivery'
                          ? 'text-primary'
                          : 'text-gray-400'
                      }`}
                      size={32}
                    />
                    <p className="font-semibold text-text">Delivery</p>
                    <p className="text-sm text-gray-600">
                      {deliveryMethod === 'delivery' ? (
                        isCalculatingDeliveryFee ? (
                          'Calculating...'
                        ) : effectiveDeliveryFee === 0 ? (
                          'FREE'
                        ) : (
                          formatCurrency(effectiveDeliveryFee)
                        )
                      ) : (
                        formatCurrency(effectiveDeliveryFee)
                      )}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryMethod('pickup');
                      setIsAddressModalOpen(false);
                    }}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <Store
                      className={`mx-auto mb-2 ${
                        deliveryMethod === 'pickup'
                          ? 'text-primary'
                          : 'text-gray-400'
                      }`}
                      size={32}
                    />
                    <p className="font-semibold text-text">Pickup</p>
                    <p className="text-sm text-gray-600">FREE</p>
                  </button>
                </div>
              </Card>

              {/* Delivery Address - only show if delivery selected */}
              {deliveryMethod === 'delivery' && (
                <Card padding="lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={24} className="text-primary" />
                      <h2 className="font-heading text-2xl font-bold text-text">
                        Delivery Address
                      </h2>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                    onClick={() => {
                      const initialForm = getInitialAddressForm();
                      initialForm.is_default = addresses.length === 0;
                      setNewAddress(initialForm);
                      setIsAddressModalOpen(true);
                    }}
                    >
                      Add Address
                    </Button>
                  </div>

                  {addressStoreLoading ? (
                    <LoadingScreen
                      variant="section"
                      message="Loading saved addresses..."
                    />
                  ) : addresses.length > 0 ? (
                    <div className="space-y-3">
                      {addresses.map((addr) => (
                        <label
                          key={addr._id}
                          className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            (selectedAddressId &&
                              selectedAddressId === addr._id) ||
                            (!selectedAddressId && addr.is_default)
                              ? 'border-primary bg-primary-50'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddressId === addr._id}
                            onChange={() => setSelectedAddress(addr)}
                            className="mt-1"
                          />
                          <div>
                            <p className="font-semibold text-text">
                              {addr.label || 'Address'}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {addr.street}, {addr.suburb} {addr.state}{' '}
                              {addr.postcode}
                            </p>
                            {addr.is_default && (
                              <span className="inline-block mt-1 px-2 py-1 bg-primary text-white text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-3">
                        You have not saved any delivery addresses yet.
                      </p>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          const initialForm = getInitialAddressForm();
                          initialForm.is_default = true;
                          setNewAddress(initialForm);
                          setIsAddressModalOpen(true);
                        }}
                      >
                        Add Your First Address
                      </Button>
                    </div>
                  )}

                  {(addressError || addressStoreError) && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      {addressError || addressStoreError || 'Delivery service is not available for this address.'}
                    </div>
                  )}

                  {deliveryMethod === 'delivery' && addresses.length > 0 && !addressError && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                      {isCalculatingDeliveryFee
                        ? 'Calculating delivery fee for the selected address...'
                        : `Calculated delivery fee: ${formatCurrency(effectiveDeliveryFee)}`}
                    </div>
                  )}
                </Card>
              )}

              {/* Delivery Time */}
              <Card padding="lg">
                <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center space-x-2">
                  <Calendar size={24} className="text-primary" />
                  <span>
                    {deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}{' '}
                    Schedule
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="date"
                    label="Date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                  <Input
                    type="time"
                    label="Time"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    required
                  />
                </div>

                {deliveryMethod === 'pickup' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Pickup Location:</strong> Woodville Rd, Guildford
                      NSW 2161
                    </p>
                  </div>
                )}
              </Card>

              {/* Special Instructions */}
              <Card padding="lg">
                <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center space-x-2">
                  <FileText size={24} className="text-primary" />
                  <span>Special Instructions (Optional)</span>
                </h2>

                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Any special requests or delivery instructions..."
                />
              </Card>

              {/* Payment Method */}
              <Card padding="lg">
                <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center space-x-2">
                  <CreditCard size={24} className="text-primary" />
                  <span>Payment Method</span>
                </h2>

                <div className="space-y-3">
                  <label
                    className={`flex flex-col gap-3 p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary'
                    } ${
                      isStripeAvailable
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed opacity-70'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value as 'card')
                        }
                        className="mr-3"
                        disabled={!isStripeAvailable}
                      />
                      <CreditCard className="mr-3 text-gray-600" size={20} />
                      <span className="font-semibold">Card Payment</span>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="w-full">
                        {isStripeAvailable ? (
                          <div className="space-y-4">
                            <Input
                              type="text"
                              label="Name on Card"
                              value={cardholderName}
                              onChange={(e) => setCardholderName(e.target.value)}
                              placeholder="Enter the name that appears on the card"
                              autoComplete="cc-name"
                              required
                            />

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number
                              </label>
                              <div
                                className={`w-full px-4 py-3 border rounded-lg bg-white shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${
                                  cardError ? 'border-red-400' : 'border-gray-200'
                                }`}
                              >
                                <CardNumberElement
                                  options={cardNumberOptions}
                                  className="w-full"
                                  onChange={(event) => {
                                    setCardNumberComplete(event.complete);
                                    setCardError(event.error?.message || null);
                                  }}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Expiration Date
                                </label>
                                <div
                                  className={`w-full px-4 py-3 border rounded-lg bg-white shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${
                                    cardError
                                      ? 'border-red-400'
                                      : 'border-gray-200'
                                  }`}
                                >
                                  <CardExpiryElement
                                    options={cardExpiryOptions}
                                    className="w-full"
                                    onChange={(event) => {
                                      setCardExpiryComplete(event.complete);
                                      setCardError(event.error?.message || null);
                                    }}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  CVV
                                </label>
                                <div
                                  className={`w-full px-4 py-3 border rounded-lg bg-white shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${
                                    cardError
                                      ? 'border-red-400'
                                      : 'border-gray-200'
                                  }`}
                                >
                                  <CardCvcElement
                                    options={cardCvcOptions}
                                    className="w-full"
                                    onChange={(event) => {
                                      setCardCvcComplete(event.complete);
                                      setCardError(event.error?.message || null);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            {cardError && (
                              <p className="text-sm text-red-500">
                                {cardError}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              Secure payments are powered by Stripe. Your card
                              details never touch our servers.
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-red-500">
                            Card payments are temporarily unavailable. Please
                            choose cash on delivery.
                          </p>
                        )}
                      </div>
                    )}
                  </label>

                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as 'cash')
                      }
                      className="mr-3"
                    />
                    <span className="mr-3">💵</span>
                    <span className="font-semibold">
                      Cash on{' '}
                      {deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}
                    </span>
                  </label>
                </div>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card padding="lg" className="sticky top-24">
                <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center space-x-2">
                  <Package size={24} className="text-primary" />
                  <span>Order Summary</span>
                </h2>

                {/* Meal Subscription Details */}
                {subscriptionDetails && (
                  <div className="space-y-3 mb-4">
                    <p className="text-sm font-semibold text-gray-700">
                      Meal Subscription
                    </p>
                    <div className="flex items-start justify-between text-sm">
                      <div>
                        <p className="font-semibold text-text">
                          {subscriptionDetails.plan.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty {subscriptionDetails.planQuantity} ·{' '}
                          {subscriptionDetails.fulfilment === 'delivery'
                            ? 'Delivery'
                            : 'Pickup'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {subscriptionDetails.includedBoxes} boxes included ·{' '}
                          {subscriptionDetails.totalBoxes} selected
                        </p>
                      </div>
                      <span className="font-semibold">
                        {formatCurrency(subscriptionPricing?.planSubtotal || 0)}
                      </span>
                    </div>

                    {subscriptionPricing?.extraBoxesCost &&
                      subscriptionPricing.extraBoxesCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Extra boxes ({subscriptionDetails.extraBoxes})
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(subscriptionPricing.extraBoxesCost)}
                          </span>
                        </div>
                      )}

                    {subscriptionScheduleSummary.length > 0 && (
                      <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 space-y-2">
                        {subscriptionScheduleSummary.map((slot) => (
                          <div
                            key={slot.date}
                            className="flex items-center justify-between"
                          >
                            <span>{slot.displayDate}</span>
                            <span className="font-semibold text-text">
                              {slot.totalBoxes} boxes
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Items */}
                {items && items.length > 0 && (
                  <div className="space-y-3 mb-4">
                    <p className="text-sm font-semibold text-gray-700">
                      Items:
                    </p>
                    {items.map((item: any, index: number) => {
                      const itemData = getItemData(item);
                      return (
                        <div
                          key={itemData.id || index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            {itemData.quantity}x {itemData.name}
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(itemData.price * itemData.quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Sidelines */}
                {sidelines && sidelines.length > 0 && (
                  <>
                    <div className="border-t pt-3 mb-3">
                      <p className="text-sm font-semibold mb-2">Add-ons:</p>
                      {sidelines.map((item: any, index: number) => {
                        const sidelineData = item.sideline || item;
                        return (
                          <div
                            key={sidelineData.id || sidelineData._id || index}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">
                              {item.quantity || 1}x{' '}
                              {sidelineData.name || 'Add-on'}
                            </span>
                            <span className="font-semibold">
                              {formatCurrency(
                                (sidelineData.price || 0) * (item.quantity || 1)
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">
                      {formatCurrency(subtotalAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span className="font-semibold">
                      {deliveryMethod === 'pickup' || effectiveDeliveryFee === 0
                        ? 'FREE'
                        : formatCurrency(effectiveDeliveryFee)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (GST 10%):</span>
                    <span className="font-semibold">
                      {formatCurrency(taxAmount)}
                    </span>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-heading text-xl font-bold text-text">
                        Total:
                      </span>
                      <span className="font-heading text-3xl font-bold text-primary">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  className="mt-6"
                  disabled={isSubmitDisabled}
                  isLoading={isProcessing}
                >
                  {submitLabel}
                </Button>

                {/* Security Note */}
                <div className="mt-4 flex items-start space-x-2 text-xs text-gray-600">
                  <CheckCircle
                    size={16}
                    className="text-green-500 flex-shrink-0 mt-0.5"
                  />
                  <p>Your payment information is secure and encrypted</p>
                </div>
              </Card>
            </div>
          </div>
        </form>
        <Modal
          isOpen={isAddressModalOpen}
          onClose={() => {
            if (!isSavingAddress) {
              setIsAddressModalOpen(false);
            }
          }}
          title="Add New Address"
          size="md"
        >
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <Input
              type="text"
              label="Label"
              value={newAddress.label}
              onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, label: e.target.value }))
              }
              placeholder="Home, Work, etc."
              required
            />

            <Input
              type="text"
              label="Street Address"
              value={newAddress.street}
              onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, street: e.target.value }))
              }
              placeholder="45 Railway Terrace"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                label="Suburb"
                value={newAddress.suburb}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, suburb: e.target.value }))
                }
                placeholder="Guildford"
                required
              />
              <Input
                type="text"
                label="Postcode"
                value={newAddress.postcode}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, postcode: e.target.value }))
                }
                placeholder="2161"
                maxLength={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                label="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, state: e.target.value }))
                }
                placeholder="NSW"
                required
              />
              <Input
                type="text"
                label="Country"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, country: e.target.value }))
                }
                placeholder="Australia"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Instructions (Optional)
              </label>
              <textarea
                value={newAddress.delivery_instructions}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    delivery_instructions: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={3}
                placeholder="Gate is on Palmer St; buzz 45 then wait."
              />
            </div>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newAddress.is_default}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    is_default: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
                disabled={addresses.length === 0 && newAddress.is_default}
              />
              <span className="text-sm text-gray-700">
                Set as default delivery address
              </span>
            </label>

            <div className="flex space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  if (!isSavingAddress) {
                    setIsAddressModalOpen(false);
                  }
                }}
                disabled={isSavingAddress}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={isSavingAddress}
                isLoading={isSavingAddress}
              >
                Save Address
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

const CheckoutPageWithElements: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <CheckoutPageContent
      isStripeAvailable
      stripe={stripe}
      elements={elements}
    />
  );
};

const CheckoutPage: React.FC = () => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(() =>
    STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null,
  );
  const [isStripeReady, setIsStripeReady] = useState(Boolean(STRIPE_PUBLISHABLE_KEY));
  const [isLoadingConfig, setIsLoadingConfig] = useState(!STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    if (STRIPE_PUBLISHABLE_KEY) {
      setIsLoadingConfig(false);
      return;
    }

    let isMounted = true;

    const fetchStripeConfig = async () => {
      try {
        const response = await paymentsAPI.getConfig();
        const config = response.data?.data;

        if (!isMounted) {
          return;
        }

        if (config?.stripe_enabled && config?.stripe_publishable_key) {
          setStripePromise(loadStripe(config.stripe_publishable_key));
          setIsStripeReady(true);
        } else {
          setStripePromise(null);
          setIsStripeReady(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to load Stripe config:', error);
          setStripePromise(null);
          setIsStripeReady(false);
        }
      } finally {
        if (isMounted) {
          setIsLoadingConfig(false);
        }
      }
    };

    fetchStripeConfig();

    return () => {
      isMounted = false;
    };
  }, [STRIPE_PUBLISHABLE_KEY]);

  if (isLoadingConfig) {
    return <LoadingScreen message="Loading payment options..." />;
  }

  if (stripePromise && isStripeReady) {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutPageWithElements />
      </Elements>
    );
  }

  return <CheckoutPageContent isStripeAvailable={false} />;
};

export default CheckoutPage;
```
</details>

---

### ⚛️ DailyMenuPage.tsx
**Path:** `src\pages\customer\DailyMenuPage.tsx`

<details>
<summary>View Code (191 lines)</summary>

```tsx
import React, { useEffect } from 'react';
import { useMenuStore } from '@store/menuStore';
import MenuItemCard from '@components/menu/MenuItemCard';
import FilterBar from '@components/menu/FilterBar';
import LoadingScreen from '@components/common/LoadingScreen';
import Card from '@components/common/Card';
import { RefreshCcw, AlertCircle, Search, Package } from 'lucide-react';
import Pagination from '@components/common/Pagination';

const DailyMenuPage: React.FC = () => {
  const {
    dailyMenuItems,
    categories,
    activeFilters,
    searchQuery,
    dailyMenuPagination,
    isLoading,
    error,
    fetchDailyMenu,
    fetchCategories,
    setFilters,
    clearFilters,
    setSearchQuery,
  } = useMenuStore();

  const filtersSignature = JSON.stringify({
    category: activeFilters.category ?? '',
    order_type: activeFilters.order_type ?? '',
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchDailyMenu({ page: 1 });
  }, [fetchDailyMenu, filtersSignature]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    fetchDailyMenu({ page: 1, search: value });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchDailyMenu({ page: 1, search: '' });
  };

  const handleRetry = () => {
    fetchDailyMenu({ page: dailyMenuPagination.page });
  };

  const handlePageChange = (page: number) => {
    if (page === dailyMenuPagination.page) return;
    fetchDailyMenu({ page });
  };

  const handleClearFiltersClick = () => {
    const hadFilters = !!activeFilters.category || !!activeFilters.order_type;
    const hadSearch = Boolean(searchQuery);
    clearFilters();
    if (!hadFilters && hadSearch) {
      fetchDailyMenu({ page: 1, search: '' });
    }
  };

  const hasResults = dailyMenuItems.length > 0;

  if (isLoading && dailyMenuItems.length === 0) {
    return <LoadingScreen message="Loading daily menu..." />;
  }

  if (error && dailyMenuItems.length === 0) {
    return (
      <div className="container-custom py-12">
        <Card padding="lg" className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-text mb-4">
            Failed to Load Menu
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-flex items-center space-x-2"
          >
            <RefreshCcw size={20} />
            <span>Retry Loading</span>
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container-custom">
        <div className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-3 shadow-sm transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search menu items..."
                className="flex-1 bg-transparent text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                aria-label="Search menu items"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

        <FilterBar
          categories={categories}
          activeFilters={activeFilters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFiltersClick}
        />

          {hasResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dailyMenuItems.map((item) => (
                <MenuItemCard
                  key={item._id || item.id}
                  item={item}
                  showQuickAdd={true}
                />
              ))}
            </div>
          ) : (
            <Card padding="lg">
              <div className="text-center py-12">
                <Package className="mx-auto h-20 w-20 text-gray-300 mb-4" />
                <h3 className="font-semibold text-gray-500 mb-2 text-xl">
                  {dailyMenuPagination.total === 0
                    ? 'No menu items available'
                    : 'No items match your filters'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {dailyMenuPagination.total === 0
                    ? 'Please check back later or contact us.'
                    : 'Try adjusting your filters to see more items.'}
                </p>
                {activeFilters.category ? (
                  <button
                    onClick={handleClearFiltersClick}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <button
                    onClick={handleRetry}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-flex items-center space-x-2"
                  >
                    <RefreshCcw size={18} />
                    <span>Refresh Menu</span>
                  </button>
                )}
              </div>
            </Card>
          )}

          {dailyMenuPagination.total > 0 && (
            <Pagination
              currentPage={dailyMenuPagination.page}
              totalItems={dailyMenuPagination.total}
              pageSize={dailyMenuPagination.pageSize}
              onPageChange={handlePageChange}
              showSummary
              className="pt-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyMenuPage;
```
</details>

---

### ⚛️ MealsSubscriptionPage.tsx
**Path:** `src\pages\customer\MealsSubscriptionPage.tsx`

<details>
<summary>View Code (2059 lines)</summary>

```tsx
﻿import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';
import { ordersAPI } from '@api';
import { menuAPI } from '@api/endpoints/menu';
import { MealSubscriptionPlan } from '@models/subscription.types';
import { MealSubscriptionEditDetails } from '@models/order.types';
import { MenuItem } from '@models/menu.types';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';
import LoadingScreen from '@components/common/LoadingScreen';
import { useToast } from '@components/common/Toast';
import { useAuthStore } from '@store/authStore';
import { useAuthModalStore } from '@store/authModalStore';
import { useOrderStore } from '@store/orderStore';
import { formatCurrency } from '@utils/formatters';
import {
  CalendarRange,
  CheckCircle2,
  ChevronLeft,
  Edit2,
  Info,
  Package,
  Truck,
  Utensils,
} from 'lucide-react';
import clsx from 'clsx';

type FulfilmentMethod = 'delivery' | 'pickup';

interface DeliveryOption {
  date: string;
  label: string;
  weekIndex: number;
}

interface ScheduledItem {
  item: MenuItem;
  quantity: number;
}

interface SubscriptionReviewPayload {
  plan: MealSubscriptionPlan;
  planQuantity: number;
  fulfilment: FulfilmentMethod;
  schedule: Array<{ date: string; items: ScheduledItem[] }>;
  includedBoxes: number;
  totalBoxes: number;
  extraBoxes: number;
  maxPerMeal?: number | null;
}

type FlowStep = 'plans' | 'schedule' | 'menu' | 'review';

const INDEX_TO_WEEKDAY_NAME = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

const WEEKDAY_NAME_TO_INDEX: Record<string, number> =
  INDEX_TO_WEEKDAY_NAME.reduce<Record<string, number>>((acc, name, index) => {
    acc[name] = index;
    return acc;
  }, {});

const DEFAULT_DELIVERY_DAYS = ['monday', 'thursday'];

const PLAN_TAB_ORDER: MealSubscriptionPlan['tab'][] = [
  'weekly',
  'fortnight',
  'monthly',
  'regular',
  'custom',
];

const PLAN_TAB_COPY: Record<
  MealSubscriptionPlan['tab'],
  { label: string; helper: string }
> = {
  weekly: {
    label: 'Weekly 10-Meal',
    helper: 'Two deliveries per week with member savings.',
  },
  fortnight: {
    label: 'Fortnight',
    helper: 'Pick any two weeks within the next four.',
  },
  monthly: {
    label: 'Monthly',
    helper: 'Choose four weeks within a six-week window.',
  },
  regular: {
    label: 'Regular Order',
    helper: 'Flexible orders with 4-box delivery MOQ (1 for pickup).',
  },
  custom: {
    label: 'Custom',
    helper: 'Ad-hoc plans created by the admin.',
  },
};

const normalizeDeliveryDays = (days?: string[]): string[] => {
  if (!Array.isArray(days)) {
    return [];
  }
  const normalized: string[] = [];
  const seen = new Set<string>();
  for (const day of days) {
    const normalizedDay = day?.toString().toLowerCase();
    if (
      normalizedDay &&
      WEEKDAY_NAME_TO_INDEX[normalizedDay] !== undefined &&
      !seen.has(normalizedDay)
    ) {
      seen.add(normalizedDay);
      normalized.push(normalizedDay);
    }
  }
  return normalized;
};

const resolvePlanDeliveryDays = (plan?: MealSubscriptionPlan): string[] => {
  if (!plan) {
    return [];
  }
  const available = normalizeDeliveryDays(plan.available_delivery_days ?? []);
  if (available.length > 0) {
    return available;
  }
  const mappedDays = normalizeDeliveryDays(
    Object.keys(plan.menu_item_ids_by_day ?? {})
  );
  if (mappedDays.length > 0) {
    return mappedDays;
  }
  return normalizeDeliveryDays(Object.keys(plan.menu_items_by_day ?? {}));
};

const getDayKeyFromDate = (isoDate: string): string => {
  const parts = isoDate.split('-').map((part) => Number(part));
  if (parts.length !== 3 || parts.some((value) => Number.isNaN(value))) {
    return 'monday';
  }
  const candidate = new Date(parts[0], parts[1] - 1, parts[2]);
  if (Number.isNaN(candidate.getTime())) {
    return 'monday';
  }
  const index = candidate.getDay();
  return INDEX_TO_WEEKDAY_NAME[index] ?? 'monday';
};

const generateUpcomingDeliveryDates = (
  weeks: number = 6,
  allowedDays?: string[]
): DeliveryOption[] => {
  const results: DeliveryOption[] = [];
  const daysToUse = (() => {
    const normalized = normalizeDeliveryDays(allowedDays);
    if (normalized.length > 0) {
      return normalized;
    }
    return [...DEFAULT_DELIVERY_DAYS];
  })();
  const allowedIndices = daysToUse.map(
    (day) => WEEKDAY_NAME_TO_INDEX[day] ?? WEEKDAY_NAME_TO_INDEX['monday']
  );
  const allowedIndexSet = new Set(allowedIndices);

  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  const toLocalISODate = (date: Date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().split('T')[0];
  };

  let currentWeekIndex = -1;
  const seenWeeks = new Set<string>();
  const maxIterations = weeks * 14 + 14;
  let iterations = 0;

  while (
    results.length < daysToUse.length * weeks &&
    iterations < maxIterations
  ) {
    const day = cursor.getDay();
    if (allowedIndexSet.has(day)) {
      const weekAnchor = new Date(cursor);
      weekAnchor.setHours(0, 0, 0, 0);
      weekAnchor.setDate(cursor.getDate() - day);
      const weekKey = weekAnchor.toISOString().split('T')[0];
      if (!seenWeeks.has(weekKey)) {
        seenWeeks.add(weekKey);
        currentWeekIndex += 1;
      }
      const formatted = cursor.toLocaleDateString('en-AU', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });

      results.push({
        date: toLocalISODate(cursor),
        label: formatted,
        weekIndex: currentWeekIndex,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return results;
};

const MealsSubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuthStore();
  const { openModal, setPendingCartAction } = useAuthModalStore();

  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(true);
  const [plans, setPlans] = useState<MealSubscriptionPlan[]>([]);
  const flowSteps: FlowStep[] = ['plans', 'schedule', 'menu', 'review'];
  const location = useLocation();
  const stepMatch = matchPath('/menu/meals/:step', location.pathname);
  const routeStep = (stepMatch?.params?.step as FlowStep | undefined) ?? 'plans';
  const currentStep: FlowStep = flowSteps.includes(routeStep)
    ? routeStep
    : 'plans';

  const navigateToStep = useCallback(
    (step: FlowStep) => {
      if (step === currentStep) return;
      if (step === 'plans') {
        navigate('/menu/meals');
      } else {
        navigate(`/menu/meals/${step}`);
      }
    },
    [currentStep, navigate]
  );

  const [modalPlan, setModalPlan] = useState<MealSubscriptionPlan | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [modalFulfilment, setModalFulfilment] =
    useState<FulfilmentMethod>('delivery');
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<{
    plan: MealSubscriptionPlan;
    quantity: number;
    fulfilment: FulfilmentMethod;
  } | null>(null);
  const [activePlanTab, setActivePlanTab] =
    useState<MealSubscriptionPlan['tab']>('weekly');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editingDetails, setEditingDetails] =
    useState<MealSubscriptionEditDetails | null>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const fetchOrderHistory = useOrderStore((state) => state.fetchOrderHistory);

  const clearEditingState = useCallback(() => {
    setEditingOrderId(null);
    setEditingDetails(null);
  }, []);

  const handleExitEditing = useCallback(() => {
    clearEditingState();
    setSelectedPlanDetails(null);
    setSelectedDates([]);
    setSelectedMeals({});
    setActiveDate(null);
    setTermsAccepted(false);
    navigateToStep('plans');
  }, [clearEditingState, navigateToStep]);

  const planDeliveryDays = useMemo(
    () =>
      selectedPlanDetails?.plan
        ? resolvePlanDeliveryDays(selectedPlanDetails.plan)
        : undefined,
    [selectedPlanDetails?.plan]
  );

  const upcomingDates = useMemo(() => {
    const weeksWindow =
      selectedPlanDetails?.plan.week_selection_rules?.available_weeks ??
      selectedPlanDetails?.plan.weeks_in_cycle ??
      6;
    return generateUpcomingDeliveryDates(
      Math.max(weeksWindow ?? 6, 1),
      planDeliveryDays
    );
  }, [
    planDeliveryDays,
    selectedPlanDetails?.plan.week_selection_rules,
    selectedPlanDetails?.plan.weeks_in_cycle,
  ]);

  const deliveryOptionsLookup = useMemo(() => {
    const lookup: Record<string, DeliveryOption> = {};
    upcomingDates.forEach((option) => {
      lookup[option.date] = option;
    });
    return lookup;
  }, [upcomingDates]);
  const loadedMenusRef = useRef<Set<string>>(new Set());

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [menusByDate, setMenusByDate] = useState<Record<string, MenuItem[]>>(
    {}
  );
  const [menuLoadingState, setMenuLoadingState] = useState<
    Record<string, boolean>
  >({});
  const [selectedMeals, setSelectedMeals] = useState<
    Record<string, Record<string, number>>
  >({});

  const plansByTab = useMemo(() => {
    return plans.reduce<Record<string, MealSubscriptionPlan[]>>((acc, plan) => {
      const key = plan.tab || 'custom';
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(plan);
      return acc;
    }, {});
  }, [plans]);

  const availableTabs = useMemo(
    () => PLAN_TAB_ORDER.filter((tab) => (plansByTab[tab] ?? []).length > 0),
    [plansByTab]
  );

  useEffect(() => {
    if (!availableTabs.length) {
      return;
    }
    if (!availableTabs.includes(activePlanTab)) {
      setActivePlanTab(availableTabs[0]);
    }
  }, [availableTabs, activePlanTab]);

  const loadEditingDetails = useCallback(
    async (orderId: string) => {
      try {
        setIsLoadingEdit(true);
        const response = await ordersAPI.getMealSubscriptionDetails(orderId);
        setEditingDetails(response.data.data);
      } catch (error: any) {
        console.error('Failed to load meal subscription for editing', error);
        showToast(
          error?.response?.data?.message ||
            'Unable to load that subscription for editing.',
          'error'
        );
        setEditingOrderId(null);
        setEditingDetails(null);
      } finally {
        setIsLoadingEdit(false);
      }
    },
    [showToast]
  );

  useEffect(() => {
    const state = location.state as { editOrderId?: string } | undefined;
    if (state?.editOrderId && state.editOrderId !== editingOrderId) {
      setEditingOrderId(state.editOrderId);
      loadEditingDetails(state.editOrderId);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, editingOrderId, loadEditingDetails, navigate, location.pathname]);

  useEffect(() => {
    if (
      (currentStep === 'schedule' || currentStep === 'menu' || currentStep === 'review') &&
      !selectedPlanDetails
    ) {
      navigateToStep('plans');
      return;
    }

    if (currentStep === 'menu' && selectedDates.length === 0) {
      navigateToStep('schedule');
      return;
    }

    if (
      currentStep === 'review' &&
      (!selectedPlanDetails || selectedDates.length === 0)
    ) {
      navigateToStep(selectedDates.length === 0 ? 'schedule' : 'menu');
    }
  }, [currentStep, selectedPlanDetails, selectedDates, navigateToStep]);

  const displayedPlans = plansByTab[activePlanTab] ?? [];

  const regularUpsellCopy = useMemo(() => {
    if (activePlanTab !== 'regular') {
      return null;
    }

    const hasWeeklyPlanSelected =
      selectedPlanDetails?.plan.tab === 'weekly';
    const hasAnyPlanSelected = Boolean(selectedPlanDetails);

    const shouldShowForCondition = (condition?: string) => {
      const normalized = condition ?? 'always';
      switch (normalized) {
        case 'hidden':
          return false;
        case 'when_plan_selected':
          return hasWeeklyPlanSelected;
        case 'when_no_plan':
          return !hasAnyPlanSelected;
        default:
          return true;
      }
    };

    const candidatePlans = [
      ...(plansByTab.regular ?? []),
      ...(plansByTab.weekly ?? []),
    ];

    for (const plan of candidatePlans) {
      const message = plan.customer_notifications?.upsell_message;
      if (!message) continue;
      if (shouldShowForCondition(plan.customer_notifications?.upsell_condition)) {
        return message;
      }
    }
    return null;
  }, [activePlanTab, plansByTab, selectedPlanDetails]);

  useEffect(() => {
    const loadPlans = async () => {
      setIsLoadingPlans(true);
      try {
        const response = await menuAPI.getMealSubscriptionPlans();
        const payload = response.data.data || response.data;
        const activePlans = Array.isArray(payload)
          ? payload.filter((plan) => plan.is_active)
          : [];
        setPlans(
          activePlans.sort(
            (a, b) =>
              (a.display_order ?? 0) - (b.display_order ?? 0) ||
              a.name.localeCompare(b.name)
          )
        );
      } catch (error) {
        console.error(error);
        showToast('Failed to load meal subscription plans', 'error');
      } finally {
        setIsLoadingPlans(false);
      }
    };

    loadPlans();
  }, []);

const fetchMenuForDate = useCallback(
  async (date: string, planOverride?: MealSubscriptionPlan | null) => {
    if (!date) {
        return;
      }

      const plan = planOverride ?? selectedPlanDetails?.plan ?? null;
      const dayKey = getDayKeyFromDate(date);

      if (plan) {
        const planMenus = plan.menu_items_by_day?.[dayKey];
        if (Array.isArray(planMenus) && planMenus.length > 0) {
          setMenusByDate((prev) => ({ ...prev, [date]: planMenus }));
          setMenuLoadingState((prev) => ({ ...prev, [date]: false }));
          loadedMenusRef.current.add(date);
          return;
        }

        const planMenuIds = plan.menu_item_ids_by_day?.[dayKey];
        if (Array.isArray(planMenuIds) && planMenuIds.length > 0) {
          setMenuLoadingState((prev) => ({ ...prev, [date]: true }));
          try {
            const items = await Promise.all(
              planMenuIds.map(async (id) => {
                try {
                  const response = await menuAPI.getMenuItemById(id);
                  return response.data?.data || response.data;
                } catch (error) {
                  console.error(error);
                  return null;
                }
              })
            );
            setMenusByDate((prev) => ({
              ...prev,
              [date]: items.filter((item): item is MenuItem => !!item),
            }));
            loadedMenusRef.current.add(date);
          } catch (error) {
            console.error(error);
            showToast(`Unable to load menu for ${date}`, 'error');
          } finally {
            setMenuLoadingState((prev) => ({ ...prev, [date]: false }));
          }
          return;
        }
      }

      if (loadedMenusRef.current.has(date)) {
        return;
      }

      setMenuLoadingState((prev) => ({ ...prev, [date]: true }));

      try {
        const response = await menuAPI.getWeeklyMenu(date);
        const items =
          response.data?.data?.items ??
          response.data?.data ??
          response.data ??
          [];
        setMenusByDate((prev) => ({ ...prev, [date]: items }));
        loadedMenusRef.current.add(date);
      } catch (error) {
        console.error(error);
        showToast(`Unable to load menu for ${date}`, 'error');
      } finally {
        setMenuLoadingState((prev) => ({ ...prev, [date]: false }));
      }
    },
  [showToast, selectedPlanDetails]
);

  useEffect(() => {
    if (!editingOrderId || !editingDetails || plans.length === 0) {
      return;
    }

    const selection = editingDetails.plan_selections?.[0];
    const planId = selection?.plan_id;
    if (!planId) {
      showToast('Plan information missing on this subscription.', 'error');
      setEditingOrderId(null);
      return;
    }

    const plan =
      plans.find((p) => (p._id || p.id) === planId) ||
      plansByTab[activePlanTab]?.find((p) => (p._id || p.id) === planId);

    if (!plan) {
      showToast('The original meal plan is no longer available.', 'error');
      setEditingOrderId(null);
      return;
    }

    setSelectedPlanDetails({
      plan,
      quantity: selection?.quantity || 1,
      fulfilment: editingDetails.fulfilment_method || 'delivery',
    });

    const slotDates = editingDetails.delivery_slots.map(
      (slot) => slot.delivery_date
    );
    setSelectedDates(slotDates);

    const hydratedMeals: Record<string, Record<string, number>> = {};
    editingDetails.delivery_slots.forEach((slot) => {
      hydratedMeals[slot.delivery_date] = slot.menu_items || {};
    });
    setSelectedMeals(hydratedMeals);
    setActiveDate(slotDates[0] ?? null);
    setTermsAccepted(true);

    slotDates.forEach((date) => {
      fetchMenuForDate(date, plan);
    });
    if (slotDates.length > 0) {
      navigateToStep('menu');
    }
  }, [
    editingOrderId,
    editingDetails,
    plans,
    plansByTab,
    activePlanTab,
    fetchMenuForDate,
    navigateToStep,
    showToast,
  ]);

  const includedBoxes = useMemo(() => {
    if (!selectedPlanDetails) return 0;
    return (
      (selectedPlanDetails.plan.included_meals || 0) *
      selectedPlanDetails.quantity
    );
  }, [selectedPlanDetails]);

  const selectedBoxes = useMemo(() => {
    return Object.values(selectedMeals).reduce((total, menuMap) => {
      return (
        total +
        Object.values(menuMap).reduce((sum, quantity) => sum + quantity, 0)
      );
    }, 0);
  }, [selectedMeals]);

  const extraBoxes = useMemo(() => {
    if (!selectedPlanDetails) return 0;
    const extras = selectedBoxes - includedBoxes;
    return extras > 0 ? extras : 0;
  }, [selectedBoxes, includedBoxes, selectedPlanDetails]);

  const requiredDeliveries = useMemo(() => {
    if (!selectedPlanDetails) return 0;
    const planDeliveries = selectedPlanDetails.plan.deliveries_per_cycle || 0;
    return selectedPlanDetails.plan.tab === 'regular' ? 0 : planDeliveries;
  }, [selectedPlanDetails]);

  const minBoxesRequired = useMemo(() => {
    if (!selectedPlanDetails) return 0;
    const plan = selectedPlanDetails.plan;
    const reminderSettings = plan.reminder_settings;
    const reminderEnabled = reminderSettings?.enabled;
    const customerReminderCopy =
      plan.customer_notifications?.reminder_message || null;
    if (plan.tab !== 'regular') return includedBoxes;
    return selectedPlanDetails.fulfilment === 'delivery'
      ? (plan.min_boxes_delivery ?? 4)
      : (plan.min_boxes_pickup ?? 1);
  }, [selectedPlanDetails, includedBoxes]);

  const handleOpenPlanModal = (plan: MealSubscriptionPlan) => {
    setModalPlan(plan);
    setModalQuantity(1);
    setModalFulfilment('delivery');
    setTermsAccepted(!plan.require_terms_ack);
  };

  const resetScheduleState = useCallback(
    (
      plan: MealSubscriptionPlan,
      quantity: number,
      fulfilment: FulfilmentMethod
    ) => {
      const planDays = resolvePlanDeliveryDays(plan);
      const weeksWindow =
        plan.week_selection_rules?.available_weeks ?? plan.weeks_in_cycle ?? 6;
      const planUpcomingDates = generateUpcomingDeliveryDates(
        Math.max(weeksWindow, 1),
        planDays
      );

      loadedMenusRef.current.clear();
      setMenusByDate({});
      setMenuLoadingState({});
      setSelectedMeals({});
      setSelectedDates([]);
      setActiveDate(null);

      setSelectedPlanDetails({ plan, quantity, fulfilment });
      navigateToStep('schedule');

      const deliveriesNeeded =
        plan.tab === 'regular'
          ? Math.min(1, planUpcomingDates.length)
          : plan.deliveries_per_cycle || planUpcomingDates.length;
      const deliveriesPerWeekRule =
        plan.week_selection_rules?.deliveries_per_week ||
        (plan.tab === 'regular' ? 1 : plan.deliveries_per_cycle) ||
        1;

      const autopopulatedDates: string[] = [];
      const weekCounts: Record<number, number> = {};
      for (const option of planUpcomingDates) {
        if (autopopulatedDates.length >= deliveriesNeeded) {
          break;
        }
        const weekIndex = option.weekIndex;
        const currentCount = weekCounts[weekIndex] ?? 0;
        if (
          plan.tab !== 'regular' &&
          deliveriesPerWeekRule &&
          currentCount >= deliveriesPerWeekRule
        ) {
          continue;
        }
        autopopulatedDates.push(option.date);
        weekCounts[weekIndex] = currentCount + 1;
      }

      if (autopopulatedDates.length > 0) {
        setSelectedDates(autopopulatedDates);
      }
    },
    [navigateToStep]
  );

  const handleConfirmPlan = async () => {
    if (!modalPlan) return;
    if (modalPlan.require_terms_ack && !termsAccepted) {
      showToast('Please accept the plan terms to continue.', 'warning');
      return;
    }
    resetScheduleState(modalPlan, modalQuantity, modalFulfilment);
    setModalPlan(null);
    setTermsAccepted(false);
  };

  const handleChangePlan = () => {
    setSelectedPlanDetails(null);
    setSelectedDates([]);
    setSelectedMeals({});
    setActiveDate(null);
    setMenusByDate({});
    setMenuLoadingState({});
    loadedMenusRef.current.clear();
    navigateToStep('plans');
  };

  const handleToggleDate = (date: string) => {
    if (!selectedPlanDetails) return;

    const isSelected = selectedDates.includes(date);
    if (isSelected) {
      const remaining = selectedDates.filter((d) => d !== date);
      setSelectedDates(remaining);
      setSelectedMeals((prev) => {
        const updated = { ...prev };
        delete updated[date];
        return updated;
      });
      if (activeDate === date) {
        setActiveDate(remaining[0] ?? null);
      }
      return;
    }

    const option = deliveryOptionsLookup[date];
    const weekIndex = option?.weekIndex;
    const weekRules = selectedPlanDetails.plan.week_selection_rules;

    if (
      weekRules?.required_weeks &&
      weekIndex !== undefined &&
      !selectedDates.some(
        (selectedDate) =>
          deliveryOptionsLookup[selectedDate]?.weekIndex === weekIndex
      )
    ) {
      const existingWeeks = new Set(
        selectedDates.map((selectedDate) => {
          const lookup = deliveryOptionsLookup[selectedDate];
          return lookup ? lookup.weekIndex : undefined;
        })
      );
      if (
        existingWeeks.size >= weekRules.required_weeks &&
        !existingWeeks.has(weekIndex)
      ) {
        showToast(
          `This plan only allows ${weekRules.required_weeks} week${
            weekRules.required_weeks === 1 ? '' : 's'
          }. Deselect another week to change.`,
          'info'
        );
        return;
      }
    }

    if (
      weekRules?.deliveries_per_week &&
      weekIndex !== undefined &&
      !weekRules.allow_partial_weeks
    ) {
      const weekCount = selectedDates.filter(
        (selectedDate) =>
          deliveryOptionsLookup[selectedDate]?.weekIndex === weekIndex
      ).length;
      if (weekCount >= weekRules.deliveries_per_week) {
        showToast(
          `This plan already has ${weekRules.deliveries_per_week} delivery day${
            weekRules.deliveries_per_week === 1 ? '' : 's'
          } for that week.`,
          'info'
        );
        return;
      }
    }

    if (requiredDeliveries > 0 && selectedDates.length >= requiredDeliveries) {
      showToast(
        `This plan includes ${requiredDeliveries} delivery day${
          requiredDeliveries > 1 ? 's' : ''
        }. Deselect another date to choose a new one.`,
        'info'
      );
      return;
    }

    const updatedDates = [...selectedDates, date].sort();
    setSelectedDates(updatedDates);
    setActiveDate(date);
  };

  const handleAdjustMealQuantity = (
    date: string,
    item: MenuItem,
    delta: number
  ) => {
    if (!selectedPlanDetails) {
      showToast('Select a meal subscription plan first', 'warning');
      return;
    }

    if (!selectedDates.includes(date)) {
      showToast('Please choose a delivery day before adding meals', 'info');
      return;
    }

    setSelectedMeals((prev) => {
      const existingForDate = prev[date] || {};
      const itemId = item._id || item.id;
      const currentQuantity = existingForDate[itemId] || 0;
      const nextQuantity = Math.max(0, currentQuantity + delta);

      const maxPerMeal =
        selectedPlanDetails.plan.max_boxes_per_meal &&
        selectedPlanDetails.plan.max_boxes_per_meal > 0
          ? selectedPlanDetails.plan.max_boxes_per_meal *
            selectedPlanDetails.quantity
          : null;

      if (maxPerMeal && nextQuantity > maxPerMeal) {
        showToast(
          `This plan allows up to ${maxPerMeal} boxes per dish.`,
          'warning'
        );
        return prev;
      }

      const updatedForDate = { ...existingForDate };
      if (nextQuantity === 0) {
        delete updatedForDate[itemId];
      } else {
        updatedForDate[itemId] = nextQuantity;
      }

      const updated = { ...prev };
      if (Object.keys(updatedForDate).length === 0) {
        delete updated[date];
      } else {
        updated[date] = updatedForDate;
      }
      return updated;
    });
  };

  const scheduleDatesReady = useMemo(() => {
    if (!selectedPlanDetails) return false;
    if (selectedPlanDetails.plan.tab !== 'regular' && requiredDeliveries > 0) {
      if (selectedDates.length !== requiredDeliveries) return false;
    } else if (selectedPlanDetails.plan.tab === 'regular') {
      if (selectedDates.length === 0) return false;
    }

    const weekRules = selectedPlanDetails.plan.week_selection_rules;
    if (weekRules?.required_weeks) {
      const uniqueWeeks = new Set(
        selectedDates.map(
          (date) => deliveryOptionsLookup[date]?.weekIndex ?? null
        )
      );
      uniqueWeeks.delete(null);
      if (uniqueWeeks.size !== weekRules.required_weeks) {
        return false;
      }
    }

    if (
      weekRules &&
      !weekRules.allow_partial_weeks &&
      weekRules.deliveries_per_week
    ) {
      const counts: Record<number, number> = {};
      selectedDates.forEach((date) => {
        const weekIndex = deliveryOptionsLookup[date]?.weekIndex;
        if (weekIndex === undefined) return;
        counts[weekIndex] = (counts[weekIndex] ?? 0) + 1;
      });
      const invalidWeek = Object.values(counts).some(
        (count) => count !== weekRules.deliveries_per_week
      );
      if (invalidWeek) {
        return false;
      }
    }

    return true;
  }, [
    selectedPlanDetails,
    selectedDates,
    requiredDeliveries,
    deliveryOptionsLookup,
  ]);

  const mealsReady = useMemo(() => {
    if (!scheduleDatesReady) return false;
    if (!selectedPlanDetails) return false;
    if (selectedBoxes < minBoxesRequired) return false;

    const allDatesHaveMeals = selectedDates.every((date) => {
      const items = selectedMeals[date];
      if (!items) return false;
      const dateTotal = Object.values(items).reduce((sum, qty) => sum + qty, 0);
      return dateTotal > 0;
    });

    return allDatesHaveMeals;
  }, [
    scheduleDatesReady,
    selectedPlanDetails,
    selectedDates,
    selectedMeals,
    selectedBoxes,
    minBoxesRequired,
  ]);

  const handleProceedToReview = () => {
    if (!mealsReady) {
      showToast(
        'Please complete your meal selections before continuing.',
        'info'
      );
      return;
    }
    navigateToStep('review');
  };

  const handleProceedToMeals = async () => {
    if (!scheduleDatesReady) {
      showToast('Please select the required delivery days first.', 'info');
      return;
    }
    if (!selectedPlanDetails) return;
    if (selectedDates.length === 0) {
      showToast('Select at least one delivery day to continue.', 'info');
      return;
    }
    await Promise.all(
      selectedDates.map((date) =>
        fetchMenuForDate(date, selectedPlanDetails.plan)
      )
    );
    setActiveDate(selectedDates[0]);
    navigateToStep('menu');
  };

  const handleProceedToCheckout = () => {
    if (!selectedPlanDetails) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      // Save pending action for meal subscription
      setPendingCartAction({
        type: 'meal_subscription',
        timestamp: new Date().toISOString(),
      });

      // Open auth modal
      openModal('login', '/meals-subscription');
      showToast('Please login or sign up to proceed with checkout', 'warning');
      return;
    }

    const schedule = selectedDates.map((date) => {
      const selections = selectedMeals[date] || {};
      const items: ScheduledItem[] = Object.entries(selections)
        .map(([itemId, quantity]) => {
          const menu = menusByDate[date]?.find(
            (menuItem) => (menuItem._id || menuItem.id) === itemId
          );
          if (!menu) return null;
          return { item: menu, quantity };
        })
        .filter(Boolean) as ScheduledItem[];
      return { date, items };
    });

    const payload: SubscriptionReviewPayload = {
      plan: selectedPlanDetails.plan,
      planQuantity: selectedPlanDetails.quantity,
      fulfilment: selectedPlanDetails.fulfilment,
      schedule,
      includedBoxes,
      totalBoxes: selectedBoxes,
      extraBoxes,
      maxPerMeal: selectedPlanDetails.plan.max_boxes_per_meal,
    };

    navigate('/checkout', {
      state: {
        subscriptionDetails: payload,
      },
    });
  };

  const buildSubscriptionUpdatePayload = () => {
    if (!selectedPlanDetails) {
      throw new Error('Please select a meal plan before continuing.');
    }

    if (selectedDates.length === 0) {
      throw new Error('Please select at least one delivery day to continue.');
    }

    const plan = selectedPlanDetails.plan;
    const planId = (plan as any)._id || (plan as any).id;
    if (!planId) {
      throw new Error('Unable to identify the selected meal plan.');
    }

    const planSelectionsPayload = [
      {
        plan_id: planId,
        quantity: selectedPlanDetails.quantity,
      },
    ];

    const deliverySlotsPayload = selectedDates.map((date) => {
      const meals = selectedMeals[date] || {};
      if (!Object.keys(meals).length) {
        throw new Error('Please assign meals to every selected delivery day.');
      }
      return {
        delivery_date: date,
        menu_items: meals,
      };
    });

    return {
      plan_selections: planSelectionsPayload,
      delivery_slots: deliverySlotsPayload,
      fulfilment_method: selectedPlanDetails.fulfilment,
      is_express: editingDetails?.is_express ?? false,
      delivery_address_id: editingDetails?.delivery_address_id,
      delivery_instructions: editingDetails?.delivery_instructions ?? undefined,
      notes: editingDetails?.notes ?? undefined,
      payment_method: editingDetails?.payment_method ?? 'cash',
    };
  };

  const handleSaveEdits = async () => {
    if (!editingOrderId) {
      return;
    }
    try {
      const payload = buildSubscriptionUpdatePayload();
      setIsSavingEdit(true);
      await ordersAPI.updateMealSubscriptionOrder(editingOrderId, payload);
      showToast('Meal selections updated successfully.', 'success');
      if (fetchOrderHistory) {
        await fetchOrderHistory();
      }
      clearEditingState();
      navigate('/profile');
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update subscription.';
      showToast(message, 'error');
    } finally {
      setIsSavingEdit(false);
    }
  };

  const renderPlanCard = (plan: MealSubscriptionPlan) => {
    const includedMeals = plan.included_meals || 0;
    const deliveries = plan.deliveries_per_cycle || 0;
    const planDays = resolvePlanDeliveryDays(plan);
    const formatDayLabel = (day: string) =>
      day.charAt(0).toUpperCase() + day.slice(1);
    const dayDetails = planDays.map((day) => {
      const configuredCount =
        plan.menu_item_ids_by_day?.[day]?.length ??
        plan.menu_items_by_day?.[day]?.length ??
        0;
      return {
        label: formatDayLabel(day),
        configuredCount,
      };
    });

    const isSelected =
      selectedPlanDetails?.plan?._id &&
      plan._id &&
      selectedPlanDetails.plan._id === plan._id;

    return (
      <Card
        key={plan._id}
        hoverable
        onClick={() => handleOpenPlanModal(plan)}
        className={clsx(
          'w-full max-w-xl mx-auto md:mx-0 border border-transparent transition-all duration-200 group',
          isSelected
            ? 'ring-2 ring-primary border-primary shadow-lg'
            : 'hover:border-primary/40 hover:shadow-md'
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-heading font-semibold text-text mb-1">
              {plan.name}
            </h3>
            <p className="text-sm text-gray-500">{plan.description}</p>
          </div>
          {plan.display_badge && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              {plan.display_badge}
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-3">
            <Utensils className="text-primary" size={18} />
            <div>
              <p className="font-semibold text-text">{includedMeals}</p>
              <p>Meals included</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CalendarRange className="text-primary" size={18} />
            <div>
              <p className="font-semibold text-text">
                {deliveries || 'Flexible'}
              </p>
              <p>Delivery {deliveries === 1 ? 'day' : 'days'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Package className="text-primary" size={18} />
            <div>
              <p className="font-semibold text-text">
                {formatCurrency(plan.price_per_plan || 0)}
              </p>
              <p>Total plan price</p>
            </div>
          </div>
          {planDays.length > 0 && (
            <div className="flex items-center space-x-3 sm:col-span-2">
              <Truck className="text-primary" size={18} />
              <div>
                <div className="flex flex-wrap gap-2">
                  {dayDetails.map(({ label, configuredCount }) => (
                    <span
                      key={label}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-sm font-medium text-text"
                    >
                      {label}
                      {configuredCount > 0 && (
                        <span className="ml-2 text-xs text-gray-600">
                          {configuredCount} menu item
                          {configuredCount === 1 ? '' : 's'}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <p>Configured delivery days</p>
              </div>
            </div>
          )}
          {plan.price_per_box ? (
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="text-primary" size={18} />
              <div>
                <p className="font-semibold text-text">
                  {formatCurrency(plan.price_per_box)}
                </p>
                <p>Per meal after discount</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Click to customise this plan
          </div>
          <Button variant="outline" size="sm">
            Configure
          </Button>
        </div>
      </Card>
    );
  };

  const renderPlanSelectionStep = () => {
    const tabHelper =
      PLAN_TAB_COPY[activePlanTab]?.helper ??
      'Select the plan that best suits your schedule.';

    return (
      <div className="space-y-8">
        <div className="flex flex-wrap gap-2">
          {availableTabs.length === 0 && (
            <span className="text-sm text-gray-500">
              No subscription plans are available right now.
            </span>
          )}
          {availableTabs.map((tab) => (
            <button
              key={tab}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-semibold border transition-colors',
                activePlanTab === tab
                  ? 'bg-primary text-white border-primary shadow'
                  : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
              )}
              onClick={() => setActivePlanTab(tab)}
            >
              {PLAN_TAB_COPY[tab]?.label ?? tab}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500">{tabHelper}</p>
        {regularUpsellCopy && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {regularUpsellCopy}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center md:justify-items-stretch">
          {displayedPlans.length === 0 ? (
            <Card className="w-full p-6 text-center text-gray-500">
              No plans are configured for this tab yet.
            </Card>
          ) : (
            displayedPlans.map(renderPlanCard)
          )}
        </div>
      </div>
    );
  };

  const renderScheduleStep = () => {
    if (!selectedPlanDetails) return null;

    const plan = selectedPlanDetails.plan;
    const weekRules = plan.week_selection_rules;
    const reminderSettings = plan.reminder_settings;
    const reminderEnabled = reminderSettings?.enabled;
    const customerReminderCopy =
      plan.customer_notifications?.reminder_message || null;

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={handleChangePlan}
              className="inline-flex items-center text-primary text-sm font-semibold hover:underline"
            >
              <ChevronLeft size={16} className="mr-1" />
              Change plan
            </button>
            <h2 className="text-3xl font-heading font-bold text-text mt-2">
              Schedule your {plan.name}
            </h2>
            <p className="text-gray-600">
              Select delivery days. Included boxes:{' '}
              <span className="font-semibold text-text">{includedBoxes}</span>
            </p>
          </div>
          <div className="bg-primary/10 px-5 py-3 rounded-lg text-primary font-semibold">
            {formatCurrency(plan.price_per_plan || 0)} per cycle
          </div>
        </div>

        {weekRules && (
          <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Choose {weekRules.required_weeks ?? '?'} week
            {weekRules.required_weeks === 1 ? '' : 's'} within the next{' '}
            {weekRules.available_weeks ?? '?'} weeks. Each selected week should
            include{' '}
            {weekRules.deliveries_per_week ?? plan.deliveries_per_cycle ?? '?'}{' '}
            delivery day
            {(weekRules.deliveries_per_week ?? plan.deliveries_per_cycle) === 1
              ? ''
              : 's'}
            .
          </div>
        )}

        <Card className="border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-text">
                Select delivery days
              </h3>
              <p className="text-sm text-gray-500">
                {plan.tab === 'regular'
                  ? 'Choose your preferred delivery or pickup days.'
                  : `This plan includes ${requiredDeliveries} delivery day${
                      requiredDeliveries > 1 ? 's' : ''
                    } each cycle.`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {upcomingDates.map((option) => {
              const isSelected = selectedDates.includes(option.date);
              const isDisabled =
                !isSelected &&
                requiredDeliveries > 0 &&
                selectedDates.length >= requiredDeliveries;

              return (
                <button
                  key={option.date}
                  onClick={() => handleToggleDate(option.date)}
                  className={clsx(
                    'px-4 py-2 rounded-full border transition-colors text-sm font-semibold',
                    isSelected
                      ? 'bg-primary text-white border-primary shadow'
                      : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary',
                    isDisabled && 'opacity-40 cursor-not-allowed'
                  )}
                  disabled={isDisabled}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </Card>

        {(reminderEnabled || customerReminderCopy) && (
          <Card className="border border-amber-100 bg-amber-50/60">
            <div className="flex items-start space-x-3">
              <Info className="text-amber-500 mt-1" size={18} />
              <div className="space-y-1 text-sm text-amber-800">
                <div className="font-semibold text-amber-900">
                  Reminder preferences
                </div>
                {reminderEnabled ? (
                  <p>
                    We’ll send a reminder every{' '}
                    <span className="font-semibold">
                      {reminderSettings?.frequency_days ?? 7}
                    </span>{' '}
                    day(s) via{' '}
                    <span className="font-semibold">
                      {reminderSettings?.channel
                        ?.replace('_', ' ')
                        .toUpperCase() || 'IN_APP'}
                    </span>
                    {typeof reminderSettings?.threshold_unselected_boxes ===
                      'number' &&
                      reminderSettings.threshold_unselected_boxes > 0 &&
                      ` once you have more than ${
                        reminderSettings.threshold_unselected_boxes
                      } unassigned box(es).`}
                  </p>
                ) : (
                  <p>
                    Reminders are not enabled for this plan. You can review your
                    schedule anytime from your account.
                  </p>
                )}
                {customerReminderCopy && (
                  <p className="text-sm text-amber-900">
                    {customerReminderCopy}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        <Card className="border border-gray-100">
          <h3 className="text-lg font-semibold text-text mb-4">Summary</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Selected deliveries</span>
              <span className="font-semibold text-text">
                {selectedDates.length}
                {plan.tab !== 'regular' && requiredDeliveries
                  ? ` / ${requiredDeliveries}`
                  : ''}
              </span>
            </div>
            {weekRules?.required_weeks && (
              <div className="flex items-center justify-between">
                <span>Weeks chosen</span>
                <span className="font-semibold text-text">
                  {
                    new Set(
                      selectedDates.map(
                        (date) => deliveryOptionsLookup[date]?.weekIndex
                      )
                    ).size
                  }{' '}
                  / {weekRules.required_weeks}
                </span>
              </div>
            )}
            {plan.tab === 'regular' && (
              <div className="text-xs text-gray-500">
                Minimum boxes for {selectedPlanDetails.fulfilment}:{' '}
                <span className="font-semibold text-text">
                  {minBoxesRequired}
                </span>
              </div>
            )}
          </div>
        </Card>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <Truck size={16} className="text-primary" />
            <span>
              Delivery fees are calculated per delivery day based on your
              postcode during checkout.
            </span>
          </div>
          <div className="space-x-3">
            <Button variant="outline" onClick={handleChangePlan}>
              Change Plan
            </Button>
            <Button
              variant="primary"
              onClick={handleProceedToMeals}
              disabled={!scheduleDatesReady}
            >
              Choose Meals
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderMealsStep = () => {
    if (!selectedPlanDetails) return null;
    if (selectedDates.length === 0) {
      return (
        <Card className="border border-gray-100">
          <div className="p-8 text-center text-gray-500">
            Select your delivery days first to unlock the meal selector.
          </div>
        </Card>
      );
    }

    const plan = selectedPlanDetails.plan;
    const maxPerMeal =
      plan.max_boxes_per_meal && plan.max_boxes_per_meal > 0
        ? plan.max_boxes_per_meal * selectedPlanDetails.quantity
        : null;

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigateToStep('schedule')}
              className="inline-flex items-center text-primary text-sm font-semibold hover:underline"
            >
              <ChevronLeft size={16} className="mr-1" />
              Adjust delivery days
            </button>
            <h2 className="text-3xl font-heading font-bold text-text mt-2">
              Choose meals for your {plan.name}
            </h2>
            <p className="text-gray-600">
              Included boxes:{' '}
              <span className="font-semibold text-text">{includedBoxes}</span>
            </p>
          </div>
          <div className="bg-primary/10 px-5 py-3 rounded-lg text-primary font-semibold">
            {formatCurrency(plan.price_per_plan || 0)} per cycle
          </div>
        </div>

        {plan.customer_notifications?.reminder_message && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {plan.customer_notifications.reminder_message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6 items-start">
          <Card className="border border-gray-100">
            <h3 className="text-lg font-semibold text-text mb-4">Summary</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Selected deliveries</span>
                <span className="font-semibold text-text">
                  {selectedDates.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total boxes selected</span>
                <span className="font-semibold text-text">{selectedBoxes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Included boxes</span>
                <span className="font-semibold text-text">{includedBoxes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Extra boxes</span>
                <span
                  className={clsx(
                    'font-semibold',
                    extraBoxes > 0 ? 'text-primary' : 'text-text'
                  )}
                >
                  {extraBoxes}
                </span>
              </div>
              {plan.tab === 'regular' && (
                <div className="text-xs text-gray-500">
                  Minimum boxes for {selectedPlanDetails.fulfilment}:{' '}
                  <span className="font-semibold text-text">
                    {minBoxesRequired}
                  </span>
                </div>
              )}
              {maxPerMeal && (
                <div className="text-xs text-gray-500">
                  Maximum boxes per dish: {maxPerMeal}
                </div>
              )}
            </div>
          </Card>

          <Card className="border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text">
                {activeDate
                  ? `Meals for ${new Date(activeDate).toLocaleDateString(
                      'en-AU',
                      {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short',
                      }
                    )}`
                  : 'Select a delivery day'}
              </h3>
              {activeDate && (
                <span className="text-xs text-gray-500">
                  Click a day to switch menus
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setActiveDate(date)}
                  className={clsx(
                    'px-3 py-1 rounded-full text-xs font-semibold transition-colors',
                    activeDate === date
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
                  )}
                >
                  {new Date(date).toLocaleDateString('en-AU', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </button>
              ))}
            </div>

            {!activeDate && (
              <div className="py-12 text-center text-gray-500">
                Select a delivery day to view menu options.
              </div>
            )}

            {activeDate && menuLoadingState[activeDate] && (
              <LoadingScreen variant="section" message="Loading meals..." />
            )}

            {activeDate &&
              !menuLoadingState[activeDate] &&
              (menusByDate[activeDate]?.length || 0) === 0 && (
                <div className="py-12 text-center text-gray-500">
                  Menu not available for this date yet. Please choose another
                  day.
                </div>
              )}

            {activeDate &&
              !menuLoadingState[activeDate] &&
              (menusByDate[activeDate]?.length || 0) > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menusByDate[activeDate]?.map((item) => {
                    const itemId = item._id || item.id;
                    const currentCount =
                      selectedMeals[activeDate]?.[itemId] || 0;

                    return (
                      <div
                        key={itemId}
                        className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-3"
                      >
                        <div>
                          <h4 className="font-semibold text-text">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{formatCurrency(item.price)}</span>
                          <span>
                            Max{' '}
                            {plan.max_boxes_per_meal
                              ? plan.max_boxes_per_meal *
                                selectedPlanDetails.quantity
                              : '—'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleAdjustMealQuantity(activeDate, item, -1)
                            }
                          >
                            -
                          </Button>
                          <span className="text-xl font-semibold text-text">
                            {currentCount}
                          </span>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              handleAdjustMealQuantity(activeDate, item, 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigateToStep('schedule')}>
            Adjust delivery days
          </Button>
          <Button
            variant="primary"
            onClick={handleProceedToReview}
            disabled={!mealsReady}
          >
            Review Selection
          </Button>
        </div>
      </div>
    );
  };

  const renderReviewStep = () => {
    if (!selectedPlanDetails) return null;

    const plan = selectedPlanDetails.plan;

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigateToStep('schedule')}
              className="inline-flex items-center text-primary text-sm font-semibold hover:underline"
            >
              <ChevronLeft size={16} className="mr-1" />
              Edit meals
            </button>
            <h2 className="text-3xl font-heading font-bold text-text mt-2">
              Review your subscription
            </h2>
            <p className="text-gray-600">
              Confirm your schedule, selected meals, and plan details.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Plan price</div>
            <div className="text-3xl font-heading font-bold text-primary">
              {formatCurrency(plan.price_per_plan || 0)}
            </div>
          </div>
        </div>

        <Card className="border border-gray-100">
          <h3 className="text-lg font-semibold text-text mb-4">Plan summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>
              <div className="text-xs uppercase text-gray-400">Plan</div>
              <div className="font-semibold text-text mt-1">{plan.name}</div>
              <div className="text-xs text-gray-500">
                Qty: {selectedPlanDetails.quantity}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-400">Fulfilment</div>
              <div className="font-semibold text-text mt-1 capitalize">
                {selectedPlanDetails.fulfilment}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-400">
                Included boxes
              </div>
              <div className="font-semibold text-text mt-1">
                {includedBoxes}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-400">Extra boxes</div>
              <div
                className={clsx(
                  'font-semibold mt-1',
                  extraBoxes > 0 ? 'text-primary' : 'text-text'
                )}
              >
                {extraBoxes}
              </div>
            </div>
          </div>
        </Card>

        <Card className="border border-gray-100">
          <h3 className="text-lg font-semibold text-text mb-4">
            Delivery schedule & meals
          </h3>
          <div className="space-y-4">
            {selectedDates.map((date) => {
              const selections = selectedMeals[date] || {};
              const items: ScheduledItem[] = Object.entries(selections)
                .map(([itemId, quantity]) => {
                  const menu = menusByDate[date]?.find(
                    (menuItem) => (menuItem._id || menuItem.id) === itemId
                  );
                  if (!menu) return null;
                  return { item: menu, quantity };
                })
                .filter(Boolean) as ScheduledItem[];

              return (
                <div
                  key={date}
                  className="border border-gray-200 rounded-lg p-4 text-sm text-gray-600"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <CalendarRange className="text-primary" size={18} />
                      <span className="font-semibold text-text">
                        {new Date(date).toLocaleDateString('en-AU', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {items.reduce((sum, entry) => sum + entry.quantity, 0)}{' '}
                      boxes
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {items.map(({ item, quantity }) => (
                      <div
                        key={item._id || item.id}
                        className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 flex items-center justify-between"
                      >
                        <span className="font-medium text-text">
                          {item.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          x{quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="border border-gray-100">
          <div className="flex items-start space-x-3">
            <Truck className="text-primary mt-1" size={18} />
            <div className="text-sm text-gray-600">
              <p>
                Delivery charges are based on your postcode and multiplied by
                the number of delivery days selected. Pickup orders will not
                incur a delivery fee.
              </p>
              <p className="mt-2">
                You&apos;ll confirm your address and review final pricing at
                checkout.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigateToStep('schedule')}>
            <Edit2 size={18} className="mr-2" />
            Edit meals
          </Button>
          {editingOrderId ? (
            <Button
              variant="primary"
              onClick={handleSaveEdits}
              isLoading={isSavingEdit}
            >
              Save Changes
            </Button>
          ) : (
            <Button variant="primary" onClick={handleProceedToCheckout}>
              Continue to Checkout
            </Button>
          )}
        </div>
      </div>
    );
  };
  if (isLoadingPlans || (editingOrderId && isLoadingEdit)) {
    return (
      <LoadingScreen
        message={
          isLoadingPlans
            ? 'Loading meal subscriptions...'
            : 'Loading your subscription...'
        }
      />
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom space-y-12">
        {editingOrderId && (
          <div className="rounded-lg border border-primary/30 bg-white px-4 py-3 shadow-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-primary font-medium">
              Editing subscription #{editingDetails?.order_number ?? editingOrderId.slice(-6)}
            </div>
            <Button variant="ghost" size="sm" onClick={handleExitEditing}>
              Exit edit mode
            </Button>
          </div>
        )}
        <div className="flex items-center space-x-3 text-sm">
          {['plans', 'schedule', 'menu', 'review'].map((step, index) => (
            <span
              key={step}
              className={clsx(
                'px-3 py-1 rounded-full',
                currentStep === step
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-500 border border-gray-200'
              )}
            >
              {index + 1}.{' '}
              {step === 'plans'
                ? 'Choose Plan'
                : step === 'schedule'
                  ? 'Delivery Schedule'
                : step === 'menu'
                    ? 'Choose Meals'
                    : 'Review'}
            </span>
          ))}
        </div>

        {currentStep === 'plans' && renderPlanSelectionStep()}
        {currentStep === 'schedule' && renderScheduleStep()}
        {currentStep === 'menu' && renderMealsStep()}
        {currentStep === 'review' && renderReviewStep()}
      </div>

      <Modal
        isOpen={!!modalPlan}
        onClose={() => {
          setModalPlan(null);
          setTermsAccepted(false);
        }}
        title={modalPlan ? modalPlan.name : 'Plan Details'}
        size="lg"
      >
        {modalPlan && (
          <div className="space-y-6">
            <div className="text-sm text-gray-600 space-y-2">
              <p>{modalPlan.description}</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  {modalPlan.included_meals || 0} meals included (
                  {modalPlan.deliveries_per_cycle || 0} delivery day
                  {modalPlan.deliveries_per_cycle === 1 ? '' : 's'}).
                </li>
                <li>
                  Base price:{' '}
                  <span className="font-semibold text-text">
                    {formatCurrency(modalPlan.price_per_plan || 0)}
                  </span>
                </li>
                {modalPlan.price_per_box && (
                  <li>
                    Per meal after discount:{' '}
                    <span className="font-semibold text-text">
                      {formatCurrency(modalPlan.price_per_box)}
                    </span>
                  </li>
                )}
                {modalPlan.max_boxes_per_meal && (
                  <li>
                    {modalPlan.max_boxes_per_meal} boxes per dish per plan.
                  </li>
                )}
              </ul>
            </div>

            {modalPlan.terms_and_conditions?.length ? (
              <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 space-y-2">
                <h4 className="font-semibold text-text text-base">
                  Terms & Conditions
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {modalPlan.terms_and_conditions.map((term) => (
                    <li key={term}>{term}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {modalPlan.require_terms_ack && (
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span>
                  {modalPlan.acknowledgement_label ||
                    'I agree to the plan terms and conditions.'}
                </span>
              </label>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modalPlan.allow_multiple && (
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Number of plans
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={modalQuantity}
                    onChange={(e) =>
                      setModalQuantity(Math.max(1, Number(e.target.value)))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}

              {modalPlan.tab === 'regular' && (
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Fulfilment method
                  </label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setModalFulfilment('delivery')}
                      className={clsx(
                        'flex-1 px-3 py-2 rounded-lg border text-sm font-semibold transition-colors',
                        modalFulfilment === 'delivery'
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                      )}
                    >
                      Delivery
                    </button>
                    <button
                      onClick={() => setModalFulfilment('pickup')}
                      className={clsx(
                        'flex-1 px-3 py-2 rounded-lg border text-sm font-semibold transition-colors',
                        modalFulfilment === 'pickup'
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                      )}
                    >
                      Pickup
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Minimum boxes: {modalPlan.min_boxes_delivery ?? 4} for
                    delivery,
                    {modalPlan.min_boxes_pickup ?? 1} for pickup.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={() => setModalPlan(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirmPlan}>
                Continue
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MealsSubscriptionPage;
```
</details>

---

### ⚛️ ProfilePage.tsx
**Path:** `src\pages\customer\ProfilePage.tsx`

<details>
<summary>View Code (702 lines)</summary>

```tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useAddressStore } from '@store/addressStore';
import { useOrderStore } from '@store/orderStore';
import { useToast } from '@components/common/Toast';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import LoadingScreen from '@components/common/LoadingScreen';
import Modal from '@components/common/Modal';
import {
  User,
  MapPin,
  Package,
  Settings,
  Bell,
  CreditCard,
  Edit2,
  Trash2,
  Plus,
  Check,
  X,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@utils/formatters';
import type { Order } from '@models/order.types';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const {
    addresses,
    fetchAddresses,
    addAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddressStore();
  const { orderHistory, fetchOrderHistory } = useOrderStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'addresses' | 'orders'
  >('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Address form state
  const [addressForm, setAddressForm] = useState({
    label: '',
    street: '',
    suburb: '',
    postcode: '',
    state: 'NSW',
    delivery_instructions: '',
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchAddresses(), fetchOrderHistory()]);
      } catch (error) {
        showToast('Failed to load profile data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      showToast('Profile updated successfully', 'success');
      setIsEditingProfile(false);
    } catch (error) {
      showToast('Failed to update profile', 'error');
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAddress(addressForm);
      showToast('Address added successfully', 'success');
      setIsAddingAddress(false);
      setAddressForm({
        label: '',
        street: '',
        suburb: '',
        postcode: '',
        state: 'NSW',
        delivery_instructions: '',
      });
    } catch (error) {
      showToast('Failed to add address', 'error');
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
        showToast('Address deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete address', 'error');
      }
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      await setDefaultAddress(addressId);
      showToast('Default address updated', 'success');
    } catch (error) {
      showToast('Failed to update default address', 'error');
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Loading profile..." />;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-text mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card padding="md">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {user?.full_name?.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-text text-lg">
                  {user?.full_name}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User size={20} />
                  <span className="font-medium">Personal Info</span>
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MapPin size={20} />
                  <span className="font-medium">Addresses</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package size={20} />
                  <span className="font-medium">Order History</span>
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-bold text-text">
                    Personal Information
                  </h2>
                  {!isEditingProfile && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingProfile(true)}
                    >
                      <Edit2 size={16} className="mr-2" />
                      Edit
                    </Button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <Input
                      type="text"
                      label="Full Name"
                      value={profileForm.full_name}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          full_name: e.target.value,
                        })
                      }
                      leftIcon={<User size={20} />}
                      required
                    />

                    <Input
                      type="email"
                      label="Email Address"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          email: e.target.value,
                        })
                      }
                      leftIcon={<Mail size={20} />}
                      required
                    />

                    <Input
                      type="tel"
                      label="Phone Number"
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          phone: e.target.value,
                        })
                      }
                      leftIcon={<Phone size={20} />}
                      required
                    />

                    <div className="flex space-x-3">
                      <Button type="submit" variant="primary">
                        <Check size={16} className="mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditingProfile(false);
                          setProfileForm({
                            full_name: user?.full_name || '',
                            email: user?.email || '',
                            phone: user?.phone || '',
                          });
                        }}
                      >
                        <X size={16} className="mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
                      <User className="text-gray-400" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-semibold text-text">
                          {user?.full_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
                      <Mail className="text-gray-400" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-semibold text-text">{user?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
                      <Phone className="text-gray-400" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-semibold text-text">{user?.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 py-4">
                      <Calendar className="text-gray-400" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-semibold text-text">
                          {formatDate(user?.created_at || '')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-2xl font-bold text-text">
                      Saved Addresses
                    </h2>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setIsAddingAddress(true)}
                    >
                      <Plus size={16} className="mr-2" />
                      Add Address
                    </Button>
                  </div>

                  {addresses.length === 0 ? (
                    <div className="text-center py-12">
                      <MapPin className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-gray-600 mb-4">
                        No saved addresses yet
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingAddress(true)}
                      >
                        Add Your First Address
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div
                          key={address._id}
                          className={`border-2 rounded-lg p-4 transition-all ${
                            address.is_default
                              ? 'border-primary bg-primary-50'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-text mb-1">
                                {address.label}
                              </h3>
                              {address.is_default && (
                                <span className="inline-block px-2 py-1 bg-primary text-white text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteAddress(address._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <p className="text-sm text-gray-700 mb-3">
                            {address.street}
                            <br />
                            {address.suburb}, {address.state} {address.postcode}
                          </p>

                          {!address.is_default && (
                            <Button
                              variant="outline"
                              size="sm"
                              fullWidth
                              onClick={() =>
                                handleSetDefaultAddress(address._id)
                              }
                            >
                              Set as Default
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <Card padding="lg">
                <h2 className="font-heading text-2xl font-bold text-text mb-6">
                  Order History
                </h2>

                {orderHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-gray-600 mb-4">No orders yet</p>
                    <Button
                      variant="primary"
                      onClick={() => (window.location.href = '/menu/daily')}
                    >
                      Start Ordering
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div
                        key={order._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-text">
                              Order #{order._id.slice(-8)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.created_at)}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {order.status.toUpperCase().replace('_', ' ')}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm mb-3">
                          <p className="text-gray-600">
                            {order.items.length} item(s)
                          </p>
                          <p className="font-semibold text-text">
                            {formatCurrency(order.total)}
                          </p>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          onClick={() => {
                            setSelectedOrder(order as unknown as Order)
                            setIsOrderModalOpen(true)
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddingAddress}
        onClose={() => setIsAddingAddress(false)}
        title="Add New Address"
      >
        <form onSubmit={handleAddAddress} className="space-y-4">
          <Input
            type="text"
            label="Label (e.g., Home, Work)"
            value={addressForm.label}
            onChange={(e) =>
              setAddressForm({ ...addressForm, label: e.target.value })
            }
            required
      />
          <Input
            type="text"
            label="Street Address"
            value={addressForm.street}
            onChange={(e) =>
              setAddressForm({ ...addressForm, street: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Suburb"
              value={addressForm.suburb}
              onChange={(e) =>
                setAddressForm({ ...addressForm, suburb: e.target.value })
              }
              required
            />

            <Input
              type="text"
              label="Postcode"
              value={addressForm.postcode}
              onChange={(e) =>
                setAddressForm({ ...addressForm, postcode: e.target.value })
              }
              maxLength={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              State
            </label>
            <select
              value={addressForm.state}
              onChange={(e) =>
                setAddressForm({ ...addressForm, state: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="NSW">NSW</option>
              <option value="VIC">VIC</option>
              <option value="QLD">QLD</option>
              <option value="SA">SA</option>
              <option value="WA">WA</option>
              <option value="TAS">TAS</option>
              <option value="ACT">ACT</option>
              <option value="NT">NT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Delivery Instructions (Optional)
            </label>
            <textarea
              value={addressForm.delivery_instructions}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  delivery_instructions: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          <div className="flex space-x-3">
            <Button type="submit" variant="primary" fullWidth>
              Add Address
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddingAddress(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Order Details Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false)
          setSelectedOrder(null)
        }}
        title={
          selectedOrder
            ? `Order #${selectedOrder._id?.slice(-8)?.toUpperCase()}`
            : 'Order Details'
        }
      >
        {!selectedOrder ? (
          <div className="py-6 text-center text-gray-600">
            No order selected.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Placed on</p>
                <p className="font-medium">
                  {formatDate(selectedOrder.created_at)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedOrder.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : selectedOrder.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                }`}
              >
                {selectedOrder.status?.toUpperCase().replace('_', ' ')}
              </span>
            </div>

            <div className="divide-y border rounded">
              {[...(selectedOrder.items || []), ...(selectedOrder.sidelines || [])].map(
                (item: any, index: number) => (
                  <div
                    key={`${item._id || item.menu_item?._id || index}-${index}`}
                    className="flex items-center justify-between p-3 text-sm"
                  >
                    <div className="text-gray-700">
                      {item.menu_item?.name || item.item_name || item.name || 'Item'}
                      {item.category ? (
                        <span className="text-gray-400"> • {item.category}</span>
                      ) : null}
                    </div>
                    <div className="text-gray-600">
                      x{item.quantity ?? 1}
                    </div>
                    <div className="font-medium">
                      {formatCurrency(
                        item.subtotal ??
                          (item.price || item.menu_item?.price || 0) *
                            (item.quantity ?? 1)
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex items-center justify-between pt-2 text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                {formatCurrency(selectedOrder.subtotal || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium">
                {formatCurrency(selectedOrder.delivery_fee || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                {formatCurrency(
                  selectedOrder.total ?? (selectedOrder as any).total_amount ?? 0
                )}
              </span>
            </div>

            <div className="pt-2 text-xs text-gray-500">
              Delivery method:{' '}
              {String(
                selectedOrder.delivery_option ||
                  (selectedOrder as any).delivery_method ||
                  'N/A'
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProfilePage;
```
</details>

---

### ⚛️ ContactPage.tsx
**Path:** `src\pages\public\ContactPage.tsx`

<details>
<summary>View Code (312 lines)</summary>

```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useToast } from '@/components/common/Toast';
import apiClient from '@/api/client';

const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.post('/contact', formData);
      showToast(
        'Message sent successfully! We will contact you soon.',
        'success'
      );
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Failed to send contact message', error);
      showToast('Failed to send message. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Background with Image and Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80')`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-primary-50" />

        {/* Decorative Circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] bg-repeat" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-5xl font-bold text-text mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              Get in touch with Bakar's Food & Catering
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 shadow-2xl backdrop-blur-sm bg-white/95 border-2 border-primary/10">
                <h2 className="font-heading text-3xl font-bold mb-6 text-text flex items-center">
                  <Send className="mr-3 text-primary" size={28} />
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    type="text"
                    label="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-white"
                  />

                  <Input
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-white"
                  />

                  <Input
                    type="tel"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="bg-white"
                  />

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300"
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                    className="transform hover:scale-105 transition-transform duration-300"
                  >
                    <Send size={20} className="mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Address Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="p-8 shadow-xl backdrop-blur-sm bg-white/95 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-gradient-to-br from-primary to-orange-600 rounded-full">
                      <MapPin className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-text mb-2">
                        Address
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        504-508 Woodville Rd
                        <br />
                        Guildford, NSW 2161
                        <br />
                        Sydney, Australia
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="p-8 shadow-xl backdrop-blur-sm bg-white/95 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full">
                      <Phone className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-text mb-2">
                        Phone
                      </h3>
                      <a
                        href="tel:+61XXXXXXXXX"
                        className="text-primary hover:text-primary-600 text-lg font-semibold transition-colors duration-300"
                      >
                        +61 480 573 034
                      </a>
                      <p className="text-gray-600 mt-1">
                        Call us for enquiries
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Email Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="p-8 shadow-xl backdrop-blur-sm bg-white/95 border-2 border-primary/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
                      <Mail className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-text mb-2">
                        Email
                      </h3>
                      <a
                        href="mailto:bakarsfoods@gmail.com"
                        className="text-primary hover:text-primary-600 text-lg font-semibold transition-colors duration-300 break-all"
                      >
                        bakarsfoods@gmail.com
                      </a>
                      <p className="text-gray-600 mt-1">Send us an email</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Business Hours Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="p-8 shadow-xl backdrop-blur-sm bg-gradient-to-br from-primary to-orange-600 text-white border-2 border-primary/20">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                      <Clock className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl font-bold mb-4">
                        Business Hours
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">
                            Monday - Sunday:
                          </span>
                          <span className="font-bold text-lg">
                            11:00 AM - 9:00 PM
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-white/90 text-sm">
                          We're open 7 days a week to serve you the best
                          Pakistani & Indian cuisine
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Map Section (Optional) */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12"
          >
            <Card className="p-6 shadow-xl backdrop-blur-sm bg-white/95 border-2 border-primary/10">
              <h3 className="font-heading text-2xl font-bold text-text mb-4">
                Find Us On Map
              </h3>
              <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  title="Bakar's Food Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.8!2d150.9948!3d-33.8558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDUxJzIwLjkiUyAxNTDCsDU5JzQxLjMiRQ!5e0!3m2!1sen!2sau!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
```
</details>

---

### ⚛️ ForgotPasswordPage.tsx
**Path:** `src\pages\public\ForgotPasswordPage.tsx`

<details>
<summary>View Code (146 lines)</summary>

```tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@components/common/Card';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@components/common/Toast';

const ForgotPasswordPage: React.FC = () => {
  const { requestPasswordReset } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      showToast('Please enter your email address', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPasswordReset(email.trim().toLowerCase());
      setIsSent(true);
      showToast(
        'If an account exists for this email, a reset link has been sent.',
        'success'
      );
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Unable to send reset email. Please try again later.';
      showToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/10 py-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <Card className="shadow-2xl border border-gray-100 rounded-2xl px-8 py-10 space-y-8">
          <div className="flex items-start justify-between">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to login
            </Link>
            {!isSent && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Step 1 of 2
              </span>
            )}
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
              <Mail size={22} />
            </div>
            <h1 className="font-heading text-3xl font-semibold text-text">
              Forgot Password
            </h1>
            <p className="text-gray-600 leading-relaxed">
              We’ll send a secure link to help you create a brand new password.
              You’ll be back at the menu in no time.
            </p>
          </div>

          {isSent ? (
            <div className="text-center space-y-5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500">
                <CheckCircle size={32} />
              </div>
              <div className="space-y-2">
                <p className="text-gray-700 font-medium">
                  Check your inbox for the reset email.
                </p>
                <p className="text-sm text-gray-500">
                  Didn’t receive it? Make sure to check your spam folder or try
                  another email below.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsSent(false);
                  setEmail('');
                }}
              >
                Use a different email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  leftIcon={<Mail size={18} />}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="rounded-xl shadow-lg shadow-primary/20 py-3"
              >
                {isSubmitting ? 'Sending reset link...' : 'Send reset link'}
              </Button>

              <div className="text-xs text-gray-500 text-center">
                Need more help?{' '}
                <Link
                  to="/contact"
                  className="text-primary font-semibold hover:underline"
                >
                  Contact support
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
```
</details>

---

### ⚛️ HomePage.tsx
**Path:** `src\pages\public\HomePage.tsx`

<details>
<summary>View Code (713 lines)</summary>

```tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import {
  Truck,
  Clock,
  Star,
  ArrowRight,
  ChefHat,
  Award,
  Users,
  MapPin,
  Phone,
  CheckCircle,
  Image as ImageIcon,
  Heart,
  Utensils,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Leaflet imports
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * Replace these environment-like constants if you prefer reading from .env
 * Business location provided by you:
 */
const BUSINESS_LATITUDE = -33.855853;
const BUSINESS_LONGITUDE = 150.994854;
const BUSINESS_ADDRESS = '504-508 Woodville Rd, Guildford, NSW 2161';
const DELIVERY_RADIUS_METERS = 6000; // 6 km

// Fix default leaflet icon urls (avoids missing marker icon in many builds)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const features = [
  {
    icon: <Truck className="text-primary" size={32} />,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery within 6km of our location',
  },
  {
    icon: <ChefHat className="text-primary" size={32} />,
    title: 'Expert Chefs',
    description: 'Prepared by experienced chefs with authentic recipes',
  },
  {
    icon: <CheckCircle className="text-primary" size={32} />,
    title: 'Quality Guaranteed',
    description: '100% satisfaction guaranteed with fresh ingredients',
  },
];

const stats = [
  { value: '5000+', label: 'Happy Customers', icon: <Users size={20} /> },
  { value: '50+', label: 'Menu Items', icon: <ImageIcon size={20} /> },
  { value: '4.9', label: 'Average Rating', icon: <Star size={20} /> },
  { value: '7', label: 'Years of Excellence', icon: <Award size={20} /> },
];

const heroTrustBadges = [
  '100% Halal Certified',
  'Chef-crafted Daily',
  'Fresh Daily Preparation',
  'Serving Sydney Since 2018',
];

const heroFeatureBullets = [
  '100% Halal Certified',
  'Same-day delivery available',
  'Fresh ingredients, cooked daily',
  'Catering for 10-500 guests',
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, ease: 'easeOut', duration: 0.55 },
  }),
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative isolate overflow-hidden text-white py-16 sm:py-20 lg:py-24">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 106, 54, 0.86), rgba(255, 106, 54, 0.9)), url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide shadow-lg shadow-black/20">
              Sydney's Favorite Halal Food Catering
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Authentic Cuisine Delivered Fresh Daily
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Enjoy bold, aromatic dishes prepared from high-quality ingredients
              and delivered right to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/menu/daily')}
                className="bg-white text-primary hover:bg-gray-100 border-white font-bold group"
              >
                Daily Menu
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/menu/meals')}
                className="bg-white text-primary hover:bg-gray-100 border-white font-bold group"
              >
                View Subscriptions
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/catering')}
                className="bg-white text-primary hover:bg-gray-100 border-white font-bold group"
              >
                Plan Event
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white">
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} />
                <span>No Minimum Order</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} />
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} />
                <span>Free Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-auto"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center group"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={idx}
              >
                <div className="flex justify-center mb-3 text-primary">
                  {stat.icon}
                </div>
                <div className="font-heading text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-gray-700 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div className="order-2 lg:order-1">
                <div className="mb-3">
                  <span className="inline-flex items-center space-x-2 text-primary font-semibold">
                    <Heart size={20} className="fill-current" />
                    <span className="uppercase tracking-wider text-sm">
                      Discover
                    </span>
                  </span>
                </div>

                <h2 className="font-heading text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Our <span className="text-primary">Story</span>
                </h2>

                <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                  <p>
                    We began in a tiny Guildford kitchen in 2017, cooking the
                    food our family loved. That small space taught us to keep
                    things honest—fresh ingredients, patient cooking, and plenty
                    of heart.
                  </p>

                  <p>
                    Today the kitchen is bigger, but the rhythm is the same.
                    We grill, simmer, and bake from scratch each morning so
                    every delivery feels like a seat at our family table.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                      <Utensils className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">100% Halal</p>
                      <p className="text-sm text-gray-600">
                        Certified & authentic
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                      <ChefHat className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Family Recipes</p>
                      <p className="text-sm text-gray-600">3 generations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative"
                >
                  {/* Main Image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
                      alt="Shared table with grilled meats, salads, and bread"
                      className="w-full h-[340px] sm:h-[420px] md:h-[520px] lg:h-[600px] object-cover"
                    />
                    {/* Overlay gradient for better text contrast if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Floating accent card */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 md:-left-6 md:translate-x-0 bg-white rounded-xl shadow-xl w-[90%] max-w-xs sm:max-w-[220px] p-5 sm:p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Award className="text-primary" size={32} />
                      <div>
                        <p className="font-heading text-3xl font-bold text-primary">
                          7+
                        </p>
                        <p className="text-xs text-gray-600 font-semibold">
                          Years of Excellence
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      5000+ Happy Customers
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-50 rounded-full opacity-20 blur-3xl"></div>
                  <div className="absolute -bottom-8 -right-8 w-96 h-96 bg-secondary-50 rounded-full opacity-20 blur-3xl"></div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
              Why Choose Bakar's
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the perfect blend of tradition and convenience with our
              premium food delivery service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="text-center group"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={idx}
              >
                <Card className="text-center group hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
              Explore Our Menu
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From traditional favorites to modern delights, discover dishes
              that satisfy every craving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Daily Menu Card */}
            <Card
              className="relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => navigate('/menu/daily')}
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                }}
              >
                <div className="h-full flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-heading text-2xl font-bold mb-2">
                      Daily Menu
                    </h3>
                    <p className="text-sm opacity-90">Fresh meals every day</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Enjoy our rotating selection of daily specials, prepared fresh
                  each morning.
                </p>
                <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Order Now</span>
                  <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </Card>
            {/* Meals Subscription Card */}
            <Card
              className="relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => navigate('/menu/meals')}
            >
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                SAVE 35%
              </div>
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                }}
              >
                <div className="h-full flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-heading text-2xl font-bold mb-2">
                      Meals Subscription
                    </h3>
                    <p className="text-sm opacity-90">Subscribe & save</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Build personalised meal plans with flexible weekly, fortnight,
                  or monthly deliveries tailored to your schedule.
                </p>
                <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                  <span>View Plans</span>
                  <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </Card>

            {/* Catering Card */}
            <Card
              className="relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => navigate('/catering')}
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                }}
              >
                <div className="h-full flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-heading text-2xl font-bold mb-2">
                      Catering
                    </h3>
                    <p className="text-sm opacity-90">For special events</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Make your events memorable with our premium catering services.
                </p>
                <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Get Quote</span>
                  <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Delivery Area Map */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="text-center mb-10">
              <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
                Delivery Area
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We deliver across the Sydney Metropolitan Area. Enter your
                address at checkout to confirm availability.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              className="rounded-lg overflow-hidden shadow-md relative"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              {/* react-leaflet map */}
              <MapContainer
                center={[BUSINESS_LATITUDE, BUSINESS_LONGITUDE]}
                zoom={12}
                scrollWheelZoom={false}
                className="w-full h-[320px] sm:h-96"
                style={{ zIndex: 0 }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[BUSINESS_LATITUDE, BUSINESS_LONGITUDE]}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-medium">
                        Bakar's - Primary Kitchen
                      </div>
                      <div className="mt-1 text-xs">{BUSINESS_ADDRESS}</div>
                    </div>
                  </Popup>
                </Marker>

                {/* Circle showing delivery radius */}
                <Circle
                  center={[BUSINESS_LATITUDE, BUSINESS_LONGITUDE]}
                  radius={DELIVERY_RADIUS_METERS}
                  pathOptions={{ color: '#f97316', fillOpacity: 0.08 }}
                />
              </MapContainer>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <h4 className="font-semibold text-2xl mb-4 text-gray-900">
                Delivery Details
              </h4>

              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3 items-start">
                  <MapPin
                    className="text-primary flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <div className="font-medium text-gray-900">Coverage</div>
                    <div className="text-sm text-gray-600">
                      Primary kitchen at {BUSINESS_ADDRESS}. Deliveries within a{' '}
                      {DELIVERY_RADIUS_METERS / 1000} km radius.
                    </div>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <Clock
                    className="text-primary flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      Delivery Hours
                    </div>
                    <div className="text-sm text-gray-600">
                      11:00 AM — 9:00 PM, daily. Same-day delivery available for
                      early orders.
                    </div>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <Truck
                    className="text-primary flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <div className="font-medium text-gray-900">Standards</div>
                    <div className="text-sm text-gray-600">
                      Temperature-controlled packaging, professional drivers,
                      and contactless delivery options.
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex gap-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/checkout')}
                  className="border-primary text-primary font-semibold hover:bg-primary hover:text-white"
                >
                  Check Delivery
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/contact')}
                  className="border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
                >
                  Contact Support
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strengthened CTA - FIXED SECTION */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary text-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="py-8 max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
                Make Your Next Meal Unforgettable
              </h2>
              <p className="text-lg mb-6 text-white/90">
                From everyday meals to large-scale events, Bakar's delivers
                consistent quality and exceptional service. Let us design the
                menu — you enjoy the occasion.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="solid"
                  size="lg"
                  onClick={() => navigate('/menu/daily')}
                  className="bg-white text-primary font-bold hover:bg-gray-100"
                >
                  Order Now
                </Button>
                <Button
                  variant="solid"
                  size="lg"
                  onClick={() => navigate('/catering')}
                  className="bg-white text-primary font-bold hover:bg-gray-100"
                >
                  Book Catering
                </Button>
              </div>

              <div className="mt-6 text-sm text-white/90">
                <div>Prefer to speak with our events team?</div>
                <div className="mt-2 font-medium text-white">
                  Call: +61 480 573 034 — or email{' '}
                  <a
                    href="mailto:info@bakars.com"
                    className="underline hover:text-white/80"
                  >
                    info@bakars.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
              <p className="text-gray-600 text-sm">
                {BUSINESS_ADDRESS}
                <br />6 km Delivery Radius
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-primary" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
              <p className="text-gray-600 text-sm">
                +61 480 573 034
                <br />7 Days a Week
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Hours</h4>
              <p className="text-gray-600 text-sm">
                Mon - Sun
                <br />
                11:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
```
</details>

---

### ⚛️ LoginPage.tsx
**Path:** `src\pages\public\LoginPage.tsx`

<details>
<summary>View Code (17 lines)</summary>

```tsx
import React from 'react';
import LoginForm from '@components/auth/LoginForm';
import Card from '@components/common/Card';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        <Card className="max-w-md mx-auto" padding="lg">
          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
```
</details>

---

### ⚛️ RegisterPage.tsx
**Path:** `src\pages\public\RegisterPage.tsx`

<details>
<summary>View Code (46 lines)</summary>

```tsx
import React from 'react';
import RegisterForm from '@components/auth/RegisterForm';
import { Link } from 'react-router-dom';
import Logo from '@components/layout/Logo';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo size="lg" />
          </Link>
        </div>

        {/* Register Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="font-heading text-3xl font-bold text-text mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Join Bakar's Food & Catering today</p>
          </div>

          <RegisterForm redirectOnSuccess={true} />
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-primary-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
```
</details>

---

### ⚛️ ResetPasswordPage.tsx
**Path:** `src\pages\public\ResetPasswordPage.tsx`

<details>
<summary>View Code (206 lines)</summary>

```tsx
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Card from '@components/common/Card';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@components/common/Toast';

const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token || !email) {
      showToast('Invalid or missing reset link. Request a new one.', 'error');
      return;
    }

    if (!password || password.length < 8) {
      showToast('Password must be at least 8 characters.', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword({
        email,
        token,
        password,
        confirm_password: confirmPassword,
      });
      setIsComplete(true);
      showToast('Password updated successfully! Please sign in.', 'success');
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Unable to reset password. Please request a new link.';
      showToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-secondary/10 py-12 px-4">
        <div className="max-w-xl mx-auto">
          <Card
            padding="xl"
            className="space-y-5 text-center border border-red-100 shadow-2xl"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mx-auto">
              <Lock size={28} />
            </div>
            <h1 className="font-heading text-3xl font-semibold text-text">
              Reset link invalid
            </h1>
            <p className="text-gray-600">
              The link you followed is missing required information. Request a
              brand new link to continue.
            </p>
            <Button variant="primary" onClick={() => navigate('/forgot-password')}>
              Request new link
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-white to-primary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid gap-10 md:grid-cols-2 items-stretch">
        <Card className="shadow-2xl border border-gray-100 rounded-2xl p-8 space-y-8">
          <div className="flex items-center justify-between">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to login
            </Link>
            <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              Final step
            </span>
          </div>

          <div className="text-center space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-text">
              Set a new password
            </h1>
            <p className="text-gray-600">
              Secure your account for{' '}
              <span className="font-semibold">{email}</span> with a fresh
              password.
            </p>
          </div>

          {isComplete ? (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500">
                <CheckCircle size={32} />
              </div>
              <p className="text-gray-700 font-medium">
                Password updated successfully. You can log in with your new
                credentials now.
              </p>
              <Button variant="primary" onClick={() => navigate('/login')}>
                Go to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">
                  New Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a new password"
                  leftIcon={<Lock size={18} />}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  leftIcon={<Lock size={18} />}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="rounded-xl shadow-lg shadow-primary/20"
              >
                {isSubmitting ? 'Updating password...' : 'Update password'}
              </Button>
            </form>
          )}
        </Card>

        <div className="bg-white rounded-2xl shadow-xl border border-primary/10 p-8 space-y-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Lock size={20} />
            </div>
            <h3 className="font-heading text-2xl text-text mb-3">
              Password tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Use at least 8 characters.</li>
              <li>• Include uppercase and lowercase letters.</li>
              <li>• Add a number or special character for extra security.</li>
            </ul>
          </div>
          <div className="bg-primary/5 rounded-xl p-4 text-sm text-gray-600">
            Need help? Our team can assist with account security at{' '}
            <Link
              to="/contact"
              className="text-primary font-semibold hover:underline"
            >
              Bakar’s support
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
```
</details>

---

## 📂 Public Assets

### 📄 favicon.svg
**Path:** `public\favicon.svg`

<details>
<summary>View Code (6 lines)</summary>

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path
    fill="#f97316"
    d="M18 8h14c13 0 20 6 20 16 0 8-5 14-13 15 9 2 14 7 14 16 0 11-8 17-21 17H18Zm12 8v14h4c8 0 12-4 12-11s-4-11-12-11Zm0 22v18h5c8 0 12-4 12-9s-4-9-12-9Z"
  />
</svg>
```
</details>

---

### 📄 logo.svg
**Path:** `public\logo.svg`

<details>
<summary>View Code (3 lines)</summary>

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text x="50" y="50" text-anchor="middle" font-size="20">BAKARS</text>
</svg>
```
</details>

---

## 📂 React Components

### ⚛️ AdminSidebar.tsx
**Path:** `src\components\admin\AdminSidebar.tsx`
**Component Type:** React Components

<details>
<summary>View Code (170 lines)</summary>

```tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  Tags,
  CalendarRange,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
  },
  {
    label: 'Orders',
    icon: ShoppingBag,
    path: '/admin/orders',
  },
  {
    label: 'Menu Items',
    icon: Utensils,
    path: '/admin/menu',
  },
  {
    label: 'Categories',
    icon: Tags,
    path: '/admin/categories',
  },
  {
    label: 'Meal Plans',
    icon: CalendarRange,
    path: '/admin/meal-plans',
  },
  {
    label: 'Delivery Zones',
    icon: MapPin,
    path: '/admin/delivery-zones',
  },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const renderNavItems = (
    withLabels: boolean,
    options?: { onNavigate?: () => void; dense?: boolean }
  ) => (
    <nav
      className={clsx(
        'flex-1 space-y-1',
        options?.dense ? '' : 'mt-2'
      )}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          location.pathname === item.path ||
          (item.path !== '/admin' && location.pathname.startsWith(item.path));

        return (
          <Link
            key={item.path}
            to={item.path}
            title={item.label}
            onClick={options?.onNavigate}
            className={clsx(
              'flex items-center rounded-2xl transition-all duration-200',
              withLabels
                ? 'px-4 py-3 mx-1 space-x-3'
                : 'justify-center px-0 py-3 mx-1',
              isActive
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
            )}
          >
            <Icon size={20} />
            {withLabels && (
              <span className="text-sm font-semibold whitespace-nowrap">
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const toggleMobile = () => setIsMobileExpanded((prev) => !prev);
  const closeMobile = () => setIsMobileExpanded(false);

  return (
    <>
      {/* Mobile floating rail */}
      <div className="sm:hidden fixed left-4 top-[5.25rem] z-40">
        <div
          className={clsx(
            'bg-white border border-primary/10 shadow-2xl rounded-full flex flex-col items-stretch transition-all duration-300 overflow-hidden',
            isMobileExpanded ? 'w-60 px-4 py-4' : 'w-16 px-2 py-4'
          )}
        >
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-primary text-white h-10 w-10 shadow-md self-center"
            onClick={toggleMobile}
            aria-label={isMobileExpanded ? 'Close admin menu' : 'Open admin menu'}
          >
            {isMobileExpanded ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div
            className={clsx(
              'mt-4 flex-1 transition-all duration-300',
              isMobileExpanded ? 'opacity-100' : 'opacity-80'
            )}
          >
            {renderNavItems(isMobileExpanded, {
              onNavigate: closeMobile,
              dense: true,
            })}
          </div>
        </div>
      </div>

      {/* Desktop hover/expand rail */}
      <aside className="hidden sm:flex fixed left-0 top-20 z-30 h-[calc(100vh-5rem)]">
        <div
          className={clsx(
            'flex flex-col h-full bg-white border-r border-gray-200 shadow-lg rounded-tr-3xl rounded-br-3xl overflow-hidden py-6 w-64'
          )}
        >
          <div
            className={clsx(
              'px-4 pb-6 border-b border-gray-100'
            )}
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Admin
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-700">
              Control Center
            </p>
          </div>

          {renderNavItems(true)}

          <div
            className={clsx(
              'px-4 pt-4 mt-auto text-xs text-gray-500'
            )}
          >
            <p className="text-gray-400 uppercase font-semibold mb-2">Tips</p>
            <p className="leading-relaxed">
              Use the quick links to jump between orders, menu items, meal plans,
              and categories without leaving the dashboard flow.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
```
</details>

---

### ⚛️ CategoryForm.tsx
**Path:** `src\components\admin\categories\CategoryForm.tsx`
**Component Type:** React Components

<details>
<summary>View Code (174 lines)</summary>

```tsx
import React, { useEffect, useState } from 'react';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { MenuCategory } from '@models/menu.types';

export interface CategoryFormValues {
  name: string;
  display_name: string;
  description: string;
  is_active: boolean;
  sort_order?: number;
  imageFile: File | null;
}

interface CategoryFormProps {
  mode: 'create' | 'edit';
  initialValues: CategoryFormValues;
  existingCategory?: MenuCategory | null;
  isSubmitting: boolean;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  onCancel: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  mode,
  initialValues,
  existingCategory,
  isSubmitting,
  onSubmit,
  onCancel,
}) => {
  const [values, setValues] = useState<CategoryFormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (field: keyof CategoryFormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      field === 'sort_order'
        ? event.target.value === ''
          ? undefined
          : Number(event.target.value)
        : event.target.value;
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      is_active: event.target.checked,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValues((prev) => ({
      ...prev,
      imageFile: file,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          label="Internal Name"
          value={values.name}
          onChange={handleChange('name')}
          placeholder="e.g., daily_specials"
          required={mode === 'create'}
          disabled={mode === 'edit'}
        />
        <Input
          type="text"
          label="Display Name"
          value={values.display_name}
          onChange={handleChange('display_name')}
          placeholder="Visible label for customers"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Description
        </label>
        <textarea
          value={values.description}
          onChange={handleChange('description')}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="Optional description shown to customers"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          label="Sort Order"
          value={values.sort_order ?? ''}
          onChange={handleChange('sort_order')}
          placeholder="Optional ordering number"
          min={0}
        />

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-text">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-600"
          />
          {existingCategory?.image_url && !values.imageFile && (
            <div className="flex items-center space-x-3">
              <img
                src={existingCategory.image_url}
                alt={existingCategory.display_name}
                className="w-16 h-16 rounded-lg object-cover border"
              />
              <span className="text-xs text-gray-500">
                Current image – upload a new file to replace
              </span>
            </div>
          )}
          {values.imageFile && (
            <div className="text-xs text-gray-500">
              Selected file: {values.imageFile.name}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          id="category-active"
          type="checkbox"
          checked={values.is_active}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="category-active" className="text-sm text-gray-700">
          Category is active and visible to customers
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {mode === 'create' ? 'Create Category' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};
```
</details>

---

### ⚛️ OrderStats.tsx
**Path:** `src\components\admin\dashboard\OrderStats.tsx`
**Component Type:** React Components

<details>
<summary>View Code (71 lines)</summary>

```tsx
import React from 'react';
import { useAdminStore } from '@store/adminStore';
import Card from '@components/common/Card';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

export const OrderStats: React.FC = () => {
  const { orderStats } = useAdminStore();

  const statuses = [
    {
      label: 'Pending',
      count: orderStats?.pending_orders || 0,
      icon: <Clock size={24} />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Confirmed',
      count: orderStats?.confirmed_orders || 0,
      icon: <Package size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Out for Delivery',
      count: orderStats?.out_for_delivery_orders || 0,
      icon: <Truck size={24} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Completed',
      count: orderStats?.completed_orders || 0,
      icon: <CheckCircle size={24} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Cancelled',
      count: orderStats?.cancelled_orders || 0,
      icon: <XCircle size={24} />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <Card padding="lg">
      <h2 className="font-heading text-2xl font-bold text-text mb-6">
        Order Status Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {statuses.map((status, index) => (
          <div
            key={index}
            className={`${status.bgColor} rounded-lg p-4 text-center transition-transform hover:scale-105`}
          >
            <div className={`${status.color} flex justify-center mb-3`}>
              {status.icon}
            </div>
            <p className="font-heading text-3xl font-bold text-text mb-1">
              {status.count}
            </p>
            <p className="text-sm text-gray-600">{status.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
```
</details>

---

### ⚛️ RecentOrders.tsx
**Path:** `src\components\admin\dashboard\RecentOrders.tsx`
**Component Type:** React Components

<details>
<summary>View Code (136 lines)</summary>

```tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '@store/adminStore';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import { formatCurrency, formatDate } from '@utils/formatters';
import { Eye } from 'lucide-react';

export const RecentOrders: React.FC = () => {
  const navigate = useNavigate();
  const { allOrders, fetchAllOrders, isLoading } = useAdminStore();

  useEffect(() => {
    fetchAllOrders({
      status: undefined,
      date_from: undefined,
      date_to: undefined,
    });
  }, []);

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      out_for_delivery: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-text">
          Recent Orders
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/admin/orders')}
        >
          View All Orders
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading orders...</div>
      ) : allOrders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Order #
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allOrders.slice(0, 10).map((order: any) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-mono text-sm">
                    {order.order_number}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-text">
                        {order.user_name || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.user_email}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm capitalize">
                      {order.order_type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    {formatCurrency(order.total_amount)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                        order.status
                      )}`}
                    >
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      <Eye size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
```
</details>

---

### ⚛️ RevenueChart.tsx
**Path:** `src\components\admin\dashboard\RevenueChart.tsx`
**Component Type:** React Components

<details>
<summary>View Code (122 lines)</summary>

```tsx
import React from 'react';
import { useAdminStore } from '@store/adminStore';
import Card from '@components/common/Card';
import { formatCurrency } from '@utils/formatters';
import { TrendingUp, Calendar } from 'lucide-react';

const formatPercent = (value?: number) => {
  if (
    value === undefined ||
    value === null ||
    Number.isNaN(value) ||
    !Number.isFinite(value)
  ) {
    return '—';
  }
  const rounded = value.toFixed(1);
  const numeric = Number(rounded);
  const sign = numeric > 0 ? '+' : '';
  return `${sign}${rounded}%`;
};

export const RevenueChart: React.FC = () => {
  const { orderStats } = useAdminStore();

  const weeklyBreakdown =
    orderStats?.weekly_revenue_breakdown && orderStats.weekly_revenue_breakdown.length
      ? orderStats.weekly_revenue_breakdown
      : [
          { label: 'Mon', date: '', total: 0 },
          { label: 'Tue', date: '', total: 0 },
          { label: 'Wed', date: '', total: 0 },
          { label: 'Thu', date: '', total: 0 },
          { label: 'Fri', date: '', total: 0 },
          { label: 'Sat', date: '', total: 0 },
          { label: 'Sun', date: '', total: 0 },
        ];

  const maxRevenue = Math.max(
    ...weeklyBreakdown.map((day) => day.total || 0),
    1
  );

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-text">
          Weekly Revenue
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>Last 7 Days</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">This Week</p>
          <p className="font-heading text-2xl font-bold text-blue-600">
            {formatCurrency(orderStats?.weekly_revenue || 0)}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">This Month</p>
          <p className="font-heading text-2xl font-bold text-green-600">
            {formatCurrency(orderStats?.monthly_revenue || 0)}
          </p>
          <p className="text-sm font-semibold text-green-600">
            {formatPercent(orderStats?.monthly_growth_percent)}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Growth</p>
          <div className="flex items-center space-x-1">
            <TrendingUp className="text-purple-600" size={20} />
            <p className="font-heading text-2xl font-bold text-purple-600">
              {formatPercent(orderStats?.weekly_growth_percent)}
            </p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-4">
        {weeklyBreakdown.map((day) => {
          const revenue = day.total || 0;
          const width =
            revenue > 0 ? Math.max((revenue / maxRevenue) * 100, 8) : 0;

          return (
            <div key={day.label} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-700">
                {day.label}
              </div>
              <div className="flex-1">
                <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-600 rounded-lg transition-all duration-500 flex items-center justify-end px-3"
                    style={{ width: `${width}%` }}
                  >
                    {revenue > 0 && (
                      <span className="text-white font-semibold text-sm">
                        {formatCurrency(revenue)}
                      </span>
                    )}
                  </div>
                  {revenue === 0 && (
                    <div className="absolute inset-0 flex items-center justify-end px-3">
                      <span className="text-gray-400 text-sm">
                        {formatCurrency(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
```
</details>

---

### ⚛️ AddMenuItem.tsx
**Path:** `src\components\admin\menu\AddMenuItem.tsx`
**Component Type:** React Components

<details>
<summary>View Code (351 lines)</summary>

```tsx
import React, { useState, useEffect } from 'react';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Upload, X } from 'lucide-react';

interface AddMenuItemProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddMenuItem: React.FC<AddMenuItemProps> = ({
  onSuccess,
  onCancel,
}) => {
  const {
    createMenuItem,
    managedCategories,
    fetchManagedCategories,
    isUpdating,
  } = useAdminStore();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    is_available_for_daily: true,
    is_available_for_meal_plan: false,
    allergens: '',
    spice_level: '',
    is_vegetarian: false,
    is_halal: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (managedCategories.length === 0) {
      fetchManagedCategories();
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        showToast('Image size should be less than 5MB', 'error');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.category || !formData.price) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (!formData.is_available_for_daily && !formData.is_available_for_meal_plan) {
      showToast('Select at least one availability option', 'error');
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      if (formData.description)
        formDataToSend.append('description', formData.description);
      formDataToSend.append(
        'is_available_for_daily',
        String(formData.is_available_for_daily)
      );
      formDataToSend.append(
        'is_available_for_meal_plan',
        String(formData.is_available_for_meal_plan)
      );

      if (formData.allergens) {
        formDataToSend.append('allergens', formData.allergens);
      }
      if (formData.spice_level) {
        formDataToSend.append('spice_level', formData.spice_level);
      }

      formDataToSend.append('is_vegetarian', String(formData.is_vegetarian));
      formDataToSend.append('is_halal', String(formData.is_halal));

      // Append image if selected
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      await createMenuItem(formDataToSend);
      showToast('Menu item created successfully', 'success');
      onSuccess();
    } catch (error: any) {
      showToast(error.message || 'Failed to create menu item', 'error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[70vh] overflow-y-auto pr-2"
    >
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Item Image
        </label>

        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setImageFile(null);
                setImagePreview('');
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
            <Upload size={32} className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Click to upload image</span>
            <span className="text-xs text-gray-400 mt-1">Max 5MB</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </label>
        )}
      </div>

      {/* Name */}
      <Input
        type="text"
        label="Item Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Butter Chicken"
        required
      />

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        >
          <option value="">Select category</option>
          <option value="rice">Rice Dishes</option>
          <option value="curry">Curry</option>
          <option value="bbq">BBQ</option>
          <option value="sweets">Sweets</option>
          <option value="drinks">Drinks</option>
          {managedCategories
            .filter(
              (cat) =>
                !['rice', 'curry', 'bbq', 'sweets', 'drinks'].includes(cat.name)
            )
            .map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.display_name || cat.name}
              </option>
            ))}
        </select>
      </div>

      {/* Price */}
      <Input
        type="number"
        step="0.01"
        label="Price (AUD)"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        placeholder="15.99"
        required
        min="0"
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={4}
          placeholder="Describe your dish..."
        />
      </div>

      {/* Availability Checkboxes */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-text">Available For:</p>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_available_for_daily}
            onChange={(e) =>
              setFormData({
                ...formData,
                is_available_for_daily: e.target.checked,
              })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Daily Menu</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_available_for_meal_plan}
            onChange={(e) =>
              setFormData({
                ...formData,
                is_available_for_meal_plan: e.target.checked,
              })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Meal Plan</span>
        </label>

      </div>

      {/* Allergens */}
      <Input
        type="text"
        label="Allergens (comma separated)"
        value={formData.allergens}
        onChange={(e) =>
          setFormData({ ...formData, allergens: e.target.value })
        }
        placeholder="dairy, nuts, gluten"
      />

      {/* Spice Level */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Spice Level
        </label>
        <select
          value={formData.spice_level}
          onChange={(e) =>
            setFormData({ ...formData, spice_level: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">None</option>
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="hot">Hot</option>
        </select>
      </div>

      {/* Dietary Options */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_vegetarian}
            onChange={(e) =>
              setFormData({ ...formData, is_vegetarian: e.target.checked })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Vegetarian</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_halal}
            onChange={(e) =>
              setFormData({ ...formData, is_halal: e.target.checked })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Halal</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          isLoading={isUpdating}
          disabled={isUpdating}
        >
          Create Menu Item
        </Button>
      </div>
    </form>
  );
};

export default AddMenuItem;
```
</details>

---

### ⚛️ EditMenuItem.tsx
**Path:** `src\components\admin\menu\EditMenuItem.tsx`
**Component Type:** React Components

<details>
<summary>View Code (377 lines)</summary>

```tsx
import React, { useState, useEffect } from 'react';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Upload, X, Save } from 'lucide-react';
import { MenuItem } from '@models/menu.types';

interface EditMenuItemProps {
  item: MenuItem;
  onSuccess: () => void;
  onCancel: () => void;
}

export const EditMenuItem: React.FC<EditMenuItemProps> = ({
  item,
  onSuccess,
  onCancel,
}) => {
  const {
    updateMenuItem,
    managedCategories,
    fetchManagedCategories,
    isUpdating,
  } = useAdminStore();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: item.name,
    category: item.category,
    price: String(item.price),
    description: item.description || '',
    is_available: item.is_available,
    is_available_for_daily: item.is_available_for_daily,
    is_available_for_meal_plan: item.is_available_for_meal_plan,
    allergens: item.allergens?.join(', ') || '',
    spice_level: item.spice_level || '',
    is_vegetarian: item.is_vegetarian || false,
    is_halal: item.is_halal !== false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    item.image_url || ''
  );
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    fetchManagedCategories();
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setRemoveImage(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.is_available_for_daily && !formData.is_available_for_meal_plan) {
      showToast('Select at least one availability option', 'error');
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append only changed fields
      if (formData.name !== item.name)
        formDataToSend.append('name', formData.name);
      if (formData.category !== item.category)
        formDataToSend.append('category', formData.category);
      if (Number(formData.price) !== item.price)
        formDataToSend.append('price', formData.price);
      if (formData.description !== item.description)
        formDataToSend.append('description', formData.description);
      if (formData.is_available !== item.is_available)
        formDataToSend.append('is_available', String(formData.is_available));
      if (formData.is_available_for_daily !== item.is_available_for_daily)
        formDataToSend.append(
          'is_available_for_daily',
          String(formData.is_available_for_daily)
        );
      if (formData.is_available_for_meal_plan !== item.is_available_for_meal_plan)
        formDataToSend.append(
          'is_available_for_meal_plan',
          String(formData.is_available_for_meal_plan)
        );

      const allergensArray = formData.allergens
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean);
      if (
        JSON.stringify(allergensArray) !== JSON.stringify(item.allergens || [])
      ) {
        formDataToSend.append('allergens', JSON.stringify(allergensArray));
      }

      if (formData.spice_level !== (item.spice_level || ''))
        formDataToSend.append('spice_level', formData.spice_level);
      if (formData.is_vegetarian !== item.is_vegetarian)
        formDataToSend.append('is_vegetarian', String(formData.is_vegetarian));
      if (formData.is_halal !== item.is_halal)
        formDataToSend.append('is_halal', String(formData.is_halal));

      // Append image if changed
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (removeImage) {
        formDataToSend.append('remove_image', 'true');
      }

      const menuItemId = item._id || item.id;
      if (!menuItemId) {
        showToast('Unable to determine menu item ID.', 'error');
        setIsSubmitting(false);
        return;
      }

      await updateMenuItem(menuItemId, formDataToSend);
      showToast('Menu item updated successfully', 'success');
      onSuccess();
    } catch (error) {
      showToast('Failed to update menu item', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Item Image
        </label>

        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
            <Upload size={32} className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              Click to upload new image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </label>
        )}
      </div>

      {/* Name */}
      <Input
        type="text"
        label="Item Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Butter Chicken"
        required
      />

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        >
          <option value="">Select category</option>
          {managedCategories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.display_name}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <Input
        type="number"
        step="0.01"
        label="Price (AUD)"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        placeholder="15.99"
        required
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={4}
          placeholder="Creamy butter chicken with aromatic spices..."
        />
      </div>

      {/* Availability Status */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_available}
            onChange={(e) =>
              setFormData({ ...formData, is_available: e.target.checked })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700 font-medium">
            Item is Available
          </span>
        </label>
      </div>

      {/* Availability For Order Types */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-text">Available For:</p>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_available_for_daily}
            onChange={(e) =>
              setFormData({
                ...formData,
                is_available_for_daily: e.target.checked,
              })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Daily Menu</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_available_for_meal_plan}
            onChange={(e) =>
              setFormData({
                ...formData,
                is_available_for_meal_plan: e.target.checked,
              })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Meal Plan</span>
        </label>

      </div>

      {/* Allergens */}
      <Input
        type="text"
        label="Allergens (comma separated)"
        value={formData.allergens}
        onChange={(e) =>
          setFormData({ ...formData, allergens: e.target.value })
        }
        placeholder="dairy, nuts, gluten"
      />

      {/* Spice Level */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Spice Level
        </label>
        <select
          value={formData.spice_level}
          onChange={(e) =>
            setFormData({ ...formData, spice_level: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">None</option>
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="hot">Hot</option>
        </select>
      </div>

      {/* Dietary Options */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_vegetarian}
            onChange={(e) =>
              setFormData({ ...formData, is_vegetarian: e.target.checked })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Vegetarian</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_halal}
            onChange={(e) =>
              setFormData({ ...formData, is_halal: e.target.checked })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Halal</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          isLoading={isUpdating}
          disabled={isUpdating}
        >
          <Save size={20} className="mr-2" />
          {isUpdating ? 'Updating...' : 'Update Menu Item'}
        </Button>
      </div>
    </form>
  );
};

export default EditMenuItem;
```
</details>

---

### ⚛️ MenuItemsList.tsx
**Path:** `src\components\admin\menu\MenuItemsList.tsx`
**Component Type:** React Components

<details>
<summary>View Code (214 lines)</summary>

```tsx
import React, { useState } from 'react';
import { MenuItem } from '@models/menu.types';
import { formatCurrency } from '@utils/formatters';
import { getImageUrl, handleImageError } from '@utils/images';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import LoadingScreen from '@components/common/LoadingScreen';
import { Edit2, Trash2, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';

interface MenuItemsListProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (itemId: string) => void;
  isLoading: boolean;
}

export const MenuItemsList: React.FC<MenuItemsListProps> = ({
  items,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});
  const [imageErrorStates, setImageErrorStates] = useState<Record<string, boolean>>({});

  const handleImageLoad = (itemId: string) => {
    setImageLoadStates((prev) => ({ ...prev, [itemId]: true }));
    setImageErrorStates((prev) => ({ ...prev, [itemId]: false }));
  };

  const handleImageFailure = (
    itemId: string,
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    category?: string
  ) => {
    setImageErrorStates((prev) => ({ ...prev, [itemId]: true }));
    handleImageError(event, category);
  };

  if (isLoading) {
    return (
      <Card padding="lg">
        <LoadingScreen variant="section" message="Loading menu items..." />
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card padding="lg">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No menu items found</p>
          <p className="text-sm text-gray-400">
            Click "Add Menu Item" to create your first item
          </p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const imageUrl = getImageUrl(item.image_url, item.category) || undefined;
          const isImageLoaded = imageLoadStates[item._id] || false;
          const hasImageAvailable =
            Boolean(imageUrl) && !imageErrorStates[item._id];
          const showSkeleton =
            Boolean(imageUrl) && !isImageLoaded && hasImageAvailable;
        return (
          <Card key={item._id} padding="none" className="overflow-hidden">
            {/* Image */}
            <div className="relative h-48 bg-gray-100">
              {/* Loading state */}
              {showSkeleton && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex flex-col items-center justify-center">
                  <ImageIcon className="text-gray-400 mb-2" size={32} />
                  <span className="text-gray-400 text-sm">
                    Loading image...
                  </span>
                </div>
              )}

              {hasImageAvailable ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(item._id)}
                  onError={(event) => handleImageFailure(item._id, event, item.category)}
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-xs">
                  <ImageIcon className="mb-2" size={32} />
                  <span>Image unavailable</span>
                </div>
              )}

              {/* Debug info for missing images in development */}
              {import.meta.env.DEV && !item.image_url && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded shadow">
                  No image_url in data
                </div>
              )}

              {/* Availability Badge */}
              <div className="absolute top-3 right-3">
                {item.is_available ? (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                    <CheckCircle size={14} />
                    <span>Available</span>
                  </div>
                ) : (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                    <XCircle size={14} />
                    <span>Unavailable</span>
                  </div>
                )}
              </div>
 

              {/* Spice level */}
              {item.spice_level && (
                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full shadow-md text-xs font-semibold">
                  {item.spice_level === 'mild' && '??? Mild'}
                  {item.spice_level === 'medium' && '?????? Medium'}
                  {item.spice_level === 'hot' && '????????? Hot'}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Category */}
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-bold rounded-full mb-2">
                {item.category}
              </span>

              {/* Name */}
              <h3 className="font-heading text-xl font-bold text-text mb-2 line-clamp-1">
                {item.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                {item.description}
              </p>

              {/* Availability Info */}
              <div className="space-y-2 mb-4 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  {item.is_available_for_daily && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Daily
                    </span>
                  )}
                {item.is_available_for_meal_plan && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    Meal Plan
                  </span>
                )}
              </div>

              {item.allergens && item.allergens.length > 0 && (
                <p className="text-red-600">
                    ?? Allergens: {item.allergens.join(', ')}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading text-2xl font-bold text-primary">
                  {formatCurrency(item.price)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="flex-1"
                >
                  <Edit2 size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(item._id || item.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        );
        })}
      </div>

    </>
  );
};

export default MenuItemsList;


```
</details>

---

### ⚛️ OrderActions.tsx
**Path:** `src\components\admin\orders\OrderActions.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface OrderActionsProps {
  // Add props here
}

export const OrderActions: React.FC<OrderActionsProps> = () => {
  return (
    <div>
      {/* OrderActions Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ OrderDetails.tsx
**Path:** `src\components\admin\orders\OrderDetails.tsx`
**Component Type:** React Components

<details>
<summary>View Code (318 lines)</summary>

```tsx
import React from 'react';
import { Order } from '@models/order.types';
import { formatCurrency, formatDate } from '@utils/formatters';
import Button from '@components/common/Button';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  DollarSign,
  Calendar,
  FileText,
} from 'lucide-react';

interface OrderDetailsProps {
  order: Order;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
  onClose: () => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  onStatusUpdate,
  onClose,
}) => {
  const deliveryMethod =
    order.delivery_method || order.delivery_option || 'delivery';

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-yellow-600 bg-yellow-50',
      confirmed: 'text-blue-600 bg-blue-50',
      preparing: 'text-purple-600 bg-purple-50',
      out_for_delivery: 'text-indigo-600 bg-indigo-50',
      delivered: 'text-green-600 bg-green-50',
      cancelled: 'text-red-600 bg-red-50',
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-heading text-3xl font-bold text-text">
            Order #{order.order_number}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Placed on {formatDate(order.created_at)}
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-full ${getStatusColor(order.status)}`}
        >
          <span className="font-semibold uppercase text-sm">
            {order.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
          <User size={20} className="text-primary" />
          <span>Customer Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <User size={16} className="text-gray-400" />
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium text-text">
                {order.user_name || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail size={16} className="text-gray-400" />
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-text">
                {order.user_email || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone size={16} className="text-gray-400" />
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium text-text">
                {order.user_phone || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar size={16} className="text-gray-400" />
            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="font-medium text-text">
                {formatDate(order.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      {order.delivery_address && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
            <MapPin size={20} className="text-primary" />
            <span>Delivery Information</span>
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Delivery Method</p>
              <p className="font-medium text-text capitalize">
                {deliveryMethod.replace('_', ' ')}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Address</p>
              <p className="font-medium text-text">
                {order.delivery_address.street}
                <br />
                {order.delivery_address.suburb}, {order.delivery_address.state}{' '}
                {order.delivery_address.postcode}
              </p>
            </div>

            {order.delivery_instructions && (
              <div>
                <p className="text-gray-500 mb-1">Delivery Instructions</p>
                <p className="font-medium text-text italic">
                  {order.delivery_instructions}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
          <Package size={20} className="text-primary" />
          <span>Order Items</span>
        </h3>

        <div className="space-y-3">
          {order.items.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-text">{item.item_name}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <p className="font-semibold text-primary">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}

          {order.sidelines && order.sidelines.length > 0 && (
            <>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Add-ons:
                </p>
              </div>
              {order.sidelines.map((sideline: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-text">
                      {sideline.item_name}
                    </p>
                    <p className="text-xs text-gray-500">Sideline</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Qty: {sideline.quantity}
                    </p>
                    <p className="font-semibold text-primary">
                      {formatCurrency(sideline.price * sideline.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
          <DollarSign size={20} className="text-primary" />
          <span>Payment Summary</span>
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">
              {formatCurrency(order.subtotal)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee:</span>
            <span className="font-medium">
              {formatCurrency(order.delivery_fee)}
            </span>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-text text-lg">Total:</span>
              <span className="font-heading text-3xl font-bold text-primary">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.payment_status === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : order.payment_status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.payment_status.toUpperCase()}
              </span>
            </div>
          </div>

          {order.payment_intent_id && (
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Payment ID:</span>
              <span className="font-mono text-gray-700">
                {order.payment_intent_id}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {(order.notes || order.admin_notes) && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
            <FileText size={20} className="text-primary" />
            <span>Notes</span>
          </h3>

          {order.notes && (
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Customer Notes:</p>
              <p className="text-sm text-text">{order.notes}</p>
            </div>
          )}

          {order.admin_notes && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Admin Notes:</p>
              <p className="text-sm text-text">{order.admin_notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3 pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Close
        </Button>

        {order.status !== 'delivered' && order.status !== 'cancelled' && (
          <div className="flex-1">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={order.status}
              onChange={(e) => onStatusUpdate(order._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancel Order</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
```
</details>

---

### ⚛️ OrdersList.tsx
**Path:** `src\components\admin\orders\OrdersList.tsx`
**Component Type:** React Components

<details>
<summary>View Code (205 lines)</summary>

```tsx
import React from 'react';
import { Order } from '@models/order.types';
import { formatCurrency, formatDate } from '@utils/formatters';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import LoadingScreen from '@components/common/LoadingScreen';
import { Eye, Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

interface OrdersListProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
  isLoading: boolean;
  isUpdating: boolean;
}

export const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  onViewOrder,
  onStatusUpdate,
  isLoading,
  isUpdating,
}) => {
  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="text-yellow-500" size={20} />,
      confirmed: <CheckCircle className="text-blue-500" size={20} />,
      preparing: <Package className="text-purple-500" size={20} />,
      out_for_delivery: <Truck className="text-indigo-500" size={20} />,
      delivered: <CheckCircle className="text-green-500" size={20} />,
      cancelled: <XCircle className="text-red-500" size={20} />,
    };
    return icons[status as keyof typeof icons] || <Package size={20} />;
  };

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      out_for_delivery: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentBadgeColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
      partially_paid: 'bg-orange-100 text-orange-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getOrderTypeLabel = (type: string) => {
    const labels = {
      daily_menu: 'Daily Menu',
      meal_subscription: 'Meals Subscription',
      special_catering: 'Catering (Legacy)',
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (isLoading) {
    return (
      <Card padding="lg">
        <LoadingScreen variant="section" message="Loading orders..." />
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card padding="lg">
        <div className="text-center py-12">
          <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-600 text-lg mb-2">No orders found</p>
          <p className="text-sm text-gray-500">
            Orders will appear here when customers place them
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order: any) => (
        <Card
          key={order._id}
          padding="lg"
          className="hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            {/* Left Section - Order Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <h3 className="font-heading text-xl font-bold text-text">
                    #{order.order_number}
                  </h3>
                </div>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getOrderTypeLabel(order.order_type)}`}
                >
                  {getOrderTypeLabel(order.order_type)}
                </span>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(order.status)}`}
                >
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadgeColor(order.payment_status)}`}
                >
                  {order.payment_status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-text">
                    {order.user_name || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">{order.user_email}</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-text">
                    {formatDate(order.created_at)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Total Amount</p>
                  <p className="font-heading text-2xl font-bold text-primary">
                    {formatCurrency(order.total_amount)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <Package size={16} />
                <span>{order.items?.length || 0} items</span>
                {order.sidelines && order.sidelines.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{order.sidelines.length} add-ons</span>
                  </>
                )}
                {order.delivery_method && (
                  <>
                    <span>•</span>
                    <span className="capitalize">
                      {order.delivery_method.replace('_', ' ')}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex flex-col space-y-2 w-full md:w-52 md:ml-4">
              <Button
                variant="primary"
                size="sm"
                onClick={() => onViewOrder(order)}
                fullWidth
              >
                <Eye size={16} className="mr-2" />
                View Details
              </Button>

              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                  value={order.status}
                  onChange={(e) => onStatusUpdate(order._id, e.target.value)}
                  disabled={isUpdating}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancel</option>
                </select>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
```
</details>

---

### ⚛️ AuthModal.tsx
**Path:** `src\components\auth\AuthModal.tsx`
**Component Type:** React Components

<details>
<summary>View Code (653 lines)</summary>

```tsx
import React, { useState, useEffect } from 'react';
import { useAuthModalStore } from '@store/authModalStore';
import { useAuthStore } from '@store/authStore';
import { useCartStore } from '@store/cartStore';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { useToast } from '@components/common/Toast';
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthModal: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    isOpen,
    initialTab,
    pendingAction,
    redirectPath,
    closeModal,
    clearPendingAction,
  } = useAuthModalStore();
  const { login, register, verifyEmail, resendVerification, isAuthenticated } =
    useAuthStore();
  const { addItem } = useCartStore();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');

  // Verification state
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setShowVerification(false);
      resetForms();
    }
  }, [isOpen, initialTab]);

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  // Execute pending action after successful authentication
  useEffect(() => {
    if (isAuthenticated && pendingAction) {
      executePendingAction();
    }
  }, [isAuthenticated]);

  const resetForms = () => {
    // Reset login form
    setLoginEmail('');
    setLoginPassword('');

    // Reset signup form
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setSignupFirstName('');
    setSignupLastName('');
    setSignupPhone('');

    // Reset verification form
    setVerificationCode(['', '', '', '', '', '']);
    setVerificationEmail('');
    setResendCountdown(0);
  };

  const executePendingAction = async () => {
    if (!pendingAction) return;

    try {
      if (pendingAction.type === 'daily_menu' && pendingAction.item) {
        // Add item to cart
        await addItem(
          pendingAction.item,
          pendingAction.quantity || 1,
          pendingAction.specialInstructions
        );
        showToast('Item added to cart successfully!', 'success');
      } else if (pendingAction.type === 'meal_subscription') {
        // For meal subscription, just redirect to the page
        if (redirectPath) {
          navigate(redirectPath);
        }
      }
    } catch (error) {
      console.error('Failed to execute pending action:', error);
      showToast('Failed to add item to cart', 'error');
    } finally {
      clearPendingAction();
      closeModal();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      showToast('Please fill in all fields', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email: loginEmail, password: loginPassword });
      showToast('Login successful!', 'success');

      // The pending action will be executed by the useEffect hook
      if (!pendingAction) {
        closeModal();
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      showToast(
        error.response?.data?.message ||
          'Login failed. Please check your credentials.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !signupEmail ||
      !signupPassword ||
      !signupFirstName ||
      !signupLastName ||
      !signupPhone
    ) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      showToast('Passwords do not match', 'warning');
      return;
    }

    if (signupPassword.length < 6) {
      showToast('Password must be at least 6 characters long', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const email = await register({
        email: signupEmail,
        password: signupPassword,
        first_name: signupFirstName,
        last_name: signupLastName,
        phone: signupPhone,
      });

      // Show verification screen
      setVerificationEmail(email);
      setShowVerification(true);
      setResendCountdown(60); // 60 seconds cooldown
      showToast('Verification code sent to your email!', 'success');
    } catch (error: any) {
      console.error('Registration failed:', error);
      showToast(
        error.response?.data?.message ||
          'Registration failed. Please try again.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerificationCodeKeyDown = (
    index: number,
    e: React.KeyboardEvent
  ) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = verificationCode.join('');
    if (code.length !== 6) {
      showToast('Please enter the complete 6-digit code', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail({
        email: verificationEmail,
        code,
      });
      showToast('Email verified successfully!', 'success');
      setShowVerification(false);

      // The pending action will be executed by the useEffect hook
      if (!pendingAction) {
        closeModal();
      }
    } catch (error: any) {
      console.error('Verification failed:', error);
      showToast(
        error.response?.data?.message ||
          'Invalid or expired code. Please try again.',
        'error'
      );
      // Clear the code on error
      setVerificationCode(['', '', '', '', '', '']);
      const firstInput = document.getElementById('code-input-0');
      firstInput?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCountdown > 0) return;

    setIsLoading(true);
    try {
      await resendVerification(verificationEmail);
      showToast('Verification code resent!', 'success');
      setResendCountdown(60);
    } catch (error: any) {
      console.error('Resend failed:', error);
      showToast(
        error.response?.data?.message ||
          'Failed to resend code. Please try again.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      closeModal();
      resetForms();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={showVerification ? 'Verify Your Email' : "Welcome to Bakar's"}
      size="md"
    >
      <div className="space-y-6">
        {/* Verification Form */}
        {showVerification ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
              <p className="text-sm text-gray-600 mb-4">
                We've sent a 6-digit verification code to
                <br />
                <span className="font-semibold text-gray-900">
                  {verificationEmail}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Code expires in 15 minutes
              </p>
            </div>

            <form onSubmit={handleVerifyEmail} className="space-y-6">
              {/* 6-digit code inputs */}
              <div className="flex justify-center gap-2">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleVerificationCodeChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleVerificationCodeKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    disabled={isLoading}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading || verificationCode.some((d) => !d)}
                isLoading={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCountdown > 0 || isLoading}
                  className={`text-sm font-semibold ${
                    resendCountdown > 0 || isLoading
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-primary hover:text-primary-dark'
                  }`}
                >
                  {resendCountdown > 0
                    ? `Resend code in ${resendCountdown}s`
                    : 'Resend Code'}
                </button>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowVerification(false);
                      resetForms();
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900"
                    disabled={isLoading}
                  >
                    ← Back to signup
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Tab Switcher */}
            <div className="flex space-x-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 px-4 py-3 font-semibold transition-all ${
                  activeTab === 'login'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                disabled={isLoading}
              >
                <LogIn className="inline-block mr-2" size={18} />
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 px-4 py-3 font-semibold transition-all ${
                  activeTab === 'signup'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                disabled={isLoading}
              >
                <UserPlus className="inline-block mr-2" size={18} />
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>

                {pendingAction && (
                  <p className="text-sm text-center text-gray-600">
                    🛒 Login to add item to cart
                  </p>
                )}
              </form>
            )}

            {/* Signup Form */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="text"
                        value={signupFirstName}
                        onChange={(e) => setSignupFirstName(e.target.value)}
                        placeholder="John"
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="text"
                        value={signupLastName}
                        onChange={(e) => setSignupLastName(e.target.value)}
                        placeholder="Doe"
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="tel"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="04XX XXX XXX"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="password"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>

                {pendingAction && (
                  <p className="text-sm text-center text-gray-600">
                    🛒 Sign up to add item to cart
                  </p>
                )}
              </form>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
```
</details>

---

### ⚛️ LoginForm.tsx
**Path:** `src\components\auth\LoginForm.tsx`
**Component Type:** React Components

<details>
<summary>View Code (188 lines)</summary>

```tsx
import { useState, type FC } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useCart } from '@hooks/useCart';
import { useToast } from '@components/common/Toast';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Mail, Lock, Loader2 } from 'lucide-react';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // ✅ Get the return URL and check for pending cart item
  const from = location.state?.from || '/';
  const hasPendingCartItem = location.state?.pendingCartItem || false;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Add pending item to cart after successful login
  const addPendingItemToCart = async () => {
    const pendingItemStr = localStorage.getItem('bakars_pending_cart_item');
    if (pendingItemStr) {
      try {
        const pendingItem = JSON.parse(pendingItemStr);

        // Check if the item is not too old (24 hours)
        const itemDate = new Date(pendingItem.timestamp);
        const now = new Date();
        const hoursDiff =
          (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          await addToCart(
            pendingItem.item,
            pendingItem.quantity,
            pendingItem.specialInstructions
          );
          showToast(`${pendingItem.item.name} added to cart!`, 'success');
        }

        // Clear the pending item
        localStorage.removeItem('bakars_pending_cart_item');
      } catch (error) {
        console.error('Failed to add pending item to cart:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      await login(formData);
      showToast('Login successful!', 'success');

      // ✅ Add pending cart item if exists
      if (hasPendingCartItem) {
        await addPendingItemToCart();
      }

      // ✅ Navigate to the intended page or home
      navigate(from, { replace: true });
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Login failed';
      showToast(errorMessage, 'error');
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-heading text-4xl font-bold text-text mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600">Sign in to your account to continue</p>

        {/* ✅ Show info if there's a pending cart item */}
        {hasPendingCartItem && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">
              Login to add your selected item to cart
            </p>
          </div>
        )}
        {/* Show info if redirected from a protected page */}
        {from !== '/' && from !== '/login' && !hasPendingCartItem && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              Please login to access that page
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
            {errors.general}
          </div>
        )}

        <Input
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          leftIcon={<Mail size={20} />}
          error={errors.email}
          required
        />

        <Input
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Enter your password"
          leftIcon={<Lock size={20} />}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-gray-600">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-primary hover:text-primary-600 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            to="/register"
            state={{ from: from, pendingCartItem: hasPendingCartItem }}
            className="text-primary hover:text-primary-600 font-semibold"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
```
</details>

---

### ⚛️ ProtectedRoute.tsx
**Path:** `src\components\auth\ProtectedRoute.tsx`
**Component Type:** React Components

<details>
<summary>View Code (22 lines)</summary>

```tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import LoadingScreen from '@components/common/LoadingScreen';

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
```
</details>

---

### ⚛️ RegisterForm.tsx
**Path:** `src\components\auth\RegisterForm.tsx`
**Component Type:** React Components

<details>
<summary>View Code (894 lines)</summary>

```tsx
﻿import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useCart } from '@hooks/useCart';
import { useToast } from '@components/common/Toast';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { RegisterData } from '@models/auth.types';
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  Info,
  ShieldCheck,
} from 'lucide-react';

interface RegisterFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  redirectOnSuccess?: boolean;
  className?: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  general?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onCancel,
  showCancel = false,
  redirectOnSuccess = true,
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, verifyEmail, resendVerification } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // âœ… Get the return URL and check for pending cart item
  const from = location.state?.from || '/';
  const hasPendingCartItem = location.state?.pendingCartItem || false;

  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill('')
  );
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [backendErrors, setBackendErrors] = useState<string[]>([]);

  useEffect(() => {
    if (resendCountdown <= 0) {
      return;
    }
    const timer = setTimeout(() => {
      setResendCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // âœ… Add pending item to cart after successful registration
  const addPendingItemToCart = async () => {
    const pendingItemStr = localStorage.getItem('bakars_pending_cart_item');
    if (pendingItemStr) {
      try {
        const pendingItem = JSON.parse(pendingItemStr);

        // Check if the item is not too old (24 hours)
        const itemDate = new Date(pendingItem.timestamp);
        const now = new Date();
        const hoursDiff =
          (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          await addToCart(
            pendingItem.item,
            pendingItem.quantity,
            pendingItem.specialInstructions
          );
          showToast(`${pendingItem.item.name} added to cart!`, 'success');
        }

        // Clear the pending item
        localStorage.removeItem('bakars_pending_cart_item');
      } catch (error) {
        console.error('Failed to add pending item to cart:', error);
      }
    }
  };

  const resetVerificationState = () => {
    setVerificationCode(Array(6).fill(''));
    setResendCountdown(0);
  };

  const handleVerificationCodeChange = (
    index: number,
    value: string
  ) => {
    if (value && !/^\d$/.test(value)) {
      return;
    }
    const updated = [...verificationCode];
    updated[index] = value;
    setVerificationCode(updated);

    if (value && index < verificationCode.length - 1) {
      const nextInput = document.getElementById(
        `verification-code-${index + 1}`
      );
      nextInput?.focus();
    }
  };

  const handleVerificationCodeKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const previousInput = document.getElementById(
        `verification-code-${index - 1}`
      );
      previousInput?.focus();
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationEmail) {
      showToast('Verification email missing. Please sign up again.', 'error');
      return;
    }

    if (verificationCode.some((digit) => !digit)) {
      showToast('Please enter the 6-digit verification code.', 'warning');
      return;
    }

    setIsVerifying(true);
    try {
      await verifyEmail({
        email: verificationEmail,
        code: verificationCode.join(''),
      });

      showToast('Email verified! You are now signed in.', 'success');
      setShowVerification(false);
      resetVerificationState();

      if (hasPendingCartItem) {
        await addPendingItemToCart();
      }

      if (onSuccess) {
        onSuccess();
      }

      if (redirectOnSuccess) {
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Verification failed. Please try again.';
      showToast(message, 'error');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!verificationEmail || resendCountdown > 0) {
      return;
    }

    setIsResending(true);
    try {
      await resendVerification(verificationEmail);
      showToast('Verification code resent!', 'success');
      setVerificationCode(Array(6).fill(''));
      setResendCountdown(60);
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Unable to resend verification code.';
      showToast(message, 'error');
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToSignup = () => {
    setShowVerification(false);
    setVerificationEmail('');
    resetVerificationState();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }

    // Clear backend errors when user makes changes
    if (backendErrors.length > 0) {
      setBackendErrors([]);
    }
  };

  // Format phone number to backend-expected format
  const formatPhoneForBackend = (phone: string): string => {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, '');

    console.log('ðŸ“ž [DEBUG] Original phone:', phone);
    console.log('ðŸ“ž [DEBUG] Cleaned phone:', cleaned);

    // If starts with 0, replace with 61
    if (cleaned.startsWith('0')) {
      cleaned = '61' + cleaned.slice(1);
    }

    // If doesn't start with 61, add it
    if (!cleaned.startsWith('61')) {
      cleaned = '61' + cleaned;
    }

    // Add + prefix
    const formatted = '+' + cleaned;

    console.log('âœ… [DEBUG] Formatted phone for backend:', formatted);

    return formatted;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First Name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = 'First name must be at least 2 characters';
    } else if (formData.first_name.trim().length > 50) {
      newErrors.first_name = 'First name must be less than 50 characters';
    }

    // Last Name validation
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = 'Last name must be at least 2 characters';
    } else if (formData.last_name.trim().length > 50) {
      newErrors.last_name = 'Last name must be less than 50 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (Australian mobile)
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      // Accept formats: 04XX XXX XXX or 4XX XXX XXX or +614XX XXX XXX
      if (!/^(0[4-5]\d{8}|[4-5]\d{8}|61[4-5]\d{8})$/.test(cleanPhone)) {
        newErrors.phone =
          'Please enter a valid Australian mobile number (e.g., 0412 345 678)';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (formData.password.length > 100) {
      newErrors.password = 'Password must be less than 100 characters';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Parse FastAPI validation errors
  const parseBackendErrors = (error: any): string[] => {
    const errorMessages: string[] = [];

    console.log(
      'â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•'
    );
    console.log('â•‘ ðŸ” BACKEND ERROR ANALYSIS');
    console.log(
      'â• â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•'
    );

    console.log('â•‘ Full Error Object (stringified):');
    console.log(JSON.stringify(error, null, 2));

    if (error.response) {
      console.log('â•‘ Response Status:', error.response.status);
      console.log('â•‘ Response StatusText:', error.response.statusText);
      console.log('â•‘ Response Data (stringified):');
      console.log(JSON.stringify(error.response.data, null, 2));

      if (error.response.data) {
        console.log('â•‘ Response Data Keys:', Object.keys(error.response.data));

        if (error.response.data.detail) {
          console.log('â•‘ Detail (stringified):');
          console.log(JSON.stringify(error.response.data.detail, null, 2));
        }
      }
    }

    console.log(
      'â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•'
    );

    // Check if it's a FastAPI validation error (422)
    if (error.response?.status === 422 && error.response?.data?.detail) {
      const detail = error.response.data.detail;

      // FastAPI returns array of validation errors
      if (Array.isArray(detail)) {
        console.log(`ðŸ”´ Found ${detail.length} validation errors`);

        detail.forEach((err: any, index: number) => {
          console.log(
            `   Error ${index + 1} (stringified):`,
            JSON.stringify(err, null, 2)
          );

          const field = err.loc[err.loc.length - 1];
          const message = err.msg;

          // Map field names to user-friendly names
          const fieldNames: Record<string, string> = {
            first_name: 'First Name',
            last_name: 'Last Name',
            email: 'Email',
            phone: 'Phone Number',
            password: 'Password',
            role: 'Role',
          };

          const fieldName = fieldNames[field as string] || field;
          const errorMsg = `${fieldName}: ${message}`;
          errorMessages.push(errorMsg);
          console.log(`   âœ… Added error: ${errorMsg}`);

          // Also set field-specific error
          if (field && typeof field === 'string') {
            setErrors((prev) => ({
              ...prev,
              [field]: message,
            }));
          }
        });
      } else if (typeof detail === 'string') {
        console.log('ðŸŸ¡ Detail is a string:', detail);
        errorMessages.push(detail);
      } else if (typeof detail === 'object' && detail !== null) {
        console.log(
          'ðŸŸ¢ Detail is an object (stringified):',
          JSON.stringify(detail, null, 2)
        );
        errorMessages.push(JSON.stringify(detail));
      }
    }
    // Generic error message
    else if (error.response?.data?.message) {
      console.log(
        'ðŸŸ¨ Using response.data.message:',
        error.response.data.message
      );
      errorMessages.push(error.response.data.message);
    } else if (error.message) {
      console.log('ðŸŸ¦ Using error.message:', error.message);
      errorMessages.push(error.message);
    } else {
      console.log('âš ï¸ No recognizable error format, using generic message');
      errorMessages.push('Registration failed. Please try again.');
    }

    console.log('ðŸ“‹ Final error messages:', errorMessages);
    return errorMessages;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous backend errors
    setBackendErrors([]);

    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format data for backend API
      const registrationData: RegisterData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formatPhoneForBackend(formData.phone),
        password: formData.password,
      };

      console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');
      console.log('ðŸ“¤ SENDING REGISTRATION REQUEST');
      console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');
      console.log('Data being sent (stringified):');
      console.log(JSON.stringify(registrationData, null, 2));
      console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');

      const email = await register(registrationData);

      console.log('\u2705 Registration successful!');
      resetVerificationState();
      setVerificationEmail(email);
      setShowVerification(true);
      setResendCountdown(60);
      showToast('Verification code sent! Please check your email.', 'success');
    } catch (error: any) {
      console.error('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');
      console.error('âŒ REGISTRATION FAILED');
      console.error('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');

      // Parse and display backend errors
      const parsedErrors = parseBackendErrors(error);
      setBackendErrors(parsedErrors);

      // Show first error as toast
      if (parsedErrors.length > 0) {
        showToast(parsedErrors[0], 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  const isVerificationCodeComplete = verificationCode.every((digit) => !!digit);

  if (showVerification) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text">Verify your email</h3>
          <p className="text-sm text-gray-600">
            We've sent a 6-digit verification code to{' '}
            <span className="block font-semibold text-gray-900">
              {verificationEmail}
            </span>
          </p>
          <p className="text-xs text-gray-500">Code expires in 15 minutes.</p>
        </div>

        <form onSubmit={handleVerificationSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`verification-code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleVerificationCodeChange(index, e.target.value)
                }
                onKeyDown={(e) => handleVerificationCodeKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                disabled={isVerifying}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isVerifying}
            disabled={isVerifying || !isVerificationCodeComplete}
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </Button>

          <div className="text-center space-y-3 text-sm text-gray-600">
            <div>
              Didn't receive the code?
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending || resendCountdown > 0}
                className={`ml-2 font-semibold ${
                  isResending || resendCountdown > 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-primary hover:text-primary-600'
                }`}
              >
                {isResending
                  ? 'Sending...'
                  : resendCountdown > 0
                  ? `Resend in ${resendCountdown}s`
                  : 'Resend Code'}
              </button>
            </div>
            <button
              type="button"
              onClick={handleBackToSignup}
              disabled={isVerifying}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Use a different email
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Show info if there's a pending cart item */}
      {hasPendingCartItem && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-800">
            Sign up to add your selected item to cart
          </p>
        </div>
      )}

      {/* Show info if redirected from a protected page */}
      {from !== '/' && from !== '/register' && !hasPendingCartItem && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            Please sign up to access that page
          </p>
        </div>
      )}

      {/* Backend Errors Display */}
      {backendErrors.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle
              className="text-red-600 flex-shrink-0 mt-0.5"
              size={20}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-2">
                Registration Failed
              </h3>
              <ul className="space-y-1">
                {backendErrors.map((error, index) => (
                  <li
                    key={index}
                    className="text-sm text-red-700 flex items-start space-x-2"
                  >
                    <span className="text-red-500 mt-0.5">â€¢</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Name Fields - Split into First and Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          name="first_name"
          label="First Name"
          value={formData.first_name}
          onChange={handleChange}
          error={errors.first_name}
          leftIcon={<User size={20} />}
          placeholder="John"
          required
          disabled={isSubmitting}
        />

        <Input
          type="text"
          name="last_name"
          label="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          error={errors.last_name}
          leftIcon={<User size={20} />}
          placeholder="Doe"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <Input
        type="email"
        name="email"
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        leftIcon={<Mail size={20} />}
        placeholder="your@email.com"
        required
        disabled={isSubmitting}
      />

      {/* Phone */}
      <div>
        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          leftIcon={<Phone size={20} />}
          placeholder="0412 345 678"
          helperText="Australian mobile number"
          required
          disabled={isSubmitting}
        />
        {/* Phone Format Helper */}
        <div className="mt-2 flex items-start space-x-2 text-xs text-blue-600 bg-blue-50 rounded-lg p-3">
          <Info size={14} className="flex-shrink-0 mt-0.5" />
          <span>
            Accepted formats: <strong>0412 345 678</strong> or{' '}
            <strong>04 1234 5678</strong> or <strong>+61 412 345 678</strong>
          </span>
        </div>
      </div>

      {/* Password */}
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          leftIcon={<Lock size={20} />}
          placeholder="Minimum 8 characters"
          required
          disabled={isSubmitting}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isSubmitting}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          leftIcon={<Lock size={20} />}
          placeholder="Re-enter password"
          required
          disabled={isSubmitting}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isSubmitting}
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-2">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
            disabled={isSubmitting}
          />
          <span className="text-sm text-gray-600">
            I agree to the{' '}
            <a
              href="/terms"
              target="_blank"
              className="text-primary font-semibold hover:underline"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="/privacy"
              target="_blank"
              className="text-primary font-semibold hover:underline"
            >
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.acceptTerms && (
          <div className="flex items-center space-x-2 text-red-500 text-sm">
            <AlertCircle size={16} />
            <span>{errors.acceptTerms}</span>
          </div>
        )}
      </div>

      {/* Password Requirements Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-2 flex items-center space-x-2">
          <Info size={16} />
          <span>Password Requirements:</span>
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs ml-1">
          <li
            className={
              formData.password.length >= 8
                ? 'text-green-600 font-semibold'
                : ''
            }
          >
            At least 8 characters long
          </li>
          <li
            className={
              /[A-Z]/.test(formData.password)
                ? 'text-green-600 font-semibold'
                : ''
            }
          >
            Contains uppercase letter (A-Z)
          </li>
          <li
            className={
              /[a-z]/.test(formData.password)
                ? 'text-green-600 font-semibold'
                : ''
            }
          >
            Contains lowercase letter (a-z)
          </li>
          <li
            className={
              /\d/.test(formData.password) ? 'text-green-600 font-semibold' : ''
            }
          >
            Contains number (0-9)
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth={!showCancel}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className={showCancel ? 'sm:flex-1' : ''}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>

        {showCancel && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="sm:flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;

```
</details>

---

### ⚛️ RoleGuard.tsx
**Path:** `src\components\auth\RoleGuard.tsx`
**Component Type:** React Components

<details>
<summary>View Code (43 lines)</summary>

```tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';

interface RoleGuardProps {
  requiredRole: 'customer' | 'admin';
  children?: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ requiredRole, children }) => {
  const { role, user, isAuthenticated } = useAuthStore();

  // ✅ Debug logging
  console.log('🔐 RoleGuard Check:', {
    requiredRole,
    userRole: role,
    isAuthenticated,
    userEmail: user?.email,
    hasAccess: role === requiredRole,
  });

  // ✅ Check authentication first
  if (!isAuthenticated) {
    console.warn('⛔ Not authenticated - redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // ✅ Check role
  if (role !== requiredRole) {
    console.warn('⛔ Access denied - redirecting to home', {
      required: requiredRole,
      actual: role,
    });
    return <Navigate to="/" replace />;
  }

  console.log('✅ Access granted to', requiredRole, 'routes');

  // ✅ Use Outlet for nested routes, or children if provided
  return children ? <>{children}</> : <Outlet />;
};

export default RoleGuard;
```
</details>

---

### ⚛️ CartItem.tsx
**Path:** `src\components\cart\CartItem.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface CartItemProps {
  // Add props here
}

export const CartItem: React.FC<CartItemProps> = () => {
  return (
    <div>
      {/* CartItem Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ CartSummary.tsx
**Path:** `src\components\cart\CartSummary.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface CartSummaryProps {
  // Add props here
}

export const CartSummary: React.FC<CartSummaryProps> = () => {
  return (
    <div>
      {/* CartSummary Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ DeliverySelector.tsx
**Path:** `src\components\cart\DeliverySelector.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface DeliverySelectorProps {
  // Add props here
}

export const DeliverySelector: React.FC<DeliverySelectorProps> = () => {
  return (
    <div>
      {/* DeliverySelector Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ CateringMenu.tsx
**Path:** `src\components\catering\CateringMenu.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface CateringMenuProps {
  // Add props here
}

export const CateringMenu: React.FC<CateringMenuProps> = () => {
  return (
    <div>
      {/* CateringMenu Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ CateringSummary.tsx
**Path:** `src\components\catering\CateringSummary.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface CateringSummaryProps {
  // Add props here
}

export const CateringSummary: React.FC<CateringSummaryProps> = () => {
  return (
    <div>
      {/* CateringSummary Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ EventDetails.tsx
**Path:** `src\components\catering\EventDetails.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface EventDetailsProps {
  // Add props here
}

export const EventDetails: React.FC<EventDetailsProps> = () => {
  return (
    <div>
      {/* EventDetails Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ HeadCountCalculator.tsx
**Path:** `src\components\catering\HeadCountCalculator.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface HeadCountCalculatorProps {
  // Add props here
}

export const HeadCountCalculator: React.FC<HeadCountCalculatorProps> = () => {
  return (
    <div>
      {/* HeadCountCalculator Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ AddressSelector.tsx
**Path:** `src\components\checkout\AddressSelector.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface AddressSelectorProps {
  // Add props here
}

export const AddressSelector: React.FC<AddressSelectorProps> = () => {
  return (
    <div>
      {/* AddressSelector Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ OrderReview.tsx
**Path:** `src\components\checkout\OrderReview.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface OrderReviewProps {
  // Add props here
}

export const OrderReview: React.FC<OrderReviewProps> = () => {
  return (
    <div>
      {/* OrderReview Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ PaymentForm.tsx
**Path:** `src\components\checkout\PaymentForm.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface PaymentFormProps {
  // Add props here
}

export const PaymentForm: React.FC<PaymentFormProps> = () => {
  return (
    <div>
      {/* PaymentForm Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ PlaceOrderButton.tsx
**Path:** `src\components\checkout\PlaceOrderButton.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface PlaceOrderButtonProps {
  // Add props here
}

export const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = () => {
  return (
    <div>
      {/* PlaceOrderButton Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ Button.tsx
**Path:** `src\components\common\Button.tsx`
**Component Type:** React Components

<details>
<summary>View Code (62 lines)</summary>

```tsx
import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary hover:bg-primary-600 text-white focus:ring-primary shadow-md hover:shadow-lg',
    secondary:
      'bg-secondary hover:bg-secondary-600 text-white focus:ring-secondary',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-primary-50 focus:ring-primary',
    danger:
      'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-md',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
```
</details>

---

### ⚛️ Card.tsx
**Path:** `src\components\common\Card.tsx`
**Component Type:** React Components

<details>
<summary>View Code (42 lines)</summary>

```tsx
import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  padding = 'md',
  onClick,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-md transition-shadow duration-200',
        hoverable && 'hover:shadow-lg cursor-pointer',
        paddingClasses[padding],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
```
</details>

---

### ⚛️ Input.tsx
**Path:** `src\components\common\Input.tsx`
**Component Type:** React Components

<details>
<summary>View Code (66 lines)</summary>

```tsx
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, leftIcon, rightIcon, className, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={clsx(
              'w-full px-4 py-3 border rounded-lg transition-all duration-200',
              'focus:ring-2 focus:ring-primary focus:border-transparent outline-none',
              error ? 'border-red-500' : 'border-gray-300',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              'disabled:bg-gray-100 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
```
</details>

---

### ⚛️ LoadingScreen.tsx
**Path:** `src\components\common\LoadingScreen.tsx`
**Component Type:** React Components

<details>
<summary>View Code (32 lines)</summary>

```tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

type LoadingScreenVariant = 'page' | 'section';

interface LoadingScreenProps {
  message?: string;
  variant?: LoadingScreenVariant;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading, please wait...',
  variant = 'page',
}) => {
  const wrapperClasses =
    variant === 'page'
      ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm px-4'
      : 'w-full py-12 flex flex-col items-center justify-center';

  return (
    <div className={wrapperClasses}>
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      {message && (
        <p className="mt-4 text-sm font-medium text-gray-600 text-center">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingScreen;
```
</details>

---

### ⚛️ Modal.tsx
**Path:** `src\components\common\Modal.tsx`
**Component Type:** React Components

<details>
<summary>View Code (87 lines)</summary>

```tsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className={clsx(
            'relative w-full bg-white rounded-xl shadow-2xl transform transition-all flex flex-col overflow-hidden max-h-[calc(100vh-3rem)]',
            sizeClasses[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              {title && (
                <h2 className="text-2xl font-heading font-bold text-text">{title}</h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```
</details>

---

### ⚛️ Pagination.tsx
**Path:** `src\components\common\Pagination.tsx`
**Component Type:** React Components

<details>
<summary>View Code (148 lines)</summary>

```tsx
import React from 'react';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
  showSummary?: boolean;
}

const getPageNumbers = (currentPage: number, totalPages: number): number[] => {
  const maxButtons = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxButtons - 1);

  // Adjust start if we are close to the end
  start = Math.max(1, end - maxButtons + 1);

  const pages: number[] = [];
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }
  return pages;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  className,
  showSummary = false,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const firstItemIndex = (currentPage - 1) * pageSize + 1;
  const lastItemIndex = Math.min(currentPage * pageSize, totalItems);

  const changePage = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  const renderEllipsisBefore = pageNumbers[0] > 1;
  const renderEllipsisAfter = pageNumbers[pageNumbers.length - 1] < totalPages;

  return (
    <div
      className={clsx(
        'flex flex-col gap-3 items-center justify-between md:flex-row',
        className,
      )}
    >
      {showSummary && (
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{firstItemIndex}</span> to{' '}
          <span className="font-semibold">{lastItemIndex}</span> of{' '}
          <span className="font-semibold">{totalItems}</span> items
        </div>
      )}

      <nav className="flex items-center space-x-1" aria-label="Pagination">
        <button
          type="button"
          className={clsx(
            'px-3 py-1.5 text-sm rounded-md border transition-colors',
            isFirstPage
              ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50'
              : 'border-gray-200 text-gray-700 hover:bg-primary hover:text-white',
          )}
          onClick={() => changePage(currentPage - 1)}
          disabled={isFirstPage}
        >
          Prev
        </button>

        {renderEllipsisBefore && (
          <>
            <button
              type="button"
              className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-colors"
              onClick={() => changePage(1)}
            >
              1
            </button>
            <span className="px-2 text-gray-400">…</span>
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            className={clsx(
              'px-3 py-1.5 text-sm rounded-md border transition-colors',
              page === currentPage
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 text-gray-700 hover:bg-primary hover:text-white',
            )}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}

        {renderEllipsisAfter && (
          <>
            <span className="px-2 text-gray-400">…</span>
            <button
              type="button"
              className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-colors"
              onClick={() => changePage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          className={clsx(
            'px-3 py-1.5 text-sm rounded-md border transition-colors',
            isLastPage
              ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50'
              : 'border-gray-200 text-gray-700 hover:bg-primary hover:text-white',
          )}
          onClick={() => changePage(currentPage + 1)}
          disabled={isLastPage}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
```
</details>

---

### ⚛️ Toast.tsx
**Path:** `src\components\common\Toast.tsx`
**Component Type:** React Components

<details>
<summary>View Code (103 lines)</summary>

```tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const createToastId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = createToastId();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={24} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={24} />;
      default:
        return <Info className="text-blue-500" size={24} />;
    }
  };

  const getStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed inset-x-0 top-8 z-50 flex justify-center pointer-events-none px-4">
        <div className="space-y-3 w-full max-w-md">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center space-x-3 px-4 py-3 rounded-lg border-2 shadow-lg animate-slide-in ${getStyles(toast.type)} w-full`}
            >
              {getIcon(toast.type)}
              <p className="flex-1 font-medium text-sm text-center">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="hover:bg-white/20 rounded p-1 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};
```
</details>

---

### ⚛️ CartIcon.tsx
**Path:** `src\components\layout\CartIcon.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface CartIconProps {
  // Add props here
}

export const CartIcon: React.FC<CartIconProps> = () => {
  return (
    <div>
      {/* CartIcon Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ Footer.tsx
**Path:** `src\components\layout\Footer.tsx`
**Component Type:** React Components

<details>
<summary>View Code (162 lines)</summary>

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import Logo from './Logo';
import { BUSINESS_INFO } from '@utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <Logo variant="white" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sydney's premier food delivery and catering service. Fresh,
              delicious meals delivered to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/menu/daily"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Daily Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/menu/meals"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Meals Subscription
                </Link>
              </li>
              <li>
                <Link
                  to="/catering"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Special Catering
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">
                  {BUSINESS_INFO.address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Hours */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Business Hours</h4>
              <p className="text-gray-300 text-sm">
                Monday - Sunday
                <br />
                11:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-300 text-sm">
            © {currentYear} Bakar's Food & Catering. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-gray-300 hover:text-primary text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-300 hover:text-primary text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```
</details>

---

### ⚛️ Header.tsx
**Path:** `src\components\layout\Header.tsx`
**Component Type:** React Components

<details>
<summary>View Code (217 lines)</summary>

```tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '@store/authStore';
import { useCartStore } from '@store/cartStore';
import Logo from './Logo';
import Button from '@components/common/Button';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuthStore();
  const cartStore = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch cart on mount if authenticated
  useEffect(() => {
    if (isAuthenticated && !cartStore.cartSummary && !cartStore.isLoading) {
      cartStore.fetchCart().catch(console.error);
    }
  }, [isAuthenticated]);

  // Calculate cart count safely
  const cartItemCount = cartStore.cartSummary?.items_count || 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Daily Menu', path: '/menu/daily' },
    { name: 'Meals Subscription', path: '/menu/meals' },
    { name: 'Catering', path: '/catering' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md relative">
      <div className="container-custom">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-8 min-w-0">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(link.path)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-text'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Cart Icon - Only show if authenticated */}
            {isAuthenticated && (
              <button
                onClick={() => navigate('/cart')} // ✅ CHANGED: Navigate to /cart instead of /checkout
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart size={24} className="text-text" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                    {user?.first_name?.charAt(0)?.toUpperCase() ||
                      user?.email?.charAt(0)?.toUpperCase() ||
                      'U'}
                  </div>
                  <span className="hidden lg:block font-medium text-text">
                    {user?.first_name || user?.email?.split('@')[0] || 'User'}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings size={18} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left text-red-600"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden absolute inset-x-0 top-full bg-white shadow-lg border-t border-gray-200">
          <div className="container-custom py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-3 px-4 font-medium transition-colors hover:bg-gray-50 rounded-lg ${
                  isActive(link.path)
                    ? 'text-primary bg-primary-50'
                    : 'text-text'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!isAuthenticated && (
              <div className="flex flex-col space-y-2 mt-4 px-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    navigate('/register');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
```
</details>

---

### ⚛️ Layout.tsx
**Path:** `src\components\layout\Layout.tsx`
**Component Type:** React Components

<details>
<summary>View Code (23 lines)</summary>

```tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();

  // Only show footer on home page
  const showFooter = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
```
</details>

---

### ⚛️ Logo.tsx
**Path:** `src\components\layout\Logo.tsx`
**Component Type:** React Components

<details>
<summary>View Code (32 lines)</summary>

```tsx
import React from 'react';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const colorClass = variant === 'white' ? 'text-white' : 'text-primary';
  const accentColorClass = variant === 'white' ? 'text-white' : 'text-secondary';

  return (
    <div
      className={`font-heading font-bold leading-tight ${sizeClasses[size]} ${colorClass}`}
    >
      <span className="tracking-tight whitespace-nowrap">Bakar's</span>
      <span
        className={`${accentColorClass} block sm:inline sm:ml-2 whitespace-nowrap`}
      >
        Food & Catering
      </span>
    </div>
  );
};

export default Logo;
```
</details>

---

### ⚛️ Navigation.tsx
**Path:** `src\components\layout\Navigation.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface NavigationProps {
  // Add props here
}

export const Navigation: React.FC<NavigationProps> = () => {
  return (
    <div>
      {/* Navigation Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ UserMenu.tsx
**Path:** `src\components\layout\UserMenu.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface UserMenuProps {
  // Add props here
}

export const UserMenu: React.FC<UserMenuProps> = () => {
  return (
    <div>
      {/* UserMenu Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ CartSummary.tsx
**Path:** `src\components\menu\CartSummary.tsx`
**Component Type:** React Components

<details>
<summary>View Code (217 lines)</summary>

```tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@hooks/useCart';
import { useAuthStore } from '@store/authStore';
import { formatCurrency } from '@utils/formatters';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

interface CartSummaryProps {
  sticky?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ sticky = true }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const {
    items,
    summary,
    isLoading,
    isUpdating,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
  } = useCart();

  // Refresh cart on mount
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    }
  }, [isAuthenticated]);

  // Only show cart if authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Loading state
  if (isLoading && items.length === 0) {
    return (
      <Card className={sticky ? 'sticky top-24' : ''} padding="lg">
        <div className="text-center py-8">
          <Loader2 className="mx-auto h-8 w-8 text-primary animate-spin mb-4" />
          <p className="text-sm text-gray-500">Loading cart...</p>
        </div>
      </Card>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <Card className={sticky ? 'sticky top-24' : ''} padding="lg">
        <div className="text-center py-8">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="font-semibold text-gray-500 mb-2">
            Your cart is empty
          </h3>
          <p className="text-sm text-gray-400">Add items to get started</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={sticky ? 'sticky top-24' : ''} padding="lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="text-primary" size={24} />
          <h3 className="font-heading text-xl font-bold text-text">
            Your Cart
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshCart}
            className="p-1 text-gray-400 hover:text-primary transition-colors"
            disabled={isUpdating}
          >
            <RefreshCw size={16} className={isUpdating ? 'animate-spin' : ''} />
          </button>
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {summary.item_count} {summary.item_count === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Cart items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item: any) => (
          <div
            key={item.item_id}
            className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0"
          >
            {/* Details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-text text-sm mb-1">
                {item.item_name}
              </h4>
              <p className="text-xs text-gray-500 mb-1">{item.category}</p>
              <p className="text-primary font-semibold text-sm mb-2">
                {formatCurrency(item.price)}
              </p>

              {/* Quantity controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateCartQuantity(item.item_id, item.quantity - 1)
                  }
                  disabled={isUpdating}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:border-primary transition-colors disabled:opacity-50"
                >
                  <Minus size={12} />
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateCartQuantity(item.item_id, item.quantity + 1)
                  }
                  disabled={isUpdating}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:border-primary transition-colors disabled:opacity-50"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={() => removeFromCart(item.item_id)}
              disabled={isUpdating}
              className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 disabled:opacity-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="space-y-2 mb-6 pt-4 border-t-2 border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">
            {formatCurrency(summary.subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery Fee:</span>
          <span className="font-medium">
            {summary.delivery_fee > 0
              ? formatCurrency(summary.delivery_fee)
              : 'FREE'}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (GST 10%):</span>
          <span className="font-medium">{formatCurrency(summary.tax)}</span>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-text">Total:</span>
            <span className="font-heading text-2xl font-bold text-primary">
              {formatCurrency(summary.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => navigate('/checkout')}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Updating...
            </>
          ) : (
            'Proceed to Checkout'
          )}
        </Button>

        <button
          onClick={clearCart}
          disabled={isUpdating}
          className="w-full text-sm text-gray-600 hover:text-red-500 transition-colors py-2 disabled:opacity-50"
        >
          Clear Cart
        </button>
      </div>
    </Card>
  );
};

export default CartSummary;
```
</details>

---

### ⚛️ CategoryFilter.tsx
**Path:** `src\components\menu\CategoryFilter.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface CategoryFilterProps {
  // Add props here
}

export const CategoryFilter: React.FC<CategoryFilterProps> = () => {
  return (
    <div>
      {/* CategoryFilter Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ FilterBar.tsx
**Path:** `src\components\menu\FilterBar.tsx`
**Component Type:** React Components

<details>
<summary>View Code (90 lines)</summary>

```tsx
import React from 'react';
import { MenuFilters, MenuCategory } from '@models/menu.types';
import { Filter, X } from 'lucide-react';
import { formatCategoryLabel } from '@utils/formatters';

interface FilterBarProps {
  categories: MenuCategory[];
  activeFilters: MenuFilters;
  onFilterChange: (filters: Partial<MenuFilters>) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  activeFilters,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = Boolean(activeFilters.category);

  const getCategoryName = (category: MenuCategory): string => {
    return category.display_name || formatCategoryLabel(category.name);
  };

  const getCategoryValue = (category: MenuCategory): string => {
    return category.name;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-primary" />
          <h3 className="font-semibold text-text">Filters</h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <X size={16} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFilterChange({ category: undefined })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !activeFilters.category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => {
              const categoryName = getCategoryName(category);
              const categoryValue = getCategoryValue(category);

              return (
                <button
                  key={category._id || category.id || categoryValue}
                  onClick={() => onFilterChange({ category: categoryValue })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilters.category === categoryValue
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {categoryName}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterBar;
```
</details>

---

### ⚛️ MenuItemCard.tsx
**Path:** `src\components\menu\MenuItemCard.tsx`
**Component Type:** React Components

<details>
<summary>View Code (373 lines)</summary>

```tsx
import React, { useState } from 'react';
import { MenuItem } from '@models/menu.types';
import { useCart } from '@hooks/useCart';
import { useAuthStore } from '@store/authStore';
import { useAuthModalStore } from '@store/authModalStore';
import { useMenuStore } from '@store/menuStore';
import { formatCurrency, formatCategoryLabel } from '@utils/formatters';
import { getImageUrl, handleImageError } from '@utils/images';
import { Plus, Minus, ShoppingCart, AlertCircle, Utensils } from 'lucide-react';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';
import { useToast } from '@components/common/Toast';

interface MenuItemCardProps {
  item: MenuItem;
  showQuickAdd?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  showQuickAdd = true,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { addToCart, isUpdating } = useCart();
  const { isAuthenticated } = useAuthStore();
  const { openModal, setPendingCartAction } = useAuthModalStore();
  const { showToast } = useToast();
  const categoryMap = useMenuStore((state) => state.categoryMap);

  const handleAddToCart = async () => {
    if (!item.id) {
      console.error('❌ Item missing ID:', item);
      showToast('Error: Item data is invalid', 'error');
      return;
    }

    if (!isAuthenticated) {
      // Save the pending cart action
      setPendingCartAction({
        type: 'daily_menu',
        item: item,
        quantity: quantity,
        specialInstructions: specialInstructions,
        timestamp: new Date().toISOString(),
      });

      // Close the details modal and open auth modal
      setShowDetailsModal(false);
      openModal('login');
      return;
    }

    if (quantity > 0) {
      try {
        await addToCart(item, quantity, specialInstructions);
        // Reset form and close modal
        setQuantity(1);
        setSpecialInstructions('');
        setShowDetailsModal(false);
        showToast('Item added to cart!', 'success');
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
    }
  };

  const handleQuickAdd = () => {
    if (!isAuthenticated) {
      // Save the pending cart action with default quantity
      setPendingCartAction({
        type: 'daily_menu',
        item: item,
        quantity: 1,
        specialInstructions: '',
        timestamp: new Date().toISOString(),
      });

      // Open auth modal
      openModal('login');
      return;
    }

    // If authenticated, open the modal
    setShowDetailsModal(true);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    // Reset to default values when closing
    setQuantity(1);
    setSpecialInstructions('');
  };

  const categoryLabel = React.useMemo(() => {
    const category = categoryMap[item.category];
    if (category) {
      return category.display_name || category.name;
    }
    return formatCategoryLabel(item.category);
  }, [categoryMap, item.category]);

  // Get the proper image URL
  const imageUrl = getImageUrl(item.image_url) || undefined;
  const hasImage = Boolean(imageUrl) && !imageError;
  const showSkeleton = Boolean(imageUrl) && !imageLoaded && !imageError;

  React.useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [item.image_url]);

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    handleImageError(e);
  };

  const onImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <>
      <Card
        className="flex h-full flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
        padding="none"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {showSkeleton && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex flex-col items-center justify-center">
              <Utensils className="text-gray-400 mb-2" size={32} />
              <span className="text-gray-400 text-sm">Loading...</span>
            </div>
          )}

          {hasImage ? (
            <img
              src={imageUrl}
              alt={item.name}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100 hover:scale-110' : 'opacity-0'
              }`}
              onLoad={onImageLoad}
              onError={onImageError}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-xs">
              <Utensils className="mb-2" size={32} />
              <span>Image unavailable</span>
            </div>
          )}

          {/* Availability badge */}
          {!item.is_available && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                Sold Out
              </span>
            </div>
          )}

          {/* Spice level indicator */}
          {item.spice_level && (
            <div className="absolute bottom-3 left-3">
              <div className="bg-white px-2 py-1 rounded-full shadow-md text-xs font-semibold">
                {item.spice_level === 'mild' && '🌶️ Mild'}
                {item.spice_level === 'medium' && '🌶️🌶️ Medium'}
                {item.spice_level === 'hot' && '🌶️🌶️🌶️ Hot'}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Category tag */}
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-2">
            {categoryLabel}
          </span>

          {/* Name and description */}
          <h3 className="font-heading text-xl font-bold text-text mb-2">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>

          {/* Allergens warning */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="flex items-start space-x-2 mb-4 text-xs text-orange-700 bg-orange-50 p-2 rounded">
              <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
              <span>Contains: {item.allergens.join(', ')}</span>
            </div>
          )}

          {/* Price and action */}
          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <div className="flex items-end gap-1 sm:gap-2 whitespace-nowrap">
              <span className="font-heading text-xl sm:text-2xl font-bold text-primary leading-none">
                {formatCurrency(item.price)}
              </span>
              {item.serving_size && (
                <span className="text-xs sm:text-sm text-gray-500 leading-none">
                  / {item.serving_size}
                </span>
              )}
            </div>

            {showQuickAdd && item.is_available && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleQuickAdd}
                disabled={isUpdating || !item.id}
              >
                <ShoppingCart size={16} className="mr-1" />
                Add
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Add to Cart Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        title={item.name}
        size="md"
      >
        <div className="space-y-6">
          {/* Item Image in Modal */}
          {hasImage ? (
            <div className="relative h-48 w-full rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="relative h-48 w-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
              <Utensils className="mr-2" size={20} />
              <span>No image available</span>
            </div>
          )}

          {/* Item Details */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-semibold rounded-full">
                {categoryLabel}
              </span>
              {item.spice_level && (
                <span className="text-xs text-gray-600">
                  {item.spice_level === 'mild' && '🌶️ Mild'}
                  {item.spice_level === 'medium' && '🌶️🌶️ Medium'}
                  {item.spice_level === 'hot' && '🌶️🌶️🌶️ Hot'}
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm">{item.description}</p>

            {/* Allergens in modal */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="flex items-start space-x-2 mt-3 text-xs text-orange-700 bg-orange-50 p-2 rounded">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>Contains: {item.allergens.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium text-text mb-3">
              Quantity
            </label>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={decrementQuantity}
                className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="w-16 text-center font-semibold text-2xl">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              placeholder="e.g., Extra spicy, no onions..."
            />
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price per item:</span>
              <span className="font-semibold">
                {formatCurrency(item.price)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-heading text-2xl font-bold text-primary">
                {formatCurrency(item.price * quantity)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleCloseModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="flex-1"
              disabled={isUpdating || !item.id}
              isLoading={isUpdating}
            >
              {isUpdating ? (
                'Adding...'
              ) : (
                <>
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart • {formatCurrency(item.price * quantity)}
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MenuItemCard;
```
</details>

---

### ⚛️ MenuItemGrid.tsx
**Path:** `src\components\menu\MenuItemGrid.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface MenuItemGridProps {
  // Add props here
}

export const MenuItemGrid: React.FC<MenuItemGridProps> = () => {
  return (
    <div>
      {/* MenuItemGrid Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ SidelinesPanel.tsx
**Path:** `src\components\menu\SidelinesPanel.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface SidelinesPanelProps {
  // Add props here
}

export const SidelinesPanel: React.FC<SidelinesPanelProps> = () => {
  return (
    <div>
      {/* SidelinesPanel Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ AddressCard.tsx
**Path:** `src\components\profile\AddressCard.tsx`
**Component Type:** React Components

<details>
<summary>View Code (102 lines)</summary>

```tsx
import React, { useState } from 'react';
import { useAddressStore } from '@store/addressStore';
import { useToast } from '@components/common/Toast';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import { MapPin, Edit, Trash2, Check } from 'lucide-react';
import { Address } from '@models/address.types';

interface AddressCardProps {
  address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  const { setDefaultAddress, deleteAddress, isLoading } = useAddressStore();
  const { showToast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSetDefault = async () => {
    try {
      await setDefaultAddress(address._id);
      showToast('Default address updated', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to update default address', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    setIsDeleting(true);
    try {
      await deleteAddress(address._id);
      showToast('Address deleted successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to delete address', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card
      padding="lg"
      className={`relative ${
        address.is_default ? 'ring-2 ring-primary border-primary' : ''
      }`}
    >
      {address.is_default && (
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <Check size={14} />
          <span>Default</span>
        </div>
      )}

      <div className="flex items-start space-x-3 mb-4">
        <MapPin className="text-primary flex-shrink-0 mt-1" size={20} />
        <div className="flex-1">
          <h3 className="font-semibold text-text text-lg mb-2">
            {address.label}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {address.street}
            <br />
            {address.suburb}, {address.state} {address.postcode}
          </p>

          {address.delivery_instructions && (
            <p className="text-gray-500 text-xs mt-2 italic">
              📝 {address.delivery_instructions}
            </p>
          )}
        </div>
      </div>

      <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
        {!address.is_default && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSetDefault}
            disabled={isLoading}
            className="flex-1"
          >
            Set as Default
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          disabled={isDeleting}
          onClick={handleDelete}
          className="text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default AddressCard;
```
</details>

---

### ⚛️ AddressManager.tsx
**Path:** `src\components\profile\AddressManager.tsx`
**Component Type:** React Components

<details>
<summary>View Code (189 lines)</summary>

```tsx
import React, { useState, useEffect } from 'react';
import { useAddressStore } from '@store/addressStore';
import { useToast } from '@components/common/Toast';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Modal from '@components/common/Modal';
import AddressCard from './AddressCard';
import { Plus } from 'lucide-react';
import Input from '@components/common/Input';

const AddressManager: React.FC = () => {
  const { addresses, fetchAddresses, addAddress, isLoading } =
    useAddressStore();
  const { showToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    suburb: '',
    postcode: '',
    state: 'NSW',
    is_default: false,
    delivery_instructions: '',
  });

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addAddress(newAddress);
      showToast('Address added successfully', 'success');
      setShowAddModal(false);
      setNewAddress({
        label: '',
        street: '',
        suburb: '',
        postcode: '',
        state: 'NSW',
        is_default: false,
        delivery_instructions: '',
      });
    } catch (error: any) {
      showToast(error.message || 'Failed to add address', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-text">
          My Addresses
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          size="md"
        >
          <Plus size={20} className="mr-2" />
          Add New Address
        </Button>
      </div>

      {isLoading ? (
        <Card padding="lg">
          <p className="text-center text-gray-500">Loading addresses...</p>
        </Card>
      ) : addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <AddressCard key={address._id} address={address} />
          ))}
        </div>
      ) : (
        <Card padding="lg">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No addresses saved yet</p>
            <Button variant="outline" onClick={() => setShowAddModal(true)}>
              Add Your First Address
            </Button>
          </div>
        </Card>
      )}

      {/* Add Address Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Address"
      >
        <form onSubmit={handleAddAddress} className="space-y-4">
          <Input
            type="text"
            label="Label"
            value={newAddress.label}
            onChange={(e) =>
              setNewAddress({ ...newAddress, label: e.target.value })
            }
            placeholder="Home, Work, etc."
            required
          />

          <Input
            type="text"
            label="Street Address"
            value={newAddress.street}
            onChange={(e) =>
              setNewAddress({ ...newAddress, street: e.target.value })
            }
            placeholder="123 Main St"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Suburb"
              value={newAddress.suburb}
              onChange={(e) =>
                setNewAddress({ ...newAddress, suburb: e.target.value })
              }
              placeholder="Guildford"
              required
            />

            <Input
              type="text"
              label="Postcode"
              value={newAddress.postcode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, postcode: e.target.value })
              }
              placeholder="2161"
              required
              maxLength={4}
            />
          </div>

          <Input
            type="text"
            label="Delivery Instructions (Optional)"
            value={newAddress.delivery_instructions}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                delivery_instructions: e.target.value,
              })
            }
            placeholder="Leave at door, ring bell, etc."
          />

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={newAddress.is_default}
              onChange={(e) =>
                setNewAddress({ ...newAddress, is_default: e.target.checked })
              }
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">
              Set as default address
            </span>
          </label>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Add Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddressManager;
```
</details>

---

### ⚛️ OrderHistory.tsx
**Path:** `src\components\profile\OrderHistory.tsx`
**Component Type:** React Components

<details>
<summary>View Code (331 lines)</summary>

```tsx
import React, { useEffect } from 'react';
import { useOrderStore } from '@store/orderStore';
import { formatCurrency, formatDate } from '@utils/formatters';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import LoadingScreen from '@components/common/LoadingScreen';
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '@components/common/Modal';
import type { Order } from '@models/order.types';

const OrderHistory: React.FC = () => {
  const { orderHistory, fetchOrderHistory, isLoadingHistory } = useOrderStore();
  const navigate = useNavigate();
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  useEffect(() => {
    fetchOrderHistory();
  }, [fetchOrderHistory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'pending':
      case 'confirmed':
        return 'text-blue-600 bg-blue-50';
      case 'preparing':
      case 'out_for_delivery':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      case 'preparing':
      case 'out_for_delivery':
        return <Clock size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const getOrderTypeLabel = (orderType?: Order['order_type']) => {
    switch (orderType) {
      case 'meal_subscription':
        return 'Meal Subscription';
      case 'daily_menu':
        return 'Daily Menu';
      default:
        return 'Order';
    }
  };

  const getOrderTypeBadgeClass = (orderType?: Order['order_type']) => {
    switch (orderType) {
      case 'meal_subscription':
        return 'bg-purple-50 text-purple-700 border border-purple-100';
      case 'daily_menu':
        return 'bg-amber-50 text-amber-700 border border-amber-100';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  const effectivePlanUnitPrice = React.useMemo(() => {
    if (!selectedOrder || selectedOrder.order_type !== 'meal_subscription') {
      return null;
    }
    const aggregatedItems = [
      ...(selectedOrder.items || []),
      ...(selectedOrder.sidelines || []),
    ];
    const totalBoxes = aggregatedItems.reduce(
      (sum, item: any) => sum + (item.quantity || 0),
      0
    );
    const subtotal = Number(selectedOrder.subtotal ?? 0);
    if (subtotal > 0 && totalBoxes > 0) {
      return subtotal / totalBoxes;
    }
    return null;
  }, [selectedOrder]);

  const getLineTotal = (item: any) => {
    const quantity = item.quantity || 1;
    const hasSubtotal = typeof item.subtotal === 'number' && item.subtotal > 0;
    if (hasSubtotal) {
      return item.subtotal;
    }
    const basePrice =
      item.price ??
      item.item_price ??
      item.menu_item?.price ??
      0;
    if (basePrice > 0) {
      return basePrice * quantity;
    }
    if (
      effectivePlanUnitPrice &&
      selectedOrder?.order_type === 'meal_subscription'
    ) {
      return effectivePlanUnitPrice * quantity;
    }
    return 0;
  };

  const handleEditWeeklySelections = () => {
    if (!selectedOrder || selectedOrder.order_type !== 'meal_subscription') {
      return;
    }
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
    navigate('/menu/meals', { state: { editOrderId: selectedOrder._id } });
  };
  if (isLoadingHistory) {
    return (
      <Card padding="lg">
        <LoadingScreen variant="section" message="Loading order history..." />
      </Card>
    );
  }

  if (orderHistory.length === 0) {
    return (
      <Card padding="lg">
        <div className="text-center py-12">
          <Package className="mx-auto h-20 w-20 text-gray-300 mb-4" />
          <h3 className="font-semibold text-gray-500 mb-2">No orders yet</h3>
          <p className="text-sm text-gray-400 mb-6">
            Start ordering to see your order history
          </p>
          <Button variant="primary" onClick={() => navigate('/menu/daily')}>
            Browse Menu
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold text-text">
        Order History
      </h2>

      <div className="space-y-4">
        {orderHistory.map((order) => (
          <Card
            key={order._id}
            padding="lg"
            className="hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-text">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h3>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getOrderTypeBadgeClass(
                      order.order_type
                    )}`}
                  >
                    {getOrderTypeLabel(order.order_type)}
                  </span>
                  <span
                    className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="capitalize">
                      {order.status.replace('_', ' ')}
                    </span>
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {formatDate(order.created_at)} |{' '}
                  {(order.items?.length ?? 0) + (order.sidelines?.length ?? 0)} items |{' '}
                  {getOrderTypeLabel(order.order_type)}
                </p>

                <div className="space-y-1">
                  {order.items.slice(0, 2).map((item, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      {item.quantity}x {item.menu_item.name}
                    </p>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-sm text-gray-500">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end space-y-3">
                <div className="text-right">
                  <p className="font-heading text-2xl font-bold text-primary">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.delivery_option === 'delivery'
                      ? 'Delivery'
                      : 'Pickup'}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setSelectedOrder(order as unknown as Order); setIsOrderModalOpen(true); }}
                >
                  <Eye size={16} className="mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>

    {/* Order Details Modal */}
    <Modal
      isOpen={isOrderModalOpen}
      onClose={() => setIsOrderModalOpen(false)}
      title={selectedOrder ? `Order #${selectedOrder._id?.slice(-8)}` : 'Order Details'}
    >
      {!selectedOrder ? (
        <div className="py-6 text-center text-gray-600">No order selected.</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Placed on</p>
              <p className="font-medium">{formatDate(selectedOrder.created_at)}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getOrderTypeBadgeClass(
                  selectedOrder.order_type
                )}`}
              >
                {getOrderTypeLabel(selectedOrder.order_type)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedOrder.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : selectedOrder.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {selectedOrder.status?.toUpperCase().replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="divide-y border rounded">
            {[...(selectedOrder.items || []), ...(selectedOrder.sidelines || [])].map((it: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 text-sm">
                <div className="text-gray-700">
                  {it.item_name || it.name}
                  {it.category ? <span className="text-gray-400"> • {it.category}</span> : null}
                </div>
                <div className="text-gray-600">x{it.quantity}</div>
                <div className="font-medium">{formatCurrency(getLineTotal(it))}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(selectedOrder.subtotal || 0)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Delivery</span>
            <span className="font-medium">{formatCurrency(selectedOrder.delivery_fee || 0)}</span>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatCurrency((selectedOrder as any).total ?? (selectedOrder as any).total_amount ?? 0)}</span>
          </div>

          {selectedOrder.order_type === 'meal_subscription' &&
            !['delivered', 'cancelled'].includes(selectedOrder.status) && (
              <div className="pt-4">
                <Button variant="primary" onClick={handleEditWeeklySelections}>
                  Edit Weekly Selections
                </Button>
              </div>
            )}

          <div className="pt-2 text-xs text-gray-500 space-y-1">
            <div>Order type: {getOrderTypeLabel(selectedOrder.order_type)}</div>
            <div>
              Delivery method:{' '}
              {String(
                (selectedOrder as any).delivery_option ||
                  (selectedOrder as any).delivery_method ||
                  'N/A'
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
    </>
  );
};

export default OrderHistory;

// Inline order details modal rendering at the bottom
// Render modal via a portal-like placement within this component tree
// to avoid external wiring.

```
</details>

---

### ⚛️ ProfileForm.tsx
**Path:** `src\components\profile\ProfileForm.tsx`
**Component Type:** React Components

<details>
<summary>View Code (89 lines)</summary>

```tsx
import React, { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@components/common/Toast';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import { User, Mail, Phone, Save } from 'lucide-react';

const ProfileForm: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile(formData);
      showToast('Profile updated successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to update profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding="lg">
      <h2 className="font-heading text-2xl font-bold text-text mb-6">
        Personal Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          label="Full Name"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
          leftIcon={<User size={20} />}
          placeholder="John Doe"
          required
        />

        <Input
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          leftIcon={<Mail size={20} />}
          placeholder="you@example.com"
          required
        />

        <Input
          type="tel"
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          leftIcon={<Phone size={20} />}
          placeholder="04XX XXX XXX"
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          disabled={isLoading}
        >
          <Save size={20} className="mr-2" />
          Save Changes
        </Button>
      </form>
    </Card>
  );
};

export default ProfileForm;
```
</details>

---

### ⚛️ DeliverySchedule.tsx
**Path:** `src\components\subscription\DeliverySchedule.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface DeliveryScheduleProps {
  // Add props here
}

export const DeliverySchedule: React.FC<DeliveryScheduleProps> = () => {
  return (
    <div>
      {/* DeliverySchedule Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ MealSelection.tsx
**Path:** `src\components\subscription\MealSelection.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface MealSelectionProps {
  // Add props here
}

export const MealSelection: React.FC<MealSelectionProps> = () => {
  return (
    <div>
      {/* MealSelection Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ SubscriptionPlans.tsx
**Path:** `src\components\subscription\SubscriptionPlans.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface SubscriptionPlansProps {
  // Add props here
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = () => {
  return (
    <div>
      {/* SubscriptionPlans Component */}
    </div>
  );
};
```
</details>

---

### ⚛️ SubscriptionSummary.tsx
**Path:** `src\components\subscription\SubscriptionSummary.tsx`
**Component Type:** React Components

<details>
<summary>View Code (13 lines)</summary>

```tsx
import React from 'react';

interface SubscriptionSummaryProps {
  // Add props here
}

export const SubscriptionSummary: React.FC<SubscriptionSummaryProps> = () => {
  return (
    <div>
      {/* SubscriptionSummary Component */}
    </div>
  );
};
```
</details>

---

## 📂 Routing

### ⚛️ AdminRoutes.tsx
**Path:** `src\routes\AdminRoutes.tsx`

<details>
<summary>View Code (12 lines)</summary>

```tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Add routes here */}
    </Routes>
  );
};

export default AdminRoutes;
```
</details>

---

### ⚛️ CustomerRoutes.tsx
**Path:** `src\routes\CustomerRoutes.tsx`

<details>
<summary>View Code (28 lines)</summary>

```tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@components/auth/ProtectedRoute';
import DailyMenuPage from '@pages/customer/DailyMenuPage';
import MealsSubscriptionPage from '@pages/customer/MealsSubscriptionPage';
import CateringPage from '@pages/customer/CateringPage';
import CartPage from '@pages/customer/CartPage';
import CheckoutPage from '@pages/customer/CheckoutPage';
import ProfilePage from '@pages/customer/ProfilePage';

const CustomerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/menu/daily" element={<DailyMenuPage />} />
      <Route path="/menu/meals" element={<MealsSubscriptionPage />} />
      <Route path="/catering" element={<CateringPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
```
</details>

---

### ⚛️ PublicRoutes.tsx
**Path:** `src\routes\PublicRoutes.tsx`

<details>
<summary>View Code (12 lines)</summary>

```tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Add routes here */}
    </Routes>
  );
};

export default PublicRoutes;
```
</details>

---

### ⚛️ index.tsx
**Path:** `src\routes\index.tsx`

<details>
<summary>View Code (64 lines)</summary>

```tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import ProtectedRoute from '@components/auth/ProtectedRoute';
import RoleGuard from '@components/auth/RoleGuard';

// Public Pages
import HomePage from '@pages/public/HomePage';
import LoginPage from '@pages/public/LoginPage';
import RegisterPage from '@pages/public/RegisterPage';
import ContactPage from '@pages/public/ContactPage';

// Customer Pages
import DailyMenuPage from '@pages/customer/DailyMenuPage';
import MealsSubscriptionPage from '@pages/customer/MealsSubscriptionPage';
import CateringPage from '@pages/customer/CateringPage';
import CheckoutPage from '@pages/customer/CheckoutPage';
import ProfilePage from '@pages/customer/ProfilePage';

// Admin Pages
import AdminDashboard from '@pages/admin/AdminDashboard';
import OrderManagement from '@pages/admin/OrderManagement';
import MenuManagement from '@pages/admin/MenuManagement';
import MealPlanManagement from '@pages/admin/MealPlanManagement';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes - No Authentication Required */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* ✅ Menu Pages - Accessible without login */}
        <Route path="/menu/daily" element={<DailyMenuPage />} />
        <Route path="/menu/meals" element={<MealsSubscriptionPage />} />
        <Route path="/catering" element={<CateringPage />} />

        {/* ✅ Protected Customer Routes - Login Required */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleGuard requiredRole="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<OrderManagement />} />
            <Route path="/admin/menu" element={<MenuManagement />} />
            <Route path="/admin/meal-plans" element={<MealPlanManagement />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
```
</details>

---

## 📂 State Management

### 📘 addressStore.ts
**Path:** `src\store\addressStore.ts`

<details>
<summary>View Code (273 lines)</summary>

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { deliveryAPI } from '@api/endpoints/delivery'
import { Address, CreateAddressPayload, DeliveryValidation } from '@models/address.types'

interface AddressState {
  addresses: Address[]
  defaultAddress: Address | null
  deliveryValidation: DeliveryValidation | null
  
  // Loading states
  isLoading: boolean
  isValidating: boolean
  error: string | null
  
  // Actions
  fetchAddresses: () => Promise<void>
  addAddress: (payload: CreateAddressPayload) => Promise<Address>
  updateAddress: (addressId: string, payload: Partial<CreateAddressPayload>) => Promise<void>
  deleteAddress: (addressId: string) => Promise<void>
  setDefaultAddress: (addressId: string) => Promise<void>
  validateDeliveryArea: (addressId: string, orderType?: 'daily' | 'weekly' | 'catering') => Promise<DeliveryValidation>
  calculateDeliveryFee: (
    addressId: string,
    options?: { deliveryDays?: number; orderValue?: number; isExpress?: boolean }
  ) => Promise<{
    fee: number
    distance_km: number
    delivery_days: number
    is_express: boolean
    formatted_address?: string
  }>
  clearError: () => void
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => {
      const formatAddress = (address: Address) =>
        [
          address.street,
          address.suburb,
          address.state,
          address.postcode,
          address.country || 'Australia',
        ]
          .filter(Boolean)
          .join(', ')

      const resolveAddressById = async (addressId: string): Promise<Address> => {
        const existing = get().addresses.find((addr) => addr._id === addressId)
        if (existing) {
          return existing
        }

        const response = await deliveryAPI.getAddressById(addressId)
        const fetched = response.data.data
        if (!fetched) {
          throw new Error('Delivery address not found')
        }
        return fetched
      }

      return {
        addresses: [],
        defaultAddress: null,
        deliveryValidation: null,
        isLoading: false,
        isValidating: false,
        error: null,

        fetchAddresses: async () => {
          set({ isLoading: true, error: null })
          try {
            const response = await deliveryAPI.getAddresses()
            const addresses = response.data.data || []
            const defaultAddr = addresses.find((addr: Address) => addr.is_default) || null

            set({
              addresses,
              defaultAddress: defaultAddr,
              isLoading: false,
            })
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Failed to fetch addresses',
              isLoading: false,
            })
          }
        },

        addAddress: async (payload: CreateAddressPayload) => {
          set({ isLoading: true, error: null })
          try {
            const response = await deliveryAPI.createAddress(payload)
            const newAddress = response.data.data

            const { addresses } = get()
            set({
              addresses: [...addresses, newAddress],
              defaultAddress: newAddress.is_default ? newAddress : get().defaultAddress,
              isLoading: false,
            })

            return newAddress
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to add address'
            set({
              error: errorMessage,
              isLoading: false,
            })
            throw new Error(errorMessage)
          }
        },

        updateAddress: async (addressId: string, payload: Partial<CreateAddressPayload>) => {
          set({ isLoading: true, error: null })
          try {
            const response = await deliveryAPI.updateAddress(addressId, payload)
            const updatedAddress = response.data.data

            const { addresses } = get()
            const updatedAddresses = addresses.map((addr) =>
              addr._id === addressId ? updatedAddress : addr
            )

            set({
              addresses: updatedAddresses,
            defaultAddress: updatedAddress.is_default ? updatedAddress : get().defaultAddress,
            isLoading: false
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to update address',
            isLoading: false
          })
          throw error
        }
      },

      deleteAddress: async (addressId: string) => {
        set({ isLoading: true, error: null })
        try {
          await deliveryAPI.deleteAddress(addressId)
          
          const { addresses } = get()
          const filteredAddresses = addresses.filter(addr => addr._id !== addressId)
          
          set({
            addresses: filteredAddresses,
            defaultAddress: get().defaultAddress?._id === addressId 
              ? filteredAddresses.find(addr => addr.is_default) || null 
              : get().defaultAddress,
            isLoading: false
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to delete address',
            isLoading: false
          })
          throw error
        }
      },

      setDefaultAddress: async (addressId: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await deliveryAPI.setDefaultAddress(addressId)
          const updatedAddress = response.data.data
          
          const { addresses } = get()
          const updatedAddresses = addresses.map(addr => ({
            ...addr,
            is_default: addr._id === addressId
          }))
          
          set({
            addresses: updatedAddresses,
            defaultAddress: updatedAddress,
            isLoading: false
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to set default address',
            isLoading: false
          })
          throw error
        }
      },

      validateDeliveryArea: async (addressId: string, orderType: 'daily' | 'weekly' | 'catering' = 'weekly') => {
        set({ isValidating: true, error: null })
        try {
          const address = await resolveAddressById(addressId)
          const formattedAddress = formatAddress(address)
          const response = await deliveryAPI.validateDelivery(formattedAddress, orderType)
          const availability = response.data.data

          const validation: DeliveryValidation = {
            is_valid: !!availability?.available,
            distance_km: availability?.distance_km ?? 0,
            delivery_fee: availability?.delivery_fee ?? 0,
            estimated_time_minutes: 0,
            message: availability?.message,
          }
          
          set({
            deliveryValidation: validation,
            isValidating: false
          })
          
          return validation
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Failed to validate delivery area'
          set({
            error: errorMessage,
            isValidating: false
          })
          throw new Error(errorMessage)
        }
      },

      calculateDeliveryFee: async (
        addressId: string,
        options?: { deliveryDays?: number; orderValue?: number; isExpress?: boolean }
      ) => {
        set({ isValidating: true, error: null })
        try {
          const address = await resolveAddressById(addressId)
          const formattedAddress = formatAddress(address)
          const deliveryDays = Math.max(1, options?.deliveryDays ?? 1)
          const payload = {
            address: formattedAddress,
            order_value: options?.orderValue ?? 0,
            delivery_days: deliveryDays,
            is_express: options?.isExpress ?? false,
          }

          const response = await deliveryAPI.calculateDeliveryFee(payload)
          const data = response.data.data ?? {}
          const result = {
            fee: data.delivery_fee ?? 0,
            distance_km: data.distance_km ?? 0,
            delivery_days: data.delivery_days ?? deliveryDays,
            is_express: data.is_express ?? payload.is_express,
            formatted_address: data.formatted_address ?? formattedAddress,
          }
          
          set({ isValidating: false })
          return result
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to calculate delivery fee',
            isValidating: false
          })
          throw error
        }
      },

      clearError: () => {
        set({ error: null })
      },
    };
  },
  {
    name: 'bakars-addresses',
    partialize: (state) => ({
      addresses: state.addresses,
      defaultAddress: state.defaultAddress,
    }),
  }
  )
);
```
</details>

---

### 📘 adminStore.ts
**Path:** `src\store\adminStore.ts`

<details>
<summary>View Code (491 lines)</summary>

```typescript
import { create } from 'zustand';
import { adminAPI } from '@api';
import { MenuItem, MenuCategory } from '@models/menu.types';
import { MealSubscriptionPlan, DeliveryZone } from '@models/subscription.types';
import { Order } from '@models/order.types';
import { DashboardStats } from '@models/admin.types';

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

  // Orders with pagination
  allOrders: Order[];
  orderPagination: PaginationMeta | null;
  fetchAllOrders: (filters?: {
    status?: string;
    date_from?: string;
    date_to?: string;
    order_type?: string;
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
      await adminAPI.createMenuItem(data);
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
        options.pageSize ?? 10
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
```
</details>

---

### 📘 authModalStore.ts
**Path:** `src\store\authModalStore.ts`

<details>
<summary>View Code (106 lines)</summary>

```typescript
import { create } from 'zustand';
import { MenuItem } from '@models/menu.types';

type PendingCartAction = {
  type: 'daily_menu' | 'meal_subscription';
  item?: MenuItem;
  quantity?: number;
  specialInstructions?: string;
  timestamp: string;
} | null;

interface AuthModalState {
  isOpen: boolean;
  initialTab: 'login' | 'signup';
  pendingAction: PendingCartAction;
  redirectPath?: string;

  // Actions
  openModal: (tab?: 'login' | 'signup', redirectPath?: string) => void;
  closeModal: () => void;
  setPendingCartAction: (action: PendingCartAction) => void;
  clearPendingAction: () => void;
  getPendingAction: () => PendingCartAction;
}

export const useAuthModalStore = create<AuthModalState>((set, get) => ({
  isOpen: false,
  initialTab: 'login',
  pendingAction: null,
  redirectPath: undefined,

  openModal: (tab = 'login', redirectPath) => {
    set({
      isOpen: true,
      initialTab: tab,
      redirectPath,
    });
  },

  closeModal: () => {
    set({
      isOpen: false,
    });
  },

  setPendingCartAction: (action) => {
    set({ pendingAction: action });
    
    // Also save to localStorage as backup
    if (action) {
      localStorage.setItem('bakars_pending_cart_action', JSON.stringify(action));
    } else {
      localStorage.removeItem('bakars_pending_cart_action');
    }
  },

  clearPendingAction: () => {
    set({ pendingAction: null });
    localStorage.removeItem('bakars_pending_cart_action');
  },

  getPendingAction: () => {
    const state = get();
    if (state.pendingAction) {
      return state.pendingAction;
    }

    // Try to recover from localStorage (new format)
    const stored = localStorage.getItem('bakars_pending_cart_action');
    if (stored) {
      try {
        const action = JSON.parse(stored) as PendingCartAction;
        set({ pendingAction: action });
        return action;
      } catch (error) {
        console.error('Failed to parse pending action from localStorage:', error);
        localStorage.removeItem('bakars_pending_cart_action');
      }
    }

    // Try to recover from old localStorage format (backward compatibility)
    const oldStored = localStorage.getItem('bakars_pending_cart_item');
    if (oldStored) {
      try {
        const oldItem = JSON.parse(oldStored);
        const action: PendingCartAction = {
          type: 'daily_menu',
          item: oldItem.item,
          quantity: oldItem.quantity || 1,
          specialInstructions: oldItem.specialInstructions || '',
          timestamp: oldItem.timestamp || new Date().toISOString(),
        };
        set({ pendingAction: action });
        // Migrate to new format
        localStorage.setItem('bakars_pending_cart_action', JSON.stringify(action));
        localStorage.removeItem('bakars_pending_cart_item');
        return action;
      } catch (error) {
        console.error('Failed to migrate old pending item:', error);
        localStorage.removeItem('bakars_pending_cart_item');
      }
    }

    return null;
  },
}));
```
</details>

---

### 📘 authStore.ts
**Path:** `src\store\authStore.ts`

<details>
<summary>View Code (261 lines)</summary>

```typescript
import { create } from 'zustand';
import { authAPI } from '@api/endpoints/auth';
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  VerifyEmailData,
  ResetPasswordData,
} from '../types/auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: 'customer' | 'admin' | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<string>; // Returns email for verification
  verifyEmail: (data: VerifyEmailData) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AUTH_CHECK_TIMEOUT_MS = 8000;

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('AUTH_CHECK_TIMEOUT')), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  role: null,

  login: async (credentials: LoginCredentials) => {
    try {
      console.log('🔑 Attempting login...');
      const response = await authAPI.login(credentials);

      // ✅ Unwrap response properly
      const rawData = response.data as AuthResponse & { data?: AuthResponse };
      const authData = rawData.data ?? rawData;
      console.log('📦 Auth data:', authData);

      const { access_token, user } = authData;

      // ✅ Extract role from user object
      const userRole = user.role;
      console.log('👤 User role:', userRole);

      // Store token
      localStorage.setItem('bakars_auth_token', access_token);

      // ✅ Decode JWT to verify role (optional extra check)
      try {
        const tokenPayload = JSON.parse(atob(access_token.split('.')[1]));
        console.log('🔓 JWT Payload:', tokenPayload);

        // If role is in JWT, use it as fallback
        const finalRole = userRole || tokenPayload.role || tokenPayload.user_role;
        console.log('✅ Final role:', finalRole);

        set({
          user,
          isAuthenticated: true,
          role: finalRole,
          isLoading: false,
        });
      } catch (jwtError) {
        console.warn('⚠️ Could not decode JWT, using user.role');
        set({
          user,
          isAuthenticated: true,
          role: userRole,
          isLoading: false,
        });
      }

      console.log('✅ Login successful');
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      console.error('❌ Error response:', error.response?.data);
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    try {
      console.log('📝 Attempting registration...');
      console.log('📤 Registration data:', data);

      const response = await authAPI.register(data);

      // ✅ Unwrap response properly
      const rawData = response.data as any;
      const registrationData = rawData.data ?? rawData;
      console.log('✅ Registration response:', registrationData);

      // Validate response structure
      if (!registrationData || !registrationData.email) {
        console.error('❌ Invalid registration response structure:', registrationData);
        throw new Error('Invalid response from server');
      }

      // Don't auto-login, return email for verification
      console.log('✅ Registration successful - verification required');
      return registrationData.email;
    } catch (error: any) {
      console.error('❌ Registration failed:', error);
      console.error('❌ Error response:', error.response?.data);
      throw error;
    }
  },

  verifyEmail: async (data: VerifyEmailData) => {
    try {
      console.log('🔐 Verifying email...');
      const response = await authAPI.verifyEmail(data);

      // ✅ Unwrap response properly
      const rawData = response.data as AuthResponse & { data?: AuthResponse };
      const authData = rawData.data ?? rawData;
      console.log('✅ Verification response:', authData);

      // Validate response structure
      if (!authData || !authData.access_token || !authData.user) {
        console.error('❌ Invalid verification response structure:', authData);
        throw new Error('Invalid response from server');
      }

      const { access_token, user } = authData;

      // Store token
      localStorage.setItem('bakars_auth_token', access_token);

      set({
        user,
        isAuthenticated: true,
        role: user.role,
        isLoading: false,
      });

      console.log('✅ Email verified and logged in');
    } catch (error: any) {
      console.error('❌ Email verification failed:', error);
      console.error('❌ Error response:', error.response?.data);
      throw error;
    }
  },

  resendVerification: async (email: string) => {
    try {
      console.log('📧 Resending verification code...');
      await authAPI.resendVerification({ email });
      console.log('✅ Verification code resent');
    } catch (error: any) {
      console.error('❌ Resend verification failed:', error);
      console.error('❌ Error response:', error.response?.data);
      throw error;
    }
  },


  requestPasswordReset: async (email: string) => {
    try {
      console.log('dY"? Requesting password reset link...');
      await authAPI.forgotPassword({ email });
      console.log('?o. Password reset link requested');
    } catch (error: any) {
      console.error('??O Password reset request failed:', error);
      throw error;
    }
  },

  resetPassword: async (data: ResetPasswordData) => {
    try {
      console.log('dY"? Resetting password...');
      await authAPI.resetPassword(data);
      console.log('?o. Password reset successful');
    } catch (error: any) {
      console.error('??O Password reset failed:', error);
      throw error;
    }
  },

  logout: () => {
    console.log('👋 Logging out...');
    localStorage.removeItem('bakars_auth_token');
    set({
      user: null,
      isAuthenticated: false,
      role: null,
      isLoading: false,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('bakars_auth_token');

    if (!token) {
      console.log('❌ No token found');
      set({ isLoading: false, isAuthenticated: false });
      return;
    }

    try {
      console.log('🔍 Checking authentication...');
      const response = await withTimeout(
        authAPI.getProfile(),
        AUTH_CHECK_TIMEOUT_MS
      );
      const rawUser = response.data as User & { data?: User };
      const user = rawUser.data ?? rawUser;

      console.log('✅ User authenticated:', user.email, 'Role:', user.role);

      set({
        user,
        isAuthenticated: true,
        role: user.role,
        isLoading: false,
      });
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      localStorage.removeItem('bakars_auth_token');
      set({
        user: null,
        isAuthenticated: false,
        role: null,
        isLoading: false,
      });
    }
  },
  updateProfile: async (data: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(data);
      const rawUser = response.data as User & { data?: User };
      const updatedUser = rawUser.data ?? rawUser;
      set({ user: updatedUser });
    } catch (error) {
      throw error;
    }
  },
}));
```
</details>

---

### 📘 cartStore.ts
**Path:** `src\store\cartStore.ts`

<details>
<summary>View Code (308 lines)</summary>

```typescript
import { create } from 'zustand';
import { cartAPI, CartSummary } from '@api/endpoints/cart';
import { MenuItem } from '@models/menu.types';
import { DAILY_DELIVERY_FEE } from '@utils/constants';

// Define the structure for cart items stored locally
interface LocalCartItem {
  menu_item: MenuItem;
  quantity: number;
  special_instructions?: string;
}



interface CartStore {
  // Cart data from backend
  cartSummary: CartSummary | null;
  
  // Local cart data (for unauthenticated users)
  localItems: LocalCartItem[];
  
  // Loading states
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  
  // Order type and delivery option (local state)
  orderType: 'daily_menu' | 'meal_subscription' | null;
  deliveryOption: 'delivery' | 'pickup';
  
  // Actions
  fetchCart: () => Promise<void>;
  addItem: (item: MenuItem, quantity: number, specialInstructions?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  
  // Local state setters
  setOrderType: (type: 'daily_menu' | 'meal_subscription') => void;
  setDeliveryOption: (option: 'delivery' | 'pickup') => void;
  clearError: () => void;

  // Local cart operations (for unauthenticated users)
  addLocalItem: (item: MenuItem, quantity: number, specialInstructions?: string) => void;
  removeLocalItem: (itemId: string) => void;
  updateLocalQuantity: (itemId: string, quantity: number) => void;
  clearLocalCart: () => void;

  // Computed values for local cart
  getLocalSummary: () => CartSummary;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartSummary: null,
  localItems: [],
  isLoading: false,
  isUpdating: false,
  error: null,
  orderType: null,
  deliveryOption: 'delivery',

  /**
   * Fetch cart from backend
   */
  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await cartAPI.getCartSummary();
      set({
        cartSummary: response.data.data,
        isLoading: false,
      });
    } catch (error: any) {
      console.error('Failed to fetch cart:', error);
      // Don't set error for 404 (empty cart)
      if (error.response?.status !== 404) {
        set({
          error: error.response?.data?.message || 'Failed to fetch cart',
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    }
  },

  /**
   * Add menu item to cart - FIXED to use item.id
   */
  addItem: async (item: MenuItem, quantity: number, specialInstructions?: string) => {
    set({ isUpdating: true, error: null });
    
    // Validate item has an ID
    if (!item.id) {
      console.error('❌ Item missing ID:', item);
      set({
        error: 'Invalid item: missing ID',
        isUpdating: false,
      });
      throw new Error('Invalid item: missing ID');
    }

    try {
      console.log('🛒 Adding item to cart:', { itemId: item.id, quantity });
      const response = await cartAPI.addToCart(item.id, quantity, false);
      console.log('✅ Item added successfully:', response.data);
      
      set({
        cartSummary: response.data.data,
        isUpdating: false,
      });
    } catch (error: any) {
      console.error('❌ Failed to add item:', error);
      console.error('Error response:', error.response?.data);
      
      // If not authenticated, add to local cart
      if (error.response?.status === 401) {
        get().addLocalItem(item, quantity, specialInstructions);
        set({ isUpdating: false });
      } else {
        set({
          error: error.response?.data?.message || 'Failed to add item to cart',
          isUpdating: false,
        });
        throw error;
      }
    }
  },



  /**
   * Update item quantity in cart
   */
  updateQuantity: async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await get().removeItem(itemId);
      return;
    }

    set({ isUpdating: true, error: null });
    try {
      const response = await cartAPI.updateCartItem(itemId, quantity);
      set({
        cartSummary: response.data.data,
        isUpdating: false,
      });
    } catch (error: any) {
      console.error('Failed to update quantity:', error);
      // If not authenticated, update local cart
      if (error.response?.status === 401) {
        get().updateLocalQuantity(itemId, quantity);
        set({ isUpdating: false });
      } else {
        set({
          error: error.response?.data?.message || 'Failed to update quantity',
          isUpdating: false,
        });
        throw error;
      }
    }
  },

  /**
   * Remove item from cart
   */
  removeItem: async (itemId: string) => {
    set({ isUpdating: true, error: null });
    try {
      const response = await cartAPI.removeFromCart(itemId);
      set({
        cartSummary: response.data.data,
        isUpdating: false,
      });
    } catch (error: any) {
      console.error('Failed to remove item:', error);
      // If not authenticated, remove from local cart
      if (error.response?.status === 401) {
        get().removeLocalItem(itemId);
        set({ isUpdating: false });
      } else {
        set({
          error: error.response?.data?.message || 'Failed to remove item',
          isUpdating: false,
        });
        throw error;
      }
    }
  },

  /**
   * Clear entire cart
   */
  clearCart: async () => {
    set({ isUpdating: true, error: null });
    try {
      await cartAPI.clearCart();
      set({
        cartSummary: null,
        isUpdating: false,
      });
    } catch (error: any) {
      console.error('Failed to clear cart:', error);
      // If not authenticated, clear local cart
      if (error.response?.status === 401) {
        get().clearLocalCart();
        set({ isUpdating: false });
      } else {
        set({
          error: error.response?.data?.message || 'Failed to clear cart',
          isUpdating: false,
        });
        throw error;
      }
    }
  },

  /**
   * Local cart operations (for unauthenticated users)
   */
  addLocalItem: (item: MenuItem, quantity: number, specialInstructions?: string) => {
    const currentItems = get().localItems;
    const existingItem = currentItems.find(i => i.menu_item.id === item.id);
    
    if (existingItem) {
      set({
        localItems: currentItems.map(i =>
          i.menu_item.id === item.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ),
      });
    } else {
      set({
        localItems: [...currentItems, { menu_item: item, quantity, special_instructions: specialInstructions }],
      });
    }
  },

  removeLocalItem: (itemId: string) => {
    set({
      localItems: get().localItems.filter(i => i.menu_item.id !== itemId),
    });
  },

  updateLocalQuantity: (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeLocalItem(itemId);
      return;
    }
    set({
      localItems: get().localItems.map(i =>
        i.menu_item.id === itemId ? { ...i, quantity } : i
      ),
    });
  },

  clearLocalCart: () => {
    set({ localItems: [] });
  },

  getLocalSummary: () => {
    const items = get().localItems;
    const deliveryOption = get().deliveryOption;
    const subtotal = items.reduce((sum, item) => sum + (item.menu_item.price * item.quantity), 0);
    
    const delivery_fee = deliveryOption === 'pickup' ? 0 : DAILY_DELIVERY_FEE;
    const total = subtotal + delivery_fee;
    const items_count = items.reduce((sum, item) => sum + item.quantity, 0);
    
    return {
      items: items.map(i => ({
        item_id: i.menu_item.id,
        item_name: i.menu_item.name,
        category: i.menu_item.category,
        quantity: i.quantity,
        price: i.menu_item.price,
        subtotal: i.menu_item.price * i.quantity,
      })),
      sidelines: [],
      subtotal,
      delivery_fee,
      total,
      items_count,
    };
  },

  /**
   * Set order type (local state)
   */
  setOrderType: (type: 'daily_menu' | 'meal_subscription') => {
    set({ orderType: type });
  },

  /**
   * Set delivery option (local state)
   */
  setDeliveryOption: (option: 'delivery' | 'pickup') => {
    set({ deliveryOption: option });
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },
}));
```
</details>

---

### 📘 menuStore.ts
**Path:** `src\store\menuStore.ts`

<details>
<summary>View Code (382 lines)</summary>

```typescript
import { create } from 'zustand';
import { menuAPI } from '@api/endpoints/menu';
import {
  MenuItem,
  MenuFilters,
  MenuCategory,
  PaginationState,
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
        dailyMenuItems: normalizedItems.filter((item) => item.is_available_for_daily),
        mealPlanItems: normalizedItems.filter((item) => item.is_available_for_meal_plan),
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

```
</details>

---

### 📘 orderStore.ts
**Path:** `src\store\orderStore.ts`

<details>
<summary>View Code (164 lines)</summary>

```typescript
import { create } from 'zustand'
import { ordersAPI } from '@api/endpoints/orders'
import { Order, CreateOrderPayload, OrderTracking } from '@models/order.types'
import { PaginatedResponse } from '@models/common.types'

interface OrderState {
  // Current order being created
  currentOrder: Order | null
  
  // Order history
  orderHistory: Order[]
  orderHistoryTotal: number
  orderHistoryPage: number
  
  // Order tracking
  trackingInfo: OrderTracking | null
  
  // Loading states
  isPlacingOrder: boolean
  isLoadingHistory: boolean
  isTracking: boolean
  error: string | null
  
  // Actions
  createOrder: (payload: CreateOrderPayload) => Promise<Order>
  fetchOrderHistory: (page?: number) => Promise<void>
  fetchOrderById: (orderId: string) => Promise<void>
  trackOrder: (orderId: string) => Promise<void>
  cancelOrder: (orderId: string, reason: string) => Promise<void>
  clearCurrentOrder: () => void
  clearError: () => void
}

export const useOrderStore = create<OrderState>((set, get) => ({
  currentOrder: null,
  orderHistory: [],
  orderHistoryTotal: 0,
  orderHistoryPage: 1,
  trackingInfo: null,
  isPlacingOrder: false,
  isLoadingHistory: false,
  isTracking: false,
  error: null,

  createOrder: async (payload: CreateOrderPayload) => {
    set({ isPlacingOrder: true, error: null })
    try {
      const response = await ordersAPI.createOrder(payload)
      const order = response.data.data
      
      set({ 
        currentOrder: order,
        isPlacingOrder: false 
      })
      
      return order
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create order'
      set({ 
        error: errorMessage,
        isPlacingOrder: false 
      })
      throw new Error(errorMessage)
    }
  },

  fetchOrderHistory: async (page = 1) => {
    set({ isLoadingHistory: true, error: null })
    try {
      const response = await ordersAPI.getOrderHistory(page, 10)
      const payload = response?.data?.data || {}

      // Backend returns { orders, total, page, page_size }
      // Older FE expected PaginatedResponse with { items, total, page }
      const rawOrders = payload.orders || payload.items || []

      // Normalize backend order shape to frontend Order type
      const mapped: Order[] = rawOrders.map((o: any) => ({
        ...o,
        _id: o._id || o.id,
        total: o.total ?? o.total_amount,
        delivery_option: o.delivery_option ?? o.delivery_method,
      }))

      set({
        orderHistory: Array.isArray(mapped) ? mapped : [],
        orderHistoryTotal: payload.total ?? (Array.isArray(mapped) ? mapped.length : 0),
        orderHistoryPage: page,
        isLoadingHistory: false,
      })
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || 'Failed to fetch order history',
        isLoadingHistory: false,
      })
    }
  },

  fetchOrderById: async (orderId: string) => {
    set({ isLoadingHistory: true, error: null })
    try {
      const response = await ordersAPI.getOrderById(orderId)
      set({ 
        currentOrder: response.data.data,
        isLoadingHistory: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch order details',
        isLoadingHistory: false 
      })
    }
  },

  trackOrder: async (orderId: string) => {
    set({ isTracking: true, error: null })
    try {
      const response = await ordersAPI.trackOrder(orderId)
      set({ 
        trackingInfo: response.data.data,
        isTracking: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to track order',
        isTracking: false 
      })
    }
  },

  cancelOrder: async (orderId: string, reason: string) => {
    set({ isPlacingOrder: true, error: null })
    try {
      const response = await ordersAPI.cancelOrder(orderId, reason)
      const cancelledOrder = response.data.data
      
      // Update order history if the cancelled order is in the list
      const { orderHistory } = get()
      const updatedHistory = orderHistory.map(order => 
        order._id === orderId ? cancelledOrder : order
      )
      
      set({
        orderHistory: updatedHistory,
        currentOrder: get().currentOrder?._id === orderId ? cancelledOrder : get().currentOrder,
        isPlacingOrder: false
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to cancel order',
        isPlacingOrder: false 
      })
      throw error
    }
  },

  clearCurrentOrder: () => {
    set({ currentOrder: null, trackingInfo: null })
  },

  clearError: () => {
    set({ error: null })
  },
}))
```
</details>

---

## 📂 Styles

### 🎨 globals.css
**Path:** `src\styles\globals.css`

<details>
<summary>View Code (70 lines)</summary>

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-text font-body antialiased;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer components {
  /* Custom Button Styles */
  .btn-primary {
    @apply bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg;
  }
  
  .btn-secondary {
    @apply bg-secondary hover:bg-secondary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200;
  }
  
  .btn-outline {
    @apply border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200;
  }
  
  /* Card Styles */
  .card {
    @apply bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200;
  }
  
  /* Input Styles */
  .input-field {
    @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200;
  }
  
  /* Container */
  .container-custom {
    @apply w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #FF6B35;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #FF4800;
}
```
</details>

---

## 📂 TypeScript Types

### 📘 address.types.ts
**Path:** `src\types\address.types.ts`

<details>
<summary>View Code (46 lines)</summary>

```typescript
export interface Address {
  _id: string
  user_id?: string
  label: string
  street: string
  suburb: string
  postcode: string
  state: string
  country: string
  is_default: boolean
  delivery_instructions?: string
  latitude?: number
  longitude?: number
  created_at: string
  updated_at: string
}

export interface CreateAddressPayload {
  label: string
  street: string
  suburb: string
  postcode: string
  state: string
  country?: string
  is_default?: boolean
  delivery_instructions?: string
  latitude?: number
  longitude?: number
}

export interface DeliveryValidation {
  is_valid: boolean
  distance_km: number
  delivery_fee: number
  estimated_time_minutes: number
  message?: string
}

export interface DeliveryAvailability {
  available: boolean
  distance_km?: number
  delivery_fee?: number
  suburb?: string
  postcode?: string
  message?: string
}
```
</details>

---

### 📘 admin.types.ts
**Path:** `src\types\admin.types.ts`

<details>
<summary>View Code (28 lines)</summary>

```typescript
export interface RevenueDaySummary {
  label: string;
  date: string;
  total: number;
}

export interface DashboardStats {
  total_orders: number;
  total_orders_growth_percent: number;
  pending_orders: number;
  pending_orders_weekly_change_percent: number;
  confirmed_orders: number;
  preparing_orders: number;
  out_for_delivery_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  today_revenue: number;
  today_vs_yesterday_percent: number;
  weekly_revenue: number;
  weekly_growth_percent: number;
  monthly_revenue: number;
  monthly_growth_percent: number;
  total_revenue: number;
  total_revenue_growth_percent: number;
  weekly_revenue_breakdown: RevenueDaySummary[];
  active_subscriptions: number;
  upcoming_catering_events: number;
}
```
</details>

---

### 📘 auth.types.ts
**Path:** `src\types\auth.types.ts`

<details>
<summary>View Code (70 lines)</summary>

```typescript
export interface User {
  id: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  created_at: string;
  updated_at: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email_verified: boolean;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  is_default: boolean;
  instructions?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  phone: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  role?: 'customer' | 'admin';
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegistrationResponse {
  email: string;
  message: string;
}

export interface VerifyEmailData {
  email: string;
  code: string;
}

export interface ResendVerificationData {
  email: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
  confirm_password: string;
}
```
</details>

---

### 📘 cart.types.ts
**Path:** `src\types\cart.types.ts`

<details>
<summary>View Code (39 lines)</summary>

```typescript
import { MenuItem } from './menu.types'
import { Address } from './auth.types'
import { MealSubscriptionPlan } from './subscription.types'

export interface CartItem {
  menu_item: MenuItem
  quantity: number
  special_instructions?: string
}

export interface Cart {
  items: CartItem[]
  order_type: 'daily_menu' | 'meal_subscription'
  delivery_option: 'pickup' | 'delivery'
  selected_address?: Address
  delivery_date?: string
  delivery_time_slot?: string
  special_instructions?: string
}

export interface CartSummary {
  subtotal: number
  delivery_fee: number
  tax: number
  total: number
  item_count: number
}

export interface MealSubscriptionSelection {
  plan: MealSubscriptionPlan
  planQuantity: number
  fulfilment: 'delivery' | 'pickup'
  schedule: Array<{ date: string; items: { item: MenuItem; quantity: number }[] }>
  includedBoxes: number
  totalBoxes: number
  extraBoxes: number
  maxPerMeal?: number | null
}

```
</details>

---

### 📘 common.types.ts
**Path:** `src\types\common.types.ts`

<details>
<summary>View Code (44 lines)</summary>

```typescript
// Common types used across the application

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

export type OrderType = 'daily_menu' | 'meal_subscription';
export type DeliveryOption = 'pickup' | 'delivery';
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';
export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'paid';
export type PaymentMethod = 'card' | 'cash';
export type UserRole = 'customer' | 'admin';

```
</details>

---

### 📘 menu.types.ts
**Path:** `src\types\menu.types.ts`

<details>
<summary>View Code (55 lines)</summary>

```typescript
export interface MenuItem {
  _id: string;  // MongoDB ID
  id: string;   // Also support 'id' field for compatibility
  name: string;
  description: string;
  category: string;
  price: number;
  image_url?: string;  // ✅ This can be null/undefined
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
```
</details>

---

### 📘 order.types.ts
**Path:** `src\types\order.types.ts`

<details>
<summary>View Code (106 lines)</summary>

```typescript
import { CartItem } from './cart.types';
import { Address } from './auth.types';

export type OrderType = 'daily_menu' | 'meal_subscription';
export type DeliveryOption = 'pickup' | 'delivery';
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';
export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'paid';
export type PaymentMethod = 'card' | 'cash';

export interface OrderStatusHistoryEntry {
  status: string;
  timestamp: string;
  note?: string;
  updated_by?: string;
}

export interface Order {
  id?: string;
  _id: string;
  user_id: string;
  order_type: OrderType;
  items: CartItem[];
  delivery_option: DeliveryOption;
  delivery_address?: Address;
  delivery_date: string;
  delivery_time_slot?: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  payment_intent_id?: string;
  subtotal: number;
  delivery_fee: number;
  tax: number;
  total: number;
  special_instructions?: string;
  cancellation_reason?: string;
  notes?: string;
  admin_notes?: string;
  delivery_method?: DeliveryOption | string;
  delivery_instructions?: string;
  order_number?: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  created_at: string;
  updated_at: string;
  status_history?: OrderStatusHistoryEntry[];
}

export interface CreateOrderPayload {
  order_type: OrderType;
  items: {
    menu_item_id: string;
    quantity: number;
    special_instructions?: string;
  }[];
  delivery_option: DeliveryOption;
  delivery_address_id?: string;
  delivery_date: string;
  delivery_time_slot?: string;
  payment_method: PaymentMethod;
  special_instructions?: string;
}

export interface OrderTracking {
  order_id: string;
  status: string;
  estimated_delivery_time?: string;
  driver_location?: {
    lat: number;
    lng: number;
  };
  status_history: OrderStatusHistoryEntry[];
}

export interface MealSubscriptionEditDetails {
  order_id: string;
  order_number?: string;
  plan_selections: Array<{
    plan_id: string;
    plan_code?: string;
    plan_name?: string;
    quantity: number;
  }>;
  delivery_slots: Array<{
    delivery_date: string;
    menu_items: Record<string, number>;
  }>;
  fulfilment_method: 'delivery' | 'pickup';
  is_express: boolean;
  delivery_address_id?: string;
  delivery_instructions?: string | null;
  notes?: string | null;
  payment_method?: string | null;
}
```
</details>

---

### 📘 payment.types.ts
**Path:** `src\types\payment.types.ts`

<details>
<summary>View Code (19 lines)</summary>

```typescript
export interface PaymentIntentResponse {
  client_secret: string
  payment_intent_id: string
  amount: number
  currency: string
}

export interface ConfirmPaymentResponse {
  success: boolean
  order_id: string
  payment_status: string
  message: string
}

export interface PaymentConfigResponse {
  stripe_enabled: boolean
  stripe_publishable_key?: string
  currency: string
}
```
</details>

---

### 📘 subscription.types.ts
**Path:** `src\types\subscription.types.ts`

<details>
<summary>View Code (107 lines)</summary>

```typescript
import { MenuItem } from './menu.types';

export interface WeekSelectionRules {
  available_weeks?: number | null;
  required_weeks?: number | null;
  deliveries_per_week?: number | null;
  allow_partial_weeks?: boolean | null;
}

export type UpsellCondition =
  | 'always'
  | 'when_plan_selected'
  | 'when_no_plan'
  | 'hidden';

export interface CustomerNotificationSettings {
  upsell_message?: string | null;
  reminder_message?: string | null;
  upsell_condition?: UpsellCondition | null;
}

export interface ReminderSettings {
  enabled?: boolean | null;
  frequency_days?: number | null;
  channel?: 'in_app' | 'email' | 'both' | null;
  threshold_unselected_boxes?: number | null;
}

export interface MealSubscriptionPlan {
  _id: string;
  code: string;
  name: string;
  tab: string;
  description?: string;
  short_description?: string;
  included_meals: number;
  deliveries_per_cycle: number;
  weeks_in_cycle: number;
  boxes_per_delivery: number;
  max_boxes_per_meal?: number | null;
  price_per_plan: number;
  price_per_box?: number | null;
  allow_multiple: boolean;
  min_boxes_delivery?: number | null;
  min_boxes_pickup?: number | null;
  display_badge?: string;
  display_order: number;
  extra_box_price?: number | null;
  highlight: boolean;
  require_terms_ack: boolean;
  acknowledgement_label?: string | null;
  terms_and_conditions: string[];
  week_selection_rules?: WeekSelectionRules | null;
  customer_notifications?: CustomerNotificationSettings | null;
  reminder_settings?: ReminderSettings | null;
  is_active: boolean;
  metadata?: Record<string, unknown>;
  available_delivery_days?: string[];
  menu_item_ids_by_day?: Record<string, string[]>;
  menu_items_by_day?: Record<string, MenuItem[]>;
  created_at: string;
  updated_at: string;
}

export interface DeliveryZone {
  _id: string;
  postcode: string;
  zone_label?: string | null;
  suburbs: string[];
  state: string;
  distance_from_business?: number | null;
  base_delivery_fee: number;
  express_delivery_fee?: number | null;
  max_delivery_days?: number | null;
  notes?: string | null;
  order_types?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MealPlanListResponse {
  plans: MealSubscriptionPlan[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DeliveryZoneListResponse {
  zones: DeliveryZone[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PlanSelectionInput {
  plan_id: string;
  quantity: number;
}

export interface DeliverySlotInput {
  delivery_date: string;
  menu_items: Record<string, number>;
  notes?: string;
}
```
</details>

---

## 📂 Utilities

### 📘 constants.ts
**Path:** `src\utils\constants.ts`

<details>
<summary>View Code (77 lines)</summary>

```typescript
/**
 * Application constants
 */

export const APP_NAME = 'Bakar\'s Food & Catering'

export const BUSINESS_INFO = {
  address: 'Guildford 2161, Sydney, Australia',
  phone: import.meta.env.VITE_WHATSAPP_NUMBER || '+61 480 573 034',
  email: 'info@bakarsfood.com.au',
  deliveryRadius: 6, // km
}

export const ORDER_TYPES = {
  DAILY_MENU: 'daily_menu',
  MEAL_SUBSCRIPTION: 'meal_subscription',
} as const

export const DELIVERY_OPTIONS = {
  PICKUP: 'pickup',
  DELIVERY: 'delivery',
} as const

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const

export const PAYMENT_METHODS = {
  CARD: 'card',
  CASH: 'cash',
} as const

export const DELIVERY_TIME_SLOTS = [
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM',
  '8:00 PM - 9:00 PM',
]

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const SUBSCRIPTION_PLANS = {
  WEEKLY: { meals: 7, discount: 0 },
  FORTNIGHTLY: { meals: 14, discount: 5 },
  MONTHLY: { meals: 30, discount: 10 },
}

export const TAX_RATE = 0.10 // 10% GST

export const MIN_ORDER_VALUE = 15 // AUD
export const DAILY_DELIVERY_FEE = 10 // AUD

export const DELIVERY_FEE_PER_KM = 2.5 // AUD per km

export const FREE_DELIVERY_THRESHOLD = 50 // AUD
```
</details>

---

### 📘 formatters.ts
**Path:** `src\utils\formatters.ts`

<details>
<summary>View Code (96 lines)</summary>

```typescript
import { format, parseISO } from 'date-fns'

/**
 * Format currency values to AUD
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(amount)
}

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date, formatStr: string = 'PPP'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatStr)
  } catch (error) {
    return 'Invalid date'
  }
}

/**
 * Format time to 12-hour format
 */
export const formatTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, 'h:mm a')
  } catch (error) {
    return 'Invalid time'
  }
}

/**
 * Format distance in kilometers
 */
export const formatDistance = (distanceKm: number): string => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`
  }
  return `${distanceKm.toFixed(1)}km`
}

/**
 * Format phone number to Australian format
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`
  }
  
  if (cleaned.length === 11 && cleaned.startsWith('61')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`
  }
  
  return phone
}

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Get initials from full name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Convert category keys/slugs to a human friendly label
 */
export const formatCategoryLabel = (value: string): string => {
  if (!value) return ''

  return value
    .toString()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}
```
</details>

---

### 📘 images.ts
**Path:** `src\utils\images.ts`

<details>
<summary>View Code (248 lines)</summary>

```typescript
/**
 * Image utility functions with comprehensive error handling and fallbacks
 */

import { apiBaseUrl } from '@api/config';

// Get environment variables
const CDN_URL = import.meta.env.VITE_CDN_URL || import.meta.env.VITE_R2_PUBLIC_URL || '';
const API_URL = apiBaseUrl || 'http://localhost:8000/api/v1';

/**
 * Get the full image URL with comprehensive fallback handling
 * @param imageUrl - The image URL from the API (can be relative or absolute)
 * @param category - Optional category for better fallback selection
 * @returns Absolute image URL or fallback
 */
export const getImageUrl = (imageUrl?: string | null, _category?: string): string => {
  // Debug logging in development
  if (import.meta.env.DEV) {
    console.log('=+n+ [getImageUrl] Processing:', {
      input: imageUrl,
      category: _category,
      CDN_URL,
      API_URL,
    });
  }

  // Case 1: No image URL provided - return empty string (no stock fallback)
  if (!imageUrl || imageUrl.trim() === '' || imageUrl === 'null' || imageUrl === 'undefined') {
    if (import.meta.env.DEV) {
      console.log('[getImageUrl] No URL provided, returning empty string');
    }
    return '';
  }

  // Case 2: Already a full URL (http/https)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    if (import.meta.env.DEV) {
      console.log('G [getImageUrl] Full URL detected:', imageUrl);
    }
    return imageUrl;
  }

  // Case 3: Data URL (base64)
  if (imageUrl.startsWith('data:')) {
    if (import.meta.env.DEV) {
      console.log('G [getImageUrl] Data URL detected');
    }
    return imageUrl;
  }

  // Case 4: Construct full URL from relative path
  let fullUrl = '';
  
  // Clean the image URL (remove any leading/trailing whitespace)
  const cleanImageUrl = imageUrl.trim();
  
  // If we have a CDN URL, use it
  if (CDN_URL) {
    // Remove leading slash from image URL if present
    const imagePath = cleanImageUrl.startsWith('/') 
      ? cleanImageUrl.substring(1) 
      : cleanImageUrl;
    
    // Ensure CDN URL doesn't end with slash
    const baseUrl = CDN_URL.endsWith('/') 
      ? CDN_URL.slice(0, -1) 
      : CDN_URL;
    
    fullUrl = `${baseUrl}/${imagePath}`;
  } 
  // Otherwise, use API URL as fallback
  else {
    // If the path doesn't start with /, assume it needs /static/ prefix
    if (!cleanImageUrl.startsWith('/')) {
      fullUrl = `${API_URL}/static/${cleanImageUrl}`;
    } else {
      fullUrl = `${API_URL}${cleanImageUrl}`;
    }
  }

  if (import.meta.env.DEV) {
    console.log('G [getImageUrl] Constructed URL:', fullUrl);
  }

  return fullUrl;
};

/**
 * Handle image loading errors without substituting stock photos
 * @param event - React synthetic event from the img element
 * @param category - Optional category, kept for compatibility
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  _category?: string
): void => {
  const target = event.currentTarget;
  console.error('? [handleImageError] Image failed to load:', target.src);
  target.onerror = null;
  target.src = '';
};

/**
 * Preload an image to check if it's valid
 * @param src - Image source URL
 * @returns Promise that resolves if image loads successfully
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      console.log('G [preloadImage] Successfully loaded:', src);
      resolve();
    };
    
    img.onerror = () => {
      console.error('G [preloadImage] Failed to load:', src);
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    img.src = src;
  });
};

/**
 * Check if image URL is valid format
 * @param url - URL to check
 * @returns Boolean indicating if URL appears to be valid image
 */
export const isValidImageUrl = (url?: string | null): boolean => {
  if (!url || url.trim() === '') return false;
  
  // Check for common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  // Check for data URLs
  const isDataUrl = url.startsWith('data:image/');
  
  // Check for known image services
  const isImageService = 
    url.includes('unsplash.com') || 
    url.includes('placeholder.com') || 
    url.includes('cloudflarestorage.com') ||
    url.includes('r2.dev') ||
    url.includes('imagekit.io') ||
    url.includes('cloudinary.com');
  
  return hasImageExtension || isDataUrl || isImageService;
};

/**
 * Get optimized image URL with transformations (for Cloudflare Images)
 * @param imageUrl - Original image URL
 * @param options - Transformation options
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
  imageUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
    format?: 'auto' | 'webp' | 'avif' | 'json';
  } = {}
): string => {
  // Get the base URL
  const baseUrl = getImageUrl(imageUrl);
  
  // If it's not a Cloudflare URL, return as-is
  if (!baseUrl.includes('cloudflarestorage.com') && !baseUrl.includes('imagedelivery.net')) {
    return baseUrl;
  }
  
  // Build transformation parameters for Cloudflare Images
  const params: string[] = [];
  
  if (options.width) params.push(`w=${options.width}`);
  if (options.height) params.push(`h=${options.height}`);
  if (options.quality) params.push(`q=${options.quality}`);
  if (options.fit) params.push(`fit=${options.fit}`);
  if (options.format) params.push(`f=${options.format}`);
  
  // If no transformations, return original
  if (params.length === 0) {
    return baseUrl;
  }
  
  // Check if URL already has query parameters
  const separator = baseUrl.includes('?') ? '&' : '?';
  
  return `${baseUrl}${separator}${params.join('&')}`;
};

/**
 * Get placeholder image for loading states
 * @returns Placeholder image URL
 */
export const getPlaceholderImage = (): string => '';

/**
 * Get error fallback image
 * @param category - Optional category for specific fallback
 * @returns Error fallback image URL
 */
export const getErrorFallbackImage = (_category?: string): string => '';

/**
 * Generate image srcset for responsive images
 * @param imageUrl - Base image URL
 * @param sizes - Array of widths to generate
 * @returns srcset string for img element
 */
export const generateSrcSet = (
  imageUrl: string,
  sizes: number[] = [320, 640, 960, 1280, 1920]
): string => {
  const baseUrl = getImageUrl(imageUrl);
  
  // If it's not a Cloudflare URL, return empty (no srcset)
  if (!baseUrl.includes('cloudflarestorage.com') && !baseUrl.includes('imagedelivery.net')) {
    return '';
  }
  
  return sizes
    .map(size => {
      const optimizedUrl = getOptimizedImageUrl(baseUrl, { width: size });
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
};

// Export default for convenience
export default {
  getImageUrl,
  handleImageError,
  preloadImage,
  isValidImageUrl,
  getOptimizedImageUrl,
  getPlaceholderImage,
  getErrorFallbackImage,
  generateSrcSet,
};
```
</details>

---

### 📘 storage.ts
**Path:** `src\utils\storage.ts`

<details>
<summary>View Code (61 lines)</summary>

```typescript
/**
 * Local storage utility with type safety
 */

const STORAGE_KEYS = {
  AUTH_TOKEN: 'bakars_auth_token',
  CART: 'bakars_cart',
  USER_PREFERENCES: 'bakars_preferences',
} as const

export const storage = {
  /**
   * Set item in localStorage
   */
  setItem: <T>(key: string, value: T): void => {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(key, serialized)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },

  /**
   * Get item from localStorage
   */
  getItem: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },

  /**
   * Remove item from localStorage
   */
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  /**
   * Clear all localStorage
   */
  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },

  // Predefined key methods
  keys: STORAGE_KEYS,
}
```
</details>

---

### 📘 validators.ts
**Path:** `src\utils\validators.ts`

<details>
<summary>View Code (57 lines)</summary>

```typescript
/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate Australian phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  // Australian mobile: 04XX XXX XXX or 614XX XXX XXX
  // Australian landline: 0X XXXX XXXX or 61X XXXX XXXX
  return /^(04\d{8}|614\d{8}|0[2-8]\d{8}|61[2-8]\d{8})$/.test(cleaned)
}

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' }
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' }
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' }
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' }
  }
  
  return { valid: true }
}

/**
 * Validate postcode
 */
export const isValidPostcode = (postcode: string): boolean => {
  return /^\d{4}$/.test(postcode)
}

/**
 * Validate required field
 */
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}
```
</details>

---

## 📊 Project Statistics

**Total files documented:** 134
**Total lines of code:** 27,732

### Files by Type

| File Type | Count | Percentage |
|-----------|-------|------------|
| .tsx | 79 | 59.0% |
| .ts | 41 | 30.6% |
| .json | 5 | 3.7% |
| .js | 2 | 1.5% |
| .svg | 2 | 1.5% |
| .prettierrc | 1 | 0.7% |
| Dockerfile | 1 | 0.7% |
| .html | 1 | 0.7% |
| .conf | 1 | 0.7% |
| .css | 1 | 0.7% |

### Component Breakdown

- **API Layer**: 12 files
  - `client.ts`
  - `config.ts`
  - `admin.ts`
  - `auth.ts`
  - `cart.ts`
  - _...and 7 more_
- **Configuration**: 15 files
  - `.eslintrc.json`
  - `.prettierrc`
  - `Dockerfile`
  - `index.html`
  - `nginx.conf`
  - _...and 10 more_
- **Custom Hooks**: 6 files
  - `useAuth.ts`
  - `useCart.ts`
  - `useDebounce.ts`
  - `useMenu.ts`
  - `useOrders.ts`
  - _...and 1 more_
- **Page Components**: 18 files
  - `AdminDashboard.tsx`
  - `CategoryManagement.tsx`
  - `DeliveryZonesPage.tsx`
  - `MealPlanManagement.tsx`
  - `MenuManagement.tsx`
  - _...and 13 more_
- **Public Assets**: 2 files
  - `favicon.svg`
  - `logo.svg`
- **React Components**: 55 files
  - `AdminSidebar.tsx`
  - `CategoryForm.tsx`
  - `OrderStats.tsx`
  - `RecentOrders.tsx`
  - `RevenueChart.tsx`
  - _...and 50 more_
- **Routing**: 4 files
  - `AdminRoutes.tsx`
  - `CustomerRoutes.tsx`
  - `PublicRoutes.tsx`
  - `index.tsx`
- **State Management**: 7 files
  - `addressStore.ts`
  - `adminStore.ts`
  - `authModalStore.ts`
  - `authStore.ts`
  - `cartStore.ts`
  - _...and 2 more_
- **Styles**: 1 files
  - `globals.css`
- **TypeScript Types**: 9 files
  - `address.types.ts`
  - `admin.types.ts`
  - `auth.types.ts`
  - `cart.types.ts`
  - `common.types.ts`
  - _...and 4 more_
- **Utilities**: 5 files
  - `constants.ts`
  - `formatters.ts`
  - `images.ts`
  - `storage.ts`
  - `validators.ts`

---

*Documentation generated on 2025-11-13 20:11:31*
*Total documentation size: ~930 KB*
