import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function AboutBullyingScreen() {
  const { colors } = useTheme();
  
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
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
            ¿Qué es el Acoso Escolar?
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Definición
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            El acoso escolar, o bullying, es un fenómeno complejo que se manifiesta a través de comportamientos agresivos, repetitivos e intencionados, dirigidos a causar daño físico, emocional o psicológico a uno o varios estudiantes.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Manifestaciones
          </Text>
          <View style={styles.manifestations}>
            {[
              { icon: 'hand-right' as keyof typeof MaterialCommunityIcons.glyphMap, text: 'Agresiones físicas' },
              { icon: 'comment-text' as keyof typeof MaterialCommunityIcons.glyphMap, text: 'Insultos y humillaciones' },
              { icon: 'account-group' as keyof typeof MaterialCommunityIcons.glyphMap, text: 'Exclusión social' },
              { icon: 'message-alert' as keyof typeof MaterialCommunityIcons.glyphMap, text: 'Amenazas' },
              { icon: 'cellphone' as keyof typeof MaterialCommunityIcons.glyphMap, text: 'Ciberacoso' },
            ].map((item, index) => (
              <View key={index} style={[styles.manifestationItem, { backgroundColor: colors.card }]}>
                <MaterialCommunityIcons name={item.icon} size={24} color="#008000" />
                <Text style={[styles.manifestationText, { color: colors.text }]}>
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Efectos del Acoso
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Los efectos del acoso pueden ser devastadores, afectando la autoestima, la salud mental y el rendimiento académico de las víctimas, e incluso repercutiendo en su desarrollo social a largo plazo.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Señales de Alerta
          </Text>
          <View style={styles.alertList}>
            {[
              'Cambios repentinos en el comportamiento',
              'Retraimiento social',
              'Bajo rendimiento escolar',
              'Ansiedad y miedo',
              'Problemas para dormir',
              'Pérdida de interés en actividades',
            ].map((item, index) => (
              <View key={index} style={styles.alertItem}>
                <MaterialCommunityIcons name="alert-circle" size={16} color="#008000" />
                <Text style={[styles.alertText, { color: colors.text }]}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={[styles.resourcesSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recursos Oficiales
          </Text>
          
          <TouchableOpacity 
            style={styles.resourceLink}
            onPress={() => handleLinkPress('https://www.mineducacion.gov.co')}
          >
            <MaterialCommunityIcons name="web" size={20} color="#008000" />
            <Text style={[styles.resourceLinkText, { color: '#008000' }]}>
              Ministerio de Educación de Colombia
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceLink}
            onPress={() => handleLinkPress('https://www.icbf.gov.co')}
          >
            <MaterialCommunityIcons name="web" size={20} color="#008000" />
            <Text style={[styles.resourceLinkText, { color: '#008000' }]}>
              Instituto Colombiano de Bienestar Familiar (ICBF)
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceLink}
            onPress={() => handleLinkPress('https://scielo.org/')}
          >
            <MaterialCommunityIcons name="book-open-variant" size={20} color="#008000" />
            <Text style={[styles.resourceLinkText, { color: '#008000' }]}>
              Biblioteca científica SciELO
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.helpButton, { backgroundColor: '#008000' }]}
          onPress={() => router.push('/(tabs)/panic')}
        >
          <MaterialCommunityIcons name="lifebuoy" size={20} color="white" />
          <Text style={styles.helpButtonText}>
            ¿Necesitas Ayuda?
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  manifestations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  manifestationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 8,
    width: '48%',
  },
  manifestationText: {
    fontSize: 14,
    flex: 1,
  },
  alertList: {
    gap: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertText: {
    fontSize: 15,
    flex: 1,
  },
  resourcesSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  resourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  resourceLinkText: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    gap: 10,
  },
  helpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 