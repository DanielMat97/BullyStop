import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack } from "expo-router";
import { surveyApi, SurveyResponse, QuestionType } from "../../../services/api";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function SurveyResponsesScreen() {
  const { colors } = useTheme();
  const { token } = useAuthContext();
  const params = useLocalSearchParams<{ id: string }>();
  const surveyId = Number(params.id);

  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (surveyId && token) {
      loadResponses();
    }
  }, [surveyId, token]);

  const loadResponses = async () => {
    if (!token) {
      Alert.alert(
        "Error",
        "No hay token de autenticación. Por favor, inicia sesión nuevamente.",
        [{ text: "Entendido" }]
      );
      return;
    }

    try {
      const data = await surveyApi.getSurveyResponses(surveyId, token);
      setResponses(data);
    } catch (err) {
      console.error("Error al cargar respuestas:", err);
      Alert.alert(
        "Error",
        "No se pudieron cargar tus respuestas. Por favor, intenta nuevamente.",
        [{ text: "Entendido" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (
    question: string,
    type: QuestionType,
    answer: string | string[] | number,
    options?: string[]
  ) => {
    switch (type) {
      case QuestionType.SCALE:
        return (
          <View style={styles.questionContainer}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {question}
            </Text>
            <View style={styles.scaleContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <View
                  key={value}
                  style={[
                    styles.scaleOption,
                    {
                      backgroundColor:
                        answer === value ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.scaleValue,
                      {
                        color: answer === value ? "white" : colors.text,
                      },
                    ]}
                  >
                    {value}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.scaleLabels}>
              <Text style={[styles.scaleLabel, { color: colors.text + "80" }]}>
                Muy malo
              </Text>
              <Text style={[styles.scaleLabel, { color: colors.text + "80" }]}>
                Muy bueno
              </Text>
            </View>
          </View>
        );

      case QuestionType.SINGLE_CHOICE:
        return (
          <View style={styles.questionContainer}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {question}
            </Text>
            <View style={styles.choiceContainer}>
              {options?.map((option, optIndex) => (
                <View
                  key={optIndex}
                  style={[
                    styles.choiceOption,
                    {
                      backgroundColor:
                        answer === option ? colors.primary + "20" : colors.card,
                      borderColor:
                        answer === option ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.choiceText, { color: colors.text }]}>
                    {option}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );

      case QuestionType.MULTIPLE_CHOICE:
        return (
          <View style={styles.questionContainer}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {question}
            </Text>
            <View style={styles.choiceContainer}>
              {options?.map((option, optIndex) => {
                const answers = answer as string[];
                const isSelected = answers.includes(option);

                return (
                  <View
                    key={optIndex}
                    style={[
                      styles.choiceOption,
                      {
                        backgroundColor: isSelected
                          ? colors.primary + "20"
                          : colors.card,
                        borderColor: isSelected
                          ? colors.primary
                          : colors.border,
                      },
                    ]}
                  >
                    <View style={styles.checkboxContainer}>
                      <View
                        style={[
                          styles.checkbox,
                          {
                            backgroundColor: isSelected
                              ? colors.primary
                              : colors.card,
                            borderColor: isSelected
                              ? colors.primary
                              : colors.border,
                          },
                        ]}
                      >
                        {isSelected && (
                          <MaterialCommunityIcons
                            name="check"
                            size={16}
                            color="white"
                          />
                        )}
                      </View>
                      <Text style={[styles.choiceText, { color: colors.text }]}>
                        {option}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        );

      case QuestionType.TEXT:
        return (
          <View style={styles.questionContainer}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {question}
            </Text>
            <View
              style={[
                styles.textAnswerContainer,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.textAnswer, { color: colors.text }]}>
                {answer as string}
              </Text>
            </View>
          </View>
        );

      default:
        return (
          <View style={styles.questionContainer}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {question}
            </Text>
            <Text style={[styles.errorText, { color: "#FF4444" }]}>
              Tipo de pregunta no soportado: {type}
            </Text>
          </View>
        );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
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
    responseContainer: {
      marginBottom: 24,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    responseHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    responseDate: {
      fontSize: 14,
    },
    answersContainer: {
      gap: 24,
    },
    answerItem: {
      gap: 8,
      padding: 16,
      backgroundColor: colors.background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    questionContainer: {
      width: "100%",
    },
    questionText: {
      fontSize: 18,
      fontWeight: "500",
      marginBottom: 20,
    },
    scaleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      backgroundColor: colors.card,
      padding: 8,
      borderRadius: 8,
    },
    scaleOption: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      borderWidth: 1,
      borderColor: colors.border,
    },
    scaleValue: {
      fontSize: 18,
      fontWeight: "500",
    },
    scaleLabels: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginTop: 8,
    },
    scaleLabel: {
      fontSize: 12,
    },
    choiceContainer: {
      width: "100%",
      gap: 10,
      backgroundColor: colors.card,
      padding: 8,
      borderRadius: 8,
    },
    choiceOption: {
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: colors.background,
    },
    choiceText: {
      fontSize: 16,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    textAnswerContainer: {
      width: "100%",
      minHeight: 100,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: colors.card,
    },
    textAnswer: {
      fontSize: 16,
      lineHeight: 24,
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
    errorText: {
      fontSize: 14,
      color: "#FF4444",
    },
  });

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Stack.Screen
          options={{
            title: "Cargando respuestas...",
            headerBackTitle: "Atrás",
          }}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Cargando respuestas...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (responses.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Stack.Screen
          options={{
            title: "Tus respuestas",
            headerBackTitle: "Atrás",
          }}
        />
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="clipboard-text-outline"
            size={50}
            color={colors.text + "40"}
          />
          <Text style={[styles.emptyText, { color: colors.text + "60" }]}>
            No hay respuestas disponibles
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Stack.Screen
        options={{
          title: "Tus respuestas",
          headerBackTitle: "Atrás",
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {responses.map((response) => (
          <View key={response.id} style={styles.responseContainer}>
            <View style={styles.responseHeader}>
              <Text
                style={[styles.responseDate, { color: colors.text + "60" }]}
              >
                Respondida el{" "}
                {new Date(response.submittedAt).toLocaleDateString()}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      response.status === "COMPLETED"
                        ? "#4CAF5020"
                        : "#FF525220",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        response.status === "COMPLETED" ? "#4CAF50" : "#FF5252",
                    },
                  ]}
                >
                  {response.status === "COMPLETED" ? "Completada" : "Pendiente"}
                </Text>
              </View>
            </View>

            <View style={styles.answersContainer}>
              {response.answers.map((answer, index) => {
                const question = response.survey.questions.find(
                  (q) => q.question === answer.question
                );

                if (!question) {
                  console.warn(`Question not found for answer with questionId: ${answer.question}`);
                  return null;
                }

                return (
                  <View key={index} style={styles.answerItem}>
                    {renderQuestion(
                      question.question,
                      question.type,
                      answer.answer,
                      question.options
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
