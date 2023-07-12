module.exports = {
  'Title Test' : function (browser) {
    browser
      .url('http://localhost:3000')
      .getTitle(function(title) {
        this.assert.ok(title.includes('Demo App'));
      })
      .percySnapshot('Demo Form');
  },

  'Submit Form Test': function (browser) {
    browser
      .sendKeys('#firstName', 'Kush')
      .sendKeys('#lastName', 'Shah')
      .click("input[value='Submit']")
      .waitForElementVisible('h1');
    browser.expect.element('h1').text.to.equal('Submitted Data');
    browser.expect.element('p:nth-child(2)').text.to.contain('Kush');
    browser.expect.element('p:nth-child(3)').text.to.contain('Shah');
    browser.percySnapshot('Submitted Form');
    browser.end();
  },
};
