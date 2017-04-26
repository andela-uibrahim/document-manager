import config from '../../../nightwatch.conf';

import db from '../../../server/models';
import testData from '../../server/helper/helper';


export default {
  before : function() {
    db.sequelize.query('TRUNCATE "Users" RESTART IDENTITY');
  },
  after : function() {
    db.sequelize.query('TRUNCATE "Users" RESTART IDENTITY');
  },
  'SignUp Page': function (browser) {
    browser
      .url('http://localhost:3000/register')
      .waitForElementVisible('body')
      .assert.title('Docman system')
      .setValue('input#username', 'andela')
      .setValue('input#firstname', 'andela')
      .setValue('input#lastname', 'freemile')
      .setValue('input#email', 'freemile@gmail.com')
      .setValue('input#password', '12345678')
      .click('button[type="submit"]')
      .pause(1500)
      .waitForElementVisible('body')
      .assert.urlEquals('http://localhost:3000/dashboard')
      .waitForElementVisible('body')
      .end();
  }
};