import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function TabLayout() {
  const { colors } = useTheme();
  const { requireAuth } = useAuthContext();

  // Ensure user is authenticated for all tab screens
  requireAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0D47A1', // SITAB primary blue
        tabBarInactiveTintColor: colors.text + '60',
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'SITAB',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shield-account" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="panic"
        options={{
          title: 'Alerta Táctica',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shield-alert" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="surveys"
        options={{
          title: 'Evaluaciones',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-check" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Manual Táctico',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 