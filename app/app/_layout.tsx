import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { lightTheme, darkTheme } from '../theme';
import { LogBox } from 'react-native';
import { AuthProvider } from '../providers/AuthProvider';

// Ignorar warnings específicos que pueden causar problemas en producción
LogBox.ignoreLogs([
  'Warning: Failed prop type',
  'Non-serializable values were found in the navigation state',
]);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider value={theme}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: theme.colors.background,
            },
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{
              animation: 'none',
            }}
          />
          <Stack.Screen 
            name="(auth)" 
            options={{
              animation: 'fade',
            }}
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{
              animation: 'fade',
            }}
          />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
} 