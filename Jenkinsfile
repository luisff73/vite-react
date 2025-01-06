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
                        env.LINTER_STAGE_RESULT = 'SUCCESS'
                        echo "Linter stage result set to SUCCESS"
                    }
                }
                failure {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nLinter stage: FAILURE"
                        env.LINTER_STAGE_RESULT = 'FAILURE'
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
                        env.TEST_STAGE_RESULT = 'SUCCESS'
                        echo "Test stage result set to SUCCESS"
                    }
                }
                failure {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nTest stage: FAILURE"
                        env.TEST_STAGE_RESULT = 'FAILURE'
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
                        env.UPDATE_README_STAGE_RESULT = 'SUCCESS'
                        echo "Update Readme stage result set to SUCCESS"
                    }
                }
                failure {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nUpdate Readme stage: FAILURE"
                        env.UPDATE_README_STAGE_RESULT = 'FAILURE'
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
                        env.DEPLOY_TO_VERCEL_STAGE_RESULT = 'SUCCESS'
                        echo "Deploy to Vercel stage result set to SUCCESS"
                    }
                }
                failure {
                    script {
                        currentBuild.description = (currentBuild.description ?: '') + "\nDeploy to Vercel stage: FAILURE"
                        env.DEPLOY_TO_VERCEL_STAGE_RESULT = 'FAILURE'
                        echo "Deploy to Vercel stage result set to FAILURE"
                    }
                }
            }
        }

        stage('Notificacion') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'telegram-bot-token', variable: 'TELEGRAM_BOT_TOKEN')]) {
                        echo "Linter_stage: ${env.LINTER_STAGE_RESULT}"
                        echo "Test_stage: ${env.TEST_STAGE_RESULT}"
                        echo "Update_readme_stage: ${env.UPDATE_README_STAGE_RESULT}"
                        echo "Deploy_to_Vercel_stage: ${env.DEPLOY_TO_VERCEL_STAGE_RESULT}"
                        
                        def message = """
                        Se ha ejecutado la pipeline de jenkins con los siguientes resultados:
                        - Linter_stage: ${env.LINTER_STAGE_RESULT}
                        - Test_stage: ${env.TEST_STAGE_RESULT}
                        - Update_readme_stage: ${env.UPDATE_README_STAGE_RESULT}
                        - Deploy_to_Vercel_stage: ${env.DEPLOY_TO_VERCEL_STAGE_RESULT}
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