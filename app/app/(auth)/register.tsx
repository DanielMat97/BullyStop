import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, router } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { Button } from "../../components/ui/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      errors.name = "El nombre completo del funcionario es obligatorio";
    } else if (name.length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres";
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "El correo institucional es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Formato de correo institucional inválido";
    } else if (!email.toLowerCase().includes('policia') && !email.toLowerCase().includes('gov')) {
      errors.email = "Debe usar correo institucional (@policia.gov.co)";
    }

    // Password validation
    if (!password.trim()) {
      errors.password = "La clave de acceso es obligatoria";
    } else if (password.length < 8) {
      errors.password = "La clave debe tener al menos 8 caracteres";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password = "La clave debe incluir mayúsculas, minúsculas y números";
    }

    // Confirm password
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las claves de acceso no coinciden";
    }

    // Grade validation - now for police rank
    if (!grade.trim()) {
      errors.grade = "El rango policial es requerido";
    }

    // Emergency contact validation (optional)
    if (
      emergencyContact &&
      !/^\d{7,15}$/.test(emergencyContact.replace(/\D/g, ""))
    ) {
      errors.emergencyContact = "Número de contacto de emergencia inválido";
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
        console.error("Error en registro SITAB:", err);
        Alert.alert(
          "Error de Registro",
          "No se pudo completar el registro. Verifique que sus datos sean correctos y que esté autorizado para usar el sistema SITAB."
        );
      }
    }
  };

  const policeRanks = [
    "Agente", "Patrullero", "Subintendente", "Intendente", 
    "Subcomisario", "Comisario", "Subcomandante", "Comandante",
    "Mayor", "Teniente Coronel", "Coronel", "Brigadier General"
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.container}>
            <View style={styles.content}>
              {/* Header */}
              <View style={[styles.headerCard, { backgroundColor: colors.card }]}>
                <View style={[styles.logoContainer, { backgroundColor: colors.primary + '15' }]}>
                  <MaterialCommunityIcons 
                    name="account-plus" 
                    size={40} 
                    color={colors.primary}
                  />
                </View>
                <Text style={[styles.title, { color: colors.text }]}>
                  Registro de Funcionario
                </Text>
                <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
                  Sistema Táctico Básico Policial (SITAB)
                </Text>
              </View>

              {/* Security Notice */}
              <View style={[styles.securityNotice, { backgroundColor: '#FFC107' + '20' }]}>
                <MaterialCommunityIcons 
                  name="shield-alert" 
                  size={20} 
                  color="#FFC107"
                />
                <Text style={[styles.securityText, { color: colors.text }]}>
                  <Text style={{ fontWeight: 'bold' }}>Importante:</Text> Solo funcionarios 
                  autorizados de la Policía Nacional pueden registrarse en el sistema SITAB.
                </Text>
              </View>

              {/* Registration Form */}
              <View style={[styles.formCard, { backgroundColor: colors.card }]}>
                {error && (
                  <View style={[styles.errorContainer, { backgroundColor: '#D32F2F20' }]}>
                    <MaterialCommunityIcons name="alert-circle" size={20} color="#D32F2F" />
                    <Text style={[styles.errorText, { color: '#D32F2F' }]}>{error}</Text>
                  </View>
                )}

                {/* Personal Information Section */}
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons name="account" size={20} color={colors.primary} />
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Información Personal
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    Nombre Completo del Funcionario
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    { backgroundColor: colors.background, borderColor: formErrors.name ? '#D32F2F' : colors.border }
                  ]}>
                    <MaterialCommunityIcons 
                      name="account-outline" 
                      size={20} 
                      color={colors.text + '60'} 
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Nombres y apellidos completos"
                      placeholderTextColor={colors.text + "60"}
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />
                  </View>
                  {formErrors.name && (
                    <Text style={[styles.fieldError, { color: '#D32F2F' }]}>{formErrors.name}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    Rango Policial
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    { backgroundColor: colors.background, borderColor: formErrors.grade ? '#D32F2F' : colors.border }
                  ]}>
                    <MaterialCommunityIcons 
                      name="star-outline" 
                      size={20} 
                      color={colors.text + '60'} 
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Ej: Patrullero, Subintendente, Comisario..."
                      placeholderTextColor={colors.text + "60"}
                      value={grade}
                      onChangeText={setGrade}
                    />
                  </View>
                  {formErrors.grade && (
                    <Text style={[styles.fieldError, { color: '#D32F2F' }]}>{formErrors.grade}</Text>
                  )}
                </View>

                {/* System Access Section */}
                <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                  <MaterialCommunityIcons name="security" size={20} color={colors.primary} />
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Acceso al Sistema
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    Correo Institucional
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    { backgroundColor: colors.background, borderColor: formErrors.email ? '#D32F2F' : colors.border }
                  ]}>
                    <MaterialCommunityIcons 
                      name="email-outline" 
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
                    <Text style={[styles.fieldError, { color: '#D32F2F' }]}>{formErrors.email}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    Clave de Acceso Segura
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
                      placeholder="Mínimo 8 caracteres (incluir mayúsculas, números)"
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
                    <Text style={[styles.fieldError, { color: '#D32F2F' }]}>{formErrors.password}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    Confirmar Clave de Acceso
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    { backgroundColor: colors.background, borderColor: formErrors.confirmPassword ? '#D32F2F' : colors.border }
                  ]}>
                    <MaterialCommunityIcons 
                      name="lock-check" 
                      size={20} 
                      color={colors.text + '60'} 
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Confirme su clave de acceso"
                      placeholderTextColor={colors.text + "60"}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity 
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.passwordToggle}
                    >
                      <MaterialCommunityIcons 
                        name={showConfirmPassword ? "eye-off" : "eye"} 
                        size={20} 
                        color={colors.text + '60'} 
                      />
                    </TouchableOpacity>
                  </View>
                  {formErrors.confirmPassword && (
                    <Text style={[styles.fieldError, { color: '#D32F2F' }]}>{formErrors.confirmPassword}</Text>
                  )}
                </View>

                {/* Emergency Contact Section */}
                <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                  <MaterialCommunityIcons name="phone-alert" size={20} color={colors.primary} />
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Contacto de Emergencia (Opcional)
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    Número de Contacto de Emergencia
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    { backgroundColor: colors.background, borderColor: formErrors.emergencyContact ? '#D32F2F' : colors.border }
                  ]}>
                    <MaterialCommunityIcons 
                      name="phone" 
                      size={20} 
                      color={colors.text + '60'} 
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Número para situaciones de emergencia"
                      placeholderTextColor={colors.text + "60"}
                      value={emergencyContact}
                      onChangeText={setEmergencyContact}
                      keyboardType="phone-pad"
                    />
                  </View>
                  {formErrors.emergencyContact && (
                    <Text style={[styles.fieldError, { color: '#D32F2F' }]}>{formErrors.emergencyContact}</Text>
                  )}
                </View>

                {/* Register Button */}
                <TouchableOpacity
                  style={[
                    styles.registerButton,
                    { 
                      backgroundColor: isLoading ? colors.primary + '70' : colors.primary,
                    }
                  ]}
                  onPress={handleRegister}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <MaterialCommunityIcons name="loading" size={20} color="#FFFFFF" />
                  ) : (
                    <MaterialCommunityIcons name="account-plus" size={20} color="#FFFFFF" />
                  )}
                  <Text style={styles.registerButtonText}>
                    {isLoading ? "Procesando Registro..." : "Registrar Funcionario"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <View style={[styles.footerCard, { backgroundColor: colors.card }]}>
                  <Text style={[styles.footerTitle, { color: colors.text }]}>
                    ¿Ya tiene acceso al sistema?
                  </Text>
                  <TouchableOpacity 
                    style={[styles.loginButton, { borderColor: colors.primary }]}
                    onPress={() => router.push("/(auth)/login")}
                  >
                    <MaterialCommunityIcons name="login" size={18} color={colors.primary} />
                    <Text style={[styles.loginButtonText, { color: colors.primary }]}>
                      Iniciar Sesión
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Legal Notice */}
              <View style={styles.legalNotice}>
                <Text style={[styles.legalText, { color: colors.text + '50' }]}>
                  Al registrarse, usted confirma ser funcionario activo de la Policía Nacional 
                  de Colombia y acepta el uso responsable del sistema SITAB conforme a las 
                  normativas institucionales vigentes.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
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
    marginTop: 20,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  securityText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 18,
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
    fontSize: 15,
  },
  passwordToggle: {
    padding: 4,
  },
  fieldError: {
    marginTop: 6,
    fontSize: 12,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
    marginBottom: 12,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    gap: 6,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  legalNotice: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  legalText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 15,
  },
});
