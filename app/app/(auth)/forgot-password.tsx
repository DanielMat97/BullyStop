import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Button } from '../../components/ui/button';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    // Validate email
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      setLoading(true);
      // TODO: Implement API call to /users/reset-password endpoint
      // const response = await fetch('http://localhost:3000/users/reset-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Error al enviar el correo de recuperación');
      // }

      Alert.alert(
        'Éxito',
        'Se ha enviado un correo electrónico con las instrucciones para recuperar tu contraseña.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el correo de recuperación. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Recuperar Contraseña
        </Text>

        <Text style={[styles.subtitle, { color: colors.text }]}>
          Ingresa tu correo electrónico y te enviaremos las instrucciones para recuperar tu contraseña.
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

          <Button 
            onPress={handleResetPassword}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Enviando...' : 'Enviar Instrucciones'}
          </Button>

          <View style={styles.loginContainer}>
            <Text style={{ color: colors.text }}>
              ¿Recordaste tu contraseña?{' '}
            </Text>
            <Link href="/(auth)/login" asChild>
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                Inicia sesión
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
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
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