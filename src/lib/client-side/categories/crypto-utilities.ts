import type { UtilityCategory } from '../../../types/UtilityList';
import { mdn, nodejs } from '../../../utils/docs';
import {
  base64Fields,
  compareFields,
  hashFields,
  hmacFields,
  keyFields,
  randomBytesFields,
  randomIntFields,
} from './crypto-fields';

export const cryptoUtilities: UtilityCategory = {
  hash: {
    description: 'Returns the digest of a string or a Buffer (md5 and sha1 are not safe for security)',
    fields: hashFields,
    docs: nodejs('crypto.html#cryptocreatehashalgorithm-options'),
  },
  hmac: {
    description: 'Returns the HMAC of a string or a Buffer, signed with a secret key',
    fields: hmacFields,
    docs: nodejs('crypto.html#cryptocreatehmacalgorithm-key-options'),
  },
  randomBytes: {
    description: 'Generates cryptographically secure random bytes, the payload is ignored',
    fields: randomBytesFields,
    docs: nodejs('crypto.html#cryptorandombytessize-callback'),
  },
  randomInt: {
    description:
      'Generates a cryptographically secure random integer from Min (included) to Max (excluded), the payload is ignored',
    fields: randomIntFields,
    docs: nodejs('crypto.html#cryptorandomintmin-max-callback'),
  },
  randomUUID: {
    description: 'Generates a random UUID v4, the payload is ignored',
    docs: nodejs('crypto.html#cryptorandomuuidoptions'),
  },
  base64Encode: {
    description: 'Encodes a string or a Buffer to base64 (or base64url)',
    fields: base64Fields,
    docs: mdn('Glossary/Base64'),
  },
  base64Decode: {
    description: 'Decodes a base64 or base64url string to text',
    docs: mdn('Glossary/Base64'),
  },
  hexEncode: {
    description: 'Encodes a string or a Buffer to hexadecimal',
  },
  hexDecode: {
    description: 'Decodes a hexadecimal string to text',
  },
  encrypt: {
    description:
      'Encrypts text with AES-256-GCM, the key is a secret read from env, flow or global. Returns a base64 string',
    docs: 'Use <code>Decrypt</code> with the same key to read it back. A random salt and IV are generated for every message',
    fields: keyFields,
  },
  decrypt: {
    description: 'Decrypts a base64 string made by Encrypt, with the same key',
    fields: keyFields,
  },
  timingSafeEqual: {
    description: 'True if the payload equals the compared value, in constant time (secrets, tokens, signatures)',
    fields: compareFields,
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: nodejs('crypto.html#cryptotimingsafeequala-b'),
  },
  jwtDecode: {
    description: 'Decodes the header and the payload of a JWT. The signature is NOT verified',
  },
};
