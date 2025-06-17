import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AuthStatusBar } from '../../components/auth-status-bar';
import { DebugServerStatus } from '../../components/debug-server-status';

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
      </Stack>
    </View>
  );
} 