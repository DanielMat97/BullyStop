import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

/**
 * Custom hook para acceder al contexto de autenticación
 * Proporciona acceso a los estados y métodos de autenticación desde cualquier componente
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
  }
  
  return context;
}; 