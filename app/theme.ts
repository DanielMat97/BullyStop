import { Theme } from '@react-navigation/native';

const baseColors = {
  primary: '#008000', // Verde bandera
  secondary: '#556B2F', // Verde aceituna
  accent: '#007A33', // Verde Pantone 356C
  white: '#FFFFFF',
  error: '#FF4444',
  success: '#4CAF50',
  warning: '#FFA726',
  info: '#2196F3',
};

const baseFonts = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400' as const,
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500' as const,
  },
  bold: {
    fontFamily: 'System',
    fontWeight: '700' as const,
  },
  heavy: {
    fontFamily: 'System',
    fontWeight: '900' as const,
  },
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    background: baseColors.white,
    card: '#F5F5F5',
    text: '#000000',
    border: '#E0E0E0',
    notification: baseColors.primary,
    ...baseColors,
  },
  fonts: baseFonts,
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    background: '#121212',
    card: '#1E1E1E',
    text: baseColors.white,
    border: '#2C2C2C',
    notification: baseColors.primary,
    ...baseColors,
  },
  fonts: baseFonts,
}; 