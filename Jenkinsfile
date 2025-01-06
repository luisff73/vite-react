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
    environment {
        LINTER_STAGE_RESULT = ''
        TEST_STAGE_RESULT = ''
        UPDATE_README_STAGE_RESULT = ''
        DEPLOY_TO_VERCEL_STAGE_RESULT = ''
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
            post {
                success {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nLinter stage: SUCCESS"
                        currentBuild.result = 'SUCCESS'
                        echo "Linter stage result set to SUCCESS"
                    }
                }
                failure {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nLinter stage: FAILURE"
                        currentBuild.result = 'FAILURE'
                        echo "Linter stage result set to FAILURE"
                    }
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
            post {
                success {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nTest stage: SUCCESS"
                        currentBuild.result = 'SUCCESS'
                        echo "Test stage result set to SUCCESS"
                    }
                }
                failure {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nTest stage: FAILURE"
                        currentBuild.result = 'FAILURE'
                        echo "Test stage result set to FAILURE"
                    }
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
            post {
                success {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nUpdate Readme stage: SUCCESS"
                        currentBuild.result = 'SUCCESS'
                        echo "Update Readme stage result set to SUCCESS"
                    }
                }
                failure {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nUpdate Readme stage: FAILURE"
                        currentBuild.result = 'FAILURE'
                        echo "Update Readme stage result set to FAILURE"
                    }
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
                        sh 'node jenkinsScripts/deployToVercel.mjs'
                    }
                }
            }
            post {
                success {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nDeploy to Vercel stage: SUCCESS"
                        currentBuild.result = 'SUCCESS'
                        echo "Deploy to Vercel stage result set to SUCCESS"
                    }
                }
                failure {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nDeploy to Vercel stage: FAILURE"
                        currentBuild.result = 'FAILURE'
                        echo "Deploy to Vercel stage result set to FAILURE"
                    }
                }
            }
        }

        stage('Notificacion') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'telegram-bot-token', variable: 'TELEGRAM_BOT_TOKEN')]) {
                        def linterResult = currentBuild.description.contains("Linter stage: SUCCESS") ? "SUCCESS" : "FAILURE"
                        def testResult = currentBuild.description.contains("Test stage: SUCCESS") ? "SUCCESS" : "FAILURE"
                        def updateReadmeResult = currentBuild.description.contains("Update Readme stage: SUCCESS") ? "SUCCESS" : "FAILURE"
                        def deployToVercelResult = currentBuild.description.contains("Deploy to Vercel stage: SUCCESS") ? "SUCCESS" : "FAILURE"

                        echo "Linter_stage: ${linterResult}"
                        echo "Test_stage: ${testResult}"
                        echo "Update_readme_stage: ${updateReadmeResult}"
                        echo "Deploy_to_Vercel_stage: ${deployToVercelResult}"
                        
                        def message = """
                        Se ha ejecutado la pipeline de jenkins con los siguientes resultados:
                        - Linter_stage: ${linterResult}
                        - Test_stage: ${testResult}
                        - Update_readme_stage: ${updateReadmeResult}
                        - Deploy_to_Vercel_stage: ${deployToVercelResult}
                        """
                        sh """
                        curl -s -X POST https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage -d chat_id=${params.ChatID} -d text="${message}"
                        """
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