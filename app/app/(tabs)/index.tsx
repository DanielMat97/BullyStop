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
  component: string;
};

export default function HomeScreen() {
  const { colors } = useTheme();

  const quickActions: QuickAction[] = [
    {
      title: "Alerta Táctica",
      description: "Activación inmediata de protocolo de emergencia",
      icon: "shield-alert",
      route: "/(tabs)/panic",
      color: "#0D47A1",
      component: "🛡️ Táctica",
    },
    {
      title: "Evaluaciones SITAB",
      description: "Registro de preparación operacional",
      icon: "clipboard-check",
      route: "/(tabs)/surveys",
      color: "#1976D2",
      component: "🧠 Mental",
    },
    {
      title: "Manual Táctico",
      description: "Protocolos y técnicas operacionales",
      icon: "book-open-variant",
      route: "/(tabs)/resources",
      color: "#FFC107",
      component: "💬 Comunicativa",
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>SITAB</Text>
          <Text style={[styles.subtitle, { color: colors.text + "80" }]}>
            Sistema Táctico Básico Policial
          </Text>
          <Text style={[styles.motto, { color: colors.primary }]}>
            SEA Policía - Saludar, Escuchar, Actuar
          </Text>
        </View>

        {/* Profile Menu Card */}
        <ProfileMenu />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Componentes SITAB
          </Text>
          <View style={styles.actionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { backgroundColor: colors.card }]}
                onPress={() => router.push(action.route)}
              >
                <View style={styles.componentBadge}>
                  <Text style={[styles.componentText, { color: action.color }]}>
                    {action.component}
                  </Text>
                </View>
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
            Preparación Operacional
          </Text>
          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              🧠 Preparación Mental
            </Text>
            <Text
              style={[styles.infoDescription, { color: colors.text + "80" }]}
            >
              Gestión del estrés operacional, control emocional y toma de decisiones 
              bajo presión para actuación legal y profesional.
            </Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              💬 Preparación Comunicativa
            </Text>
            <Text
              style={[styles.infoDescription, { color: colors.text + "80" }]}
            >
              Técnicas de comunicación asertiva, negociación y manejo de crisis 
              para reducción de riesgos y amenazas.
            </Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              🛡️ Preparación Táctica
            </Text>
            <Text
              style={[styles.infoDescription, { color: colors.text + "80" }]}
            >
              Triangulación, registro por cuadrantes y técnica de vistazos 
              para operaciones seguras y efectivas.
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
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  motto: {
    fontSize: 14,
    fontWeight: "600",
    fontStyle: 'italic',
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  componentBadge: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  componentText: {
    fontSize: 12,
    fontWeight: "600",
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
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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

