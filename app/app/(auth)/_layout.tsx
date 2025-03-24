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
      
      {/* Debug components */}
      <View style={{ 
        position: 'absolute', 
        bottom: 16, 
        left: 0, 
        right: 0,
        zIndex: 1000,
      }}>
        <DebugServerStatus />
        <AuthStatusBar />
      </View>
    </View>
  );
} 