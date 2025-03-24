import React, { useEffect, createContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { User, LoginCredentials, RegisterData } from '../store/auth';

// Define auth context type
type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<boolean>;
  requireAuth: () => Promise<void>;
  redirectIfAuthenticated: (destination?: '/(tabs)' | '/(auth)') => Promise<void>;
} | null;

// Create context with proper typing
export const AuthContext = createContext<AuthContextType>(null);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider component
 * Provides authentication state and methods to the entire app
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();
  const { colors } = useTheme();
  const [initializing, setInitializing] = React.useState(true);

  // Check if user is authenticated on app start
  useEffect(() => {
    const initAuth = async () => {
      await auth.checkAuth();
      setInitializing(false);
    };

    initAuth();
  }, []);

  // Show loading indicator while checking authentication
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}; 