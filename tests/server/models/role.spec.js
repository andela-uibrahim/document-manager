import chai from 'chai';
import model from '../../../server/models/index';
import data from '../helper/helper';

const Role = model.Role;

chai.should();

// describe('Role.create', () => {
//   it('should not create role when role is invalid', (done) => {
//     Role.create(data.invalid.badRole)
//       .catch((error) => {
//         error.errors[0].message.should
//         .equal('role can only be admin or regular');
//         done();
//       });
//   });
// });

