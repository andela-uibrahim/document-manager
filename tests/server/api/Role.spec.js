/* eslint import/no-extraneous-dependencies: 0 */
import supertest from 'supertest';
import chai from 'chai';
import dotenv from 'dotenv';
import app from '../../../server';
import db from '../../../server/models';
import testData from '../helper/helper';


dotenv.config();
const expect = chai.expect;
const client = supertest.agent(app);

describe('Document ==> \n', () => {
  let adminToken, regularToken;
  before((done) => {
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
            done();
          });
      });
  });

  describe('Admin', () => {
    it('should only allow user with a valid token to create Roles', (done) => {
      client.post('/roles')
        .set({ 'x-access-token': adminToken })
        .send(testData.newRole1)
        .end((error, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should return 404 status code if the role value is not inputed', (done) => {
      client.post('/roles')
        .set({ 'x-access-token': adminToken })
        .send({})
        .end((error, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should be able to fetch all the roles in the database', (done) => {
      client.get('/roles')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    // it('should be able to delete roles from the table', (done) => {
    //   client.delete('/roles/2')
    //     .set({ 'x-access-token': adminToken })
    //     .end((error, res) => {
    //       expect(res.status).to.equal(200);
    //       expect(res.body.success).to.equal(true);
    //       done();
    //     });
    // });
    it('should return params 401 for invalid request params', (done) => {
      client.delete('/roles/400')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should return params 401 for invalid request params', (done) => {
      client.delete('/roles/4e')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('Regular User', () => {
    it('should not be allowed to create Roles', (done) => {
      client.post('/roles')
        .set({ 'x-access-token': regularToken })
        .send(testData.newRole1)
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should not be able to fetch all the roles in the database', (done) => {
      client.get('/roles')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should be able to delete roles from the table', (done) => {
      client.delete('/roles/3')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          done();
        });
    });
    it('should return params 401 for invalid request params', (done) => {
      client.delete('/roles/4')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return params 401 for invalid request params', (done) => {
      client.delete('/roles/4e')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
});
