import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '@react-navigation/native';

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  colors: Theme['colors'];
}

export default function RadioButton({ label, selected, onSelect, colors }: RadioButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View 
        style={[
          styles.radio, 
          { 
            borderColor: colors.primary,
            backgroundColor: selected ? colors.primary : 'transparent' 
          }
        ]}
      >
        {selected && (
          <View style={styles.selected} />
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
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  }
}); 