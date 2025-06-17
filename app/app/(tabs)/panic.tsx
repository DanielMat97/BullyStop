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
        setLocationError('Se requieren permisos de ubicación para triangulación táctica');
        
        // Preguntar al usuario si desea habilitarlos
        Alert.alert(
          'Autorización de Ubicación',
          'El protocolo SITAB requiere geolocalización para triangulación efectiva.',
          [
            {
              text: 'Autorizar',
              onPress: () => checkLocationPermission(),
            },
            {
              text: 'Configurar',
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
      setLocationError('No se pudo verificar autorización de ubicación');
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
      console.error('Error en triangulación:', error);
      setLocationError('No se pudo establecer triangulación actual');
      return null;
    }
  };

  // Animación del botón de alerta
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

  // Función principal para activar alerta táctica
  const handleTacticalAlert = async () => {
    if (!user || !token) {
      Alert.alert('Error de Autenticación', 'Debe identificarse para activar protocolo SITAB');
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
          'Autorización de Ubicación',
          'El protocolo SITAB requiere geolocalización para triangulación efectiva.',
          [
            {
              text: 'Autorizar',
              onPress: async () => {
                // Verificar los permisos y obtener el resultado directamente
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                  setIsLocationPermissionGranted(true);
                  // Intentar de nuevo activar la alerta si se otorgaron los permisos
                  handleTacticalAlert();
                } else {
                  Alert.alert(
                    'Autorización Denegada',
                    'No se puede activar alerta sin triangulación.',
                    [
                      {
                        text: 'Configurar',
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
              text: 'Configurar',
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
        throw new Error('No se pudo establecer triangulación para el protocolo');
      }

      // Preparar los datos de la alerta según el DTO esperado
      const alertData: PanicAlertDto = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        userId: user.id,
      };

      console.log('Activando alerta táctica SITAB:', alertData);

      // Enviar alerta usando el servicio de API
      const response = await panicAlertApi.sendPanicAlert(alertData, token);

      console.log('Respuesta del comando:', response);
      
      // Mostrar confirmación y opciones
      Alert.alert(
        'Alerta Táctica Activada',
        'Protocolo SITAB iniciado. Unidades notificadas.',
        [
          {
            text: 'Contactar Comando',
            onPress: () => callEmergencyServices(),
          },
          {
            text: 'Comunicar Institución',
            onPress: () => contactSchool(),
          },
          {
            text: 'Entendido',
            style: 'default',
          },
        ]
      );
    } catch (error) {
      console.error('Error en protocolo SITAB:', error);
      Alert.alert(
        'Error en Protocolo',
        `No se pudo activar alerta táctica: ${error instanceof Error ? error.message : 'Error del sistema'}`
      );
    } finally {
      setLoading(false);
    }
  };

  const callEmergencyServices = () => {
    makePhoneCall(EMERGENCY_NUMBERS.GENERAL, 'Comando de Emergencias');
  };

  const contactSchool = () => {
    makePhoneCall(EMERGENCY_NUMBERS.SCHOOL, 'Comando Institucional');
  };

  const makePhoneCall = (phoneNumber: string, destination: string) => {
    const phoneURL = `tel:${phoneNumber}`;
    
    Linking.canOpenURL(phoneURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneURL);
        } else {
          Alert.alert(
            'Error de Comunicación',
            `No se puede contactar ${destination}. Número: ${phoneNumber}`
          );
        }
      })
      .catch((error) => {
        console.error('Error al intentar llamar:', error);
        Alert.alert(
          'Error del Sistema',
          'No se pudo establecer comunicación telefónica'
        );
      });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="shield-alert"
            size={80}
            color={colors.primary}
            style={styles.headerIcon}
          />
          <Text style={[styles.title, { color: colors.text }]}>
            Alerta Táctica SITAB
          </Text>
          <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
            🛡️ Preparación Táctica - Protocolo de Emergencia
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons
              name="map-marker"
              size={24}
              color={isLocationPermissionGranted ? '#388E3C' : '#FFC107'}
            />
            <Text style={[styles.statusText, { color: colors.text }]}>
              Triangulación: {isLocationPermissionGranted ? 'Operativa' : 'Pendiente'}
            </Text>
          </View>
          
          <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons
              name="account-check"
              size={24}
              color={user ? '#388E3C' : '#D32F2F'}
            />
            <Text style={[styles.statusText, { color: colors.text }]}>
              Identificación: {user ? 'Verificada' : 'Requerida'}
            </Text>
          </View>
        </View>

        {locationError && (
          <View style={[styles.errorContainer, { backgroundColor: '#FFC107' + '20' }]}>
            <MaterialCommunityIcons
              name="alert-octagon"
              size={20}
              color="#FFC107"
            />
            <Text style={[styles.errorText, { color: '#FFC107' }]}>
              {locationError}
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[
                styles.alertButton,
                {
                  backgroundColor: colors.error,
                  opacity: loading ? 0.7 : 1,
                },
              ]}
              onPress={handleTacticalAlert}
              disabled={loading}
            >
              <MaterialCommunityIcons
                name="shield-alert"
                size={40}
                color={colors.white}
              />
              <Text style={[styles.alertButtonText, { color: colors.white }]}>
                {loading ? 'ACTIVANDO...' : 'ACTIVAR ALERTA'}
              </Text>
              <Text style={[styles.alertButtonSubtext, { color: colors.white }]}>
                Protocolo de Emergencia
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.instructionsContainer}>
          <Text style={[styles.instructionsTitle, { color: colors.text }]}>
            Protocolo SEA Policía
          </Text>
          <View style={styles.instructionItem}>
            <Text style={[styles.instructionEmoji]}>🫡</Text>
            <Text style={[styles.instructionText, { color: colors.text }]}>
              <Text style={{ fontWeight: 'bold' }}>Saludar:</Text> Mantener calma y postura profesional
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={[styles.instructionEmoji]}>👂</Text>
            <Text style={[styles.instructionText, { color: colors.text }]}>
              <Text style={{ fontWeight: 'bold' }}>Escuchar:</Text> Evaluar amenazas y obtener información
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={[styles.instructionEmoji]}>⚡</Text>
            <Text style={[styles.instructionText, { color: colors.text }]}>
              <Text style={{ fontWeight: 'bold' }}>Actuar:</Text> Aplicar técnicas tácticas apropiadas
            </Text>
          </View>
        </View>

        <View style={styles.emergencyContainer}>
          <Text style={[styles.emergencyTitle, { color: colors.text }]}>
            Contactos de Comando
          </Text>
          <TouchableOpacity
            style={[styles.emergencyButton, { backgroundColor: colors.primary }]}
            onPress={callEmergencyServices}
          >
            <MaterialCommunityIcons name="phone" size={20} color={colors.white} />
            <Text style={[styles.emergencyButtonText, { color: colors.white }]}>
              Comando General: {EMERGENCY_NUMBERS.GENERAL}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.emergencyButton, { backgroundColor: colors.secondary }]}
            onPress={contactSchool}
          >
            <MaterialCommunityIcons name="school" size={20} color={colors.white} />
            <Text style={[styles.emergencyButtonText, { color: colors.white }]}>
              Comando Institucional: {EMERGENCY_NUMBERS.SCHOOL}
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerIcon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  statusCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  alertButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  alertButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  alertButtonSubtext: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  instructionEmoji: {
    fontSize: 20,
    width: 30,
  },
  instructionText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  emergencyContainer: {
    marginTop: 'auto',
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    gap: 8,
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 