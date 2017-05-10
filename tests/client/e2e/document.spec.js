/*eslint-disable no-unused-vars*/
import config from '../../../nightwatch.conf';
import db from '../../../server/models';
import testData from '../../server/helper/helper';


export default {
  '@disable': true,
  before : function() {
    db.sequelize.query('TRUNCATE "Users" RESTART IDENTITY')
    .then(() => {
      db.User.create(testData.admin)
    });
    
  },
  after : function() {
    db.sequelize.query('TRUNCATE "Users" RESTART IDENTITY')
      .then(()=> {
      db.sequelize.query('TRUNCATE "documents" RESTART IDENTITY');
    });
  },
  'Create Document': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'admin@admin.com')
      .setValue('input[type=password]', 'Kratus043')
      .click('button[type="submit"]')
      .pause(1500)
      .assert.urlEquals('http://localhost:3000/admindashboard')
      .url('http://localhost:3000/create-document')
      .waitForElementVisible('body')
      .assert.containsText('h4', 'Create A Document')
      .waitForElementVisible('body')
      .assert.title('Docman system')
      .pause(1500)
      .setValue('input#title', 'Freemile Title')
      .execute('tinyMCE.activeEditor.setContent("Freemile Content")')
      .pause(1500)
      .click('button[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/admindashboard')
      .waitForElementVisible('table#document-list')
      .assert.containsText('table#document-list tr:first-of-type>td.doc-title',
       'Freemile Title')
      .end();
  },
  'Edit Document': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'admin@admin.com')
      .setValue('input[type=password]', 'Kratus043')
      .click('button[type="submit"]')
      .pause(1500)
      .assert.urlEquals('http://localhost:3000/admindashboard')
      .click('table#document-list tbody tr:first-of-type i.edit-btn')
      .waitForElementVisible('body')
      .clearValue('input#title')
      .setValue('input#title', 'Freemile One More Title')
      .click('button[type="submit"]')
      .pause(2000)
      .assert.urlEquals('http://localhost:3000/admindashboard')
      .waitForElementVisible('body')
      .waitForElementVisible('table#document-list')
      .assert.containsText('table#document-list tr:first-of-type>td.doc-title',
       'Freemile One More Title')
      .end();
  },
  'Delete Document': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'admin@admin.com')
      .setValue('input[type=password]', 'Kratus043')
      .click('button[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/admindashboard')
      .click('table#document-list tbody tr:first-of-type i.edit-btn')
      .waitForElementVisible('body')
      .clearValue('input#title')
      .setValue('input#title', 'Chosen One')
      .click('button[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/admindashboard')
      .waitForElementVisible('body')
      .click('table#document-list tbody tr:first-of-type i.delete-btn')
      .pause(500)
      .waitForElementVisible('button.confirm')
      .click('button.confirm')
      .expect.element('table#document-list tr:first-of-type>td.doc-title')
      .text.to.not.equal('Chosen One');
    browser.end();
  }
};
