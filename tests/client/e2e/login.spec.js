/*eslint-disable no-unused-vars*/
import config from '../../../nightwatch.conf';

import db from '../../../server/models';
import testData from '../../server/helper/helper';


export default {
  before : function() {
    db.sequelize.query('TRUNCATE "Users" RESTART IDENTITY')
    .then(() => {
      db.User.create(testData.user)
    });
  },
  after : function() {
    db.sequelize.query('TRUNCATE "Users" RESTART IDENTITY');
  },
  'Login Page': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.title('Docman system')
      .setValue('input[type=email]', 'test@test.com')
      .setValue('input[type=password]', 'userPassword')
      .click('button[type="submit"]')
      .pause(1500)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .click('#dropbtn')
      .pause(1000)
      .click('#logout')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/')
      .end();
  }
};
