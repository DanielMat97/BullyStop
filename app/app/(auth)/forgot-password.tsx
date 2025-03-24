import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Button } from '../../components/ui/button';
import { API_URL } from '../../config/api';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      setLoading(true);
      // TODO: Implement API call to /users/reset-password endpoint
      // const response = await fetch(`${API_URL}/users/reset-password`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Error al enviar el correo de recuperación');
      // }

      // Simulamos una respuesta exitosa
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 1500);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Error',
        error instanceof Error 
          ? error.message 
          : 'Ocurrió un error al procesar tu solicitud'
      );
    }
  };

  if (success) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            ¡Correo enviado!
          </Text>
          
          <Text style={[styles.message, { color: colors.text }]}>
            Se ha enviado un correo con instrucciones para restablecer tu contraseña a: {email}
          </Text>
          
          <Button 
            onPress={() => router.push('/(auth)/login')}
            style={styles.button}
          >
            Volver a Inicio de Sesión
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Recuperar Contraseña
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Ingresa tu correo electrónico para recibir instrucciones sobre cómo restablecer tu contraseña.
        </Text>
        
        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border,
            }
          ]}
          placeholder="Correo electrónico"
          placeholderTextColor={colors.text + '80'}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <Button
          onPress={handleResetPassword}
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Enviando...' : 'Restablecer Contraseña'}
        </Button>
        
        <Button
          variant="outline"
          onPress={() => router.push('/(auth)/login')}
          style={styles.backButton}
        >
          Volver a Inicio de Sesión
        </Button>
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
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginTop: 10,
  },
}); 