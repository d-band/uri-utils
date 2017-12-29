const Benchmark = require('benchmark');
const { encode } = require('../lib/index');

const suite = new Benchmark.Suite();
const data = 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash';
const utf8 = '这是中文哈哈😝';

console.log('node version: %s', process.version);

suite
  .add('uri-utils', function() {
    encode(data);
    encode(utf8);
  })
  .add('encodeURIComponent', function() {
    encodeURIComponent(data);
    encodeURIComponent(utf8);
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