import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Button } from '../../components/ui/button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
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
            <Button 
              style={styles.button}
              onPress={() => router.push('/(auth)/login')}
            >
              Iniciar Sesión
            </Button>

            <Button 
              style={styles.button}
              variant="secondary"
              onPress={() => router.push('/(auth)/register')}
            >
              Registrarse
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
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