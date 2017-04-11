/* eslint import/no-extraneous-dependencies: 0 */
import supertest from 'supertest';
import chai from 'chai';
import dotenv from 'dotenv';
import app from '../../../server/server';
import testData from '../helper/helper';
import db from '../../../server/models';

dotenv.config();


const expect = chai.expect;
const client = supertest.agent(app);

describe('document ==> \n', () => {
  let adminToken, regularToken;
  before((done) => {
    db.sequelize.query('TRUNCATE "documents" RESTART IDENTITY');
    db.User.create(testData.admin).then((user) => {
      client.post('/users/login')
        .send({
          email: testData.admin.email,
          password: testData.admin.password
        })
        .end((error, res) => {
          adminToken = res.body.token;
          done();
        });
    });
  });

  before((done) => {
    db.User.create(testData.user).then((user) => {
      client.post('/users/login')
        .send({
          email: testData.user.email,
          password: testData.user.password
        })
        .end((error, res) => {
          regularToken = res.body.token;
          done();
        });
    });
  });

  after((done) => {
    db.sequelize.query('TRUNCATE "Roles" RESTART IDENTITY')
    .then(() => {
      db.sequelize.query('TRUNCATE "Users" RESTART IDENTITY')
      .then(() => {
        db.sequelize.query('TRUNCATE "documents" RESTART IDENTITY')
        .then(() => {
          done();
        });
      });
    });
  });

  describe('POST: ==>\n', () => {
    it('Admin should be able to create a new document', (done) => {
      client.post('/documents')
        .send(testData.privateDoc)
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('User should create a new document',
      (done) => {
        const document = testData.publicDoc;
        const document2 = testData.privateDoc;
        client.post('/documents')
          .send(document)
          .set({ 'x-access-token': regularToken })
          .end((error, res) => {
            expect(res.status).to.equal(201);
            client.post('/documents')
              .send(document2)
              .set({ 'x-access-token': regularToken })
              .end((error1, res1) => {
                expect(res1.status).to.equal(201);
                done();
              });
          });
      });
    it('User should not be able to create documents if document fields are not inputed properly', (done) => {
      client.post('/documents')
        .send(testData.documentInvalid)
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return error with status code 400 when the inputed document fields are not valid', (done) => {
      client.post('/documents')
        .send(testData.documentNotValid)
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('GET: ==>\n', () => {
    it('should be able to get documents by id', (done) => {
      client.get('/documents/3')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(200);
          client.post('/documents')
            .send(testData.documentPrivate2)
            .set({ 'x-access-token': adminToken })
            .end(() => {
              done();
            });
        });
    });
    it('should not authorize access to private documents if user has an invalid token', (done) => {
      client.get('/documents/1')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should not authorize access to public documents if user has no token', (done) => {
      client.get('/documents/2')
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('Should return status code of 404 for document not found', (done) => {
      client.get('/documents/200')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('Other User cannot access document that has access level of private', (done) => {
      client.get('/documents/1')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('Should give admin unrestricted access to get documents', (done) => {
      client.get('/documents/1')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(200);
          client.get('/documents/1')
            .set({ 'x-access-token': adminToken })
            .end((error1, res1) => {
              expect(res1.status).to.equal(200);
              done();
            });
        });
    });
  });
  describe('Update: ==>\n', () => {
    it('User should be able to update their document information', (done) => {
      client.put('/documents/3')
        .set({ 'x-access-token': regularToken })
        .send(testData.privateDoc)
        .end((error, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('User without access should not be able to update other users documents', (done) => {
      client.put('/documents/4')
        .set({ 'x-access-token': regularToken })
        .send(testData.documentPrivate3)
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('Should not authorize update and return status code 401 for invalid request parameter', (done) => {
      client.put('/documents/w')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('Should not authorize update and return status code 401 for invalid update parameters', (done) => {
      client.put('/documents/4')
        .send(testData.documentNotValid)
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
  describe('DELETE: ==>\n', () => {
    it('Users should be able to delete their own documents', (done) => {
      client.delete('/documents/2')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('Users cannot delete documents they do not own', (done) => {
      client.delete('/documents/1')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('Should not authorize delete and return status code 401 for invalid request parameter ', (done) => {
      client.delete('/documents/w')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('GET documents by id :==>\n', () => {
    // it('All documents Should only be accessed by the admin only', (done) => {
    //   client.get('/documents')
    //     .set({ 'x-access-token': adminUserToken })
    //     .end((error, res) => {
    //       expect(res.status).to.equal(200);
    //       done();
    //     });
    // });
    it('Admin should be able to get all the documents belonging to a particular user', (done) => {
      client.post('/documents')
        .set({ 'x-access-token': regularToken })
        .send(testData.documentPublic1)
        .end(() => {
          client.get('/users/2/documents')
            .set({ 'x-access-token': adminToken })
            .end((error1, res1) => {
              expect(res1.status).to.equal(200);
              done();
            });
        });
    });
    it('Admin should receive a 404 status res if the user has no documents', (done) => {
      client.get('/users/9/documents')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('Regular Users should be able to access public documents only', (done) => {
      client.get('/users/2/documents')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('Regular Users should be able to access public documents only', (done) => {
      client.get('/users/1/documents')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});