import { Theme } from '@react-navigation/native';

const baseColors = {
  primary: '#0D47A1', // Azul oscuro institucional SITAB
  secondary: '#1976D2', // Azul claro SITAB
  accent: '#FFC107', // Amarillo SITAB (advertencia/acento)
  white: '#FFFFFF',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#FFC107',
  info: '#1976D2',
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
    background: '#ECEFF1', // Gris neutro SITAB
    card: baseColors.white,
    text: '#1A1A1A',
    border: '#B0BEC5',
    notification: baseColors.primary,
    ...baseColors,
  },
  fonts: baseFonts,
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    background: '#0A1929',
    card: '#1E293B',
    text: baseColors.white,
    border: '#334155',
    notification: baseColors.secondary,
    ...baseColors,
  },
  fonts: baseFonts,
}; 