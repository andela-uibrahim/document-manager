import chai from 'chai';
import model from '../../../server/models/index';
import data from '../helper/helper';

const document = model.document;
const expect = chai.expect;
chai.should();

describe('Document.create', () => {
  it('should not create document for empty fields', (done) => {
    document.create({})
        .catch((error) => {
          error.errors[0].message.should.equal('title cannot be null');
          done();
        });
  });

  it('should create a public document when access is public', (done) => {
    document.create(data.publicDoc).then((doc) => {
      expect(doc.access).equal('public');
      done();
    });
  });

  it('should not create document when access is invalid', (done) => {
    document.create(data.invalid.invalidDoc)
      .catch((error) => {
        error.errors[0].message.should
        .equal('access can only be public, private and role');
        done();
      });
  });

  it('access fields should assign a default value of private', (done) => {
    document.create(data.privateDoc).then((user) => {
      expect(user.access).equal('private');
      done();
    });
  });
});

