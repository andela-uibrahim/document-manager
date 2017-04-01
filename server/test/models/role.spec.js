import chai from 'chai';
import model from './index';
import data from '../helper/helper';

const Role = model.Role;
const expect = chai.expect;
chai.should();

describe('Role.create', () => {
  it('should create a public document when access is public', (done) => {
    Role.create(data.newRole).then((user) => {
      expect(user.role).equal('admin');
      done();
    });
  });

  it('should not create role when role is invalid', (done) => {
    Role.create(data.invalid.badRole)
      .catch((error) => {
        error.errors[0].message.should
        .equal('role can only be admin or regular');
        done();
      });
  });

  it('role fields should assign a default value of regular', (done) => {
    Role.create({
    }).then((user) => {
      expect(user.role).equal('regular');
      done();
    });
  });
});

