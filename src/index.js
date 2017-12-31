import * as Type from './type';

const { TYPE, isAllow } = Type;

const hexTable = new Array(128);
for (let i = 0; i < 128; ++i) {
  hexTable[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase();
}

/**
 * Encode characters outside the unreserved character set as defined in
 * <a href="https://tools.ietf.org/html/rfc3986#section-2">RFC 3986 Section 2</a>.
 * <p>This can be used to ensure the given String will not contain any
 * characters with reserved URI meaning regardless of URI component.
 * @param source the String to be encoded
 * @param type the type of encode (default TYPE.URI)
 * @return the encoded String
 */
function encode (source, type = TYPE.URI) {
  if (!source) return source;
  let out = '';
  let tmp = '';
  for (let i = 0; i < source.length; ++i) {
    const s = source[i];
    const c = s.charCodeAt(0);
    // ASCII
    if (c < 0x80) {
      if (tmp.length) {
        out += encodeURIComponent(tmp);
        tmp = '';
      }
      if (isAllow(c, type)) {
        out += s;
      } else {
        out += hexTable[c];
      }
    } else {
      tmp += s;
    }
  }
  if (tmp.length) {
    out += encodeURIComponent(tmp);
  }
  return out;
}

/**
 * Encode the given URI scheme.
 * @param scheme the scheme to be encoded
 * @return the encoded scheme
 */
function encodeScheme (scheme) {
  return encode(scheme, TYPE.SCHEME);
}

/**
 * Encode the given URI authority.
 * @param authority the authority to be encoded
 * @return the encoded authority
 */
function encodeAuthority (authority) {
  return encode(authority, TYPE.AUTHORITY);
}

/**
 * Encode the given URI user info.
 * @param userInfo the user info to be encoded
 * @return the encoded user info
 */
function encodeUserInfo (userInfo) {
  return encode(userInfo, TYPE.USER_INFO);
}

/**
 * Encode the given URI host.
 * @param host the host to be encoded
 * @return the encoded host
 */
function encodeHost (host) {
  return encode(host, TYPE.HOST_IPV4);
}

/**
 * Encode the given URI port.
 * @param port the port to be encoded
 * @return the encoded port
 */
function encodePort (port) {
  return encode(port, TYPE.PORT);
}

/**
 * Encode the given URI path.
 * @param path the path to be encoded
 * @return the encoded path
 */
function encodePath (path) {
  return encode(path, TYPE.PATH);
}

/**
 * Encode the given URI path segment.
 * @param segment the segment to be encoded
 * @return the encoded segment
 */
function encodePathSegment (segment) {
  return encode(segment, TYPE.PATH_SEGMENT);
}

/**
 * Encode the given URI query.
 * @param query the query to be encoded
 * @return the encoded query
 */
function encodeQuery (query) {
  return encode(query, TYPE.QUERY);
}

/**
 * Encode the given URI query parameter.
 * @param queryParam the query parameter to be encoded
 * @return the encoded query parameter
 */
function encodeQueryParam (queryParam) {
  return encode(queryParam, TYPE.QUERY_PARAM);
}

/**
 * Encode the given URI fragment.
 * @param fragment the fragment to be encoded
 * @return the encoded fragment
 */
function encodeFragment (fragment) {
  return encode(fragment, TYPE.FRAGMENT);
}

export * from './type';

export {
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
};
