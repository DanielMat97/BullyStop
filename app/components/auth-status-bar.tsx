import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTheme } from "@react-navigation/native";

/**
 * Un componente que muestra el estado actual de autenticación
 * Útil para depuración y pruebas
 */
export const AuthStatusBar: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const { colors } = useTheme();

  const getStatusColor = () => {
    if (isLoading) return "#FFA500"; // Naranja para carga
    if (isAuthenticated) return "#008000"; // Verde para autenticado
    return "#FF0000"; // Rojo para no autenticado
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.card,
        borderColor: colors.border,
      }
    ]}>
      <View style={[
        styles.statusIndicator, 
        { backgroundColor: getStatusColor() }
      ]} />
      
      <View style={styles.textContainer}>
        <Text style={[styles.statusText, { color: colors.text }]}>
          {isLoading 
            ? 'Cargando...' 
            : isAuthenticated 
              ? `Autenticado: ${user?.name || 'Usuario'}` 
              : 'No autenticado'
          }
        </Text>
      </View>
      
      {isLoading && (
        <ActivityIndicator 
          size="small" 
          color={colors.primary} 
          style={styles.loader} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loader: {
    marginLeft: 8,
  },
});
