import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4A90E2',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    border: '#E0E0E0',
    notification: '#FF3B30',
    error: '#FF4444',
    success: '#4CAF50',
    warning: '#FFA726',
    info: '#2196F3',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#4A90E2',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#2C2C2C',
    notification: '#FF453A',
    error: '#FF4444',
    success: '#4CAF50',
    warning: '#FFA726',
    info: '#2196F3',
  },
}; 