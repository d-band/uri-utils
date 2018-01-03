URI Utilities
=============

[![NPM version](https://img.shields.io/npm/v/uri-utils.svg)](https://www.npmjs.com/package/uri-utils)
[![NPM downloads](https://img.shields.io/npm/dm/uri-utils.svg)](https://www.npmjs.com/package/uri-utils)
[![Build Status](https://travis-ci.org/d-band/uri-utils.svg?branch=master)](https://travis-ci.org/d-band/uri-utils)
[![Coverage Status](https://coveralls.io/repos/github/d-band/uri-utils/badge.svg?branch=master)](https://coveralls.io/github/d-band/uri-utils?branch=master)
[![Dependency Status](https://david-dm.org/d-band/uri-utils.svg)](https://david-dm.org/d-band/uri-utils)
[![Greenkeeper badge](https://badges.greenkeeper.io/d-band/uri-utils.svg)](https://greenkeeper.io/)

> Utility for URI encoding based on RFC 3986.

## Getting Started

### Install

```bash
$ npm install --save uri-utils
```

### Usage Example

```javascript
import { encode, encodePath } from 'uri-utils';

// or
import * as utils from 'uri-utils';
```

## API Reference

```javascript
import {
  TYPE,
  encodeScheme,
  encodeAuthority,
  encodeUserInfo,
  encodeHost,
  encodePort,
  encodePath,
  encodePathSegment,
  encodeQuery,
  encodeQueryParam,
  encodeFragment,
  encode
} from 'uri-utils';
```

```
         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
          |   _____________________|__
         / \ /                        \
         urn:example:animal:ferret:nose
```

- `TYPE`: encode type for uri
  ```
  enum TYPE {
    SCHEME,
    AUTHORITY,
    USER_INFO,
    HOST_IPV4,
    HOST_IPV6,
    PORT,
    PATH,
    PATH_SEGMENT,
    QUERY,
    QUERY_PARAM,
    FRAGMENT,
    URI
  }
  ```
- `encode(source: String, type: TYPE)`: encode with type (type default `TYPE.URI` like `encodeURIComponent`)
- `encodeScheme(str: String)`: encode scheme
- `encodeAuthority(str: String)`: encode authority
- `encodeUserInfo(str: String)`: encode user info
- `encodeHost(str: String)`: encode host
- `encodePort(str: String)`: encode port
- `encodePath(str: String)`: encode path
- `encodePathSegment(str: String)`: encode path segment
- `encodeQuery(str: String)`: encode query 
- `encodeQueryParam(str: String)`: encode query param
- `encodeFragment(str: String)`: encode fragment


## Benchmark

```
node version: v4.8.7
uri-utils          x 150,915 ops/sec ±1.08% (89 runs sampled)
encodeURIComponent x 112,777 ops/sec ±1.29% (73 runs sampled)
Fastest is uri-utils

node version: v6.12.3
uri-utils          x 80,632 ops/sec ±0.55% (75 runs sampled)
encodeURIComponent x 73,166 ops/sec ±1.32% (77 runs sampled)
Fastest is uri-utils

node version: v8.9.4
uri-utils          x 155,020 ops/sec ±5.58% (75 runs sampled)
encodeURIComponent x 612,347 ops/sec ±4.05% (83 runs sampled)
Fastest is encodeURIComponent
```

## Report a issue

* [All issues](https://github.com/d-band/uri-utils/issues)
* [New issue](https://github.com/d-band/uri-utils/issues/new)

## License

uri-utils is available under the terms of the MIT License.