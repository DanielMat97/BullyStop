import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Button } from '../../components/ui/button';

export default function LoginScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      // TODO: Implement API call to /users/login endpoint
      // const response = await fetch('http://localhost:3000/users/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Credenciales inválidas');
      // }

      // const data = await response.json();
      // TODO: Store token and user data
      
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Iniciar Sesión
        </Text>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border 
            }]}
            placeholder="Correo electrónico"
            placeholderTextColor={colors.text + '80'}
            value={email}
            onChangeText={setEmail}
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
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Link href="/(auth)/forgot-password" asChild>
            <Text style={[styles.forgotPassword, { color: colors.primary }]}>
              ¿Olvidaste tu contraseña?
            </Text>
          </Link>

          <Button 
            onPress={handleLogin}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          <View style={styles.registerContainer}>
            <Text style={{ color: colors.text }}>
              ¿No tienes una cuenta?{' '}
            </Text>
            <Link href="/(auth)/register" asChild>
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                Regístrate
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  forgotPassword: {
    textAlign: 'right',
    fontSize: 14,
  },
  button: {
    marginTop: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
}); 