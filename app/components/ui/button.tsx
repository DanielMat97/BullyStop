import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { forwardRef } from 'react';

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = forwardRef<View, ButtonProps>(({ 
  onPress, 
  disabled, 
  style, 
  textStyle,
  variant = 'primary',
  children 
}, ref) => {
  const { colors } = useTheme();

  const buttonStyles = [
    styles.button,
    variant === 'primary' && { backgroundColor: colors.primary },
    variant === 'secondary' && { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
    disabled && { opacity: 0.5 },
    style,
  ];

  const textStyles = [
    styles.text,
    variant === 'primary' && { color: '#fff' },
    variant === 'secondary' && { color: colors.primary },
    textStyle,
  ];

  return (
    <TouchableOpacity
      ref={ref}
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 