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
    stages {
        stage('Inicialización de Variables') {
            steps {
                script {
                    // Inicializar variables globales
                    linterResult = 'PENDING'
                    testResult = 'PENDING'
                    updateReadmeResult = 'PENDING'
                    deployToVercelResult = 'PENDING'
                }
            }
        }

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
                        linterResult = 'SUCCESS'
                    }
                }
                failure {
                    script {
                        linterResult = 'FAILURE'
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
                        testResult = 'SUCCESS'
                    }
                }
                failure {
                    script {
                        testResult = 'FAILURE'
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
                    def testResultStatus = testResult == 'SUCCESS' ? 'success' : 'failure'
                    echo "Luis Test Result Status: ${testResultStatus}"
                    sh "node jenkinsScripts/updateReadme.mjs ${testResultStatus}"
                }
            }
            post {
                success {
                    script {
                        updateReadmeResult = 'SUCCESS'
                    }
                }
                failure {
                    script {
                        updateReadmeResult = 'FAILURE'
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
                        deployToVercelResult = 'SUCCESS'
                    }
                }
                failure {
                    script {
                        deployToVercelResult = 'FAILURE'
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
                        - Linter stage: ${linterResult}
                        - Test stage: ${testResult}
                        - Update Readme stage: ${updateReadmeResult}
                        - Deploy to Vercel stage: ${deployToVercelResult}
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
