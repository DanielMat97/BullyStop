import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileMenu } from "../../components/ui/profile-menu";

type QuickAction = {
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: "/(tabs)/panic" | "/(tabs)/surveys" | "/(tabs)/resources";
  color: string;
};

export default function HomeScreen() {
  const { colors } = useTheme();

  const quickActions: QuickAction[] = [
    {
      title: "Botón de Pánico",
      description: "Envía una alerta de emergencia",
      icon: "alert-circle",
      route: "/(tabs)/panic",
      color: "#008000",
    },
    {
      title: "Encuestas",
      description: "Completa las encuestas de bienestar",
      icon: "clipboard-list",
      route: "/(tabs)/surveys",
      color: "#556B2F",
    },
    {
      title: "Recursos",
      description: "Accede a materiales de ayuda",
      icon: "book-open-variant",
      route: "/(tabs)/resources",
      color: "#007A33",
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>BullyStop</Text>
          <Text style={[styles.subtitle, { color: colors.text + "80" }]}>
            Tu espacio seguro contra el bullying
          </Text>
        </View>

        {/* Profile Menu Card */}
        <ProfileMenu />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Acciones Rápidas
          </Text>
          <View style={styles.actionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { backgroundColor: colors.card }]}
                onPress={() => router.push(action.route)}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: action.color + "20" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={action.icon}
                    size={28}
                    color={action.color}
                  />
                </View>
                <Text style={[styles.actionTitle, { color: colors.text }]}>
                  {action.title}
                </Text>
                <Text
                  style={[
                    styles.actionDescription,
                    { color: colors.text + "80" },
                  ]}
                >
                  {action.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Información Útil
          </Text>
          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              ¿Qué es el bullying?
            </Text>
            <Text
              style={[styles.infoDescription, { color: colors.text + "80" }]}
            >
              El bullying es cualquier forma de maltrato psicológico, verbal o
              físico producido entre estudiantes de forma reiterada a lo largo
              de un tiempo determinado.
            </Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              ¿Cómo identificar el bullying?
            </Text>
            <Text
              style={[styles.infoDescription, { color: colors.text + "80" }]}
            >
              Presta atención a cambios de comportamiento, pérdida de interés en
              actividades, aislamiento social, bajo rendimiento académico o
              lesiones físicas inexplicables.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
