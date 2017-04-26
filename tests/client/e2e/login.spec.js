import config from '../../../nightwatch.conf';

export default {
  'Login Page': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.title('Docman system')
      .setValue('input[type=email]', 'test@test.com')
      .setValue('input[type=password]', 'userPassword')
      .click('button[type="submit"]')
      .waitForElementVisible('div.login-feedback')
      .assert.containsText('div.login-feedback', 'Login Successful')
      .saveScreenshot('screenshots/loginPage.png')
      .pause(1500)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .click('#logout')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/')
      .end();
  }
};
