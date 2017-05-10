/* eslint import/no-extraneous-dependencies: 0 */
/*eslint-disable no-unused-vars*/
import supertest from 'supertest';
import chai from 'chai';
import dotenv from 'dotenv';
import app from '../../../server';
import testData from '../helper/helper';
import db from '../../../server/models';

 dotenv.config();


const expect = chai.expect;
const client = supertest.agent(app);

describe('search ==> \n', () => {
  let adminToken, regularToken;
  before((done) => {
    db.sequelize.query('TRUNCATE "documents" RESTART IDENTITY');
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

  describe('document ==> \n', () => {
    it('should return documents limited by a specified number', (done) => {
      const searchLimit = 3;
      client.post('/api/documents')
        .set({ 'x-access-token': adminToken })
        .send(testData.publicDoc)
        .end(() => {
          client.post('/api/documents')
            .set({ 'x-access-token': adminToken })
            .send(testData.publicDoc1)
            .end(() => {
              client.post('/api/documents')
                .set({ 'x-access-token': adminToken })
                .send(testData.publicDoc2)
                .end(() => {
                  client.post('/api/documents')
                    .set({ 'x-access-token': adminToken })
                    .send(testData.publicDoc3)
                    .end(() => {
                      const searchTerm = 'e';
                      client.get(`/api/search/documents/?limit=${searchLimit}
                      &&search=${searchTerm}`)
                        .set({ 'x-access-token': adminToken })
                        .end((error, res) => {
                          expect(res.status).to.equal(200);
                          expect(res.body.results.rows.length)
                          .to.be.at.most(searchLimit);
                          done();
                        });      
                    });     
                });        
            });        
        });
    });

    it('should return documents ordered by published date in descending order',
      (done) => {
        const searchTerm = 'e';
        client.get(`/api/search/documents/?search=${searchTerm}`)
          .set({ 'x-access-token': adminToken })
          .end((error, res) => {
            expect(res.status).to.equal(200);
            let oldestDate = Date.now();
            res.body.results.rows.forEach((document) => {
              const createdDate = Date.parse(document.createdAt);
              expect(createdDate).to.be.lte(oldestDate);
              oldestDate = createdDate;
            });
            done();
          });
      });

    it('should return only documents that match a specific query', (done) => {
      const searchText = 'e';
      client.get(`/api/search/documents/?search=${searchText}`)
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(200);
          res.body.results.rows.forEach((document) => {
            expect(`${document.title} ${document.content}`)
            .to.contain.any(searchText, 'E');
          });
          done();
        });
    });
    it(`should return documents limited by a specified number with result
     containing the search terms`, (done) => {
      const searchLimit = 1;
      const query = 'a';
      client.get(`/api/search/documents/?search=${query}&limit=${searchLimit}`)
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(200);
          res.body.results.rows.forEach((document) => {
            expect(`${(document.title).toLowerCase()}`).to.contain.any(query,'A')
          });
          expect(res.body.results.rows.length).to.be.at.most(searchLimit);
          done();
        });
    });
  });

  describe('user ==> \n', () => {
    it('should return users limited by a specified number', (done) => {
      const searchLimit = 3;
      client.post('/api/users')
        .set({ 'x-access-token': adminToken })
        .send(testData.regularUser)
        .end(() => {
          client.post('/api/users')
            .set({ 'x-access-token': adminToken })
            .send(testData.regularUser2)
            .end(() => {
              client.post('/api/users')
                .set({ 'x-access-token': adminToken })
                .send(testData.regularUser3)
                .end(() => {
                  client.post('/api/users')
                    .set({ 'x-access-token': adminToken })
                    .send(testData.regularUser4)
                    .end(() => {
                      const searchTerm = 'e';
                      client.get(`/api/search/users/?search=${searchTerm}&limit=${searchLimit}`)
                        .set({ 'x-access-token': adminToken })
                        .end((error, res) => {
                          expect(res.status).to.equal(200);
                          expect(res.body.users.length).to.be.at.most(searchLimit);
                          done();
                        });      
                    });     
                });        
            });        
        });
    });

    it('should return only users that match a specific query', (done) => {
      const searchText = 'e';
      client.get(`/api/search/users/?search=${searchText}`)
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(200);
          res.body.users.forEach((user) => {
            expect(`${user.username} ${user.email}
             ${user.firstname} ${user.lastname}`).to.contain.any(searchText, 'E');
          });
          done();
        });
    });
    it(`should return users limited by a specified number with result
     containing the search terms`, (done) => {
      const searchLimit = 1;
      const searchText = 'a';
      client.get(`/api/search/users/?search=${searchText}&limit=${searchLimit}`)
        .set({ 'x-access-token': adminToken })
        .end((error, res) => {
          expect(res.status).to.equal(200);
          res.body.users.forEach((user) => {
            expect(`${user.username} ${user.email}
             ${user.firstname} ${user.lastname}`).to.contain.any(searchText,'A');
          });
          expect(res.body.users.length).to.be.at.most(searchLimit);
          done();
        });
    });
  });
});
