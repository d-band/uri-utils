const Benchmark = require('benchmark');
const utils = require('../lib/index');

const suite = new Benchmark.Suite();

const str1 = 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash';
const str2 = '这是中文哈哈😝';
const str3 = 'https://user:pass@sub.host.com:8080/测试/😝/ok?test=呵呵#🙄';

console.log('node version: %s', process.version);

suite
  .add('uri-utils', function() {
    utils.encode(str1);
    utils.encode(str2);
    utils.encode(str3);
  })
  .add('encodeURIComponent', function() {
    encodeURIComponent(str1);
    encodeURIComponent(str2);
    encodeURIComponent(str3);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({
    async: false
  });