import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { Button } from "../../components/ui/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function LoginScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      errors.email = "La identificación institucional es obligatoria";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Formato de identificación inválido";
    }

    if (!password.trim()) {
      errors.password = "La clave de acceso es obligatoria";
    } else if (password.length < 6) {
      errors.password = "La clave debe tener al menos 6 caracteres";
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
        console.error("Error de autenticación SITAB:", err);
        Alert.alert(
          "Error de Acceso",
          "Credenciales incorrectas. Verifique su identificación y clave de acceso al sistema SITAB."
        );
      }
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.content}>
            {/* Header Section */}
            <View style={[styles.headerCard, { backgroundColor: colors.card }]}>
              <View style={[styles.logoContainer, { backgroundColor: colors.primary + '15' }]}>
                <MaterialCommunityIcons 
                  name="shield-account" 
                  size={48} 
                  color={colors.primary}
                />
              </View>
              <Text style={[styles.title, { color: colors.text }]}>
                Acceso al Sistema SITAB
              </Text>
              <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
                Identificación de funcionario autorizado
              </Text>
            </View>

            {/* Security Notice */}
            <View style={[styles.securityNotice, { backgroundColor: colors.primary + '10' }]}>
              <MaterialCommunityIcons 
                name="security" 
                size={20} 
                color={colors.primary}
              />
              <Text style={[styles.securityText, { color: colors.text }]}>
                Sistema seguro para personal de la Policía Nacional
              </Text>
            </View>

            {/* Login Form */}
            <View style={[styles.formCard, { backgroundColor: colors.card }]}>
              {error && (
                <View style={[styles.errorContainer, { backgroundColor: '#D32F2F20' }]}>
                  <MaterialCommunityIcons name="alert-circle" size={20} color="#D32F2F" />
                  <Text style={[styles.errorText, { color: '#D32F2F' }]}>{error}</Text>
                </View>
              )}
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  <MaterialCommunityIcons name="account" size={16} color={colors.primary} />
                  {" "}Identificación Institucional
                </Text>
                <View style={[
                  styles.inputContainer, 
                  { backgroundColor: colors.background, borderColor: formErrors.email ? '#D32F2F' : colors.border }
                ]}>
                  <MaterialCommunityIcons 
                    name="email" 
                    size={20} 
                    color={colors.text + '60'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="funcionario@policia.gov.co"
                    placeholderTextColor={colors.text + "60"}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
                {formErrors.email && (
                  <Text style={[styles.fieldError, { color: '#D32F2F' }]}>
                    {formErrors.email}
                  </Text>
                )}
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  <MaterialCommunityIcons name="lock" size={16} color={colors.primary} />
                  {" "}Clave de Acceso
                </Text>
                <View style={[
                  styles.inputContainer, 
                  { backgroundColor: colors.background, borderColor: formErrors.password ? '#D32F2F' : colors.border }
                ]}>
                  <MaterialCommunityIcons 
                    name="lock-outline" 
                    size={20} 
                    color={colors.text + '60'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Ingrese su clave de acceso"
                    placeholderTextColor={colors.text + "60"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                  >
                    <MaterialCommunityIcons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color={colors.text + '60'} 
                    />
                  </TouchableOpacity>
                </View>
                {formErrors.password && (
                  <Text style={[styles.fieldError, { color: '#D32F2F' }]}>
                    {formErrors.password}
                  </Text>
                )}
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  { 
                    backgroundColor: isLoading ? colors.primary + '70' : colors.primary,
                  }
                ]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <MaterialCommunityIcons name="loading" size={20} color="#FFFFFF" />
                ) : (
                  <MaterialCommunityIcons name="login" size={20} color="#FFFFFF" />
                )}
                <Text style={styles.loginButtonText}>
                  {isLoading ? "Autenticando..." : "Acceder al Sistema"}
                </Text>
              </TouchableOpacity>

              {/* Forgot Password */}
              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={() => router.push("/(auth)/forgot-password")}
              >
                <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                  ¿Olvidó su clave de acceso?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={[styles.footerCard, { backgroundColor: colors.card }]}>
                <Text style={[styles.footerTitle, { color: colors.text }]}>
                  ¿No tiene acceso al sistema?
                </Text>
                <Text style={[styles.footerText, { color: colors.text + '80' }]}>
                  Solicite registro como funcionario autorizado
                </Text>
                <TouchableOpacity 
                  style={[styles.registerButton, { borderColor: colors.primary }]}
                  onPress={() => router.push("/(auth)/register")}
                >
                  <MaterialCommunityIcons name="account-plus" size={18} color={colors.primary} />
                  <Text style={[styles.registerButtonText, { color: colors.primary }]}>
                    Solicitar Registro
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Legal Notice */}
            <View style={styles.legalNotice}>
              <Text style={[styles.legalText, { color: colors.text + '50' }]}>
                Sistema exclusivo para funcionarios de la Policía Nacional de Colombia.
                El acceso no autorizado está penalizado por la ley.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    gap: 16,
  },
  headerCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  securityText: {
    fontSize: 13,
    flex: 1,
    fontWeight: '500',
  },
  formCard: {
    padding: 24,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 4,
  },
  fieldError: {
    marginTop: 6,
    fontSize: 12,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    marginTop: 8,
  },
  footerCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    gap: 6,
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  legalNotice: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  legalText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 15,
  },
});
