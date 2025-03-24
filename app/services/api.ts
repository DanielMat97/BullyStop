import axios from 'axios';
import { LoginCredentials, RegisterData, User } from "../store/auth/types";
import { API_URL, API_TIMEOUT, API_ERROR_MESSAGES, logApiConfig } from '../config/api';

// API response types
export interface AuthResponse {
  user: User;
  token: string;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_TIMEOUT,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Petición API: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('Error en petición API:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Respuesta API: ${response.status} ${response.config.url}`, response.data);
    // Return the response data directly
    return response.data;
  },
  (error) => {
    // Enhanced error handling
    let errorMessage = API_ERROR_MESSAGES.UNKNOWN_ERROR;
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error de respuesta API:', error.response.status, error.response.data);
      errorMessage = error.response.data?.message || `${API_ERROR_MESSAGES.SERVER_ERROR}: ${error.response.status}`;
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Sin respuesta del API:', error.request);
      errorMessage = API_ERROR_MESSAGES.CONNECTION_ERROR;
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error en configuración de API:', error.message);
      errorMessage = `${API_ERROR_MESSAGES.REQUEST_ERROR}: ${error.message}`;
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

// Log API URL and configuration at startup
logApiConfig();

// Auth API service
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      return await api.post('/users/login', credentials);
    } catch (error) {
      console.error('Error en API de login:', error);
      throw error;
    }
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      return await api.post('/users', data);
    } catch (error) {
      console.error('Error en API de registro:', error);
      throw error;
    }
  },

  getCurrentUser: async (token: string): Promise<User> => {
    try {
      return await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      throw error;
    }
  },
};

// User API service
export const userApi = {
  getUser: async (id: number, token: string): Promise<User> => {
    try {
      return await api.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(`Error al obtener usuario (ID: ${id}):`, error);
      throw error;
    }
  },

  updateUser: async (id: number, data: Partial<User>, token: string): Promise<User> => {
    try {
      return await api.patch(`/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(`Error al actualizar usuario (ID: ${id}):`, error);
      throw error;
    }
  },
};

// Helper function to set auth token in default headers
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Token de autenticación configurado en headers de API');
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log('Token de autenticación removido de headers de API');
  }
};
