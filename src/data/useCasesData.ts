import type { Actor, UseCase, Relationship, FlowPhase } from '../types';

// Actores del sistema
export const actors: Actor[] = [
    {
        id: 'paciente',
        name: 'Paciente',
        icon: 'User',
        color: 'emerald',
        description: 'Usuario final que busca atención médica',
    },
    {
        id: 'centro',
        name: 'Centro de Salud',
        icon: 'Building2',
        color: 'institutional',
        description: 'Institución médica que gestiona servicios',
    },
    {
        id: 'medico',
        name: 'Médico',
        icon: 'Stethoscope',
        color: 'emerald',
        description: 'Profesional de la salud',
    },
    {
        id: 'sistema',
        name: 'Sistema SaludConecta VE',
        icon: 'Database',
        color: 'institutional',
        description: 'Sistema de validación y seguridad',
    },
];

// Casos de uso del sistema
export const useCases: UseCase[] = [
    // PACIENTE - Casos de uso
    {
        id: 'UC1',
        name: 'Buscar Especialista',
        description: 'El paciente busca un médico especialista según filtros',
        requirement: 'RF-1 Directorio de Especialistas',
        actorId: 'paciente',
        isParent: true,
    },
    {
        id: 'UC1A',
        name: 'Filtrar Zona',
        description: 'Filtrar especialistas por ubicación geográfica',
        requirement: 'RF-1 Directorio de Especialistas',
        actorId: 'paciente',
        isChild: true,
    },
    {
        id: 'UC1B',
        name: 'Filtrar Especialidad',
        description: 'Filtrar especialistas por área médica',
        requirement: 'RF-1 Directorio de Especialistas',
        actorId: 'paciente',
        isChild: true,
    },
    {
        id: 'UC2',
        name: 'Ver Perfil de Especialista',
        description: 'Consultar información pública del médico',
        requirement: 'RF-5 Perfil Médico de Especialista',
        actorId: 'paciente',
    },
    {
        id: 'UC3',
        name: 'Agendar Cita',
        description: 'El paciente intenta agendar una cita médica',
        requirement: 'RF-2 Gestión de Agendamiento Asíncrono',
        actorId: 'paciente',
        isParent: true,
    },
    {
        id: 'UC3A',
        name: 'Solicitar Cita',
        description: 'Enviar solicitud de cita al sistema',
        requirement: 'RF-2 Gestión de Agendamiento Asíncrono',
        actorId: 'paciente',
        isChild: true,
    },
    {
        id: 'UC3B',
        name: 'Validar Disponibilidad',
        description: 'Verificar que el horario esté disponible',
        requirement: 'RF-2 Gestión de Agendamiento Asíncrono',
        actorId: 'paciente',
        isChild: true,
    },
    {
        id: 'UC3C',
        name: 'Sincronizar Datos Locales',
        description: 'Sincronización offline-first después de agendar',
        requirement: 'RF-2 Gestión de Agendamiento Asíncrono',
        actorId: 'paciente',
        isChild: true,
    },
    {
        id: 'UC5',
        name: 'Ver Estado de Cita',
        description: 'Consultar si la cita fue confirmada, rechazada o está pendiente',
        requirement: 'Visualizar estados: Solicitada, Confirmada, Cancelada',
        actorId: 'paciente',
    },
    {
        id: 'UC6',
        name: 'Contactar Centro de Salud',
        description: 'Comunicarse directamente con el centro para consultas',
        requirement: 'RF-4 Enlace de Comunicación Externa',
        actorId: 'paciente',
        isParent: true,
    },
    {
        id: 'UC6A',
        name: 'Redirigir a WhatsApp',
        description: 'Redirección a API de mensajería WhatsApp',
        requirement: 'RF-4 Enlace de Comunicación Externa',
        actorId: 'paciente',
        isChild: true,
    },
    {
        id: 'UC9',
        name: 'Autenticarse',
        description: 'El paciente inicia sesión en la plataforma',
        requirement: 'RNF-3 Seguridad de Acceso',
        actorId: 'paciente',
        isParent: true,
    },

    // CENTRO DE SALUD - Casos de uso
    {
        id: 'UC7',
        name: 'Gestionar Disponibilidad',
        description: 'Administrar horarios y disponibilidad de médicos',
        requirement: 'RF-2 Gestión de Agendamiento',
        actorId: 'centro',
        isParent: true,
    },
    {
        id: 'UC7A',
        name: 'Cargar Horarios',
        description: 'Cargar horarios disponibles de médicos',
        requirement: 'RF-2 Gestión de Agendamiento',
        actorId: 'centro',
        isChild: true,
    },
    {
        id: 'UC7B',
        name: 'Actualizar Perfil',
        description: 'Actualizar información del centro y médicos',
        requirement: 'RF-5 Perfil Médico',
        actorId: 'centro',
        isChild: true,
    },
    {
        id: 'UC8',
        name: 'Confirmar Cita',
        description: 'El centro confirma la cita solicitada',
        requirement: 'RF-2 Gestión de Agendamiento',
        actorId: 'centro',
    },
    {
        id: 'UC8B',
        name: 'Rechazar Cita',
        description: 'El centro rechaza la cita (alternativa a confirmar)',
        requirement: 'RF-2 Gestión de Agendamiento',
        actorId: 'centro',
    },

    // MÉDICO - Casos de uso
    {
        id: 'UC9_MED',
        name: 'Autenticarse',
        description: 'Acceso seguro al panel de especialista',
        requirement: 'RNF-3 Seguridad de Acceso',
        actorId: 'medico',
        isParent: true,
    },
    {
        id: 'UC7A_MED',
        name: 'Cargar Horarios',
        description: 'Definir disponibilidad de atención',
        requirement: 'RF-2 Gestión de Agendamiento',
        actorId: 'medico',
    },
    {
        id: 'UC7B_MED',
        name: 'Actualizar Perfil',
        description: 'Modificar datos profesionales y especialidad',
        requirement: 'RF-5 Perfil Médico',
        actorId: 'medico',
    },

    // SISTEMA - Casos de uso
    {
        id: 'UC10A',
        name: 'Validar Credenciales',
        description: 'Validación de credenciales (Usuario y contraseña)',
        requirement: 'RNF-3 Seguridad de Acceso',
        actorId: 'sistema',
        isChild: true,
    },
    {
        id: 'UC3C_SYS',
        name: 'Sincronizar Datos Locales',
        description: 'Sincronización automática al detectar conexión estable',
        requirement: 'RF-2 Gestión de Agendamiento Asíncrono',
        actorId: 'sistema',
    },
];

