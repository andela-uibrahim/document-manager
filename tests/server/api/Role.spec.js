/* eslint import/no-extraneous-dependencies: 0 */
/*eslint-disable no-unused-vars*/
import supertest from 'supertest';
import chai from 'chai';
import dotenv from 'dotenv';
import app from '../../../server';
import db from '../../../server/models';
import testData from '../helper/helper';


dotenv.config();
const expect = chai.expect;
const client = supertest.agent(app);

describe('Role ==> \n', () => {
  let adminToken, regularToken;
  before((done) => {
    db.sequelize.query('TRUNCATE "Users" RESTART IDENTITY');
    db.User.create(testData.admin).then(() => {
      client.post('/api/users/login')
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
    db.User.create(testData.user).then(() => {
      client.post('/api/users/login')
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
    db.sequelize.query('TRUNCATE "Roles" RESTART IDENTITY');
    db.sequelize.query('TRUNCATE "Users" RESTART IDENTITY')
      .then(() => {
        done();
    });
  });

  describe('Admin', () => {
    it('should only allow user with a valid token to create Roles', (done) => {
      client.post('/api/roles')
        .set({ 'x-access-token': adminToken })
        .send(testData.newRole1)
        .end((error, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it(`should return 404 status code if the 500
     value is not inputed`, (done) => {
      client.post('/api/roles')
        .set({ 'x-access-token': adminToken })
        .send({})
        .end((error, res) => {
          expect(res.status).to.equal(500);
          done();
        });
    });

    it('should be able to fetch all the roles in the database', (done) => {
      client.get('/api/roles/')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should be able to delete roles from the table', (done) => {
      client.delete('/api/roles/1')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });
    
    it('should return params 404 for invalid request params', (done) => {
      client.delete('/api/roles/400')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should return params 401 for invalid request params', (done) => {
      client.delete('/api/roles/4e')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('Regular User', () => {
    it('should not be allowed to create Roles', (done) => {
      client.post('/api/roles')
        .set({ 'x-access-token': regularToken })
        .send(testData.newRole1)
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should not be able to fetch all the roles in the database', (done) => {
      client.get('/api/roles')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should not be able to delete roles from the table', (done) => {
      client.delete('/api/roles/3')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          done();
        });
    });
    it('should return params 401 for invalid request params', (done) => {
      client.delete('/api/roles/4')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return params 401 for invalid request params', (done) => {
      client.delete('/api/roles/4e')
        .set({ 'x-access-token': regularToken })
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
});
