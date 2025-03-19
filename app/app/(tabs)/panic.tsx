import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PanicScreen() {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));

  const handlePanicPress = async () => {
    try {
      setLoading(true);
      
      // Animate button press
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // TODO: Implement API call to send panic alert
      // const response = await fetch('http://localhost:3000/alerts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     type: 'panic',
      //     timestamp: new Date().toISOString(),
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Error al enviar la alerta');
      // }

      Alert.alert(
        'Alerta Enviada',
        'Se ha notificado a las autoridades y contactos de emergencia.',
        [
          {
            text: 'Llamar a Emergencias',
            onPress: () => {
              // TODO: Implement emergency call
              console.log('Calling emergency services...');
            },
          },
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la alerta. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Botón de Pánico
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
          Presiona el botón si necesitas ayuda inmediata
        </Text>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.panicButton, { backgroundColor: '#FF4444' }]}
            onPress={handlePanicPress}
            disabled={loading}
          >
            <MaterialCommunityIcons 
              name="alert-circle" 
              size={64} 
              color="white" 
            />
            <Text style={styles.panicButtonText}>
              {loading ? 'Enviando...' : 'ENVIAR ALERTA'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.emergencyContacts}>
          <Text style={[styles.contactsTitle, { color: colors.text }]}>
            Contactos de Emergencia
          </Text>
          
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: colors.card }]}
            onPress={() => {
              // TODO: Implement emergency call
              console.log('Calling emergency services...');
            }}
          >
            <MaterialCommunityIcons 
              name="phone" 
              size={24} 
              color="#FF4444" 
            />
            <Text style={[styles.contactText, { color: colors.text }]}>
              Llamar a Emergencias (123)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: colors.card }]}
            onPress={() => {
              // TODO: Implement school contact
              console.log('Calling school...');
            }}
          >
            <MaterialCommunityIcons 
              name="school" 
              size={24} 
              color="#FF4444" 
            />
            <Text style={[styles.contactText, { color: colors.text }]}>
              Contactar Escuela
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
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
    marginBottom: 40,
  },
  panicButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  panicButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emergencyContacts: {
    width: '100%',
    gap: 15,
  },
  contactsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 15,
  },
  contactText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 