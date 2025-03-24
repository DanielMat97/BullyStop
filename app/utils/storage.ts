import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user_data',
};

// Storage utility functions
export const storage = {
  // Save auth token
  setToken: async (token: string): Promise<void> => {
    try {
      if (token === undefined || token === null) {
        console.warn('Intento de guardar un token nulo o indefinido. Operación ignorada.');
        return;
      }
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  },

  // Get auth token
  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },

  // Save user data
  setUser: async (user: any): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  // Get user data
  getUser: async (): Promise<any | null> => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  // Clear all auth data
  clearAuth: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER,
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  },
}; 