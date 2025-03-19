import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Button } from '../../components/ui/button';

export default function RegisterScreen() {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    grade: '',
    emergencyContact: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.password || !formData.grade) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      // TODO: Implement API call to /users endpoint
      // const response = await fetch('http://localhost:3000/users', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Error al crear la cuenta');
      // }

      // const data = await response.json();
      Alert.alert(
        'Éxito',
        'Tu cuenta ha sido creada. Por favor inicia sesión.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la cuenta. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Crear Cuenta
        </Text>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border 
            }]}
            placeholder="Nombre completo"
            placeholderTextColor={colors.text + '80'}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border 
            }]}
            placeholder="Correo electrónico"
            placeholderTextColor={colors.text + '80'}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border 
            }]}
            placeholder="Contraseña"
            placeholderTextColor={colors.text + '80'}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border 
            }]}
            placeholder="Grado escolar"
            placeholderTextColor={colors.text + '80'}
            value={formData.grade}
            onChangeText={(text) => setFormData({ ...formData, grade: text })}
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border 
            }]}
            placeholder="Contacto de emergencia (opcional)"
            placeholderTextColor={colors.text + '80'}
            value={formData.emergencyContact}
            onChangeText={(text) => setFormData({ ...formData, emergencyContact: text })}
            keyboardType="phone-pad"
          />

          <Button 
            onPress={handleRegister}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>

          <View style={styles.loginContainer}>
            <Text style={{ color: colors.text }}>
              ¿Ya tienes una cuenta?{' '}
            </Text>
            <Link href="/(auth)/login" asChild>
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                Inicia sesión
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    gap: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
}); 