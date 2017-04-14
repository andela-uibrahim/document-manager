import supertest from 'supertest';
import chai from 'chai';
import dotenv from 'dotenv';
import app from '../../../server';
import testData from '../helper/helper';
import db from '../../../server/models';

dotenv.config();
const expect = chai.expect;
const client = supertest.agent(app);

describe('Users ==> \n', () => {
  let adminToken, regularToken;
  before((done) => {
    db.User.create(testData.admin).then(user => {
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
    db.User.create(testData.user).then(user => {
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
    db.sequelize.query('TRUNCATE "Users" RESTART IDENTITY')
      .then(() => {
        done();
      });
  });



  describe('Users', () => {
    it('with invalid token should not be authenticated ',
        (done) => {
          client.get('/users')
          .set({ 'x-access-token': testData.invalid.invalidToken.token })
          .end((error, res) => {
            expect(res.status).to.equal(401);
            done();
          });
        });
    it('Should not be authenticated without a token ',
        (done) => {
          client.get('/users')
          .end((error, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.status).to.equal('Failed');
            done();
          });
        });
    it('should return a status code of 201 when a regular user has been successfully created',
        (done) => {
          client.post('/users')
            .set({ 'x-access-token': adminToken })
            .send(testData.regularUser)
            .end((error, res) => {
              expect(res.status).to.equal(201);
              done();
            });
        });
    it('should be able to search for another user in the database', (done) => {
      client.get('/users/2')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).equal(200);
          expect(res.body).to.have.property('id');
          done();
        });
    });
    it('should return status code 400 for incorrect input', (done) => {
      client.post('/users')
        .send({})
        .end((error, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('RoleId for regular users should be 2',
        (done) => {
          client.get('/users/2')
            .set({ 'x-access-token': adminToken })
            .end((error, res) => {
              expect(res.body.RoleId).to.equal(2);
              done();
            });
        });

    it('Admin User should be able to update details of users', (done) => {
      client.put('/users/2')
        .set({ 'x-access-token': adminToken })
        .send({
          firstname: 'usman',
          lastname: 'Ibrahim',
          password: process.env.ADMIN_PASSWORD
        })
        .end((error, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe('Admin User', () => {
    it('Should return http code 201 if an Admin User is successfully created',
        (done) => {
          client.post('/users')
            .set({ 'x-access-token': adminToken })
            .send(testData.newAdmin)
            .end((error, res) => {
              expect(res.status).to.equal(201);
              done();
            });
        });
    it('Role Id for admin user should be 1',
        (done) => {
          client.get('/users/1')
            .set({ 'x-access-token': adminToken })
            .end((error, res) => {
              expect(res.body.RoleId).to.equal(1);
              done();
            });
        });
    it('Should be able to delete users', (done) => {
      client.delete('/users/2')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return a status code of 404 for invalid delete parameter or if user not found', (done) => {
      client.delete('/users/100')
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should be able to fetch all the users in the database', (done) => {
      client.get('/users')
        .set({ 'x-access-token': adminToken })
        .send({
          email: testData.admin.email,
          password: testData.admin.password
        })
        .end((error, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe('login', () => {
    it('Should allow login for only CORRECT details of an Admin user', (done) => {
      client.post('/users/login')
        .send({
          email: testData.admin.email,
          password: testData.admin.password
        })
        .end((error, res) => {
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('should not authenticate for invalid credentials', (done) => {
      client.post('/users/login')
        .send(testData.fakeUser)
        .end((error, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
  describe('logout', () => {
    it('should be able to logout users successfully', (done) => {
      client.post('/users/logout')
        .end((error, res) => {
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });
  describe('Catch all route', () => {
    it('For invalid GET URl, it should redirect user back to the homepage', (done) => {
      client.get('/asjhbcnsincewe')
        .end((error, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});