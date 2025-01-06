pipeline {
    agent any
    parameters {
        string(name: 'Executor', defaultValue: '', description: 'Nombre de la persona que ejecuta la pipeline')
        string(name: 'Motivo', defaultValue: '', description: 'Motivo para ejecutar la pipeline')
        string(name: 'ChatID', defaultValue: '', description: 'Chat ID de Telegram para notificaciones')
    }
    tools {
        nodejs 'Node' // Usa la instalación de NodeJS configurada en Jenkins
    }
    stages {
        stage('Peticion de datos') {
            steps {
                script {
                    echo "Executor: ${params.Executor}"
                    echo "Motivo: ${params.Motivo}"
                    echo "Chat ID: ${params.ChatID}"
                }
            }
        }

        stage('Linter') {
            steps {
                script {
                    // Instala dependencias si es necesario
                    sh 'npm install'
                    
                    // Ejecuta el ESLint sobre todo el proyecto
                    sh 'npx eslint'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Ejecuta los tests usando Jest
                    sh 'npm test -- --coverage'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Construye el proyecto usando Vite
                    sh 'npm run build'
                }
            }
        }

        stage('Update_Readme') {
            steps {
                script {
                    // Determina el resultado de los tests
                    def testResult = currentBuild.result == 'SUCCESS' ? 'success' : 'failure'
                    
                    // Ejecuta el script para actualizar el README.md
                    sh "node jenkinsScripts/updateReadme.mjs ${testResult}"
                }
            }
        }

        stage('Push_Changes') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-credentials-id', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        sh "node jenkinsScripts/pushChanges.mjs '${params.Executor}' '${params.Motivo}' '${GIT_USERNAME}' '${GIT_PASSWORD}'"
                    }
                }
            }
        }

        stage('Deploy_to_Vercel') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                script {
                    withCredentials([string(credentialsId: 'vercel-token-id', variable: 'VERCEL_TOKEN')]) {
                        // Instala la CLI de Vercel
                        sh 'npm install -g vercel'
                        
                        // Ejecuta el script para desplegar en Vercel
                        sh "node jenkinsScripts/deployToVercel.mjs '${VERCEL_TOKEN}'"
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                if (currentBuild.result == null) {
                    currentBuild.result = 'SUCCESS'
                }
            }
        }
    }
}

