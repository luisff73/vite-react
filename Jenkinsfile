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

        stage('Commit_and_Push') {
            steps {
                script {
                    // Configura el usuario de Git
                    sh 'git config user.name "luisff73"'
                    sh 'git config user.email "jvrluis@hotmail.com"'
                    
                    // Añade los cambios y haz commit
                    sh 'git add README.md'
                    sh 'git commit -m "Update README.md with test results [ci skip]"'
                    
                    // Haz push de los cambios al repositorio remoto
                    withCredentials([usernamePassword(credentialsId: 'your-credentials-id', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        sh 'git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/luisff73/vite-react.git HEAD:ci_jenkins'
                    }
                }
            }
        }
    }
}