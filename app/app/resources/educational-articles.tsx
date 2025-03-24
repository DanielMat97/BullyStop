import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

type Article = {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
};

export default function EducationalArticlesScreen() {
  const { colors } = useTheme();
  
  const articles: Article[] = [
    {
      id: '1',
      title: 'Impacto psicológico del acoso escolar en adolescentes',
      description: 'Análisis sobre cómo el bullying puede derivar en trastornos de ansiedad, depresión y otros problemas emocionales.',
      category: 'Salud Mental',
      url: 'https://scielo.org/es/',
    },
    {
      id: '2',
      title: 'Estrategias efectivas de intervención contra el acoso escolar',
      description: 'Revisión de métodos y programas que han demostrado ser efectivos para prevenir y abordar situaciones de acoso.',
      category: 'Intervención',
      url: 'https://www.redalyc.org/',
    },
    {
      id: '3',
      title: 'Factores socioculturales asociados al acoso escolar',
      description: 'Exploración de los factores culturales y estructurales que facilitan o mitigan el acoso en las escuelas colombianas.',
      category: 'Sociocultural',
      url: 'https://www.mineducacion.gov.co',
    },
    {
      id: '4',
      title: 'El papel de la familia en la prevención del acoso',
      description: 'Investigación sobre la importancia del entorno familiar en la prevención y detección temprana del bullying.',
      category: 'Prevención',
      url: 'https://www.icbf.gov.co',
    },
    {
      id: '5',
      title: 'Ciberacoso: nuevos desafíos en la era digital',
      description: 'Estudio sobre las formas emergentes de acoso a través de plataformas digitales y redes sociales.',
      category: 'Tecnología',
      url: 'https://scielo.org/es/',
    }
  ];

  const categories = [...new Set(articles.map(article => article.category))];
  
  const handleArticlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color={colors.text} 
            />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            Artículos Educativos
          </Text>
        </View>
        
        <View style={styles.introSection}>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Los artículos y publicaciones especializadas sobre el acoso escolar ofrecen una mirada profunda a este fenómeno, analizando tanto sus dimensiones psicológicas como socioculturales. Estas lecturas permiten comprender cómo el bullying afecta el desarrollo integral de los estudiantes, influyendo en su rendimiento académico, salud emocional y relaciones interpersonales.
          </Text>
        </View>
        
        {categories.map((category, index) => (
          <View key={index} style={styles.categorySection}>
            <Text style={[styles.categoryTitle, { color: colors.text }]}>
              {category}
            </Text>
            
            {articles
              .filter(article => article.category === category)
              .map(article => (
                <TouchableOpacity 
                  key={article.id}
                  style={[styles.articleCard, { backgroundColor: colors.card }]}
                  onPress={() => handleArticlePress(article.url)}
                >
                  <View style={styles.articleHeader}>
                    <MaterialCommunityIcons 
                      name="file-document" 
                      size={24} 
                      color="#008000" 
                    />
                    <Text style={[styles.articleTitle, { color: colors.text }]}>
                      {article.title}
                    </Text>
                  </View>
                  <Text style={[styles.articleDescription, { color: colors.text + '99' }]}>
                    {article.description}
                  </Text>
                  <View style={styles.articleFooter}>
                    <Text style={[styles.articleSource, { color: colors.text + '80' }]}>
                      Fuente: {new URL(article.url).hostname.replace('www.', '')}
                    </Text>
                    <MaterialCommunityIcons 
                      name="open-in-new" 
                      size={16} 
                      color={colors.text + '80'} 
                    />
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        ))}
        
        <View style={[styles.resourcesSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Repositorios Académicos
          </Text>
          
          <TouchableOpacity 
            style={styles.resourceLink}
            onPress={() => handleArticlePress('https://scielo.org/')}
          >
            <MaterialCommunityIcons name="book-open-variant" size={20} color="#008000" />
            <Text style={[styles.resourceLinkText, { color: '#008000' }]}>
              SciELO
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceLink}
            onPress={() => handleArticlePress('https://www.redalyc.org/')}
          >
            <MaterialCommunityIcons name="book-open-variant" size={20} color="#008000" />
            <Text style={[styles.resourceLinkText, { color: '#008000' }]}>
              Redalyc
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceLink}
            onPress={() => handleArticlePress('https://www.mineducacion.gov.co')}
          >
            <MaterialCommunityIcons name="web" size={20} color="#008000" />
            <Text style={[styles.resourceLinkText, { color: '#008000' }]}>
              Publicaciones del Ministerio de Educación
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.helpButton, { backgroundColor: '#008000' }]}
          onPress={() => router.push('/(tabs)/panic')}
        >
          <MaterialCommunityIcons name="lifebuoy" size={20} color="white" />
          <Text style={styles.helpButtonText}>
            ¿Necesitas Ayuda?
          </Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  introSection: {
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingLeft: 4,
  },
  articleCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  articleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  articleDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleSource: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resourcesSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  resourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  resourceLinkText: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    gap: 10,
  },
  helpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 