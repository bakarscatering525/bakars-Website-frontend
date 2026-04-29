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