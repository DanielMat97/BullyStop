import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '@react-navigation/native';

interface ScaleSelectorProps {
  options: string[];
  value: number | null;
  onChange: (value: number) => void;
  colors: Theme['colors'];
}

export default function ScaleSelector({ options, value, onChange, colors }: ScaleSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
        <Text style={[styles.label, { color: colors.text + '99' }]}>Muy insatisfecho</Text>
        <Text style={[styles.label, { color: colors.text + '99' }]}>Muy satisfecho</Text>
      </View>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              {
                backgroundColor: value === index + 1 ? colors.primary : colors.card,
                borderColor: colors.border,
              }
            ]}
            onPress={() => onChange(index + 1)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: value === index + 1 ? 'white' : colors.text,
                }
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  }
}); 