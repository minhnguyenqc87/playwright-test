// function setBuildStatus
def setBuildStatus(String message, String state) {
  sh "curl --silent --output nul https://api.github.com/repos/minhnguyenqc87/playwright-test/statuses/${GIT_COMMIT}?access_token=${env.GITHUB_TOKEN} -H \"Content-Type: application/json\" -X POST -d '{\"state\": \"${state}\",\"context\": \"continuous-integration/jenkins\", \"description\": \"${message}\", \"target_url\": \"${env.RUN_DISPLAY_URL}\"}'"
}

// trigger schedule time to run: cron( mins | hours | days | months | 1-5 : Monday to Friday)
// properties([pipelineTriggers([cron('00 19 * * 1-5')])])

node('slave-tests') {
    ws("${env.JOB_NAME}/${env.BRANCH_NAME}") {
      try {

      //Install Nodejs v22.13.0
      stage('Install Nodejs 22.13.0') {
          sh 'npm install -g n'
          sh 'n 22.13.0'
          sh 'node -v'
      }
      // check out
      stage('Checkout') {
          checkout scm
      }
      stage('Provide Configuration File') {
          // Stored .env file in Jenkins credential
          configFileProvider([configFile(fileId:'8f5f3246-e91b-4122-ab36-9edee0d72759', targetLocation: '/home/jenkins/workspace/playwright-test/playwright-test/.env')]) {
        }
      }

      // test
      stage('Run tests') {
          withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
            GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
            try {
            setBuildStatus('In progress ...', 'pending')
            sh './run_tests.sh'
            } catch (e) {
            setBuildStatus('Test cases failed', 'failure')
            currentBuild.result = 'FAILURE'
            stageResult = 'FAILURE'
            throw e
            }
            setBuildStatus('Pass all test cases.', 'success')
          }
      }
            // Notify slack
      stage('BUILD SUCCEED') {
          slackSend (username: 'CI', channel: 'flamingo_automation_test_reports', color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
      }
    } catch (e) {
      slackSend (username: 'CI', channel: 'flamingo_automation_test_reports', color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
      throw e
      }
    }
}
