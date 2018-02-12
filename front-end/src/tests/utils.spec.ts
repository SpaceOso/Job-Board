import { expect } from 'chai';
import 'mocha';

describe('Hello function', () => {
  it('should return Hello World', () => {
    const result = 'Hello Rico';
    expect(result).to.equal('Hello Rico');
  });
});