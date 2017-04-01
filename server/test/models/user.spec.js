import chai from 'chai';
import model from './index';
import data from '../helper/helper';

const User = model.User;
const expect = chai.expect;
chai.should();

describe('User Model', () => {
  let user;

  describe('Create User', () => {
    it('should be able to create a user', () => {
      expect(User).to.exist;
      expect(typeof User).equal('object');
    });

    it('should create new user', (done) => {
      User.create(data.adminUser)
        .then((createdUser) => {
          user = createdUser;
          done();
          expect(user).to.exist;
        });
    });

    it('should not store the real password but the hatched one ',
     () => {
       expect(user.password).to.not.equal(data.adminUser.password);
     });
  });

  describe('User Validation', () => {
    it('requires name fields to create a user', (done) => {
      User.create(data.invalid.noName)
        .catch((error) => {
          error.errors[0].message.should.equal('username cannot be null');
          error.errors[1].message.should.equal('firstname cannot be null');
          error.errors[2].message.should.equal('lastname cannot be null');
          done();
        });
    });

    it('created user should have firstname,lastname and email', () => {
      expect(user.firstname).equal(data.adminUser.firstname);
      expect(user.lastname).equal(data.adminUser.lastname);
      expect(user.username).equal(data.adminUser.username);
      expect(user.email).equal(data.adminUser.email);
    });

    it('requires name fields to create a user', (done) => {
      User.create(data.invalid.invalidDataType)
        .catch((error) => {
          error.errors[0].message.should
          .equal('email cannot be an array or an object');
          error.errors[1].message.should
          .equal('name should contain only letters');
          error.errors[2].message.should.equal('input correct email field');
          done();
        });
    });

    it('ensures a user can only be created once', (done) => {
      User.create(data.adminUser)
        .catch((error) => {
          error.errors[0].message.should
          .equal('This username is already taken.');
          done();
        });
    });
  });

  describe('Email Validation', () => {
    it('requires email fields to create a user', (done) => {
      User.create(data.invalid.noEmail)
        .catch((error) => {
          error.errors[0].message.should.equal('email cannot be null');
          done();
        });
    });

    it('requires email fields to create a user', (done) => {
      User.create(data.invalid.invalidEmail)
        .catch((error) => {
          error.errors[0].message.should.equal('input correct email field');
          done();
        });
    });
  });


  describe('password Validation', () => {
    it('requires password fields longer than 8 to create a user', (done) => {
      User.create(data.invalid.shortPassword)
        .catch((error) => {
          error.errors[0].message.should
          .equal('password should be atleast 8 characters');
          done();
        });
    });

    it('requires password fields should not be null to create a user',
    (done) => {
      User.create(data.invalid.passwordEmpty)
        .catch((error) => {
          error.errors[0].message.should
          .equal('password cannot be null');
          done();
        });
    });
  });
});

