import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { 
  setAuthToken, 
  surveyApi, 
  SurveyResponse, 
  QuestionType, 
  Survey, 
  Question, 
  AnswerDto, 
  CreateSurveyResponseDto 
} from "../../services/api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSurveys } from "../../hooks/useSurveys";

export default function SurveyDetailScreen() {
  const { colors } = useTheme();
  const { token, user } = useAuthContext();
  const params = useLocalSearchParams<{ id: string; showResponses?: string }>();
  const surveyId = Number(params.id);
  const isViewingResponses = params.showResponses === "true";

  const {
    currentSurvey,
    loading,
    error,
    fetchSurveyById,
    submitSurveyResponse,
    fetchSurveys,
  } = useSurveys();

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<AnswerDto[]>([]);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [loadingResponses, setLoadingResponses] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
    if (surveyId) {
      fetchSurveyById(surveyId);
    }
  }, [token, surveyId, fetchSurveyById]);

  useEffect(() => {
    if (isViewingResponses && surveyId) {
      loadResponses();
    }
  }, [isViewingResponses, surveyId]);

  const handleResponse = (
    questionIndex: number,
    response: string | number | string[]
  ) => {
    setResponses((prev) => {
      const question = currentSurvey?.questions[questionIndex];
      const existingIndex = prev.findIndex(
        (r) => r.answers[0]?.questionId === question?.id
      );

      const newAnswer = {
        questionId: question?.id || 0,
        question: question?.question || "",
        answer: response,
      };

      if (existingIndex >= 0) {
        // Update existing response
        const newResponses = [...prev];
        newResponses[existingIndex] = {
          ...prev[existingIndex],
          answers: [newAnswer],
        };
        return newResponses;
      } else {
        // Add new response
        return [
          ...prev,
          {
            id: Date.now(),
            answers: [newAnswer],
            status: "PENDING",
            createdAt: new Date().toISOString(),
            submittedAt: new Date().toISOString(),
            survey: currentSurvey || {
              id: surveyId,
              title: "",
              description: "",
              questions: [],
              createdAt: new Date().toISOString(),
              userResponseStatus: null,
              isCompleted: false,
              isPending: false,
              responseId: null,
            },
            user: {
              id: user?.id || 0,
              name: user?.name || "",
              email: user?.email || "",
            },
          },
        ];
      }
    });
  };

  const handleNextQuestion = () => {
    if (currentSurvey && currentQuestion < currentSurvey.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!currentSurvey || !user) return;

    // Check if all questions are answered
    if (responses.length < currentSurvey.questions.length) {
      Alert.alert(
        "Respuestas incompletas",
        "Por favor, responde todas las preguntas antes de enviar la encuesta.",
        [{ text: "Entendido" }]
      );
      return;
    }

    setSubmitting(true);

    try {
      // Transform responses to match the DTO structure
      const answers: AnswerDto[] = responses.map((response) => ({
        question: response.answers[0].questionId,
        answer: response.answers[0].answer,
      }));

      const surveyResponse: CreateSurveyResponseDto = {
        surveyId: surveyId,
        userId: user.id,
        answers: answers,
      };

      const success = await submitSurveyResponse(surveyResponse);

      if (success) {
        // Actualizar la lista de encuestas
        await fetchSurveys();

        Alert.alert(
          "Encuesta completada",
          "Gracias por completar esta encuesta. Tus respuestas han sido enviadas correctamente.",
          [
            {
              text: "Volver a la lista",
              onPress: () => {
                // Navegar a la lista de encuestas y forzar una actualización
                router.replace("/(tabs)/surveys");
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Error",
          "Hubo un problema al enviar tus respuestas. Por favor, intenta nuevamente.",
          [{ text: "Entendido" }]
        );
      }
    } catch (err) {
      console.error("Error al enviar respuestas:", err);

      Alert.alert(
        "Error",
        "Hubo un problema al enviar tus respuestas. Por favor, intenta nuevamente.",
        [{ text: "Entendido" }]
      );
    } finally {
      setSubmitting(false);
    }
  };

  const loadResponses = async () => {
    if (!token) return;

    setLoadingResponses(true);
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
      setLoadingResponses(false);
    }
  };

  const renderQuestion = (question: Question, index: number) => {
    const currentResponse = responses.find(
      (r) => r.answers[0]?.questionId === question.id
    );

    // Render different question types (scale, single_choice, multiple_choice, text)
    switch (question.type) {
      case QuestionType.SCALE:
        return (
          <View style={styles.questionContainer}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {question.question}
            </Text>
            <View style={styles.scaleContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.scaleOption,
                    {
                      backgroundColor:
                        currentResponse?.answers[0].answer === value
                          ? colors.primary
                          : colors.card,
                    },
                  ]}
                  onPress={() => handleResponse(index, value)}
                >
                  <Text
                    style={[
                      styles.scaleValue,
                      {
                        color:
                          currentResponse?.answers[0].answer === value
                            ? "white"
                            : colors.text,
                      },
                    ]}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
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
              {question.question}
            </Text>
            <View style={styles.choiceContainer}>
              {question.options?.map((option: string, optIndex: number) => (
                <TouchableOpacity
                  key={optIndex}
                  style={[
                    styles.choiceOption,
                    {
                      backgroundColor:
                        currentResponse?.answers[0].answer === option
                          ? colors.primary + "20"
                          : colors.card,
                      borderColor:
                        currentResponse?.answers[0].answer === option
                          ? colors.primary
                          : colors.border,
                    },
                  ]}
                  onPress={() => handleResponse(index, option)}
                >
                  <Text style={[styles.choiceText, { color: colors.text }]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case QuestionType.MULTIPLE_CHOICE:
        return (
          <View style={styles.questionContainer}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {question.question}
            </Text>
            <View style={styles.choiceContainer}>
              {question.options?.map((option: string, optIndex: number) => {
                const currentResponses =
                  (currentResponse?.answers[0].answer as string[]) || [];
                const isSelected = currentResponses.includes(option);

                return (
                  <TouchableOpacity
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
                    onPress={() => {
                      const newResponses = isSelected
                        ? currentResponses.filter((r) => r !== option)
                        : [...currentResponses, option];
                      handleResponse(index, newResponses);
                    }}
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
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      case QuestionType.TEXT:
        return (
          <View style={styles.questionContainer}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {question.question}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              value={(currentResponse?.answers[0].answer as string) || ""}
              onChangeText={(text) => handleResponse(index, text)}
              placeholder="Escribe tu respuesta aquí..."
              placeholderTextColor={colors.text + "80"}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        );

      default:
        return (
          <View style={styles.questionContainer}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {question.question}
            </Text>
            <Text style={[styles.errorText, { color: "#FF4444" }]}>
              Tipo de pregunta no soportado: {question.type}
            </Text>
          </View>
        );
    }
  };

  const renderResponses = () => {
    if (loadingResponses) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Cargando respuestas...
          </Text>
        </View>
      );
    }

    if (responses.length === 0) {
      return (
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
      );
    }

    return responses.map((response) => (
      <View key={response.id} style={styles.responseContainer}>
        <View style={styles.responseHeader}>
          <Text style={[styles.responseDate, { color: colors.text + "60" }]}>
            Respondida el {new Date(response.submittedAt).toLocaleDateString()}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  response.status === "COMPLETED" ? "#4CAF5020" : "#FF525220",
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
          {response.answers.map((answer, index) => (
            <View key={index} style={styles.answerItem}>
              <Text style={[styles.questionText, { color: colors.text }]}>
                {answer.question}
              </Text>
              <Text style={[styles.answerText, { color: colors.text + "80" }]}>
                {Array.isArray(answer.answer)
                  ? answer.answer.join(", ")
                  : answer.answer.toString()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    ));
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Stack.Screen
          options={{
            title: "Cargando encuesta...",
            headerBackTitle: "Atrás",
          }}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Cargando encuesta...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Stack.Screen
          options={{
            title: "Error",
            headerBackTitle: "Atrás",
          }}
        />
        <View style={[styles.errorContainer, { backgroundColor: "#FF444420" }]}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={50}
            color="#FF4444"
          />
          <Text style={[styles.errorText, { color: "#FF4444" }]}>{error}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={() => fetchSurveyById(surveyId)}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>
              Reintentar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentSurvey) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Stack.Screen
          options={{
            title: "Encuesta no encontrada",
            headerBackTitle: "Atrás",
          }}
        />
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={50}
            color={colors.text}
          />
          <Text style={[styles.errorText, { color: colors.text }]}>
            No se encontró la encuesta solicitada
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>
              Volver a la lista
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Set the title to the survey title
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Stack.Screen
        options={{
          title: currentSurvey.title,
          headerBackTitle: "Atrás",
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.description, { color: colors.text + "80" }]}>
            {currentSurvey.description}
          </Text>
        </View>

        {isViewingResponses ? (
          <View style={styles.responsesContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Tus respuestas
            </Text>
            {renderResponses()}
          </View>
        ) : (
          <>
            <View style={styles.progressContainer}>
              <Text
                style={[styles.progressText, { color: colors.text + "80" }]}
              >
                Pregunta {currentQuestion + 1} de{" "}
                {currentSurvey.questions.length}
              </Text>
              <View
                style={[styles.progressBar, { backgroundColor: colors.border }]}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      backgroundColor: colors.primary,
                      width: `${
                        ((currentQuestion + 1) /
                          currentSurvey.questions.length) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.questionWrapper}>
              {renderQuestion(
                currentSurvey.questions[currentQuestion],
                currentQuestion
              )}
            </View>

            <View style={styles.navigationContainer}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  {
                    backgroundColor: colors.card,
                    opacity: currentQuestion === 0 ? 0.5 : 1,
                  },
                ]}
                onPress={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={24}
                  color={colors.text}
                />
                <Text style={[styles.navButtonText, { color: colors.text }]}>
                  Anterior
                </Text>
              </TouchableOpacity>

              {currentQuestion < currentSurvey.questions.length - 1 ? (
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    {
                      backgroundColor: colors.primary,
                    },
                  ]}
                  onPress={handleNextQuestion}
                >
                  <Text style={[styles.navButtonText, { color: "white" }]}>
                    Siguiente
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    {
                      backgroundColor: colors.primary,
                      opacity: submitting ? 0.7 : 1,
                    },
                  ]}
                  onPress={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <>
                      <Text
                        style={[styles.submitButtonText, { color: "white" }]}
                      >
                        Enviar
                      </Text>
                      <MaterialCommunityIcons
                        name="send"
                        size={20}
                        color="white"
                      />
                    </>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    minHeight: "100%",
  },
  header: {
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  questionWrapper: {
    marginBottom: 30,
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
  },
  scaleOption: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  scaleValue: {
    fontSize: 18,
    fontWeight: "500",
  },
  scaleLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  scaleLabel: {
    fontSize: 12,
  },
  choiceContainer: {
    width: "100%",
    gap: 10,
  },
  choiceOption: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  choiceText: {
    fontSize: 16,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 5,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 8,
  },
  responsesContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
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
  textInput: {
    width: "100%",
    minHeight: 100,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  responseContainer: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  responseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  responseDate: {
    fontSize: 14,
  },
  answersContainer: {
    gap: 16,
  },
  answerItem: {
    gap: 8,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 20,
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
