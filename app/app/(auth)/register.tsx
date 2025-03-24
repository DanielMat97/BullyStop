import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { Button } from "../../components/ui/button";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { register, isLoading, error, clearError, redirectIfAuthenticated } =
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

  // Validate form fields
  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!name.trim()) {
      errors.name = "El nombre es obligatorio";
    } else if (name.length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres";
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Ingresa un correo electrónico válido";
    }

    // Password validation
    if (!password.trim()) {
      errors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    // Confirm password
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    // Grade validation
    if (!grade.trim()) {
      errors.grade = "El grado escolar es requerido";
    }

    // Emergency contact validation (optional)
    if (
      emergencyContact &&
      !/^\d{7,15}$/.test(emergencyContact.replace(/\D/g, ""))
    ) {
      errors.emergencyContact = "Número de contacto inválido";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        await register({
          name,
          email,
          password,
          grade,
          emergencyContact: emergencyContact || undefined,
        });
      } catch (err) {
        console.error("Error durante el registro:", err);
        Alert.alert(
          "Error de Registro",
          err instanceof Error
            ? err.message
            : "Ha ocurrido un error durante el registro"
        );
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            Crear una cuenta
          </Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Nombre completo
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.card, color: colors.text },
                formErrors.name ? styles.inputError : null,
              ]}
              placeholder="Ingresa tu nombre completo"
              placeholderTextColor={colors.text + "80"}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            {formErrors.name && (
              <Text style={styles.errorText}>{formErrors.name}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Correo electrónico
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.card, color: colors.text },
                formErrors.email ? styles.inputError : null,
              ]}
              placeholder="Ingresa tu correo electrónico"
              placeholderTextColor={colors.text + "80"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {formErrors.email && (
              <Text style={styles.errorText}>{formErrors.email}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Contraseña
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.card, color: colors.text },
                formErrors.password ? styles.inputError : null,
              ]}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor={colors.text + "80"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {formErrors.password && (
              <Text style={styles.errorText}>{formErrors.password}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Confirmar contraseña
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.card, color: colors.text },
                formErrors.confirmPassword ? styles.inputError : null,
              ]}
              placeholder="Confirma tu contraseña"
              placeholderTextColor={colors.text + "80"}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            {formErrors.confirmPassword && (
              <Text style={styles.errorText}>{formErrors.confirmPassword}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Grado escolar
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.card, color: colors.text },
                formErrors.grade ? styles.inputError : null,
              ]}
              placeholder="Ingresa tu grado escolar"
              placeholderTextColor={colors.text + "80"}
              value={grade}
              onChangeText={setGrade}
            />
            {formErrors.grade && (
              <Text style={styles.errorText}>{formErrors.grade}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Contacto de emergencia (opcional)
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.card, color: colors.text },
                formErrors.emergencyContact ? styles.inputError : null,
              ]}
              placeholder="Ingresa tu número de contacto"
              placeholderTextColor={colors.text + "80"}
              value={emergencyContact}
              onChangeText={setEmergencyContact}
              keyboardType="phone-pad"
            />
            {formErrors.emergencyContact && (
              <Text style={styles.errorText}>
                {formErrors.emergencyContact}
              </Text>
            )}
          </View>

          <Button
            onPress={handleRegister}
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </Button>

          <View style={styles.footer}>
            <View style={styles.footerText}>
              <Text style={{ color: colors.text }}>
                ¿Ya tienes una cuenta?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                  Inicia sesión
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
    justifyContent: "center",
  },
  content: {
    width: "100%",
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
