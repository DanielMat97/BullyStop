import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Button } from '../../components/ui/button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={[styles.heroCard, { backgroundColor: colors.card }]}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <MaterialCommunityIcons 
                name="shield-account" 
                size={64} 
                color={colors.primary}
              />
            </View>
            
            <Text style={[styles.title, { color: colors.text }]}>
              Sistema Táctico Básico Policial
            </Text>
            
            <Text style={[styles.acronym, { color: colors.primary }]}>
              SITAB
            </Text>
            
            <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
              Método de intervención de la Policía Nacional para actuación 
              preventiva, profesional y racional
            </Text>
          </View>

          {/* Components Overview */}
          <View style={[styles.componentsCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.componentsTitle, { color: colors.text }]}>
              Componentes de Preparación
            </Text>
            
            <View style={styles.componentsGrid}>
              <View style={styles.componentItem}>
                <Text style={styles.componentEmoji}>🧠</Text>
                <Text style={[styles.componentText, { color: colors.text }]}>
                  Mental
                </Text>
                <Text style={[styles.componentDesc, { color: colors.text + '70' }]}>
                  Control del estrés
                </Text>
              </View>
              
              <View style={styles.componentItem}>
                <Text style={styles.componentEmoji}>💬</Text>
                <Text style={[styles.componentText, { color: colors.text }]}>
                  Comunicativa
                </Text>
                <Text style={[styles.componentDesc, { color: colors.text + '70' }]}>
                  SEA Policía
                </Text>
              </View>
              
              <View style={styles.componentItem}>
                <Text style={styles.componentEmoji}>🛡️</Text>
                <Text style={[styles.componentText, { color: colors.text }]}>
                  Táctica
                </Text>
                <Text style={[styles.componentDesc, { color: colors.text + '70' }]}>
                  Triangulación
                </Text>
              </View>
            </View>
          </View>

          {/* Mission Statement */}
          <View style={[styles.missionCard, { backgroundColor: colors.primary + '15' }]}>
            <MaterialCommunityIcons 
              name="target" 
              size={24} 
              color={colors.primary}
              style={styles.missionIcon}
            />
            <Text style={[styles.missionText, { color: colors.text }]}>
              <Text style={{ fontWeight: 'bold' }}>Propósito:</Text> Minimizar riesgos y amenazas, 
              protegiendo ciudadanos y funcionarios mediante respuesta adecuada 
              dentro del modelo de uso de la fuerza.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/(auth)/login')}
            >
              <MaterialCommunityIcons name="login" size={20} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>
                Acceso al Sistema
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.secondaryButton, { 
                backgroundColor: colors.card,
                borderColor: colors.primary,
                borderWidth: 1.5
              }]}
              onPress={() => router.push('/(auth)/register')}
            >
              <MaterialCommunityIcons name="account-plus" size={20} color={colors.primary} />
              <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>
                Registro de Funcionario
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.text + '60' }]}>
              Policía Nacional de Colombia
            </Text>
            <Text style={[styles.footerSubtext, { color: colors.text + '50' }]}>
              Seguridad, Profesionalismo, Legalidad
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  heroCard: {
    width: '100%',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 26,
  },
  acronym: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  componentsCard: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  componentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  componentsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  componentItem: {
    alignItems: 'center',
    flex: 1,
  },
  componentEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  componentText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  componentDesc: {
    fontSize: 10,
    textAlign: 'center',
  },
  missionCard: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  missionIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  missionText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    textAlign: 'center',
  },
}); 