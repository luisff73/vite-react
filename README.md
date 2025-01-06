# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

While this project uses React, Vite supports many popular JS frameworks. [See all the supported frameworks](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

## Deploy Your Own

Deploy your own Vite project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/vite-react&template=vite-react)

_Live Example: https://vite-react-example.vercel.app_

### Deploying From Your Terminal

You can deploy your new Vite project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
$ vercel
```

# Introducción
Este proyecto utiliza una pipeline declarativa de Jenkins para gestionar el flujo completo de desarrollo, pruebas y despliegue de una aplicación. Una pipeline es una secuencia de etapas que automatiza los pasos necesarios para construir, probar y desplegar el software. Este enfoque permite mantener un proceso repetible, eficiente y consistente.

## Conceptos Clave
Pipeline Declarativa:
En Jenkins, las pipelines declarativas ofrecen una sintaxis más sencilla y estructurada para definir las tareas de integración y despliegue continuo (CI/CD). Esta sintaxis organiza las etapas (stages) y los pasos (steps) necesarios para ejecutar las tareas.

## Stages y Steps:

Stages representan las etapas principales del proceso, como compilación, pruebas, construcción y despliegue. Estas etapas se dividen para estructurar el flujo de trabajo.
Steps son las tareas específicas que se ejecutan en cada etapa, como comandos de shell, instalación de dependencias o ejecución de scripts.
Parámetros:
Se definen parámetros como Executor, Motivo y ChatID para capturar información dinámica proporcionada por el usuario al ejecutar la pipeline.

## Post Actions:
Cada etapa puede incluir bloques post para realizar acciones específicas en función del resultado (éxito o fallo) de la etapa, como actualizar descripciones o enviar notificaciones.

## Notificaciones:
En este pipeline, se utiliza la API de Telegram para enviar un resumen del estado de ejecución de la pipeline al usuario. Esto asegura una comunicación eficaz sobre el resultado.

## Gestión de Credenciales:
Las credenciales sensibles, como tokens de acceso o contraseñas, se gestionan mediante el almacenamiento seguro de Jenkins. Estas se utilizan con los pasos withCredentials para proteger los datos sensibles durante la ejecución.

## Automatización del Despliegue:

Vercel: Se utiliza como plataforma de despliegue para automatizar el lanzamiento de la aplicación. Esto asegura que los cambios aprobados lleguen rápidamente al entorno de producción.
Integración Continua: Al utilizar herramientas como ESLint, Jest y Vite, el pipeline valida y construye el proyecto antes de desplegarlo.
Configuración del Pipeline
Para configurar y ejecutar esta pipeline en Jenkins, sigue los pasos a continuación:

## Preparar el Proyecto:

Asegúrate de que el proyecto incluya un archivo Jenkinsfile en su raíz.
Define scripts auxiliares, como updateReadme.mjs, pushChanges.mjs, y deployToVercel.mjs, en la carpeta correspondiente (jenkinsScripts en este caso).

# Configurar Jenkins:

Instala Jenkins y asegúrate de que los siguientes complementos estén instalados:
NodeJS para ejecutar comandos relacionados con Node.js.
Git para clonar y gestionar el repositorio.
Pipeline para habilitar la ejecución de pipelines declarativas.
Configura una instalación de Node.js en Jenkins (en "Global Tool Configuration").

## Configurar Credenciales:

Crea credenciales en Jenkins para manejar:
Acceso al repositorio de GitHub (usernamePassword).
Token de despliegue para Vercel (string).
Token de la API de Telegram (string).

## Crear un Proyecto en Jenkins:

Configura un nuevo proyecto basado en un repositorio de Git que contenga el Jenkinsfile.
Asegúrate de habilitar la opción para "Pipeline Script from SCM" y selecciona el repositorio.

## Ejecutar la Pipeline:

Proporciona los parámetros requeridos, como Executor, Motivo, y ChatID.
Observa el progreso en la consola de Jenkins mientras las etapas se ejecutan:
Linter: Valida el código con ESLint.
Test: Ejecuta los tests con Jest.
Build: Construye el proyecto usando Vite.
Update_Readme: Actualiza el archivo README.md con el estado del pipeline.
Deploy_to_Vercel: Despliega la aplicación en Vercel.
Notificación: Envía el resultado de las etapas a través de Telegram.

## Notificaciones:

Recibirás un mensaje en Telegram que resume el estado de cada etapa al final de la ejecución.  


RESULTADO DE LOS ULTIMOS TESTS
![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)
![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)
![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)
![Failure](https://img.shields.io/badge/test-failure-red)
![Failure](https://img.shields.io/badge/test-failure-red)
![Failure](https://img.shields.io/badge/test-failure-red)
![Failure](https://img.shields.io/badge/test-failure-red)
![Failure](https://img.shields.io/badge/test-failure-red)
![Failure](https://img.shields.io/badge/test-failure-red)


