# Introducción
Este proyecto utiliza una pipeline declarativa de Jenkins para gestionar el flujo completo de desarrollo, pruebas y despliegue de una aplicación.  
Una pipeline es una secuencia de etapas que automatiza los pasos necesarios para construir, probar y desplegar el software.  
Este enfoque permite mantener un proceso repetible, eficiente y consistente.

### Conceptos Clave

En Jenkins, las pipelines definen las tareas de integración y despliegue continuo (CI/CD).  
Esta sintaxis organiza las etapas (stages) y los pasos (steps) necesarios para ejecutar las tareas.

### Stages y Steps:

Stages representan las etapas principales del proceso, como compilación, pruebas, construcción y despliegue.  
Estas etapas se dividen para estructurar el flujo de trabajo.  

Steps son las tareas específicas que se ejecutan en cada etapa, como comandos de shell, instalación de dependencias o ejecución de scripts.

Parámetros:
En este proyecto, se definen parámetros como Executor, Motivo y ChatID para capturar información dinámica proporcionada por el usuario al ejecutar la pipeline.  

### Post Actions:
Cada etapa puede incluir bloques post para realizar acciones específicas en función del resultado (éxito o fallo) de la etapa, como actualizar descripciones o enviar notificaciones.  

### Notificaciones:
En este pipeline, se utiliza la API de Telegram para enviar un resumen del estado de ejecución de la pipeline al usuario. Esto asegura una comunicación eficaz sobre el resultado.  

### Gestión de Credenciales:
Las credenciales sensibles, como tokens de acceso o contraseñas, se gestionan mediante el almacenamiento seguro de Jenkins.  
Estas se utilizan con los pasos withCredentials para proteger los datos sensibles durante la ejecución.  

### Automatización del Despliegue:

Vercel: Se utiliza como plataforma de despliegue para automatizar el lanzamiento de la aplicación.  
Esto asegura que los cambios aprobados lleguen rápidamente al entorno de producción.  

Integración Continua: Al utilizar herramientas como ESLint, Jest y Vite, el pipeline valida y construye el proyecto antes de desplegarlo.  
En caso de fallar alguno de los tests o comprobaciones el despliege no se realizaria.

Configuración del Pipeline
Para configurar y ejecutar esta pipeline en Jenkins, debemos seguir los pasos detallados a continuación:

### Preparar el Proyecto:

Nos aseguraremos de que el proyecto incluya un archivo Jenkinsfile en su raíz.
Definiremos los scripts auxiliares, como updateReadme.mjs, pushChanges.mjs, y deployToVercel.mjs, en la carpeta correspondiente (jenkinsScripts en este caso).  

# Configuracion de Jenkins:

Instalaremos Jenkins y nos asegúraremos de que los siguientes complementos/plugins estén instalados:  
NodeJS para ejecutar comandos relacionados con Node.js.  
Git para clonar y gestionar el repositorio.  
Pipeline para habilitar la ejecución de pipelines declarativas.  

### Configuracion de las Credenciales:

Crearemos credenciales en Jenkins para manejar los siguientes datos:
Acceso al repositorio de GitHub (usernamePassword).
Token de despliegue para Vercel (string).
Token de la API de Telegram (string).

### Crear un Proyecto en Jenkins:

Configuraremos un nuevo proyecto basado en un repositorio de Git que contenga el Jenkinsfile.
Para ello debemos marcar la opción para "Pipeline Script from SCM" y seleccionar el repositorio y rama deseados.

### Ejecutar la Pipeline:

Proporcionaremos los parámetros requeridos, como Executor, Motivo, y ChatID.
Podemos observar el progreso en la consola de Jenkins mientras las etapas se ejecutan:
Linter: Valida el código con ESLint.
Test: Ejecuta los tests con Jest.
Build: Construye el proyecto usando Vite.
Update_Readme: Actualiza el archivo README.md con el estado del pipeline.
Deploy_to_Vercel: Despliega la aplicación en Vercel.
Notificación: Envía el resultado de las etapas a través de Telegram.

### Notificaciones:

Finalmente enviaremos un mensaje a través de Telegram que resumira el estado final de cada etapa al final de la ejecución.  

# Documentación y explicación del proyecto.  

Para este proyecto utilizaremos un proyecto base en React / Vite que posteriormente desplegaremos en Vercel.

Una vez en local e iniciado el repositorio, crearemos una rama ci_jenkins para trabajar en este proyecto.  

![Imagen1](images/Imagen1.png)  

Para este proyecto necesitaremos instalar un plugin "Build Monitor" para ver todas las tareas ejecutadas en Jenkins.  
Dentro de Jenkins, iremos a la opcion manage y Available Plugins, alli buscaremos el plugin y lo instalaremos.  

![Imagen2](images/Imagen2.png)  

Una vez todo instalado, ya procedemos a crear el Jenkinsfile, y crearemos la primera Stage donde nos pedira tres parametros que necesitaremos en el momento de ejecutar la pipeline.  
En un primer lugar con la opcion "Parameters" definiremos los parametros, y despues crearemos una primera Stage donde nos pedira los datos.  

![Imagen3](images/Imagen3.png)  

Ahora creamos una Stage Linter que ejecutará un linter sobre el proyecto de React.  

Primero instalaremos las dependencias por si es necesario.  

Después introduciremos el comando "npx eslint" que ejecutará el Linter sobre el proyecto.  

![Imagen4](images/Imagen4.png)  

En la siguiente Stage llamada "Test" haremos un test del proyecto utilizando Jest.

![Imagen5](images/Imagen5.png)  

Generamos un fichero "utils.js" que ejecutará tres tests.  

![Imagen6](images/Imagen6.png)  

Posteriormente en la carpeta __tests__ crearemos un fichero utils.test.js donde definiremos las reglas del test.

![Imagen7](images/Imagen7.png)  

Ahora vamos a crear una Stage llamada "build" que como su nombre indica hara un build del proyecto que posteriormente será publicado en Vercel.  

Esta etapa solamente consta del comando "sh npm run build".  

![Imagen8](images/Imagen8.png)  

Una vez finalizadas todas las Stages, vamos a crear una nueva llamada "Update readme" que ejecutara un script dentro de la carpeta jenkinsScripts que sera la encargada de actualizar el fichero readme.md del proyecto con los resultados de los tests badges.  

Dependiendo del resultado mostrará lo siguiente:  
o	(Failure) https://img.shields.io/badge/test-failure-red  
o	(Success) https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg  

![Imagen9](images/Imagen9.png)  

Esta seria la Stage que lanzaria el script del updatereadme.js.  

![Imagen10](images/Imagen10.png)  

Despues generamos otra Stage que hara un push y un commit en el repositorio.  

![Imagen11](images/Imagen11.png)  

![Imagen12](images/Imagen12.png)  

![Imagen14](images/Imagen14.png)  

![Imagen15](images/Imagen15.png)  





RESULTADO DE LOS ULTIMOS TESTS
![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)
![Failure](https://img.shields.io/badge/test-failure-red)
![Failure](https://img.shields.io/badge/test-failure-red)
![Failure](https://img.shields.io/badge/test-failure-red)
![Failure](https://img.shields.io/badge/test-failure-red)
![Failure](https://img.shields.io/badge/test-failure-red)


