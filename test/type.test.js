import { expect } from 'chai';
import { isGenericDelimiter, isReserved, isAllow } from '../src/type';

describe('Test type functions', () => {
  it('should isGenericDelimiter() ok', () => {
    ':/?#[]@'.split('').map(v => {
      expect(isGenericDelimiter(v.charCodeAt(0))).to.be.true;
    });
    expect(isGenericDelimiter(123)).to.be.false;
  });
  it('should isReserved() ok', () => {
    ':/?#[]@!$&\'()*+,;='.split('').map(v => {
      expect(isReserved(v.charCodeAt(0))).to.be.true;
    });
    expect(isReserved(123)).to.be.false;
  });
  it('should isAllow() ok', () => {
    expect(isAllow('test', 13)).to.be.false;
  });
});