// Relaciones entre casos de uso
export const relationships: Relationship[] = [
    // UC1: Buscar Especialista
    {
        id: 'R1',
        type: 'include',
        from: 'UC1',
        to: 'UC1A',
        label: 'Filtrar Zona',
    },
    {
        id: 'R2',
        type: 'include',
        from: 'UC1',
        to: 'UC1B',
        label: 'Filtrar Especialidad',
    },

    // UC3: Agendar Cita
    {
        id: 'R3',
        type: 'include',
        from: 'UC3',
        to: 'UC3A',
        label: 'Solicitar Cita',
    },
    {
        id: 'R4',
        type: 'include',
        from: 'UC3',
        to: 'UC3B',
        label: 'Validar Disponibilidad',
    },
    {
        id: 'R5',
        type: 'include',
        from: 'UC3',
        to: 'UC3C',
        label: 'Sincronizar Datos',
    },

    // UC5: Ver Estado (EXTEND desde UC3)
    {
        id: 'R6',
        type: 'extend',
        from: 'UC5',
        to: 'UC3',
        label: 'Ver Estado',
    },

    // UC6: Contactar Centro
    {
        id: 'R7',
        type: 'include',
        from: 'UC6',
        to: 'UC6A',
        label: 'Redirigir WhatsApp',
    },

    // UC9: Autenticarse
    {
        id: 'R8',
        type: 'include',
        from: 'UC9',
        to: 'UC10A',
        label: 'Validar Credenciales',
    },

    // UC9_MED: Autenticarse (Médico)
    {
        id: 'R8_MED',
        type: 'include',
        from: 'UC9_MED',
        to: 'UC10A',
        label: 'Validar Credenciales',
    },

    // UC7: Gestionar Disponibilidad
    {
        id: 'R9',
        type: 'include',
        from: 'UC7',
        to: 'UC7A',
        label: 'Cargar Horarios',
    },
    {
        id: 'R10',
        type: 'include',
        from: 'UC7',
        to: 'UC7B',
        label: 'Actualizar Perfil',
    },

    // UC8: Confirmar Cita (EXTEND desde UC3)
    {
        id: 'R11',
        type: 'extend',
        from: 'UC8',
        to: 'UC3',
        label: 'Confirmar Cita',
    },

    // UC8B: Rechazar Cita (EXTEND desde UC8)
    {
        id: 'R12',
        type: 'extend',
        from: 'UC8B',
        to: 'UC8',
        label: 'Rechazar Cita',
    },
];

// Fases del flujo de simulación
export const flowPhases: FlowPhase[] = [
    {
        id: 1,
        name: 'Búsqueda',
        description: 'El paciente busca especialistas disponibles',
        useCases: ['UC1', 'UC2', 'UC5', 'UC6'],
        duration: 4000,
        activeActorId: 'paciente'
    },
    {
        id: 2,
        name: 'Autenticación',
        description: 'El usuario inicia sesión para continuar',
        useCases: ['UC9'],
        duration: 3000,
        activeActorId: 'paciente'
    },
    {
        id: 3,
        name: 'Seguridad',
        description: 'El sistema valida las credenciales',
        useCases: ['UC10A', 'UC3C_SYS'],
        duration: 3000,
        activeActorId: 'sistema'
    },
    {
        id: 4,
        name: 'Agendamiento',
        description: 'Proceso de selección y solicitud de cita',
        useCases: ['UC3', 'UC3A', 'UC4'],
        duration: 4000,
        activeActorId: 'paciente'
    },
    {
        id: 5,
        name: 'Gestión Centro',
        description: 'El centro administra la disponibilidad',
        useCases: ['UC7', 'UC7A', 'UC7B'],
        duration: 4000,
        activeActorId: 'centro'
    },
    {
        id: 6,
        name: 'Gestión Médico',
        description: 'El especialista actualiza su perfil',
        useCases: ['UC7A_MED', 'UC7B_MED', 'UC9_MED'],
        duration: 4000,
        activeActorId: 'medico'
    },
    {
        id: 7,
        name: 'Confirmación',
        description: 'Confirmación final de la cita',
        useCases: ['UC8', 'UC3B'],
        duration: 3000,
        activeActorId: 'centro'
    }
];
