import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { useSurveys } from "../../hooks/useSurveys";
import { Survey } from "../../services/api";

export default function SurveysScreen() {
  const { colors } = useTheme();
  const {
    surveys,
    loading,
    refreshing,
    error,
    fetchSurveys,
    handleRefresh,
  } = useSurveys();

  // Cargar encuestas cuando la pantalla recibe el foco
  useFocusEffect(
    useCallback(() => {
      fetchSurveys();
    }, [fetchSurveys])
  );

  const handleSurveyPress = (surveyId: number, isCompleted: boolean, responseId: number | null) => {
    if (isCompleted) {
      // Si ya está completada, navegar a la pantalla de respuestas
      router.push({
        pathname: "/survey/[id]/responses",
        params: { id: surveyId }
      });
      return;
    }

    // Navegar a la pantalla de detalle de encuesta
    router.push({
      pathname: "/survey/[id]",
      params: { id: surveyId }
    });
  };

  const renderSurveyItem = ({ item }: { item: Survey }) => (
    <TouchableOpacity
      style={[
        styles.surveyItem,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
      onPress={() => handleSurveyPress(item.id, item.isCompleted, item.responseId)}
    >
      <View style={styles.surveyHeader}>
        <Text style={[styles.surveyTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: item.isCompleted
                ? "#4CAF5020"  // Verde con 20% de opacidad
                : "#FF525220", // Rojo con 20% de opacidad
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: item.isCompleted
                  ? "#4CAF50"  // Verde
                  : "#FF5252", // Rojo
              },
            ]}
          >
            {item.isCompleted ? "Completada" : "Pendiente"}
          </Text>
        </View>
      </View>
      <Text style={[styles.surveyDescription, { color: colors.text + "80" }]}>
        {item.description}
      </Text>
      <View style={styles.surveyFooter}>
        <Text style={[styles.surveyDate, { color: colors.text + "60" }]}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={colors.text + "60"}
        />
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Cargando encuestas...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FlatList
        data={surveys}
        renderItem={renderSurveyItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={50}
              color={colors.text + "40"}
            />
            <Text style={[styles.emptyText, { color: colors.text + "60" }]}>
              {error || "No hay encuestas disponibles"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  surveyItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  surveyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  surveyTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  surveyDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  surveyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  surveyDate: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },
}); 