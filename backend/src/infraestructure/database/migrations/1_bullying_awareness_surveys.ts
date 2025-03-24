import { MigrationInterface, QueryRunner } from 'typeorm';
import { Survey } from '../entities/surveys';
import { QuestionType } from '../../../application/surveys/dto/create-survey.dto';

export class BullyingAwarenessSurveys1710428400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const surveyRepository = queryRunner.manager.getRepository(Survey);

    // Encuesta 1: Identificación de Bullying
    const identificationSurvey = surveyRepository.create({
      title: 'Reconocimiento y Detección de Bullying',
      questions: [
        {
          id: 1,
          question: '¿Alguna vez has sido testigo de situaciones donde alguien es excluido deliberadamente de actividades grupales?',
          type: QuestionType.SINGLE_CHOICE,
          options: ['Nunca', 'Rara vez', 'Algunas veces', 'Frecuentemente', 'Muy frecuentemente']
        },
        {
          id: 2,
          question: '¿Has notado a compañeros que son objeto de burlas constantes o apodos ofensivos?',
          type: QuestionType.SINGLE_CHOICE,
          options: ['Nunca', 'Rara vez', 'Algunas veces', 'Frecuentemente', 'Muy frecuentemente']
        },
        {
          id: 3,
          question: '¿Has observado situaciones donde alguien es intimidado físicamente (empujones, golpes)?',
          type: QuestionType.SINGLE_CHOICE,
          options: ['Nunca', 'Rara vez', 'Algunas veces', 'Frecuentemente', 'Muy frecuentemente']
        },
        {
          id: 4,
          question: '¿Has visto a compañeros que difunden rumores o comentarios negativos sobre otros?',
          type: QuestionType.SINGLE_CHOICE,
          options: ['Nunca', 'Rara vez', 'Algunas veces', 'Frecuentemente', 'Muy frecuentemente']
        },
        {
          id: 5,
          question: '¿Qué comportamientos consideras que constituyen bullying? (Selecciona todos los que apliquen)',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Bromas ocasionales entre amigos', 
            'Exclusión sistemática de actividades', 
            'Insultos o apodos constantes', 
            'Agresión física', 
            'Difusión de rumores',
            'Cyberbullying (acoso en redes sociales)',
            'Daño a pertenencias personales'
          ]
        }
      ]
    });

    // Encuesta 2: Evaluación de Clima Escolar
    const schoolClimateSurvey = surveyRepository.create({
      title: 'Evaluación del Ambiente Escolar',
      questions: [
        {
          id: 1,
          question: '¿Te sientes seguro/a en tu escuela?',
          type: QuestionType.SCALE,
          options: ['1 - Nada seguro', '2', '3', '4', '5 - Completamente seguro']
        },
        {
          id: 2,
          question: '¿Cómo calificarías la actitud de los profesores frente a situaciones de conflicto entre estudiantes?',
          type: QuestionType.SCALE,
          options: ['1 - Muy mala', '2', '3', '4', '5 - Excelente']
        },
        {
          id: 3,
          question: '¿En tu escuela existen mecanismos claros para reportar situaciones de bullying?',
          type: QuestionType.SINGLE_CHOICE,
          options: ['Sí, y son efectivos', 'Sí, pero no son efectivos', 'No existen', 'No estoy seguro/a']
        },
        {
          id: 4,
          question: '¿Qué tan frecuentes son las actividades de prevención de bullying en tu escuela?',
          type: QuestionType.SINGLE_CHOICE,
          options: ['Nunca se realizan', 'Una vez al año', 'Una vez por semestre', 'Mensualmente', 'Semanalmente']
        },
        {
          id: 5,
          question: '¿Qué sugerencias tienes para mejorar el ambiente escolar y prevenir el bullying?',
          type: QuestionType.TEXT
        }
      ]
    });

    // Encuesta 3: Experiencias Personales
    const personalExperienceSurvey = surveyRepository.create({
      title: 'Experiencias Personales con el Bullying',
      questions: [
        {
          id: 1,
          question: '¿Has experimentado alguna forma de bullying en los últimos 6 meses?',
          type: QuestionType.SINGLE_CHOICE,
          options: ['Nunca', 'Una o dos veces', 'Mensualmente', 'Semanalmente', 'Diariamente']
        },
        {
          id: 2,
          question: 'Si has experimentado bullying, ¿de qué tipo ha sido principalmente?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: ['Verbal', 'Físico', 'Social (exclusión)', 'Cibernético', 'No he experimentado bullying']
        },
        {
          id: 3,
          question: '¿Has buscado ayuda cuando te has sentido acosado/a o has visto a alguien siendo acosado?',
          type: QuestionType.SINGLE_CHOICE,
          options: ['Siempre', 'A veces', 'Rara vez', 'Nunca', 'No aplica']
        },
        {
          id: 4,
          question: '¿A quién acudirías si experimentaras o presenciaras una situación de bullying?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: ['Padres', 'Profesores', 'Consejero escolar', 'Amigos', 'Directivos escolares', 'Línea de ayuda', 'Nadie']
        },
        {
          id: 5,
          question: 'Describe una situación donde te hayas sentido intimidado o hayas visto a alguien siendo intimidado. ¿Cómo se manejó?',
          type: QuestionType.TEXT
        }
      ]
    });

    // Encuesta 4: Estrategias de Intervención
    const interventionStrategiesSurvey = surveyRepository.create({
      title: 'Estrategias para Intervenir en Situaciones de Bullying',
      questions: [
        {
          id: 1,
          question: '¿Qué harías si vieras a un compañero siendo acosado?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Intervenir directamente', 
            'Buscar ayuda de un adulto', 
            'Ofrecer apoyo a la víctima después', 
            'Ignorar la situación',
            'Unirme al grupo para no ser excluido'
          ]
        },
        {
          id: 2,
          question: '¿Qué estrategias consideras más efectivas para detener el bullying?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Educación y concientización', 
            'Sanciones severas para agresores', 
            'Programas de mediación entre pares', 
            'Mayor supervisión de adultos',
            'Desarrollo de habilidades sociales y emocionales'
          ]
        },
        {
          id: 3,
          question: '¿Te sientes preparado/a para intervenir si ves una situación de bullying?',
          type: QuestionType.SCALE,
          options: ['1 - Nada preparado', '2', '3', '4', '5 - Completamente preparado']
        },
        {
          id: 4,
          question: '¿Cuáles crees que son las consecuencias más graves del bullying?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: [
            'Bajo rendimiento académico', 
            'Problemas de autoestima', 
            'Depresión y ansiedad', 
            'Pensamientos suicidas',
            'Problemas de integración social',
            'Abandono escolar'
          ]
        },
        {
          id: 5,
          question: '¿Qué recursos o herramientas necesitarías para sentirte más seguro interviniendo en situaciones de bullying?',
          type: QuestionType.TEXT
        }
      ]
    });

    // Guardar las encuestas en la base de datos
    await surveyRepository.save([
      identificationSurvey,
      schoolClimateSurvey,
      personalExperienceSurvey,
      interventionStrategiesSurvey
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const surveyRepository = queryRunner.manager.getRepository(Survey);
    
    // Eliminar las encuestas por título
    await surveyRepository.delete({
      title: 'Reconocimiento y Detección de Bullying'
    });
    
    await surveyRepository.delete({
      title: 'Evaluación del Ambiente Escolar'
    });
    
    await surveyRepository.delete({
      title: 'Experiencias Personales con el Bullying'
    });
    
    await surveyRepository.delete({
      title: 'Estrategias para Intervenir en Situaciones de Bullying'
    });
  }
} 