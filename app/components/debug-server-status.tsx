import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useTheme } from '@react-navigation/native';
import { API_URL } from '../config/api';
import { Ionicons } from '@expo/vector-icons';

interface ServerStatus {
  status: 'online' | 'offline' | 'checking';
  message: string;
  details?: string;
}

export const DebugServerStatus: React.FC = () => {
  const { colors } = useTheme();
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    status: 'checking',
    message: 'Verificando estado del servidor...'
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const checkServerStatus = async () => {
    setServerStatus({
      status: 'checking',
      message: 'Verificando estado del servidor...'
    });

    try {
      // Simple request to check if the server is responding
      const startTime = Date.now();
      const response = await axios.get(API_URL, { timeout: 5000 });
      const endTime = Date.now();
      const pingTime = endTime - startTime;
      
      setServerStatus({
        status: 'online',
        message: 'El servidor está en línea',
        details: `Tiempo de respuesta: ${pingTime}ms`
      });
    } catch (error) {
      // Check if error is a connection error
      if (axios.isAxiosError(error) && !error.response) {
        setServerStatus({
          status: 'offline',
          message: `No se puede conectar al servidor`,
          details: `Verifica que tu servidor esté ejecutándose en ${API_URL}\n\nError: ${error.message}`
        });
      } else {
        // Server responded but with an error
        setServerStatus({
          status: 'online',
          message: 'El servidor está en línea pero devolvió un error',
          details: error instanceof Error ? error.message : 'Error desconocido'
        });
      }
    }
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

  const getStatusColor = () => {
    switch (serverStatus.status) {
      case 'online':
        return '#4CAF50'; // Verde para online
      case 'offline':
        return '#F44336'; // Rojo para offline
      case 'checking':
        return '#FFC107'; // Amarillo para checking
      default:
        return colors.border;
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.card,
        borderColor: colors.border,
      }
    ]}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
        <Text style={[styles.statusText, { color: colors.text }]}>
          Servidor: {serverStatus.status === 'online' ? 'CONECTADO' : 
                    serverStatus.status === 'offline' ? 'DESCONECTADO' : 
                    'VERIFICANDO'}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity 
              onPress={toggleExpanded}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={22} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.messageText, { color: colors.text }]}>
            {serverStatus.message}
          </Text>
          
          {serverStatus.details && (
            <Text style={[styles.detailsText, { color: colors.text + 'CC' }]}>
              {serverStatus.details}
            </Text>
          )}
          
          <View style={[styles.serverInfo, { backgroundColor: colors.background }]}>
            <Text style={[styles.infoLabel, { color: colors.text + '99' }]}>URL del servidor:</Text>
            <Text style={[styles.infoValue, { color: colors.primary }]}>{API_URL}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={checkServerStatus}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Reintentar Conexión</Text>
          </TouchableOpacity>
          
          <Text style={[styles.infoText, { color: colors.text + '99' }]}>
            Si el servidor está desconectado, asegúrate de que tu servidor API esté ejecutándose
            y que estés conectado a la misma red WiFi.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    position: 'relative',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 8,
    zIndex: 1,
  },
  closeButton: {
    padding: 4,
  },
  messageText: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
  },
  detailsText: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  serverInfo: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '500',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 16,
  }
}); 