# BullyStop - Backend API

## Descripción General
BullyStop es una plataforma integral diseñada para prevenir, detectar y gestionar casos de bullying en entornos educativos. El sistema proporciona herramientas para la recolección de datos, seguimiento de incidentes y respuesta rápida ante situaciones de acoso escolar.

## Características en Detalle

### Funcionales u Operativas

#### Funcionamiento
- **Sistema de Usuarios**: Registro y autenticación de estudiantes y personal educativo
- **Encuestas de Evaluación**: Sistema de encuestas para monitorear el ambiente escolar
- **Alertas de Pánico**: Sistema de respuesta rápida para situaciones de emergencia
- **Seguimiento de Casos**: Registro y monitoreo de incidentes reportados

#### Seguridad
- Autenticación JWT con tokens de 24 horas
- Encriptación de contraseñas con bcrypt
- Guards de autenticación en rutas protegidas
- Validación de datos con class-validator
- CORS configurado para entornos seguros

#### Mantenimiento y Manipulación de Datos
- Logs detallados de todas las operaciones
- Monitoreo de duración de peticiones
- Registro de IPs para auditoría
- Backups automáticos en Railway

#### Transporte de Datos
- API RESTful con OpenAPI/Swagger
- Comunicación segura mediante HTTPS
- Validación de DTOs en todas las operaciones
- Manejo de errores estandarizado

### Productivas o de Desarrollo

#### Método de Desarrollo
- Arquitectura Hexagonal/Clean Architecture
- Desarrollo basado en módulos de NestJS
- Principios SOLID y DRY
- Testing unitario y e2e

#### Estándares Aplicados
- ESLint para calidad de código
- Prettier para formateo consistente
- TypeScript strict mode
- Convenciones de NestJS

#### Tecnologías Utilizadas
- NestJS como framework principal
- TypeORM para persistencia de datos
- PostgreSQL como base de datos
- Docker para containerización

#### Control de Calidad
- Tests automatizados
- Code reviews obligatorios
- CI/CD en Railway
- Linting y formatting automático

### Comunicativos

#### Estilo y Comunicación
- API documentada con OpenAPI/Swagger
- Mensajes de error descriptivos
- Logs detallados para debugging
- Documentación técnica completa

### Recursos

#### Infraestructura
- Railway para hosting
- PostgreSQL en Railway
- CI/CD automatizado
- Monitoreo y logs centralizados

#### Presupuesto y Tecnología
- Hosting en Railway (Plan Pro)
- Dominio personalizado
- Certificados SSL
- Herramientas de desarrollo

### Mercado

#### Análisis del Sector
El software responde a la creciente necesidad de herramientas digitales para combatir el bullying escolar, un problema que afecta a millones de estudiantes globalmente.

## Tipo de Prototipo

### Naturaleza del Prototipo
- **Tipo**: Intangible (Software/Servicio Digital)
- **Propósito**: Proporcionar una plataforma integral para la prevención y gestión del bullying escolar
- **Impacto**: Mejora la seguridad y bienestar de los estudiantes mediante detección temprana y respuesta rápida

## Materiales/Recursos Necesarios

### Desarrollo
- Node.js v20 o superior
- PostgreSQL 15+
- Docker y Docker Compose
- IDE (recomendado: VS Code)

### Dependencias Principales
\`\`\`json
{
  "@nestjs/common": "^11.0.1",
  "@nestjs/config": "^4.0.1",
  "@nestjs/jwt": "^11.0.0",
  "@nestjs/typeorm": "^11.0.0",
  "bcrypt": "^5.1.1",
  "class-validator": "^0.14.1",
  "pg": "^8.14.1",
  "typeorm": "^0.3.21"
}
\`\`\`

## Técnicas de Elaboración

### Metodología de Desarrollo
- Metodología Ágil (Scrum)
- Sprints de 2 semanas
- Code reviews
- Integración continua

### Stack Tecnológico
- **Backend**: NestJS, TypeScript, PostgreSQL
- **ORM**: TypeORM
- **Testing**: Jest
- **Documentación**: OpenAPI/Swagger

### Técnicas de Usabilidad
- Validación de datos en tiempo real
- Respuestas HTTP estandarizadas
- Rate limiting
- Caché de consultas frecuentes

## Escala

### Alcance del Proyecto
- **Fase Actual**: Prototipo de Alta Fidelidad
- **Escala**: Nacional (España)
- **Usuarios Objetivo**: Instituciones educativas
- **Capacidad**: Diseñado para manejar múltiples instituciones simultáneamente

## Nivel de Fidelidad

### Características del Prototipo
- **Nivel**: Alta Fidelidad
- **Justificación**: El sistema está completamente funcional y listo para producción, con todas las características principales implementadas y probadas.

### Componentes de Alta Fidelidad
1. Sistema de autenticación completo
2. CRUD de usuarios y encuestas
3. Sistema de alertas de pánico
4. Análisis de respuestas
5. Logging y monitoreo

## Instalación y Configuración

### Requisitos Previos
\`\`\`bash
# Node.js v20+
# PostgreSQL 15+
# Docker (opcional)
\`\`\`

### Configuración del Entorno
1. Clonar el repositorio
2. Copiar .env.example a .env
3. Configurar variables de entorno
4. Instalar dependencias:
   \`\`\`bash
   npm install
   \`\`\`

### Ejecución
\`\`\`bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Docker
docker-compose up -d
\`\`\`

## Contribución
1. Fork el repositorio
2. Crear una rama feature
3. Commit los cambios
4. Push a la rama
5. Crear Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT.

## Contacto
DevSociety - daniel@devsociety.co