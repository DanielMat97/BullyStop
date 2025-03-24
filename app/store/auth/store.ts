import { create } from 'zustand';
import { AuthState, AuthActions, LoginCredentials, RegisterData } from './types';
import { authApi, setAuthToken } from '../../services/api';
import { storage } from '../../utils/storage';

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create auth store
export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  ...initialState,

  // Login action
  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true, error: null });

      // Call API to login
      const response = await authApi.login(credentials);
      const { user, token } = response;

      // Verificar que el token existe
      if (!token) {
        throw new Error('No se recibió token de autenticación desde el servidor');
      }

      // Set token in axios default headers
      setAuthToken(token);

      // Save to storage
      await storage.setToken(token);
      await storage.setUser(user);

      // Update state
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Error al iniciar sesión' 
      });
      throw error;
    }
  },

  // Register action
  register: async (data: RegisterData) => {
    try {
      set({ isLoading: true, error: null });

      // Call API to register
      const response = await authApi.register(data);
      const { user, token } = response;

      // Verificar que el token existe
      if (!token) {
        throw new Error('No se recibió token de autenticación desde el servidor');
      }

      // Set token in axios default headers
      setAuthToken(token);

      // Save to storage
      await storage.setToken(token);
      await storage.setUser(user);

      // Update state
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Error al registrar usuario' 
      });
      throw error;
    }
  },

  // Logout action
  logout: async () => {
    // Remove token from axios headers
    setAuthToken(null);
    
    // Clear storage
    await storage.clearAuth();
    
    // Reset state to initial
    set({ ...initialState });
  },

  // Clear error action
  clearError: () => {
    set({ error: null });
  }
})); 