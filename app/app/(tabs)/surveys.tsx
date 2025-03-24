import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type Survey = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: string;
};

export default function SurveysScreen() {
  const { colors } = useTheme();
  const [surveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Encuesta de Bienestar Semanal',
      description: 'Ayúdanos a entender cómo te sientes esta semana',
      status: 'pending',
      dueDate: '2024-03-25',
    },
    {
      id: '2',
      title: 'Evaluación de Clima Escolar',
      description: 'Tu opinión es importante para mejorar el ambiente escolar',
      status: 'completed',
      dueDate: '2024-03-20',
    },
  ]);

  const handleSurveyPress = (survey: Survey) => {
    if (survey.status === 'completed') {
      Alert.alert(
        'Encuesta Completada',
        'Ya has completado esta encuesta. Gracias por tu participación.',
        [{ text: 'OK' }]
      );
      return;
    }

    // TODO: Navigate to survey detail screen
    console.log('Navigating to survey:', survey.id);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Encuestas
          </Text>
          <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
            Completa las encuestas para ayudarnos a mejorar
          </Text>
        </View>

        <View style={styles.surveyList}>
          {surveys.map((survey) => (
            <TouchableOpacity
              key={survey.id}
              style={[
                styles.surveyCard,
                { 
                  backgroundColor: colors.card,
                  opacity: survey.status === 'completed' ? 0.7 : 1,
                }
              ]}
              onPress={() => handleSurveyPress(survey)}
            >
              <View style={styles.surveyHeader}>
                <View style={styles.surveyTitleContainer}>
                  <Text style={[styles.surveyTitle, { color: colors.text }]}>
                    {survey.title}
                  </Text>
                  <View style={[
                    styles.statusBadge,
                    { 
                      backgroundColor: survey.status === 'completed' 
                        ? colors.primary + '20'
                        : '#FF444420'
                    }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { 
                        color: survey.status === 'completed'
                          ? colors.primary
                          : '#FF4444'
                      }
                    ]}>
                      {survey.status === 'completed' ? 'Completada' : 'Pendiente'}
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons 
                  name="chevron-right" 
                  size={24} 
                  color={colors.text + '80'} 
                />
              </View>

              <Text style={[styles.surveyDescription, { color: colors.text + '80' }]}>
                {survey.description}
              </Text>

              <View style={styles.surveyFooter}>
                <View style={styles.dateContainer}>
                  <MaterialCommunityIcons 
                    name="calendar" 
                    size={16} 
                    color={colors.text + '80'} 
                  />
                  <Text style={[styles.dateText, { color: colors.text + '80' }]}>
                    Fecha límite: {new Date(survey.dueDate).toLocaleDateString()}
                  </Text>
                </View>
                {survey.status === 'pending' && (
                  <TouchableOpacity 
                    style={[styles.startButton, { backgroundColor: colors.primary }]}
                    onPress={() => handleSurveyPress(survey)}
                  >
                    <Text style={styles.startButtonText}>
                      Comenzar
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  surveyList: {
    gap: 15,
  },
  surveyCard: {
    padding: 15,
    borderRadius: 12,
  },
  surveyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  surveyTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  surveyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  surveyDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  surveyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dateText: {
    fontSize: 12,
  },
  startButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
}); 