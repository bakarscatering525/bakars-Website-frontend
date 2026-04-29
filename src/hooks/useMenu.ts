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
