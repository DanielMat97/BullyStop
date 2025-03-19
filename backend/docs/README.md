# Documentación de la API BullyStop

Este directorio contiene la documentación de la API de BullyStop en formato OpenAPI (Swagger).

## Archivos

- `openapi.yaml`: Documentación completa de la API en formato OpenAPI 3.0.0

## Importación en ApiDog

Para importar esta documentación en ApiDog:

1. Inicia sesión en tu cuenta de ApiDog
2. Ve a la sección de APIs
3. Haz clic en "Import API"
4. Selecciona "OpenAPI (Swagger)"
5. Sube el archivo `openapi.yaml` o pega su contenido
6. Configura las variables de entorno si es necesario
7. Haz clic en "Import"

## Endpoints Documentados

### Usuarios

- `POST /users`: Crear un nuevo usuario
- `GET /users`: Obtener todos los usuarios
- `GET /users/{id}`: Obtener un usuario por ID
- `PATCH /users/{id}`: Actualizar un usuario
- `DELETE /users/{id}`: Eliminar un usuario

### Encuestas

- `POST /surveys`: Crear una nueva encuesta
- `GET /surveys`: Obtener todas las encuestas
- `GET /surveys/{id}`: Obtener una encuesta por ID
- `PATCH /surveys/{id}`: Actualizar una encuesta
- `DELETE /surveys/{id}`: Eliminar una encuesta

#### Tipos de Preguntas

Las encuestas soportan los siguientes tipos de preguntas:
- `multiple_choice`: Preguntas de selección múltiple
- `single_choice`: Preguntas de selección única
- `text`: Preguntas de texto libre
- `scale`: Preguntas de escala

### Respuestas a Encuestas

- `POST /survey-responses`: Crear una nueva respuesta a una encuesta
- `GET /survey-responses`: Obtener todas las respuestas (con filtro opcional por encuesta o usuario)
- `GET /survey-responses/{id}`: Obtener una respuesta específica por ID
- `PATCH /survey-responses/{id}`: Actualizar una respuesta
- `DELETE /survey-responses/{id}`: Eliminar una respuesta

#### Estructura de Respuestas

Cada respuesta incluye:
- `surveyId`: ID de la encuesta respondida
- `userId`: ID del usuario que respondió
- `answers`: Array de respuestas, cada una con:
  - `questionId`: ID de la pregunta
  - `answer`: Respuesta proporcionada

### Alertas de Pánico

- `POST /panic-alerts`: Crear una nueva alerta de pánico
- `GET /panic-alerts`: Obtener todas las alertas de pánico (con filtro opcional por usuario)
- `GET /panic-alerts/{id}`: Obtener una alerta de pánico por ID
- `PATCH /panic-alerts/{id}`: Actualizar una alerta de pánico
- `DELETE /panic-alerts/{id}`: Eliminar una alerta de pánico

#### Parámetros de Ubicación

Las alertas de pánico incluyen coordenadas geográficas:
- `latitude`: Latitud (-90 a 90)
- `longitude`: Longitud (-180 a 180)

## Actualización de la Documentación

La documentación se actualiza manualmente cuando se realizan cambios en la API. Para mantener la documentación actualizada:

1. Actualiza el archivo `openapi.yaml` con los cambios necesarios
2. Verifica que la sintaxis YAML sea correcta
3. Importa la nueva versión en ApiDog

## Validación

Puedes validar la documentación OpenAPI usando herramientas como:
- [Swagger Editor](https://editor.swagger.io/)
- [OpenAPI.Tools](https://openapi.tools/) 