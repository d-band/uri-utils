import { expect } from 'chai';
import * as utils from '../src/index';

describe('Test uri-utils', () => {
  it('should encodeScheme() encoded', () => {
    expect(utils.encodeScheme('foobar+-.')).to.be.equal('foobar+-.');
    expect(utils.encodeScheme('foo bar')).to.be.equal('foo%20bar');
  });
  it('should encodeAuthority() encoded', () => {
    expect(utils.encodeAuthority('foobar:@')).to.be.equal('foobar:@');
    expect(utils.encodeAuthority('foo bar@host:8080')).to.be.equal('foo%20bar@host:8080');
  });
  it('should encodeUserInfo() encoded', () => {
    expect(utils.encodeUserInfo('foobar:')).to.be.equal('foobar:');
    expect(utils.encodeUserInfo('foo bar')).to.be.equal('foo%20bar');
  });
  it('should encodeHost() encoded', () => {
    expect(utils.encodeHost('foobar')).to.be.equal('foobar');
    expect(utils.encodeHost('foo bar')).to.be.equal('foo%20bar');
    expect(utils.encodeHost('test.com')).to.be.equal('test.com');
  });
  it('should encodePort() encoded', () => {
    expect(utils.encodePort('80')).to.be.equal('80');
  });
  it('should encodePath() encoded', () => {
    expect(utils.encodePath('/foo/bar')).to.be.equal('/foo/bar');
    expect(utils.encodePath('/foo bar#?.js')).to.be.equal('/foo%20bar%23%3F.js');
    expect(utils.encodePath('/Z\u00fcrich')).to.be.equal('/Z%C3%BCrich');
  });
  it('should encodePathSegment() encoded', () => {
    expect(utils.encodePathSegment('foobar')).to.be.equal('foobar');
    expect(utils.encodePathSegment('/foo/bar')).to.be.equal('%2Ffoo%2Fbar');
  });
  it('should encodeQuery() encoded', () => {
    expect(utils.encodeQuery('foobar')).to.be.equal('foobar');
    expect(utils.encodeQuery('foo bar')).to.be.equal('foo%20bar');
    expect(utils.encodeQuery('foobar/+')).to.be.equal('foobar/+');
    expect(utils.encodeQuery('T\u014dky\u014d')).to.be.equal('T%C5%8Dky%C5%8D');
  });
  it('should encodeQueryParam() encoded', () => {
    expect(utils.encodeQueryParam('foobar')).to.be.equal('foobar');
    expect(utils.encodeQueryParam('foo bar')).to.be.equal('foo%20bar');
    expect(utils.encodeQueryParam('foo&bar')).to.be.equal('foo%26bar');
  });
  it('should encodeFragment() encoded', () => {
    expect(utils.encodeFragment('foobar')).to.be.equal('foobar');
    expect(utils.encodeFragment('foo bar')).to.be.equal('foo%20bar');
    expect(utils.encodeFragment('foobar/')).to.be.equal('foobar/');
  });
  it('should encode() encoded', () => {
    expect(utils.encode('')).to.be.equal('');
    // fixed encodeURIComponent
    expect(utils.encode("!'()*")).to.be.equal('%21%27%28%29%2A');
    expect(utils.encode('((-!-))')).to.be.equal('%28%28-%21-%29%29');
    expect(utils.encode('中文😝')).to.be.equal('%E4%B8%AD%E6%96%87%F0%9F%98%9D');
    expect(utils.encode('2001:db8::ff00:42:8329', utils.TYPE.HOST_IPV6)).to.be.equal('2001:db8::ff00:42:8329');
    expect(utils.encode('::1', utils.TYPE.HOST_IPV6)).to.be.equal('::1');
    expect(utils.encode('0.0.0.0', utils.TYPE.HOST_IPV4)).to.be.equal('0.0.0.0');
    expect(utils.encode('192.168.1.1', utils.TYPE.HOST_IPV4)).to.be.equal('192.168.1.1');
    const longURL = 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash';
    expect(utils.encode(longURL)).to.be.equal(encodeURIComponent(longURL));
  });
});
