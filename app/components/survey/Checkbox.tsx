import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@react-navigation/native';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  colors: Theme['colors'];
}

export default function Checkbox({ label, checked, onToggle, colors }: CheckboxProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onToggle(!checked)}
      activeOpacity={0.7}
    >
      <View 
        style={[
          styles.checkbox, 
          { 
            borderColor: colors.primary,
            backgroundColor: checked ? colors.primary : 'transparent' 
          }
        ]}
      >
        {checked && (
          <MaterialCommunityIcons 
            name="check" 
            size={16} 
            color="white" 
          />
        )}
      </View>
      <Text style={[styles.label, { color: colors.text }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  }
}); 