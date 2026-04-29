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
