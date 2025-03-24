import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '../../hooks/useAuthContext';
import { API_URL } from '../../config/api';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tipo para la información completa del usuario
interface UserProfile {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  // Otros campos que puedan existir en tu modelo de usuario
}

export default function ProfileScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile(user.id);
    } else {
      setLoading(false);
      setError('No se ha encontrado información del usuario');
    }
  }, [user]);

  const fetchUserProfile = async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      // Asumiendo que tienes un endpoint para obtener los detalles del usuario
      const response = await axios.get(`${API_URL}/users/${userId}`);
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      setError('No se pudo cargar la información del perfil');
      // Si no podemos obtener el perfil completo, al menos usamos la info básica
      if (user) {
        setUserProfile({
          id: user.id,
          email: user.email || '',
          name: user.name || '',
          createdAt: new Date().toISOString(),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.replace('/(auth)');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen 
        options={{
          headerTitle: 'Mi Perfil',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.text }]}>
              Cargando información del perfil...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.notification} />
            <Text style={[styles.errorText, { color: colors.text }]}>
              {error}
            </Text>
            <TouchableOpacity
              style={[styles.retryButton, { backgroundColor: colors.primary }]}
              onPress={() => user?.id && fetchUserProfile(user.id)}
            >
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : userProfile ? (
          <>
            <View style={styles.profileHeader}>
              <View style={[styles.avatarContainer, { backgroundColor: colors.card }]}>
                {userProfile.avatar ? (
                  <Image
                    source={{ uri: userProfile.avatar }}
                    style={styles.avatar}
                  />
                ) : (
                  <MaterialIcons name="person" size={64} color={colors.primary} />
                )}
              </View>
              <Text style={[styles.username, { color: colors.text }]}>
                {userProfile.name || 'Usuario'}
              </Text>
              <Text style={[styles.email, { color: colors.text + 'CC' }]}>
                {userProfile.email}
              </Text>
            </View>

            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Información Personal
              </Text>
              
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.text + '99' }]}>Nombre:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {userProfile.name || 'No disponible'}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.text + '99' }]}>ID de usuario:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {userProfile.id}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.text + '99' }]}>Miembro desde:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {userProfile.createdAt ? formatDate(userProfile.createdAt) : 'No disponible'}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.logoutButton, { backgroundColor: colors.notification }]}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={22} color="white" />
              <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={[styles.noDataText, { color: colors.text }]}>
            No hay información disponible
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    width: '40%',
    fontSize: 16,
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
}); 