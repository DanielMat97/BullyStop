import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Button } from '../../components/ui/button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AuthScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <MaterialCommunityIcons 
          name="shield-check" 
          size={100} 
          color={colors.primary}
          style={styles.icon}
        />
        
        <Text style={[styles.title, { color: colors.text }]}>
          Bienvenido a BullyStop
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Tu espacio seguro para prevenir el acoso escolar
        </Text>

        <View style={styles.buttonContainer}>
          <Link href="/(auth)/login" asChild>
            <Button style={styles.button}>
              Iniciar Sesión
            </Button>
          </Link>

          <Link href="/(auth)/register" asChild>
            <Button 
              style={styles.button}
              variant="secondary"
            >
              Registrarse
            </Button>
          </Link>
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
    alignItems: 'center',
  },
  icon: {
    marginBottom: 30,
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
    marginBottom: 40,
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    width: '100%',
  },
}); 