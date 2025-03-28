/**
 * Configuración de la API
 * Este archivo centraliza todas las configuraciones relacionadas con la API
 */

// Detecta si estamos en un dispositivo físico o en el emulador
const isPhysicalDevice = () => {
  // En un entorno de producción, deberíamos verificar si estamos en un dispositivo físico
  // Por ahora, asumimos que siempre estamos en un dispositivo físico o emulador
  return true;
};

// URL base de la API
// Para dispositivos físicos, usamos la IP del equipo en lugar de localhost
export const API_URL = isPhysicalDevice() 
  ? "https://bullystop-production.up.railway.app"  // IP del equipo (usar esta IP cuando pruebes en un dispositivo físico)
  : "https://bullystop-production.up.railway.app";    // localhost (solo funciona en emulador)

// Timeout para peticiones en milisegundos
export const API_TIMEOUT = 10000;

// Mensajes de error personalizados
export const API_ERROR_MESSAGES = {
  CONNECTION_ERROR: "No hay respuesta del servidor. Verifica tu conexión o el estado del servidor.",
  SERVER_ERROR: "Error del servidor",
  REQUEST_ERROR: "Error en la petición",
  UNKNOWN_ERROR: "Ha ocurrido un error inesperado"
};

/**
 * Imprime información de depuración sobre la configuración de la API
 */
export const logApiConfig = () => {
  console.log('======= CONFIGURACIÓN DE API =======');
  console.log(`URL de la API: ${API_URL}`);
  console.log(`Timeout: ${API_TIMEOUT}ms`);
  console.log('===================================');
}; 