import chai from 'chai';
import model from '../../../server/models/index';
import data from '../helper/helper';

const Role = model.Role;
const expect = chai.expect;
chai.should();

describe('Role Model,', () => {
  let role;

  describe('Create Role', () => {
    it('should exist and be an object', () => {
      expect(Role).to.exist;
      expect(typeof Role).equal('object');
    });

    it('should create new role', (done) => {
      Role.create(data.newRole)
        .then((createdRole) => {
          role = createdRole;
          done();
          expect(role).to.exist;
        });
    });
  });
});

