import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Linking, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../hooks/useAuthContext';
import * as Location from 'expo-location';
import { panicAlertApi, PanicAlertDto } from '../../services/api';

// Números de teléfono para emergencias
const EMERGENCY_NUMBERS = {
  GENERAL: '123',       // Número general de emergencias en Colombia
  SCHOOL: '3108411043', // Ejemplo - debe ser configurado según la escuela
};

export default function PanicScreen() {
  const { colors } = useTheme();
  const { user, token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);

  // Solicitar y verificar permisos de ubicación al cargar la pantalla
  useEffect(() => {
    checkLocationPermission();
  }, []);

  // Función para verificar permisos de ubicación
  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const permissionGranted = status === 'granted';
      setIsLocationPermissionGranted(permissionGranted);
      
      if (permissionGranted) {
        updateLocation();
      } else {
        setLocationError('Se requiere permiso de ubicación para enviar alertas precisas');
        
        // Preguntar al usuario si desea habilitarlos
        Alert.alert(
          'Permisos de Ubicación',
          'Esta función requiere acceso a tu ubicación para enviar alertas precisas.',
          [
            {
              text: 'Volver a intentar',
              onPress: () => checkLocationPermission(),
            },
            {
              text: 'Ir a Configuración',
              onPress: () => openSettings(),
            },
            {
              text: 'Cancelar',
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error al verificar permisos de ubicación:', error);
      setLocationError('No se pudo verificar los permisos de ubicación');
    }
  };

  // Función para abrir configuración del dispositivo
  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  // Función para actualizar la ubicación
  const updateLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation);
      return currentLocation;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      setLocationError('No se pudo obtener tu ubicación actual');
      return null;
    }
  };

  // Animación del botón de pánico
  const animateButton = () => {
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
  };

  // Función principal para enviar alerta de pánico
  const handlePanicPress = async () => {
    if (!user || !token) {
      Alert.alert('Error', 'Debes iniciar sesión para usar esta función');
      return;
    }

    try {
      setLoading(true);
      animateButton();

      // Verificar permisos de ubicación si aún no se han verificado
      if (!isLocationPermissionGranted) {
        setLoading(false); // Detener el loading mientras se resuelven los permisos
        
        // Ofrecer opciones al usuario para habilitar permisos
        Alert.alert(
          'Permisos de Ubicación',
          'Esta función requiere acceso a tu ubicación para enviar alertas precisas.',
          [
            {
              text: 'Aceptar Permisos',
              onPress: async () => {
                // Verificar los permisos y obtener el resultado directamente
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                  setIsLocationPermissionGranted(true);
                  // Intentar de nuevo enviar la alerta si se otorgaron los permisos
                  handlePanicPress();
                } else {
                  Alert.alert(
                    'Permisos Denegados',
                    'No se puede enviar la alerta sin acceso a tu ubicación.',
                    [
                      {
                        text: 'Ir a Configuración',
                        onPress: () => openSettings(),
                      },
                      {
                        text: 'Entendido',
                        style: 'cancel',
                      },
                    ]
                  );
                }
              },
            },
            {
              text: 'Ir a Configuración',
              onPress: () => openSettings(),
            },
            {
              text: 'Cancelar',
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
        return;
      }

      // Actualizar ubicación antes de enviar la alerta
      const currentLocation = await updateLocation();
      
      if (!currentLocation) {
        throw new Error('No se pudo obtener tu ubicación actual');
      }

      // Preparar los datos de la alerta según el DTO esperado
      const alertData: PanicAlertDto = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        userId: user.id,
      };

      console.log('Enviando alerta de pánico:', alertData);

      // Enviar alerta usando el servicio de API
      const response = await panicAlertApi.sendPanicAlert(alertData, token);

      console.log('Respuesta del servidor:', response);
      
      // Mostrar confirmación y opciones
      Alert.alert(
        'Alerta Enviada',
        'Se ha notificado a las autoridades y contactos de emergencia.',
        [
          {
            text: 'Llamar a Emergencias',
            onPress: () => callEmergencyServices(),
          },
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      console.error('Error al enviar alerta de pánico:', error);
      Alert.alert(
        'Error',
        'No se pudo enviar la alerta. Por favor intenta de nuevo o contacta directamente a emergencias.',
        [
          {
            text: 'Llamar a Emergencias',
            onPress: () => callEmergencyServices(),
          },
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  // Función para llamar a servicios de emergencia
  const callEmergencyServices = () => {
    const emergencyNumber = EMERGENCY_NUMBERS.GENERAL;
    makePhoneCall(emergencyNumber, 'servicios de emergencia');
  };

  // Función para contactar a la escuela
  const contactSchool = () => {
    const schoolNumber = EMERGENCY_NUMBERS.SCHOOL;
    makePhoneCall(schoolNumber, 'la escuela');
  };

  // Función reutilizable para realizar llamadas
  const makePhoneCall = (phoneNumber: string, destination: string) => {
    const url = `tel:${phoneNumber}`;
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', `No se puede realizar llamadas a ${phoneNumber}`);
        }
      })
      .catch((err) => {
        console.error(`Error al intentar llamar a ${destination}:`, err);
        Alert.alert('Error', `No se pudo iniciar la llamada a ${destination}`);
      });
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

        {locationError && (
          <Text style={[styles.locationError, { color: '#FF3B30' }]}>
            ⚠️ {locationError}
          </Text>
        )}

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.panicButton, { backgroundColor: '#008000' }]}
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
            onPress={callEmergencyServices}
          >
            <MaterialCommunityIcons 
              name="phone" 
              size={24} 
              color="#008000" 
            />
            <Text style={[styles.contactText, { color: colors.text }]}>
              Llamar a Emergencias ({EMERGENCY_NUMBERS.GENERAL})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: colors.card }]}
            onPress={contactSchool}
          >
            <MaterialCommunityIcons 
              name="school" 
              size={24} 
              color="#008000" 
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
  locationError: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
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