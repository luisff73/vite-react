pipeline {
    agent any
    parameters {
        string(name: 'Executor', defaultValue: '', description: 'Nombre de la persona que ejecuta la pipeline')
        string(name: 'Motivo', defaultValue: '', description: 'Motivo para ejecutar la pipeline')
        string(name: 'ChatID', defaultValue: '', description: 'Chat ID de Telegram para notificaciones')
    }
    tools {
        nodejs 'Node'
    }
    environment {
        LINTER_RESULT = 'PENDING'
        TEST_RESULT = 'PENDING'
        UPDATE_README_RESULT = 'PENDING'
        DEPLOY_TO_VERCEL_RESULT = 'PENDING'
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
                    sh 'npm install'
                    sh 'npx eslint'
                }
            }
            post {
                success {
                    script {
                        env.LINTER_RESULT = 'SUCCESS'
                    }
                }
                failure {
                    script {
                        env.LINTER_RESULT = 'FAILURE'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm test -- --coverage'
                }
            }
            post {
                success {
                    script {
                        env.TEST_RESULT = 'SUCCESS'
                    }
                }
                failure {
                    script {
                        env.TEST_RESULT = 'FAILURE'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Update_Readme') {
            steps {
                script {
                    def testResult = env.TEST_RESULT == 'SUCCESS' ? 'success' : 'failure'
                    sh "node jenkinsScripts/updateReadme.mjs ${testResult}"
                }
            }
            post {
                success {
                    script {
                        env.UPDATE_README_RESULT = 'SUCCESS'
                    }
                }
                failure {
                    script {
                        env.UPDATE_README_RESULT = 'FAILURE'
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
                        sh 'npm install -g vercel'
                        sh 'node jenkinsScripts/deployToVercel.mjs'
                    }
                }
            }
            post {
                success {
                    script {
                        env.DEPLOY_TO_VERCEL_RESULT = 'SUCCESS'
                    }
                }
                failure {
                    script {
                        env.DEPLOY_TO_VERCEL_RESULT = 'FAILURE'
                    }
                }
            }
        }

        stage('Notificacion') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'telegram-bot-token', variable: 'TELEGRAM_BOT_TOKEN')]) {
                        def message = """
                        Se ha ejecutado la pipeline de Jenkins con los siguientes resultados:
                        - Linter stage: ${env.LINTER_RESULT}
                        - Test stage: ${env.TEST_RESULT}
                        - Update Readme stage: ${env.UPDATE_README_RESULT}
                        - Deploy to Vercel stage: ${env.DEPLOY_TO_VERCEL_RESULT}
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
