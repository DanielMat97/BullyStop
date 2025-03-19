import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'guide' | 'contact';
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  url?: string;
};

export default function ResourcesScreen() {
  const { colors } = useTheme();
  const [resources] = useState<Resource[]>([
    {
      id: '1',
      title: '¿Qué es el Acoso Escolar?',
      description: 'Aprende a identificar los diferentes tipos de acoso y sus consecuencias',
      type: 'video',
      icon: 'play-circle',
      color: '#008000',
      url: 'https://example.com/video1',
    },
    {
      id: '2',
      title: 'Guía de Prevención',
      description: 'Consejos prácticos para prevenir y actuar ante situaciones de acoso',
      type: 'guide',
      icon: 'book-open-variant',
      color: '#556B2F',
      url: 'https://example.com/guide1',
    },
    {
      id: '3',
      title: 'Artículos Educativos',
      description: 'Lecturas recomendadas sobre el acoso escolar y su impacto',
      type: 'article',
      icon: 'newspaper-variant',
      color: '#007A33',
      url: 'https://example.com/articles',
    },
    {
      id: '4',
      title: 'Contactos de Ayuda',
      description: 'Organizaciones y profesionales especializados en acoso escolar',
      type: 'contact',
      icon: 'phone',
      color: '#008000',
      url: 'https://example.com/contacts',
    },
  ]);

  const handleResourcePress = (resource: Resource) => {
    if (resource.url) {
      Linking.openURL(resource.url);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Recursos Educativos
          </Text>
          <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
            Materiales para aprender y prevenir el acoso escolar
          </Text>
        </View>

        <View style={styles.resourceList}>
          {resources.map((resource) => (
            <TouchableOpacity
              key={resource.id}
              style={[styles.resourceCard, { backgroundColor: colors.card }]}
              onPress={() => handleResourcePress(resource)}
            >
              <View style={[styles.iconContainer, { backgroundColor: resource.color + '20' }]}>
                <MaterialCommunityIcons 
                  name={resource.icon} 
                  size={24} 
                  color={resource.color} 
                />
              </View>
              <View style={styles.resourceContent}>
                <Text style={[styles.resourceTitle, { color: colors.text }]}>
                  {resource.title}
                </Text>
                <Text style={[styles.resourceDescription, { color: colors.text + '80' }]}>
                  {resource.description}
                </Text>
              </View>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color={colors.text + '80'} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.emergencySection, { backgroundColor: '#00800020' }]}>
          <MaterialCommunityIcons 
            name="alert-circle" 
            size={32} 
            color="#008000" 
            style={styles.emergencyIcon}
          />
          <Text style={[styles.emergencyTitle, { color: '#008000' }]}>
            ¿Necesitas ayuda inmediata?
          </Text>
          <Text style={[styles.emergencyText, { color: colors.text }]}>
            Si estás experimentando acoso escolar, no dudes en usar el botón de pánico o contactar a las autoridades.
          </Text>
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: '#008000' }]}
            onPress={() => router.push('/(tabs)/panic')}
          >
            <Text style={styles.emergencyButtonText}>
              Ir al Botón de Pánico
            </Text>
          </TouchableOpacity>
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
  resourceList: {
    gap: 15,
    marginBottom: 30,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 15,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
  },
  emergencySection: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  emergencyIcon: {
    marginBottom: 10,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emergencyText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  emergencyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
}); 