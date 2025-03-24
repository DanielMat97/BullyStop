import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

/**
 * Custom hook to use the auth context
 * Provides access to auth state and methods from the context
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (context === null) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
}; 