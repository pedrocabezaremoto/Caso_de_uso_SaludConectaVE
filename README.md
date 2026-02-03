# SaludConecta VE - Dashboard Interactivo de Casos de Uso

![SaludConecta VE](https://img.shields.io/badge/UNERG-Telemedicina-10b981)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## 📋 Descripción del Proyecto

Dashboard interactivo desarrollado para la **Universidad Nacional Experimental de los Llanos Occidentales "Ezequiel Zamora" (UNERG)** que visualiza los casos de uso del sistema de telemedicina **SaludConecta VE**.

Este proyecto permite:
- ✅ Visualizar actores y sus casos de uso
- ✅ Diferenciar relaciones **INCLUDE** (obligatorias) vs **EXTEND** (opcionales)
- ✅ Simular flujos completos de interacción
- ✅ Demostración educativa de diagramas UML

## 🎨 Características Principales

### Actores del Sistema
1. **Paciente** 👤 - Usuario final que busca atención médica
2. **Centro de Salud** 🏥 - Institución médica que gestiona servicios
3. **Médico** 👨‍⚕️ - Profesional de la salud
4. **Sistema** 💻 - Sistema de validación y seguridad

### Convenciones UML

#### 🟢 INCLUDE (Obligatorio)
- Líneas **sólidas** de color **verde**
- Siempre se ejecuta
- El caso padre REQUIERE el caso incluido
- Ejemplo: "Agendar Cita" siempre incluye "Validar Disponibilidad"

#### 🟠 EXTEND (Opcional/Condicional)
- Líneas **punteadas** de color **naranja**
- Puede ocurrir después
- No es parte del flujo principal
- Ejemplo: "Ver Estado" es opcional tras "Agendar Cita"

### Simulación de Flujo Completo

El botón **"Simular Flujo Completo"** ejecuta 4 fases automáticas:

1. **Fase 1 - Búsqueda** (3s)
   - UC1: Buscar Especialista
   - UC1A: Filtrar Zona
   - UC1B: Filtrar Especialidad

2. **Fase 2 - Seguridad** (2s)
   - UC9: Autenticarse
   - UC10A: Validar Credenciales

3. **Fase 3 - Agendamiento** (5s)
   - UC3: Agendar Cita
   - UC3A: Solicitar Cita
   - UC3B: Validar Disponibilidad
   - UC3C: Sincronizar Datos Locales
   - UC5: Ver Estado (opcional)

4. **Fase 4 - Gestión** (3s)
   - UC8: Confirmar Cita
   - UC8B: Rechazar Cita (opcional)

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js 18+ y npm instalados

### Pasos de Instalación

```bash
# 1. Navegar al directorio del proyecto
cd c:\Caso_de_uso

# 2. Instalar dependencias (si no se hizo antes)
npm install

# 3. Ejecutar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# El servidor se ejecutará en http://localhost:5173
```

### Build para Producción

```bash
# Generar build optimizado
npm run build

# Vista previa del build
npm run preview
```

## 🌐 Deploy en Vercel

### Opción 1: Deploy Automático desde GitHub

1. Sube el proyecto a GitHub
2. Conecta tu repositorio en [Vercel](https://vercel.com)
3. Vercel detectará automáticamente Vite
4. ¡Deploy listo!

### Opción 2: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🛠️ Stack Tecnológico

- **Framework**: React 18 con TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📁 Estructura del Proyecto

```
c:/Caso_de_uso/
├── src/
│   ├── components/
│   │   ├── ActorCard.tsx          # Tarjetas de actores
│   │   ├── UseCaseNode.tsx        # Nodos de casos de uso
│   │   ├── ConnectionLine.tsx     # Líneas de conexión animadas
│   │   ├── AnimatedBackground.tsx # Fondo con gradientes
│   │   ├── Legend.tsx             # Leyenda educativa
│   │   └── FlowSimulator.tsx      # Simulador de flujo
│   ├── data/
│   │   └── useCasesData.ts        # Datos de actores y casos de uso
│   ├── types/
│   │   └── index.ts               # Definiciones TypeScript
│   ├── App.tsx                    # Componente principal
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Estilos globales
├── index.html                     # HTML principal
├── package.json                   # Dependencias
├── tailwind.config.js             # Configuración Tailwind
├── tsconfig.json                  # Configuración TypeScript
└── vite.config.ts                 # Configuración Vite
```

## 🎓 Uso para Presentaciones Universitarias

### Modo Interactivo
1. **Selecciona un actor** para ver sus casos de uso específicos
2. **Pasa el mouse** sobre los nodos para ver requisitos del PDF
3. **Observa los colores** para identificar relaciones INCLUDE vs EXTEND

### Modo Demostración
1. Presiona **"Simular Flujo Completo"**
2. El sistema ejecutará automáticamente las 4 fases
3. Observa cómo se destacan los casos de uso secuencialmente

## 📚 Referencias Académicas

- **Requisitos Funcionales**: Según documento PDF del proyecto
- **Metodología UML**: Diagramas de Casos de Uso
- **Include vs Extend**: Convenciones de Ingeniería de Sistemas (UNERG)

## 📝 Licencia

Proyecto académico desarrollado para la UNERG.

## 👥 Autor

Proyecto de demostración universitaria - UNERG
Ingeniería de Sistemas

---

**¡Disfruta tu presentación! 🎉**
