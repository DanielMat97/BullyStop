import { MigrationInterface, QueryRunner } from 'typeorm';
import { Survey } from '../entities/surveys';
import { QuestionType } from '../../../application/surveys/dto/create-survey.dto';

export class SITABSurveysMigration1749100774649 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const surveyRepository = queryRunner.manager.getRepository(Survey);

    const surveyConcepto = surveyRepository.create({
      title: 'SITAB - Concepto General',
      questions: [
        {
          id: 1,
          question: '¿Qué significan las siglas "SITAB"?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Sistema Táctico Básico Policial',
            'Servicio Integral Táctico de Acción en Brigada',
            'Sistema Integral de Técnicas Anti Bloqueo',
            'Sinergia Táctica Balística'
          ]
        },
        {
          id: 2,
          question: 'Seleccione los componentes principales del SITAB:',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Preparación Mental',
            'Preparación Comunicativa',
            'Preparación Táctica',
            'Preparación Física',
            'Preparación Legal'
          ]
        },
        {
          id: 3,
          question: '¿Cuál es el objetivo principal del SITAB en la labor policial?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Ofrecer respuestas adecuadas minimizando riesgos en los procedimientos',
            'Aumentar el uso de la fuerza en todas las intervenciones',
            'Reaccionar de forma impulsiva ante situaciones críticas',
            'Priorizar la acción física sobre la prevención estratégica'
          ]
        },
        {
          id: 4,
          question: '¿Qué debe hacer el comandante de unidad para apoyar la aplicación del SITAB por parte del policía?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Brindar capacitación y acompañamiento durante y después de las intervenciones',
            'Evitar involucrarse en el entrenamiento del policía',
            'Exigir resultados sin ofrecer entrenamiento previo',
            'Permitir que el policía actúe sin supervisión ni guía'
          ]
        },
        {
          id: 5,
          question: '¿Cuál de los siguientes NO corresponde a los principios del SITAB?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'El uso inadecuado de la fuerza para imponer autoridad',
            'La protección de la integridad de las personas y del policía',
            'La reducción de riesgos en los procedimientos policiales',
            'El uso racional y profesional de las tácticas policiales'
          ]
        },
        {
          id: 6,
          question: 'Mencione un beneficio de aplicar el SITAB en los procedimientos policiales.',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 7,
          question: 'En una escala del 1 al 5, ¿cómo calificaría su comprensión general del SITAB?',
          type: QuestionType.SCALE,
          options: []
        }
      ]
    });

    const surveyEstres = surveyRepository.create({
      title: 'SITAB - Gestión del Estrés',
      questions: [
        {
          id: 1,
          question: 'Según el SITAB, ¿qué es lo que realmente genera el estrés en una situación de servicio?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'La interpretación o percepción que la persona tiene de la situación',
            'La gravedad intrínseca de la situación en sí misma',
            'El tiempo prolongado de duración del incidente',
            'La falta de experiencia del policía en el terreno'
          ]
        },
        {
          id: 2,
          question: '¿Cuál de las siguientes NO es una recomendación del SITAB para el manejo del estrés policial?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Permitir que las emociones influyan en la actuación profesional',
            'No tomar las situaciones a título personal durante el servicio',
            'Contar con apoyo y entrenamiento de los superiores',
            'Actuar acorde a las generalidades del SITAB en cada procedimiento'
          ]
        },
        {
          id: 3,
          question: 'Seleccione las estrategias mencionadas en SITAB para manejar el estrés policial:',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Realizar preparación mental a corto, mediano y largo plazo',
            'Practicar ejercicios de control de la respiración',
            'Controlar los pensamientos que alimentan el estrés negativo',
            'Tomar las situaciones de forma personal para darles importancia',
            'Actuar impulsivamente para liberar la tensión acumulada'
          ]
        },
        {
          id: 4,
          question: '¿A qué se refiere el término "estrés acumulativo" en el contexto policial?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Al estrés que se acumula por la exposición continua a situaciones difíciles',
            'Al estrés intenso y repentino ante una amenaza inmediata',
            'Al estado de calma que sigue a un evento crítico',
            'Al estrés que se experimenta únicamente fuera del trabajo'
          ]
        },
        {
          id: 5,
          question: 'La preparación mental a corto, mediano y largo plazo tiene como fin ___',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'fortalecer gradualmente la capacidad mental para enfrentar mejor las situaciones',
            'eliminar por completo el estrés del trabajo policial',
            'evitar tener que actuar en situaciones críticas del servicio',
            'incrementar intencionalmente el nivel de estrés para adaptarse'
          ]
        },
        {
          id: 6,
          question: '¿Cuál de las siguientes afirmaciones sobre el estrés es correcta?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'El estrés puede ser positivo, brindando alerta y energía por corto tiempo',
            'Todo estrés es siempre negativo y perjudicial para el policía',
            'El estrés depende únicamente de la gravedad de la situación externa',
            'La preparación mental no influye en la percepción del estrés'
          ]
        },
        {
          id: 7,
          question: 'Describa un ejercicio práctico que un policía pueda usar para controlar el estrés durante una intervención.',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 8,
          question: 'En una escala del 1 al 5, ¿qué tan preparado se siente para manejar el estrés en situaciones de alta presión?',
          type: QuestionType.SCALE,
          options: []
        }
      ]
    });

    const surveyComunicacion = surveyRepository.create({
      title: 'SITAB - Comunicación Asertiva',
      questions: [
        {
          id: 1,
          question: '¿Cómo se denomina al tipo de persona que se muestra colaboradora pero en realidad busca distraer la atención del policía?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Persona Incierta',
            'Persona Fácil',
            'Persona Difícil'
          ]
        },
        {
          id: 2,
          question: 'Seleccione las acciones necesarias para mostrar empatía con un ciudadano:',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Escuchar activamente al ciudadano',
            'Tratar de entender la perspectiva de la otra persona',
            'Expresar comprensión por los sentimientos del otro',
            'Interrumpir al ciudadano para dar instrucciones rápidamente',
            'Minimizar los problemas del ciudadano para tranquilizarlo'
          ]
        },
        {
          id: 3,
          question: '¿Qué significa la sigla "SEA" en el contexto de la comunicación policial?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Saludar, Escuchar, Actuar',
            'Seguridad, Empatía, Autoridad',
            'Sonreír, Explicar, Agradecer',
            'Serenidad, Ética, Asertividad'
          ]
        },
        {
          id: 4,
          question: '¿Cuál de las siguientes es una recomendación del SITAB para comunicarse durante conflictos?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Mantener la imparcialidad frente a las partes en desacuerdo',
            'Responder con la misma intensidad al ataque verbal',
            'Usar modismos populares para ganar confianza rápidamente',
            'Imponer su autoridad levantando la voz desde el inicio'
          ]
        },
        {
          id: 5,
          question: '¿Qué objetivos busca lograr el componente comunicativo del SITAB?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Aumentar la seguridad de los policías',
            'Demostrar profesionalismo en la intervención',
            'Mejorar la imagen institucional de la policía',
            'Imponer la autoridad a través del uso de la fuerza',
            'Reducir las quejas por uso inadecuado de la fuerza'
          ]
        },
        {
          id: 6,
          question: 'Para minimizar conflictos, el policía debe evitar ___',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'el uso de frases ofensivas o sarcásticas que puedan ofender',
            'escuchar demasiado al ciudadano durante la discusión',
            'mantener la calma y el profesionalismo al hablar',
            'emplear técnicas de evasión verbal en situaciones tensas'
          ]
        },
        {
          id: 7,
          question: 'Escriba un ejemplo de una "frase táctica" cortés que un policía podría usar al iniciar una intervención.',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 8,
          question: 'En una escala del 1 al 5, ¿qué tan competente se siente comunicándose asertivamente con la ciudadanía?',
          type: QuestionType.SCALE,
          options: []
        }
      ]
    });

    const surveyRoles = surveyRepository.create({
      title: 'SITAB - Roles de Patrulla',
      questions: [
        {
          id: 1,
          question: '¿Cuál de estos NO es un rol definido para los integrantes de una patrulla en el SITAB?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Función de Logística',
            'Función de Búsqueda',
            'Función de Seguridad',
            'Función de Apoyo'
          ]
        },
        {
          id: 2,
          question: '¿Cuál es la responsabilidad principal del policía en la función de Búsqueda dentro de la patrulla?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Realizar la inspección y registro, interactuando y persuadiendo a los intervenidos',
            'Brindar cobertura y seguridad al compañero que realiza la inspección',
            'Proteger a las víctimas y custodiar a los infractores detenidos',
            'Coordinar el apoyo externo y las comunicaciones'
          ]
        },
        {
          id: 3,
          question: '¿Qué función de la patrulla tiene la tarea de aplicar la técnica de triangulación y permanecer alerta a amenazas?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Función de Seguridad',
            'Función de Búsqueda',
            'Función de Apoyo',
            'Función de Inteligencia'
          ]
        },
        {
          id: 4,
          question: 'Seleccione las responsabilidades de la Función de Apoyo en una patrulla:',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Proteger a las víctimas durante el procedimiento',
            'Custodiar y proteger a los infractores detenidos',
            'Asegurar los espacios que ya fueron registrados',
            'Realizar la búsqueda principal de evidencias en el lugar',
            'Cubrir la seguridad de la zona en 360° si es necesario'
          ]
        },
        {
          id: 5,
          question: '¿Por qué es importante definir claramente los roles de Búsqueda, Seguridad y Apoyo en la patrulla?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Porque garantiza una coordinación y seguridad efectivas en el procedimiento',
            'Porque así cada policía puede actuar solo y sin comunicación',
            'Para poder asignar culpabilidad específica si algo sale mal',
            'Es solo un requisito formal, no influye en la operación real'
          ]
        },
        {
          id: 6,
          question: 'Mencione una medida que debe tomar el policía de Seguridad para proteger a su compañero durante una intervención.',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 7,
          question: '¿Qué tan preparado se siente para desempeñar cualquiera de las funciones de patrulla (búsqueda, seguridad, apoyo)? (1 = nada preparado, 5 = muy preparado)',
          type: QuestionType.SCALE,
          options: []
        }
      ]
    });

    const surveyTriangulacion = surveyRepository.create({
      title: 'SITAB - Triangulación',
      questions: [
        {
          id: 1,
          question: '¿En qué consiste la técnica de triangulación en un procedimiento policial?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'En que dos policías se posicionan formando un triángulo respecto al intervenido, manteniendo control visual sin cruzar líneas de tiro',
            'En rodear físicamente al sospechoso por tres lados para bloquear todas sus vías de escape',
            'En controlar simultáneamente a tres sospechosos con un solo policía',
            'En utilizar señales manuales en forma de triángulo para alertar al compañero de peligro'
          ]
        },
        {
          id: 2,
          question: '¿Cuál es la posición del policía de Seguridad al aplicar la triangulación?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Ubicarse de manera perpendicular a la persona intervenida, brindando cobertura',
            'Colocarse directamente frente al intervenido, a corta distancia',
            'Situarse justo detrás del intervenido, fuera de su vista',
            'Mantenerse a más de 10 metros como observador distante'
          ]
        },
        {
          id: 3,
          question: 'Al aplicar la triangulación, ¿cuáles de los siguientes principios se deben cumplir?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Mantener una distancia de seguridad adecuada durante el abordaje',
            'Tener control visual permanente del intervenido',
            'No cruzar la línea de tiro del compañero en ningún momento',
            'El policía de búsqueda mantiene el control directo del sospechoso',
            'El policía de seguridad se ubica paralelo al intervenido junto al compañero',
            'Cruzar la línea de fuego brevemente para ajustar la posición si es necesario'
          ]
        },
        {
          id: 4,
          question: '¿Por qué es importante no cruzar la línea de tiro del compañero durante la triangulación?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Para evitar ponerse en la trayectoria de fuego y prevenir accidentes de bala',
            'Para que el sospechoso no sepa hacia quién dirigirse o escapar',
            'Porque así se forma un triángulo equilátero alrededor del intervenido',
            'Para poder disparar simultáneamente sin coordinarse con el compañero'
          ]
        },
        {
          id: 5,
          question: '¿Quién tiene el control directo de la persona intervenida en la técnica de triangulación?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'El policía en función de Búsqueda',
            'El policía en función de Seguridad',
            'Ambos policías por igual',
            'Ninguno, el control es únicamente verbal a distancia'
          ]
        },
        {
          id: 6,
          question: 'Describa cómo se posicionan los dos policías respecto al sospechoso al realizar la triangulación.',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 7,
          question: '¿Qué tan útil considera la técnica de triangulación para mejorar la seguridad en una intervención policial? (1 = nada útil, 5 = muy útil)',
          type: QuestionType.SCALE,
          options: []
        }
      ]
    });

    const surveyRegistro = surveyRepository.create({
      title: 'SITAB - Registro a Personas',
      questions: [
        {
          id: 1,
          question: '¿Cuál es el propósito de realizar el registro a una persona por cuadrantes?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Asegurar una inspección completa y ordenada del individuo por zonas del cuerpo',
            'Imponer disciplina al intervenido con movimientos rápidos',
            'Reducir el tiempo omitiendo partes menos importantes del cuerpo',
            'Confundir al sospechoso cambiando aleatoriamente el área de registro'
          ]
        },
        {
          id: 2,
          question: '¿Qué medidas de seguridad se deben tomar al realizar el registro físico de una persona?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Mantener el control de las manos del intervenido en todo momento',
            'Estar atento a cualquier reacción o movimiento del intervenido',
            'Realizar el registro siguiendo un orden preestablecido (por cuadrantes)',
            'Permitir que el intervenido mantenga sus manos libres durante el registro',
            'Efectuar el registro sin apoyo, mientras el compañero se distancia'
          ]
        },
        {
          id: 3,
          question: '¿En qué zona del cuerpo inicia el Cuadrante 1 del registro según el método enseñado?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'En la cintura y cadera del intervenido',
            'En la cabeza y el cuello del intervenido',
            'En los brazos y manos del intervenido',
            'En las piernas y pies del intervenido'
          ]
        },
        {
          id: 4,
          question: 'Durante el registro, si se encuentra un objeto ilegal en el intervenido, ¿qué se debe hacer?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Informar al compañero y asegurar el objeto siguiendo el protocolo establecido',
            'Ignorarlo momentáneamente y continuar con el registro',
            'Continuar registrando y al final notificar de forma general',
            'Suspender el registro inmediatamente y retirarse del lugar'
          ]
        },
        {
          id: 5,
          question: 'Describa brevemente el procedimiento de registro por cuadrantes a una persona.',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 6,
          question: '¿Qué debe estar haciendo el compañero de patrulla mientras se realiza el registro a la persona?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Vigilar el entorno y cubrir la seguridad del procedimiento',
            'Participar simultáneamente palpando al intervenido',
            'Buscar testigos alejándose de la escena',
            'Observar pasivamente sin ninguna función específica'
          ]
        },
        {
          id: 7,
          question: '¿Qué tan confiado se siente al efectuar un registro corporal completo siguiendo un método sistemático? (1 = nada confiado, 5 = muy confiado)',
          type: QuestionType.SCALE,
          options: []
        }
      ]
    });

    const surveyVehicular = surveyRepository.create({
      title: 'SITAB - Intervención Vehicular',
      questions: [
        {
          id: 1,
          question: '¿A qué distancia aproximada debe ubicarse el vehículo policial respecto al vehículo detenido?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'A unos 4 a 5 metros detrás del vehículo intervenido',
            'Pegado al parachoques trasero del vehículo intervenido',
            'A al menos 15 metros de distancia del vehículo intervenido',
            'La distancia no es relevante mientras esté alineado detrás'
          ]
        },
        {
          id: 2,
          question: '¿Por qué se debe orientar la rueda delantera del patrullero hacia la izquierda durante una parada vehicular?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Para crear una barrera de seguridad en caso de un choque o embestida',
            'Para indicar al conductor detenido que debe salir por la izquierda',
            'Por motivos estéticos de la posición táctica del vehículo',
            'No es relevante la orientación de la rueda en la detención'
          ]
        },
        {
          id: 3,
          question: 'Seleccione las medidas iniciales antes de acercarse a un vehículo intervenido:',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Activar las luces estroboscópicas y la sirena del patrullero',
            'Usar el sistema de perifoneo para dar indicaciones al conductor',
            'Detenerse a unos 4-5 metros manteniendo el patrullero en ángulo de 30%',
            'Descender inmediatamente del patrullero sin alertar al conductor',
            'Apagar todas las luces del patrullero para no ser blanco fácil'
          ]
        },
        {
          id: 4,
          question: '¿Qué instrucción debe darse a los ocupantes de un vehículo detenido?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Permanecer en el vehículo con las manos visibles en todo momento',
            'Que busquen sus documentos de inmediato mientras el policía se aproxima',
            'Que todos desciendan del vehículo lentamente y uno por uno',
            'No dar ninguna instrucción hasta llegar a la ventana del conductor'
          ]
        },
        {
          id: 5,
          question: '¿Cuál de estas partes de un vehículo ofrece cobertura balística al policía en caso de riesgo?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'El bloque del motor del vehículo',
            'Las ventanillas de vidrio del vehículo',
            'La carrocería lateral lisa del vehículo',
            'Las llantas (neumáticos) del vehículo'
          ]
        },
        {
          id: 6,
          question: 'Para una intervención vehicular segura, seleccione las recomendaciones que se deben seguir:',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Analizar el entorno y posibles amenazas antes de aproximarse',
            'Mantener una posición estratégica usando el vehículo como cobertura',
            'Exponerse en la línea de fuego para hacer contacto visual rápidamente',
            'Coordinarse con el compañero mediante códigos de alerta',
            'Abrir la puerta del vehículo intervenido en cuanto se llega a ella',
            'Priorizar minimizar los riesgos sobre la velocidad del procedimiento'
          ]
        },
        {
          id: 7,
          question: 'Explique por qué es importante identificar las "áreas de seguridad" de un vehículo al realizar una intervención.',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 8,
          question: 'En una escala del 1 al 5, ¿qué tan preparado se siente para efectuar una parada e intervención vehicular de forma segura?',
          type: QuestionType.SCALE,
          options: []
        }
      ]
    });

    const surveyMotocicleta = surveyRepository.create({
      title: 'SITAB - Abordaje de Motocicleta',
      questions: [
        {
          id: 1,
          question: '¿Qué se debe hacer antes de descender de una motocicleta policial?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Apagar el motor y colocar de forma segura el soporte lateral o central',
            'Poner la motocicleta en neutro y saltar rápidamente para reaccionar',
            'Acelerar el motor levemente para estabilizar la moto antes de bajar',
            'No es necesario ningún paso previo; simplemente bajarse con rapidez'
          ]
        },
        {
          id: 2,
          question: '¿Por qué es importante evitar movimientos bruscos al bajar de la motocicleta?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Para no desestabilizar el vehículo y prevenir caídas',
            'Para no llamar la atención de las personas alrededor',
            'Porque la moto podría acelerar súbitamente sola',
            'Porque podría dañar la suspensión de la motocicleta'
          ]
        },
        {
          id: 3,
          question: 'Al abordar una motocicleta policial, ¿qué medidas de seguridad se deben tener en cuenta?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Verificar que la motocicleta esté estable sobre su soporte antes de montarla',
            'Mantener ambas manos en el manubrio al subir y bajar de la moto',
            'Ajustar correctamente el casco y el chaleco reflectivo antes de iniciar marcha',
            'Subir o bajar siempre por el lado opuesto al soporte lateral de la moto',
            'No es necesario el casco si el trayecto es muy corto'
          ]
        },
        {
          id: 4,
          question: 'Además del descenso cuidadoso, seleccione las prácticas que promueven la seguridad vial y protección personal en la motocicleta policial:',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Usar siempre el casco homologado y el chaleco reflectivo al conducir',
            'Cumplir con las normas de tránsito vigentes incluso en servicio',
            'Mantener la motocicleta en buen estado mecánico con revisiones periódicas',
            'Conducir en contravía para reducir el tiempo de respuesta a emergencias',
            'Realizar maniobras riesgosas solo cuando la vía esté despejada'
          ]
        },
        {
          id: 5,
          question: '¿Por qué es más seguro subir y bajar por el lado izquierdo de la motocicleta policial?',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 6,
          question: 'Describa el procedimiento correcto para descender de una motocicleta policial de forma segura.',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 7,
          question: '¿Qué tan cómodo se siente al realizar las maniobras de subir y bajar de la motocicleta siguiendo las técnicas adecuadas? (1 = nada cómodo, 5 = muy cómodo)',
          type: QuestionType.SCALE,
          options: []
        }
      ]
    });

    const surveyRecintos = surveyRepository.create({
      title: 'SITAB - Ingreso a Recintos',
      questions: [
        {
          id: 1,
          question: '¿En qué consiste la "técnica de vistazos" al ingresar a un recinto cerrado?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'En inspeccionar por etapas: primero área cercana, luego centro, esquina opuesta y esquina próxima de la entrada',
            'En ingresar rápidamente para tomar por sorpresa a posibles sospechosos antes de que reaccionen',
            'En hacer contacto visual inmediato con cualquier persona dentro del recinto',
            'En lanzar un objeto al interior para provocar alguna reacción antes de entrar'
          ]
        },
        {
          id: 2,
          question: 'Al aplicar el método Giraldi o "corte pastel", ¿qué pasos se deben seguir?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Dividir la observación del espacio en segmentos antes de avanzar',
            'Inspeccionar cada segmento antes de pasar al siguiente',
            'Mantener control visual continuo de las áreas ya aseguradas',
            'Ingresar de forma gradual y segura al área de intervención',
            'Correr directamente al centro de la habitación al entrar',
            'Dar la espalda a áreas ya inspeccionadas para avanzar más rápido'
          ]
        },
        {
          id: 3,
          question: 'Antes de ingresar a un recinto, ¿qué debe hacer el equipo policial según las tácticas enseñadas?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Planificar la intervención definiendo qué decir, cómo actuar y preparar el equipo necesario',
            'Ingresar sin plan previo para adaptarse espontáneamente a lo que ocurra',
            'Esperar a reunir un grupo numeroso de policías antes de actuar',
            'Apagar todas las luces externas para mantener oculto el ingreso'
          ]
        },
        {
          id: 4,
          question: 'Seleccione los principios básicos para la búsqueda de personas dentro de un recinto cerrado:',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Definir una ruta de retirada segura antes de avanzar',
            'No avanzar hacia áreas no aseguradas del recinto',
            'Priorizar el diálogo y evitar acciones que provoquen violencia innecesaria',
            'Asignar roles específicos de búsqueda y seguridad al equipo',
            'Separarse del compañero para cubrir más área rápidamente',
            'Ignorar vías de escape ya que la prioridad es la búsqueda'
          ]
        },
        {
          id: 5,
          question: '¿Qué técnica personal deben aplicar los policías para controlar el estrés durante una intervención en recintos?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Controlar la respiración para mantener la calma en cada paso',
            'Ignorar la tensión hasta finalizar completamente el operativo',
            'Acelerar el ritmo de búsqueda para terminar lo antes posible',
            'Consumir cafeína para aumentar la alerta en el momento'
          ]
        },
        {
          id: 6,
          question: 'Si al ingresar a un recinto se encuentra con personas en su interior, ¿qué se recomienda hacer?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Emplear comandos verbales claros una vez tenga contacto visual con ellas',
            'Iniciar un enfrentamiento físico inmediato para neutralizarlas',
            'Retirarse del recinto de inmediato sin decir palabra',
            'Avanzar directamente hacia ellas sin comunicación verbal'
          ]
        },
        {
          id: 7,
          question: 'Explique brevemente en qué consiste el método "corte pastel" (método Giraldi) para el ingreso a recintos.',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 8,
          question: '¿Qué tan preparado se siente para liderar la búsqueda de personas en un recinto siguiendo estos métodos? (1 = nada preparado, 5 = muy preparado)',
          type: QuestionType.SCALE,
          options: []
        }
      ]
    });

    const surveyEvasiones = surveyRepository.create({
      title: 'SITAB - Manejo de Agresiones Verbales',
      questions: [
        {
          id: 1,
          question: '¿Cuál es el objetivo principal de usar "evasiones verbales" ante un ataque verbal de un ciudadano?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Desviar o redirigir el ataque verbal para no entrar en un conflicto y cumplir el objetivo',
            'Responder con insultos más inteligentes para imponerse en la discusión',
            'Ignorar por completo al ciudadano hasta que deje de gritar',
            'Interrumpir al ciudadano elevando el tono de voz para silenciarlo'
          ]
        },
        {
          id: 2,
          question: '¿Qué estrategias ayudan a reducir la confrontación con un ciudadano agresivo?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Usar un tono de voz calmado y controlado al responder',
            'Empatizar con el ciudadano (ej.: "Le entiendo, me imagino cómo se siente...")',
            'Evitar responder a provocaciones personales o insultos',
            'Iniciar el diálogo con frases corteses y respetuosas',
            'Corregir y reprender inmediatamente el lenguaje del ciudadano',
            'Amenazar con consecuencias si continúa la agresión verbal'
          ]
        },
        {
          id: 3,
          question: '¿Cuál de estas frases NO debería usar un policía si quiere evitar un conflicto verbal?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            '¡Cálmese o lo arresto ahora mismo!',
            'Comprendo lo que me está diciendo, señor.',
            'Su opinión es importante; permítame explicarle...',
            'Quiero ayudarlo, solo le pido que me escuche un momento.'
          ]
        },
        {
          id: 4,
          question: '¿Por qué es importante no tomar las ofensas verbales de un ciudadano a título personal?',
          type: QuestionType.SINGLE_CHOICE,
          options: [
            'Porque reaccionar emocionalmente puede afectar la actuación profesional del policía',
            'Porque usualmente los insultos del ciudadano son ciertos',
            'Porque el ciudadano tiene derecho a insultar libremente al policía',
            'Porque así el policía puede responder con sarcasmo sin remordimiento'
          ]
        },
        {
          id: 5,
          question: 'Proporcione un ejemplo de una "evasión verbal" que usaría si un ciudadano lo insulta durante un procedimiento.',
          type: QuestionType.TEXT,
          options: []
        },
        {
          id: 6,
          question: 'Identifique las frases tácticas apropiadas para iniciar una intervención de forma cortés:',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Buenas tardes, somos de la Policía. ¿En qué le puedo colaborar?',
            '¡Quieto! Muéstreme sus documentos ahora mismo.',
            'Señor, comprendo su situación; estamos aquí para ayudar.',
            'Cálmese o tendremos que usar la fuerza, ¿entendido?',
            'Por favor, le pido que me escuche un momento para explicarle...',
            'Usted cállese y escúcheme primero, luego habla.'
          ]
        },
        {
          id: 7,
          question: 'Del 1 al 5, ¿qué tan desafiante le resulta mantener la calma y la cortesía cuando recibe insultos durante el servicio?',
          type: QuestionType.SCALE,
          options: []
        }
      ]
    });

    await surveyRepository.save([
      surveyConcepto,
      surveyEstres,
      surveyComunicacion,
      surveyRoles,
      surveyTriangulacion,
      surveyRegistro,
      surveyVehicular,
      surveyMotocicleta,
      surveyRecintos,
      surveyEvasiones
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const surveyRepository = queryRunner.manager.getRepository(Survey);
    await surveyRepository.delete({ title: 'SITAB - Concepto General' });
    await surveyRepository.delete({ title: 'SITAB - Gestión del Estrés' });
    await surveyRepository.delete({ title: 'SITAB - Comunicación Asertiva' });
    await surveyRepository.delete({ title: 'SITAB - Roles de Patrulla' });
    await surveyRepository.delete({ title: 'SITAB - Triangulación' });
    await surveyRepository.delete({ title: 'SITAB - Registro a Personas' });
    await surveyRepository.delete({ title: 'SITAB - Intervención Vehicular' });
    await surveyRepository.delete({ title: 'SITAB - Abordaje de Motocicleta' });
    await surveyRepository.delete({ title: 'SITAB - Ingreso a Recintos' });
    await surveyRepository.delete({ title: 'SITAB - Manejo de Agresiones Verbales' });
  }
}
