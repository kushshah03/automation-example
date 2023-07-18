const percy = require('@percy/nightwatch');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

const additonalEnvironments = require("./environments");

if(!additonalEnvironments.test_settings)
  additonalEnvironments.test_settings = {};

const bstackOptions = {
  'bstack:options' : {
    "os" : "OS X",
    "osVersion" : "Big Sur",
    "buildName" : "Automation Webinar Demo",
    "source": "nightwatch:sample-sdk:v1.0",
    "seleniumVersion" : "4.0.0",
    userName: process.env.BROWSERSTACK_USERNAME,
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  },
}

const browserStack = {
  webdriver: {
    start_process: false,
    timeout_options: {
      timeout: 120000,
      retry_attempts: 3
    },
    keep_alive: true
  },

  selenium: {
    host: 'hub.browserstack.com',
    port: 443
  },

  desiredCapabilities: {
    browserName: 'chrome',
    ...bstackOptions
  }
}

const nightwatchConfigs = {
  src_folders: [],
  custom_commands_path: [percy.path],
  live_output: true,
  plugins: ['@nightwatch/browserstack'],
  '@nightwatch/browserstack': {
    browserstackLocal: true,
    test_observability: {
      enabled: true,
      projectName: 'Automation Webinar Demo Project',
      buildName: 'Automation Webinar Demo',
      user: process.env.BROWSERSTACK_USERNAME,
      key: process.env.BROWSERSTACK_ACCESS_KEY,
      buildTag: ['qa', 'sanity']
    }
  },

  test_settings: {
    'local.chrome': {
      webdriver: {
        start_process: true,
        server_path: chromedriver.path
      },
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },

    'local.firefox': {
      desiredCapabilities: {
        browserName: 'firefox',
        pageLoadStrategy: 'eager',
      },
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: geckodriver.path,
        log_path: 'logs',
      },
    },

    browserstack:  {
      ...browserStack
    },

    "browserstack.chrome": {
      ...browserStack,
      desiredCapabilities:{
        browserName: 'chrome',
        ...bstackOptions
      }
    },
    "browserstack.firefox": {
      ...browserStack,
      desiredCapabilities:{
        browserName: 'firefox',
        ...bstackOptions
      }
    },
    "browserstack.edge": {
      ...browserStack,
      desiredCapabilities:{
        browserName: 'Edge',
        ...bstackOptions
      }
    }
  }
}

for(let key in additonalEnvironments.test_settings) {
  nightwatchConfigs.test_settings[key] = {
    ...browserStack,
    ...additonalEnvironments.test_settings[key]
  };
}

module.exports = nightwatchConfigs;
