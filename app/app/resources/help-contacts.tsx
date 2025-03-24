import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

type ContactCategory = {
  id: string;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  contacts: Contact[];
};

type Contact = {
  id: string;
  name: string;
  description?: string;
  phone?: string;
  website?: string;
};

export default function HelpContactsScreen() {
  const { colors } = useTheme();
  
  const contactCategories: ContactCategory[] = [
    {
      id: '1',
      title: 'Organismos Oficiales',
      icon: 'bank',
      contacts: [
        {
          id: '101',
          name: 'Instituto Colombiano de Bienestar Familiar (ICBF)',
          description: 'Línea de protección a niños, niñas y adolescentes',
          phone: '141',
          website: 'https://www.icbf.gov.co',
        },
        {
          id: '102',
          name: 'Ministerio de Educación',
          description: 'Atención y recursos sobre convivencia escolar',
          phone: '018000910122',
          website: 'https://www.mineducacion.gov.co',
        },
        {
          id: '103',
          name: 'Policía de Infancia y Adolescencia',
          description: 'Protección y atención especializada',
          phone: '123',
        },
      ],
    },
    {
      id: '2',
      title: 'Apoyo Psicológico',
      icon: 'brain',
      contacts: [
        {
          id: '201',
          name: 'Línea Amiga de Salud Mental',
          description: 'Orientación psicológica gratuita',
          phone: '018000113113',
        },
        {
          id: '202',
          name: 'Centro de Atención Psicológica',
          description: 'Servicios de asesoría y acompañamiento',
          phone: '3211234567',
        },
      ],
    },
    {
      id: '3',
      title: 'Servicios Educativos',
      icon: 'school',
      contacts: [
        {
          id: '301',
          name: 'Comités Escolares de Convivencia',
          description: 'Solicita apoyo a través de tu institución educativa',
        },
        {
          id: '302',
          name: 'Secretarías de Educación',
          description: 'Departamentales y municipales',
          website: 'https://www.mineducacion.gov.co/portal/secciones/',
        },
      ],
    },
  ];
  
  const handlePhoneCall = (phoneNumber?: string, contactName?: string) => {
    if (!phoneNumber) {
      Alert.alert('Error', 'No hay número telefónico disponible');
      return;
    }
    
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
        console.error(`Error al intentar llamar a ${contactName}:`, err);
        Alert.alert('Error', `No se pudo iniciar la llamada`);
      });
  };
  
  const handleWebsitePress = (url?: string) => {
    if (!url) {
      Alert.alert('Error', 'No hay sitio web disponible');
      return;
    }
    
    Linking.openURL(url).catch((err) => {
      console.error('Error al abrir el sitio web:', err);
      Alert.alert('Error', 'No se pudo abrir el sitio web');
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color={colors.text} 
            />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            Contactos de Ayuda
          </Text>
        </View>
        
        <View style={styles.introSection}>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Cuando el acoso escolar se vuelve una situación insostenible, es fundamental contar con el apoyo de profesionales y organizaciones especializadas que puedan ofrecer asistencia integral. Los recursos de ayuda incluyen servicios de orientación psicológica, asesoría legal y protocolos de intervención inmediata.
          </Text>
          
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Si tú, un familiar o un conocido está sufriendo acoso escolar, no dudes en comunicarte con alguno de estos contactos:
          </Text>
        </View>
        
        {contactCategories.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <MaterialCommunityIcons 
                name={category.icon} 
                size={24} 
                color="#008000" 
              />
              <Text style={[styles.categoryTitle, { color: colors.text }]}>
                {category.title}
              </Text>
            </View>
            
            {category.contacts.map((contact) => (
              <View 
                key={contact.id} 
                style={[styles.contactCard, { backgroundColor: colors.card }]}
              >
                <Text style={[styles.contactName, { color: colors.text }]}>
                  {contact.name}
                </Text>
                
                {contact.description && (
                  <Text style={[styles.contactDescription, { color: colors.text + '99' }]}>
                    {contact.description}
                  </Text>
                )}
                
                <View style={styles.contactActions}>
                  {contact.phone && (
                    <TouchableOpacity 
                      style={[styles.actionButton, { backgroundColor: '#00800020' }]}
                      onPress={() => handlePhoneCall(contact.phone, contact.name)}
                    >
                      <MaterialCommunityIcons name="phone" size={18} color="#008000" />
                      <Text style={[styles.actionButtonText, { color: '#008000' }]}>
                        Llamar
                      </Text>
                    </TouchableOpacity>
                  )}
                  
                  {contact.website && (
                    <TouchableOpacity 
                      style={[styles.actionButton, { backgroundColor: '#00800020' }]}
                      onPress={() => handleWebsitePress(contact.website)}
                    >
                      <MaterialCommunityIcons name="web" size={18} color="#008000" />
                      <Text style={[styles.actionButtonText, { color: '#008000' }]}>
                        Sitio Web
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
        
        <View style={[styles.emergencySection, { backgroundColor: '#00800020' }]}>
          <MaterialCommunityIcons 
            name="alert-circle" 
            size={32} 
            color="#008000" 
          />
          <Text style={[styles.emergencyTitle, { color: colors.text }]}>
            En caso de emergencia
          </Text>
          <Text style={[styles.emergencyText, { color: colors.text + '99' }]}>
            Si te encuentras en una situación de peligro inmediato, no dudes en comunicarte con las autoridades locales a través de la línea de emergencia 123.
          </Text>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: '#008000' }]}
            onPress={() => handlePhoneCall('123', 'Emergencias')}
          >
            <MaterialCommunityIcons name="phone" size={20} color="white" />
            <Text style={styles.emergencyButtonText}>
              Llamar a Emergencias (123)
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.panicButton, { backgroundColor: '#008000' }]}
          onPress={() => router.push('/(tabs)/panic')}
        >
          <MaterialCommunityIcons name="alert" size={20} color="white" />
          <Text style={styles.panicButtonText}>
            Ir al Botón de Pánico
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  introSection: {
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  emergencySection: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  panicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    gap: 10,
  },
  panicButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 