import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { storage } from '../utils/storage';
import { router } from 'expo-router';
import { setAuthToken } from '../services/api';

type AppRoute = '/(tabs)' | '/(auth)';

/**
 * Custom hook to handle authentication
 * Provides simplified access to auth state and actions
 */
export const useAuth = () => {
  const { 
    user, 
    token, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    register, 
    logout, 
    clearError 
  } = useAuthStore();

  /**
   * Check if user is authenticated and restore session if possible
   */
  const checkAuth = async () => {
    try {
      const storedToken = await storage.getToken();
      const storedUser = await storage.getUser();

      if (storedToken && storedUser) {
        // Set token in axios
        setAuthToken(storedToken);
        
        // Restore auth state from storage
        useAuthStore.setState({ 
          user: storedUser,
          token: storedToken,
          isAuthenticated: true
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to restore auth state:', error);
      return false;
    }
  };

  /**
   * Redirect to auth screen if not authenticated
   */
  const requireAuth = async () => {
    const isLoggedIn = await checkAuth();
    
    if (!isLoggedIn && !isAuthenticated) {
      router.replace('/(auth)' as AppRoute);
    }
  };

  /**
   * Redirect to main app if already authenticated
   */
  const redirectIfAuthenticated = async (destination: AppRoute = '/(tabs)') => {
    const isLoggedIn = await checkAuth();
    
    if (isLoggedIn || isAuthenticated) {
      router.replace(destination);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    checkAuth,
    requireAuth,
    redirectIfAuthenticated
  };
}; 