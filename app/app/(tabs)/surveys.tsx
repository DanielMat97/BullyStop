import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuthContext } from '../../hooks/useAuthContext';
import { surveyApi, Survey } from '../../services/api';

type SurveyItemProps = {
  survey: Survey;
  onPress: () => void;
};

const SurveyCard = ({ survey, onPress }: SurveyItemProps) => {
  const { colors } = useTheme();

  const getComponentIcon = (title: string) => {
    if (title.toLowerCase().includes('mental') || title.toLowerCase().includes('estrés')) {
      return '🧠';
    } else if (title.toLowerCase().includes('comunicación') || title.toLowerCase().includes('asertiva')) {
      return '💬';
    } else if (title.toLowerCase().includes('táctica') || title.toLowerCase().includes('técnica')) {
      return '🛡️';
    }
    return '📋';
  };

  const getComponentColor = (title: string) => {
    if (title.toLowerCase().includes('mental')) {
      return '#0D47A1'; // Mental - Azul oscuro
    } else if (title.toLowerCase().includes('comunicación')) {
      return '#1976D2'; // Comunicativa - Azul claro
    } else if (title.toLowerCase().includes('táctica')) {
      return '#FFC107'; // Táctica - Amarillo
    }
    return colors.primary;
  };

  return (
    <TouchableOpacity
      style={[styles.surveyCard, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.surveyHeader}>
        <View style={styles.componentBadge}>
          <Text style={styles.componentEmoji}>{getComponentIcon(survey.title)}</Text>
          <Text style={[styles.componentLabel, { color: getComponentColor(survey.title) }]}>
            SITAB
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={colors.text + '60'}
        />
      </View>
      
      <Text style={[styles.surveyTitle, { color: colors.text }]}>
        {survey.title}
      </Text>
      
      <Text style={[styles.surveyDescription, { color: colors.text + '80' }]}>
        {survey.description}
      </Text>

      <View style={styles.surveyFooter}>
        <View style={[styles.statusBadge, { backgroundColor: getComponentColor(survey.title) + '20' }]}>
          <Text style={[styles.statusText, { color: getComponentColor(survey.title) }]}>
            Evaluación Operacional
          </Text>
        </View>
        <Text style={[styles.surveyMeta, { color: colors.text + '60' }]}>
          Preparación: {survey.title.toLowerCase().includes('mental') ? 'Mental' : 
                      survey.title.toLowerCase().includes('comunicación') ? 'Comunicativa' : 'Táctica'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function SurveysScreen() {
  const { colors } = useTheme();
  const { user, token } = useAuthContext();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    if (!token) {
      Alert.alert('Error de Autenticación', 'Debe identificarse para acceder a evaluaciones SITAB');
      return;
    }

    try {
      setLoading(true);
      console.log('Cargando evaluaciones SITAB...');
      
      const surveysList = await surveyApi.getSurveys(token);
      console.log('Evaluaciones obtenidas:', surveysList);
      
      setSurveys(surveysList);
    } catch (error) {
      console.error('Error al cargar evaluaciones:', error);
      Alert.alert(
        'Error del Sistema',
        'No se pudieron cargar las evaluaciones SITAB. Verifique su conexión.',
        [
          {
            text: 'Reintentar',
            onPress: () => loadSurveys(),
          },
          {
            text: 'Entendido',
            style: 'cancel',
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSurveyPress = (survey: Survey) => {
    console.log('Iniciando evaluación:', survey.title);
    // Navigate to survey detail/form screen
    router.push({
      pathname: '/survey/[id]',
      params: { id: survey.id.toString() }
    });
  };

  const renderSurveyItem = ({ item }: { item: Survey }) => (
    <SurveyCard 
      survey={item} 
      onPress={() => handleSurveyPress(item)} 
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons
        name="clipboard-text-search"
        size={80}
        color={colors.text + '40'}
      />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        Sin Evaluaciones Disponibles
      </Text>
      <Text style={[styles.emptyMessage, { color: colors.text + '80' }]}>
        No hay evaluaciones SITAB programadas en este momento.
        Consulte con el comando para más información.
      </Text>
      <TouchableOpacity
        style={[styles.retryButton, { backgroundColor: colors.primary }]}
        onPress={loadSurveys}
      >
        <MaterialCommunityIcons name="refresh" size={20} color="#FFFFFF" />
        <Text style={styles.retryButtonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Cargando evaluaciones SITAB...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name="clipboard-check"
            size={32}
            color={colors.primary}
          />
          <View style={styles.titleTextContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              Evaluaciones SITAB
            </Text>
            <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
              Sistema de Preparación Operacional
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.refreshButton, { backgroundColor: colors.card }]}
          onPress={loadSurveys}
        >
          <MaterialCommunityIcons name="refresh" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>
            Componentes de Preparación
          </Text>
          <View style={styles.componentsRow}>
            <View style={styles.componentItem}>
              <Text style={styles.componentEmoji}>🧠</Text>
              <Text style={[styles.componentText, { color: colors.text }]}>Mental</Text>
            </View>
            <View style={styles.componentItem}>
              <Text style={styles.componentEmoji}>💬</Text>
              <Text style={[styles.componentText, { color: colors.text }]}>Comunicativa</Text>
            </View>
            <View style={styles.componentItem}>
              <Text style={styles.componentEmoji}>🛡️</Text>
              <Text style={[styles.componentText, { color: colors.text }]}>Táctica</Text>
            </View>
          </View>
        </View>
      </View>

      <FlatList
        data={surveys}
        renderItem={renderSurveyItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  componentsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  componentItem: {
    alignItems: 'center',
  },
  componentEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  componentText: {
    fontSize: 12,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  surveyCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  surveyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  componentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  componentLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  surveyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  surveyDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  surveyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  surveyMeta: {
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
}); 