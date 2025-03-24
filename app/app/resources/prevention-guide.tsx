import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

type PreventionStep = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export default function PreventionGuideScreen() {
  const { colors } = useTheme();
  
  const preventionSteps: PreventionStep[] = [
    {
      id: '1',
      title: 'Capacitación y formación',
      description: 'Entrenar a los docentes y al personal escolar para identificar y actuar ante los primeros indicios de acoso.',
      icon: 'school',
    },
    {
      id: '2',
      title: 'Comunicación abierta',
      description: 'Fomentar espacios de diálogo entre estudiantes, profesores y familias para que cualquier situación conflictiva pueda ser abordada de manera oportuna.',
      icon: 'forum',
    },
    {
      id: '3',
      title: 'Promoción de valores',
      description: 'Desarrollar programas que refuercen la autoestima, el respeto por la diversidad y la convivencia pacífica.',
      icon: 'heart',
    },
    {
      id: '4',
      title: 'Protocolos de actuación',
      description: 'Establecer procedimientos claros para reportar, investigar y resolver casos de acoso escolar, garantizando la protección y el bienestar de todas las partes involucradas.',
      icon: 'clipboard-list',
    },
  ];
  
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
            Guía de Prevención
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            La prevención del acoso escolar es una labor colectiva que involucra a docentes, padres, estudiantes y toda la comunidad educativa. Una guía de prevención bien estructurada propone la implementación de protocolos claros, actividades de sensibilización y estrategias que fortalezcan el clima de respeto y empatía dentro de las instituciones.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Prácticas Recomendadas
          </Text>
          
          {preventionSteps.map((step) => (
            <View 
              key={step.id} 
              style={[styles.stepCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.stepIconContainer}>
                <MaterialCommunityIcons 
                  name={step.icon} 
                  size={32} 
                  color="#008000" 
                />
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>
                  {step.title}
                </Text>
                <Text style={[styles.stepDescription, { color: colors.text + '99' }]}>
                  {step.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Mejores Prácticas para Instituciones
          </Text>
          
          <View style={[styles.practiceCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.practiceTitle, { color: colors.text }]}>
              1. Establecer un comité de convivencia escolar
            </Text>
            <Text style={[styles.practiceText, { color: colors.text + '99' }]}>
              Conformado por representantes de estudiantes, docentes, padres y directivos que supervisen y coordinen las estrategias de prevención.
            </Text>
          </View>
          
          <View style={[styles.practiceCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.practiceTitle, { color: colors.text }]}>
              2. Implementar un sistema de reporte anónimo
            </Text>
            <Text style={[styles.practiceText, { color: colors.text + '99' }]}>
              Crear canales seguros para que las víctimas o testigos puedan reportar situaciones de acoso sin temor a represalias.
            </Text>
          </View>
          
          <View style={[styles.practiceCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.practiceTitle, { color: colors.text }]}>
              3. Realizar actividades de sensibilización
            </Text>
            <Text style={[styles.practiceText, { color: colors.text + '99' }]}>
              Organizar talleres, charlas y campañas que promuevan el respeto, la empatía y la no violencia entre los estudiantes.
            </Text>
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
              Instituto Colombiano de Bienestar Familiar
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
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  stepCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  stepIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00800015',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  practiceCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  practiceText: {
    fontSize: 15,
    lineHeight: 22,
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