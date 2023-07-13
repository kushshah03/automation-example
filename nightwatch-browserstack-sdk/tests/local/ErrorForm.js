module.exports = {
    'Field Required' : function (browser) {
      browser
        .url('http://localhost:3000')
        .getTitle(function(title) {
          this.assert.ok(title.includes('Demo App'));
        })
        .click("input[value='Submit']")
        .waitForElementVisible('#error_message');
      browser.expect.element('#error_message').text.to.equal('All fields are required');
      browser.percySnapshot('Error Form');
      browser.end();
    },
  };
