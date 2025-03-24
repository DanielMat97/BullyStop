import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthContext();
  const { colors } = useTheme();
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isLoggedIn = await checkAuth();
        setIsChecking(false);
        
        // Navigate to appropriate screen based on auth status
        if (isLoggedIn) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)");
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        setError(err instanceof Error ? err.message : 'Error al verificar el estado de autenticación');
        setIsChecking(false);
        // Default to auth screen on error
        router.replace("/(auth)");
      }
    };
    
    checkAuthentication();
  }, []);

  // Show loading while checking auth status
  if (isChecking) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Cargando...
        </Text>
      </View>
    );
  }

  // Show error if authentication check failed
  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: 'red' }]}>
          {error}
        </Text>
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Redirigiendo...
        </Text>
      </View>
    );
  }

  // This redirect serves as a fallback
  return isAuthenticated 
    ? <Redirect href="/(tabs)" /> 
    : <Redirect href="/(auth)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  }
});
