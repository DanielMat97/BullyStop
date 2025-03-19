import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type QuickAction = {
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: '/(tabs)/panic' | '/(tabs)/surveys' | '/(tabs)/resources';
  color: string;
};

export default function HomeScreen() {
  const { colors } = useTheme();

  const quickActions: QuickAction[] = [
    {
      title: 'Botón de Pánico',
      description: 'Envía una alerta de emergencia',
      icon: 'alert-circle',
      route: '/(tabs)/panic',
      color: '#FF4444',
    },
    {
      title: 'Encuestas',
      description: 'Completa las encuestas de bienestar',
      icon: 'clipboard-list',
      route: '/(tabs)/surveys',
      color: '#4CAF50',
    },
    {
      title: 'Recursos',
      description: 'Accede a materiales de ayuda',
      icon: 'book-open-variant',
      route: '/(tabs)/resources',
      color: '#2196F3',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>
            Bienvenido a BullyStop
          </Text>
          <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
            Tu espacio seguro para prevenir el acoso escolar
          </Text>
        </View>

        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { backgroundColor: colors.card }]}
              onPress={() => router.push(action.route)}
            >
              <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
                <MaterialCommunityIcons name={action.icon} size={24} color={action.color} />
              </View>
              <View style={styles.actionContent}>
                <Text style={[styles.actionTitle, { color: colors.text }]}>
                  {action.title}
                </Text>
                <Text style={[styles.actionDescription, { color: colors.text + '80' }]}>
                  {action.description}
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

        <View style={[styles.statsContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.statsTitle, { color: colors.text }]}>
            Tu Bienestar
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.text + '80' }]}>
                Encuestas Completadas
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.text + '80' }]}>
                Alertas Enviadas
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.text + '80' }]}>
                Recursos Revisados
              </Text>
            </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  quickActions: {
    gap: 15,
    marginBottom: 30,
  },
  actionCard: {
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
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
  },
  statsContainer: {
    padding: 20,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
}); 