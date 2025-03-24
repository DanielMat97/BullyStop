import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { Button } from "../../components/ui/button";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function LoginScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { login, isLoading, error, clearError, redirectIfAuthenticated } =
    useAuthContext();

  // Check if already authenticated
  useEffect(() => {
    redirectIfAuthenticated();
  }, [redirectIfAuthenticated]);

  // Clear error on unmount
  useEffect(() => {
    return () => {
      if (error) clearError();
    };
  }, [error, clearError]);

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Ingresa un correo electrónico válido";
    }

    if (!password.trim()) {
      errors.password = "La contraseña es obligatoria";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await login({
          email,
          password
        });
      } catch (err) {
        console.error("Error durante el inicio de sesión:", err);
        Alert.alert(
          "Error de Inicio de Sesión",
          err instanceof Error ? err.message : "Ha ocurrido un error durante el inicio de sesión"
        );
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Inicia sesión</Text>
          
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Correo electrónico</Text>
            <TextInput
              style={[
                styles.input, 
                { backgroundColor: colors.card, color: colors.text },
                formErrors.email ? styles.inputError : null
              ]}
              placeholder="Ingresa tu correo electrónico"
              placeholderTextColor={colors.text + "80"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Contraseña</Text>
            <TextInput
              style={[
                styles.input, 
                { backgroundColor: colors.card, color: colors.text },
                formErrors.password ? styles.inputError : null
              ]}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor={colors.text + "80"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}
          </View>
          
          <Button
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
          
          <View style={styles.footer}>
            <View style={styles.footerText}>
              <Text style={{ color: colors.text }}>
                ¿No tienes una cuenta?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                  Regístrate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
  button: {
    marginTop: 16,
  },
  footer: {
    marginTop: 24,
  },
  footerText: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
