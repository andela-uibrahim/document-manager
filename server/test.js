import chai from 'chai';
import docMan from './docMan';

const expect = chai.expect;

describe('A suite', () => {
  it('contains spec with an expectation', () => {
    expect(docMan()).to.be.eql(true);
  });
});
