import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useAuthContext } from '../hooks/useAuthContext';
import { router } from 'expo-router';

export const ProfileMenu = () => {
  const { colors } = useTheme();
  const { user, logout } = useAuthContext();
  
  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)');
          },
        },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          ¡Hola, {user?.name || 'Usuario'}!
        </Text>
      </View>
      
      <View style={styles.menuItems}>
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => Alert.alert('Perfil', 'Esta funcionalidad está en desarrollo')}
          activeOpacity={0.7}
        >
          <Ionicons name="person-outline" size={22} color={colors.text} />
          <Text style={[styles.menuItemText, { color: colors.text }]}>
            Mi perfil
          </Text>
          <Ionicons name="chevron-forward" size={18} color={colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => Alert.alert('Configuración', 'Esta funcionalidad está en desarrollo')}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={22} color={colors.text} />
          <Text style={[styles.menuItemText, { color: colors.text }]}>
            Configuración
          </Text>
          <Ionicons name="chevron-forward" size={18} color={colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={[styles.menuItemText, { color: '#FF3B30' }]}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
  },
  menuItems: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
}); 