import { Tabs } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text + '80',
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="panic"
        options={{
          title: 'Botón de Pánico',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alert-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="surveys"
        options={{
          title: 'Encuestas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Recursos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 