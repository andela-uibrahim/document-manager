import config from '../../../nightwatch.conf';

export default {
  'Create Role': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'admin@admin.com')
      .setValue('input[type=password]', 'Kratus043')
      .click('button[type="submit"]')
      .waitForElementVisible('div.login-feedback')
      .assert.containsText('div.login-feedback', 'Login Successful')
      .saveScreenshot('screenshots/loginPage.png')
      .pause(1500)
      .assert.urlEquals('http://localhost:3000/admindashboard')
      .url('http://localhost:3000/create-role')
      .waitForElementVisible('body')
      .assert.containsText('h4', 'Create A Role')
      .waitForElementVisible('body')
      .assert.title('Docman system')
      .setValue('input#role', 'Issa Role')
      .click('button[type="submit"]')
      .pause(1000)
      .url('http://localhost:3000/roles')
      .waitForElementVisible('table#role_list')
      .assert.containsText('table#role_list tr:last-of-type>td.role-title', 'Issa Role')
      .end();
  },
  'Delete Role': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'admin@admin.com')
      .setValue('input[type=password]', 'Kratus043')
      .click('button[type="submit"]')
      .waitForElementVisible('div.login-feedback')
      .assert.containsText('div.login-feedback', 'Login Successful')
      .pause(1000)
      .url('http://localhost:3000/roles')
      .pause(2000)
      .click('table#role_list tbody tr:last-of-type i.delete-btn')
      .pause(500)
      .waitForElementVisible('button.confirm')
      .click('button.confirm')
      .expect.element('table#role_list tr:last-of-type>td.role-title').text.to.not.equal('Issa Role');
    browser.end();
  }
};