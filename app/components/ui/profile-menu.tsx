import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthContext } from "../../hooks/useAuthContext";
import { router } from "expo-router";

export function ProfileMenu() {
  const { colors } = useTheme();
  const { user, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      friction: 7,
      tension: 40,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)");
        },
      },
    ]);
  };

  const navigateToProfile = () => {
    toggleMenu();
    router.push("/profile");
  };

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  const scaleY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.profileContainer, 
          { 
            backgroundColor: colors.card,
            borderBottomLeftRadius: isMenuOpen ? 0 : 12,
            borderBottomRightRadius: isMenuOpen ? 0 : 12,
          }
        ]}
        activeOpacity={0.9}
        onPress={toggleMenu}
      >
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Hola, {user?.name?.split(" ")[0] || "Usuario"}
          </Text>
          <Text style={[styles.email, { color: colors.text + "80" }]}>
            {user?.email || ""}
          </Text>
        </View>
        
        <MaterialIcons 
          name={isMenuOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color={colors.text}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      {/* Contenedor con altura fija para las opciones */}
      <View style={[styles.optionsWrapper, { display: isMenuOpen ? 'flex' : 'none' }]}>
        <Animated.View 
          style={[
            styles.optionsContainer, 
            { 
              opacity,
              transform: [{ scaleY }],
              backgroundColor: colors.card,
              borderColor: colors.border,
            }
          ]}
        >
          <TouchableOpacity
            style={[styles.menuItem, { borderTopColor: colors.border }]}
            onPress={navigateToProfile}
          >
            <MaterialIcons name="person" size={24} color={colors.text} />
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Mi perfil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { borderTopColor: colors.border }]} 
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={24} color={"red"} />
            <Text style={[styles.menuItemText, { color: "red" }]}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  profileContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  arrowIcon: {
    paddingRight: 16,
  },
  optionsWrapper: {
    // Contenedor para gestionar la visibilidad
    overflow: 'hidden',
  },
  optionsContainer: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginTop: 0, // Eliminamos el espacio negativo
    transformOrigin: 'top', // Origén de transformación desde arriba
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
});
