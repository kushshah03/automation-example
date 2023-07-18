module.exports = {
  test_settings: {
    win_chrome: {
      desiredCapabilities: {
        "browserName": "Chrome",
        "bstack:options" : {
          "browserVersion": "103.0",
          "os": "Windows",
          "osVersion": "11",
          "debug": true
        }
      }
    },
    win_firefox: {
      desiredCapabilities: {
        "browserName": "Firefox",
        "bstack:options" : {
          "browserVersion": "102.0",
          "os": "Windows",
          "osVersion": "10",
          "debug": true
        }
      }
    },
    mac_safari: {
      desiredCapabilities: {
        "browserName": "Safari",
        "bstack:options" : {
          "browserVersion": "14.1",
          "os": "OS X",
          "osVersion": "Big Sur",
          "debug": true
        }
      }
    }
  }
};
