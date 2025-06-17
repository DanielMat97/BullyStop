import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

type ResourceCategory = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  component: string;
  route?: string;
  items: ResourceItem[];
};

type ResourceItem = {
  title: string;
  description: string;
  type: 'document' | 'video' | 'external' | 'internal';
  url?: string;
  route?: string;
};

export default function ResourcesScreen() {
  const { colors } = useTheme();

  const resourceCategories: ResourceCategory[] = [
    {
      id: 'mental',
      title: 'Preparación Mental',
      description: 'Gestión del estrés operacional y control emocional',
      icon: 'brain',
      color: '#0D47A1',
      component: '🧠',
      items: [
        {
          title: 'Técnicas de Control de Estrés',
          description: 'Métodos para mantener la calma bajo presión operacional',
          type: 'document',
        },
        {
          title: 'Toma de Decisiones Críticas',
          description: 'Procesos para decisiones rápidas y efectivas',
          type: 'document',
        },
        {
          title: 'Resiliencia Operacional',
          description: 'Fortalecimiento mental para situaciones adversas',
          type: 'video',
        },
        {
          title: 'Protocolo de Autoevaluación Mental',
          description: 'Herramientas para monitorear estado mental',
          type: 'internal',
          route: '/resources/mental-assessment',
        },
      ],
    },
    {
      id: 'comunicativa',
      title: 'Preparación Comunicativa',
      description: 'Técnicas de comunicación asertiva y negociación',
      icon: 'account-voice',
      color: '#1976D2',
      component: '💬',
      items: [
        {
          title: 'Comunicación Asertiva',
          description: 'Técnicas para comunicación efectiva en situaciones tensas',
          type: 'document',
        },
        {
          title: 'Manejo de Crisis',
          description: 'Protocolos de comunicación durante emergencias',
          type: 'document',
        },
        {
          title: 'Técnicas de Negociación',
          description: 'Métodos para resolución pacífica de conflictos',
          type: 'video',
        },
        {
          title: 'Protocolo SEA Policía',
          description: 'Saludar, Escuchar, Actuar - Guía completa',
          type: 'internal',
          route: '/resources/sea-protocol',
        },
      ],
    },
    {
      id: 'tactica',
      title: 'Preparación Táctica',
      description: 'Operaciones tácticas y técnicas de campo',
      icon: 'shield-check',
      color: '#FFC107',
      component: '🛡️',
      items: [
        {
          title: 'Técnica de Triangulación',
          description: 'Posicionamiento estratégico en operaciones',
          type: 'document',
        },
        {
          title: 'Registro por Cuadrantes',
          description: 'Metodología sistemática de inspección',
          type: 'document',
        },
        {
          title: 'Técnica de Vistazos',
          description: 'Observación táctica y evaluación de amenazas',
          type: 'video',
        },
        {
          title: 'Ingreso a Recintos',
          description: 'Protocolos de entrada segura a instalaciones',
          type: 'document',
        },
        {
          title: 'Simulador Táctico',
          description: 'Entrenamiento virtual de escenarios',
          type: 'internal',
          route: '/resources/tactical-simulator',
        },
      ],
    },
  ];

  const handleResourcePress = (item: ResourceItem) => {
    if (item.type === 'internal' && item.route) {
      router.push(item.route as any);
    } else if (item.type === 'external' && item.url) {
      Linking.openURL(item.url).catch(() => {
        Alert.alert('Error', 'No se pudo abrir el enlace');
      });
    } else {
      Alert.alert(
        'Recurso No Disponible',
        'Este recurso estará disponible próximamente.',
        [{ text: 'Entendido', style: 'default' }]
      );
    }
  };

  const handleCategoryPress = (category: ResourceCategory) => {
    if (category.route) {
      router.push(category.route as any);
    }
  };

  const getResourceIcon = (type: ResourceItem['type']) => {
    switch (type) {
      case 'document':
        return 'file-document';
      case 'video':
        return 'play-circle';
      case 'external':
        return 'open-in-new';
      case 'internal':
        return 'application';
      default:
        return 'file';
    }
  };

  const renderResourceItem = (item: ResourceItem, categoryColor: string) => (
    <TouchableOpacity
      key={item.title}
      style={[styles.resourceItem, { backgroundColor: colors.card }]}
      onPress={() => handleResourcePress(item)}
    >
      <View style={styles.resourceHeader}>
        <MaterialCommunityIcons
          name={getResourceIcon(item.type)}
          size={20}
          color={categoryColor}
        />
        <Text style={[styles.resourceTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          color={colors.text + '60'}
        />
      </View>
      <Text style={[styles.resourceDescription, { color: colors.text + '80' }]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const renderCategory = (category: ResourceCategory) => (
    <View key={category.id} style={styles.categoryContainer}>
      <TouchableOpacity
        style={[styles.categoryHeader, { backgroundColor: colors.card }]}
        onPress={() => handleCategoryPress(category)}
      >
        <View style={styles.categoryTitleContainer}>
          <View
            style={[
              styles.categoryIconContainer,
              { backgroundColor: category.color + '20' },
            ]}
          >
            <Text style={styles.categoryEmoji}>{category.component}</Text>
          </View>
          <View style={styles.categoryTextContainer}>
            <Text style={[styles.categoryTitle, { color: colors.text }]}>
              {category.title}
            </Text>
            <Text style={[styles.categoryDescription, { color: colors.text + '80' }]}>
              {category.description}
            </Text>
          </View>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
          <Text style={[styles.categoryBadgeText, { color: category.color }]}>
            {category.items.length} recursos
          </Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.resourcesList}>
        {category.items.map(item => renderResourceItem(item, category.color))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={32}
              color={colors.primary}
            />
            <View style={styles.titleTextContainer}>
              <Text style={[styles.title, { color: colors.text }]}>
                Manual Táctico SITAB
              </Text>
              <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
                Recursos de Preparación Operacional
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              Sistema Táctico Básico Policial
            </Text>
            <Text style={[styles.infoDescription, { color: colors.text + '80' }]}>
              Recursos organizados en los tres componentes fundamentales para la 
              preparación operacional: Mental, Comunicativa y Táctica.
            </Text>
            
            <View style={styles.principlesContainer}>
              <Text style={[styles.principlesTitle, { color: colors.text }]}>
                Principios SEA Policía:
              </Text>
              <View style={styles.principlesList}>
                <View style={styles.principleItem}>
                  <Text style={styles.principleEmoji}>🫡</Text>
                  <Text style={[styles.principleText, { color: colors.text }]}>
                    <Text style={{ fontWeight: 'bold' }}>Saludar:</Text> Aproximación respetuosa
                  </Text>
                </View>
                <View style={styles.principleItem}>
                  <Text style={styles.principleEmoji}>👂</Text>
                  <Text style={[styles.principleText, { color: colors.text }]}>
                    <Text style={{ fontWeight: 'bold' }}>Escuchar:</Text> Comprensión activa
                  </Text>
                </View>
                <View style={styles.principleItem}>
                  <Text style={styles.principleEmoji}>⚡</Text>
                  <Text style={[styles.principleText, { color: colors.text }]}>
                    <Text style={{ fontWeight: 'bold' }}>Actuar:</Text> Intervención efectiva
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {resourceCategories.map(renderCategory)}
        </View>

        <View style={styles.footer}>
          <View style={[styles.footerCard, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons
              name="information"
              size={24}
              color={colors.primary}
            />
            <Text style={[styles.footerText, { color: colors.text + '80' }]}>
              Los recursos se actualizan continuamente según los protocolos 
              operacionales vigentes. Para consultas específicas, contacte 
              con el comando correspondiente.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  infoContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  principlesContainer: {
    marginTop: 8,
  },
  principlesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  principlesList: {
    gap: 6,
  },
  principleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  principleEmoji: {
    fontSize: 16,
    width: 24,
  },
  principleText: {
    fontSize: 13,
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 20,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  resourcesList: {
    paddingLeft: 16,
    gap: 8,
  },
  resourceItem: {
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#E0E0E0',
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  resourceDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 28,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  footerCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  footerText: {
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
  },
}); 