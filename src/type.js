/**
 * Enumeration used to identify the allowed characters per URI component.
 * <p>Contains methods to indicate whether a given character is valid in a specific URI component.
 * @see <a href="http://www.ietf.org/rfc/rfc3986.txt">RFC 3986</a>
 */
export const TYPE = {
  SCHEME: 1,
  AUTHORITY: 2,
  USER_INFO: 3,
  HOST_IPV4: 4,
  HOST_IPV6: 5,
  PORT: 6,
  PATH: 7,
  PATH_SEGMENT: 8,
  QUERY: 9,
  QUERY_PARAM: 10,
  FRAGMENT: 11,
  URI: 12
};

/**
 * Indicates whether the given character is in the {@code ALPHA} set.
 * @see <a href="http://www.ietf.org/rfc/rfc3986.txt">RFC 3986, appendix A</a>
 */
export function isAlpha (c) {
  return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
}

/**
 * Indicates whether the given character is in the {@code DIGIT} set.
 * @see <a href="http://www.ietf.org/rfc/rfc3986.txt">RFC 3986, appendix A</a>
 */
export function isDigit (c) {
  return (c >= 48 && c <= 57);
}

/**
 * Indicates whether the given character is in the {@code gen-delims} set.
 * @see <a href="http://www.ietf.org/rfc/rfc3986.txt">RFC 3986, appendix A</a>
 */
export function isGenericDelimiter (c) {
  // :/?#[]@
  return [58, 47, 63, 35, 91, 93, 64].includes(c);
}

/**
 * Indicates whether the given character is in the {@code sub-delims} set.
 * @see <a href="http://www.ietf.org/rfc/rfc3986.txt">RFC 3986, appendix A</a>
 */
export function isSubDelimiter (c) {
  // !$&'()*+,;=
  return [33, 36, 38, 39, 40, 41, 42, 43, 44, 59, 61].includes(c);
}

/**
 * Indicates whether the given character is in the {@code reserved} set.
 * @see <a href="http://www.ietf.org/rfc/rfc3986.txt">RFC 3986, appendix A</a>
 */
export function isReserved (c) {
  return isGenericDelimiter(c) || isSubDelimiter(c);
}

/**
 * Indicates whether the given character is in the {@code unreserved} set.
 * @see <a href="http://www.ietf.org/rfc/rfc3986.txt">RFC 3986, appendix A</a>
 */
export function isUnreserved (c) {
  // -._~
  return isAlpha(c) || isDigit(c) || [45, 46, 95, 126].includes(c);
}

/**
 * Indicates whether the given character is in the {@code pchar} set.
 * @see <a href="http://www.ietf.org/rfc/rfc3986.txt">RFC 3986, appendix A</a>
 */
export function isPchar (c) {
  // :@
  return isUnreserved(c) || isSubDelimiter(c) || c === 58 || c === 64;
}

export function isAllow (c, type) {
  switch (type) {
    case TYPE.SCHEME:
      return isAlpha(c) || isDigit(c) || [43, 45, 46].includes(c);// +-.
    case TYPE.AUTHORITY:
      return isUnreserved(c) || isSubDelimiter(c) || c === 58 || c === 64;// :@
    case TYPE.USER_INFO:
      return isUnreserved(c) || isSubDelimiter(c) || c === 58;// :
    case TYPE.HOST_IPV4:
      return isUnreserved(c) || isSubDelimiter(c);
    case TYPE.HOST_IPV6:
      return isUnreserved(c) || isSubDelimiter(c) || [91, 93, 58].includes(c);// []:
    case TYPE.PORT:
      return isDigit(c);
    case TYPE.PATH:
      return isPchar(c) || c === 47;// /
    case TYPE.PATH_SEGMENT:
      return isPchar(c);
    case TYPE.QUERY:
      return isPchar(c) || c === 47 || c === 63;// /?
    case TYPE.QUERY_PARAM:
      return (c === 61 || c === 38)// =&
        ? false
        : (isPchar(c) || c === 47 || c === 63);// /?
    case TYPE.FRAGMENT:
      return isPchar(c) || c === 47 || c === 63;// /?
    case TYPE.URI:
      return isUnreserved(c);
    default: return false;
  }
}
