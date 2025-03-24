import { useState, useCallback } from 'react';
import { useAuthContext } from './useAuthContext';
import { surveyApi, Survey, CreateSurveyResponseDto } from '../services/api';
import axios from 'axios';

/**
 * Hook personalizado para manejar las encuestas
 * Proporciona métodos para cargar y responder encuestas
 */
export const useSurveys = () => {
  const { token } = useAuthContext();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [currentSurvey, setCurrentSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Cargar todas las encuestas disponibles
   */
  const fetchSurveys = useCallback(async () => {
    if (!token) {
      setError('Debes iniciar sesión para ver las encuestas');
      setLoading(false);
      return;
    }

    setError(null);
    if (!refreshing) setLoading(true);

    try {
      const data = await surveyApi.getSurveys(token);
      setSurveys(data);
      console.log('Encuestas cargadas:', data.length);
    } catch (err) {
      console.error('Error al cargar encuestas:', err);
      
      // Mensaje de error más específico
      if (axios.isAxiosError(err) && !err.response) {
        setError('No se pudo conectar con el servidor. Verifica tu conexión a internet o si el servidor está activo.');
      } else {
        setError('No se pudieron cargar las encuestas. Por favor, intenta nuevamente.');
      }
      
      // Cuando el servidor no responde, no mostramos encuestas de ejemplo
      setSurveys([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, refreshing]);

  /**
   * Cargar una encuesta específica por ID
   */
  const fetchSurveyById = useCallback(async (id: number) => {
    if (!token) {
      setError('Debes iniciar sesión para ver la encuesta');
      return null;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await surveyApi.getSurveyById(id, token);
      setCurrentSurvey(data);
      return data;
    } catch (err) {
      console.error(`Error al cargar encuesta (ID: ${id}):`, err);
      
      if (axios.isAxiosError(err) && !err.response) {
        setError('No se pudo conectar con el servidor. Verifica tu conexión a internet o si el servidor está activo.');
      } else {
        setError('No se pudo cargar la encuesta. Por favor, intenta nuevamente.');
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  /**
   * Enviar respuestas a una encuesta
   */
  const submitSurveyResponse = useCallback(async (response: CreateSurveyResponseDto) => {
    if (!token) {
      setError('Debes iniciar sesión para enviar respuestas');
      return false;
    }

    setError(null);
    setLoading(true);

    try {
      await surveyApi.submitSurveyResponse(response, token);
      return true;
    } catch (err) {
      console.error('Error al enviar respuestas de encuesta:', err);
      
      if (axios.isAxiosError(err) && !err.response) {
        setError('No se pudo conectar con el servidor. Verifica tu conexión a internet o si el servidor está activo.');
      } else {
        setError('No se pudieron enviar las respuestas. Por favor, intenta nuevamente.');
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  }, [token]);

  /**
   * Refrescar la lista de encuestas
   */
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSurveys();
  }, [fetchSurveys]);

  return {
    surveys,
    currentSurvey,
    loading,
    refreshing,
    error,
    fetchSurveys,
    fetchSurveyById,
    submitSurveyResponse,
    handleRefresh
  };
}; 