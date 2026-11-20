import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  randomInt,
  randomUUID,
  scrypt,
  timingSafeEqual,
} from 'node:crypto';
import { promisify } from 'node:util';
import type { CryptoConfig } from '../../client-side/categories/crypto-fields';

// Node's `scrypt` has overloads that `promisify` cannot type
const deriveKey = promisify(scrypt) as (password: string, salt: Buffer, keyLength: number) => Promise<Buffer>;

const ENCODINGS = ['hex', 'base64', 'base64url'] as const;
type Encoding = (typeof ENCODINGS)[number];

// Layout of an encrypted payload: salt, IV, GCM tag, then the ciphertext
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const TAG_LENGTH = 16;
const MAX_RANDOM_BYTES = 1024;

function toBuffer(input: unknown, name = 'Input') {
  if (typeof input === 'string') {
    return Buffer.from(input, 'utf8');
  }
  if (Buffer.isBuffer(input)) {
    return input;
  }
  throw new Error(`${name} must be a string or a Buffer`);
}

function toText(input: unknown) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  return input;
}

function pickEncoding(encoding: string | undefined = 'hex'): Encoding {
  if (!ENCODINGS.includes(encoding as Encoding)) {
    throw new Error(`Unknown encoding "${encoding}"`);
  }
  return encoding as Encoding;
}

function requireKey(config: CryptoConfig) {
  if (typeof config?.key !== 'string' || !config.key) {
    throw new Error('Key is required');
  }
  return config.key;
}

function toInteger(value: unknown, name: string) {
  const number = Number(value);
  if (value === '' || value === undefined || !Number.isSafeInteger(number)) {
    throw new Error(`${name} must be an integer`);
  }
  return number;
}

const sha256 = (input: Buffer) => createHash('sha256').update(input).digest();

export const cryptoUtilities = {
  hash: (input: unknown, config: CryptoConfig) =>
    createHash(config?.algorithm ?? 'sha256')
      .update(toBuffer(input))
      .digest(pickEncoding(config?.encoding)),

  hmac: (input: unknown, config: CryptoConfig) =>
    createHmac(config?.algorithm ?? 'sha256', requireKey(config))
      .update(toBuffer(input))
      .digest(pickEncoding(config?.encoding)),

  randomBytes: (_: unknown, config: CryptoConfig) => {
    const size = toInteger(config?.size ?? 16, 'Size');
    if (size < 1 || size > MAX_RANDOM_BYTES) {
      throw new Error(`Size must be between 1 and ${MAX_RANDOM_BYTES}`);
    }
    return randomBytes(size).toString(pickEncoding(config?.encoding));
  },

  randomInt: (_: unknown, config: CryptoConfig) => {
    const min = toInteger(config?.min ?? 0, 'Min');
    const max = toInteger(config?.max ?? 100, 'Max');
    if (min >= max) {
      throw new Error('Min must be lower than Max');
    }
    return randomInt(min, max);
  },

  randomUUID: () => randomUUID(),

  base64Encode: (input: unknown, config: CryptoConfig) =>
    toBuffer(input).toString(config?.variant === 'base64url' ? 'base64url' : 'base64'),

  // Reads both base64 and base64url
  base64Decode: (input: unknown) => Buffer.from(toText(input), 'base64').toString('utf8'),

  hexEncode: (input: unknown) => toBuffer(input).toString('hex'),

  hexDecode: (input: unknown) => {
    const text = toText(input).trim();
    if (text.length % 2 !== 0 || !/^[0-9a-f]*$/i.test(text)) {
      throw new Error('Input is not valid hexadecimal');
    }
    return Buffer.from(text, 'hex').toString('utf8');
  },

  encrypt: async (input: unknown, config: CryptoConfig) => {
    const password = requireKey(config);
    const salt = randomBytes(SALT_LENGTH);
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv('aes-256-gcm', await deriveKey(password, salt, 32), iv);
    const encrypted = Buffer.concat([cipher.update(toBuffer(input)), cipher.final()]);
    return Buffer.concat([salt, iv, cipher.getAuthTag(), encrypted]).toString('base64');
  },

  decrypt: async (input: unknown, config: CryptoConfig) => {
    const password = requireKey(config);
    const payload = Buffer.from(toText(input), 'base64');
    if (payload.length < SALT_LENGTH + IV_LENGTH + TAG_LENGTH) {
      throw new Error('Input is not an encrypted payload');
    }
    const salt = payload.subarray(0, SALT_LENGTH);
    const iv = payload.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const tag = payload.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const encrypted = payload.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    try {
      const decipher = createDecipheriv('aes-256-gcm', await deriveKey(password, salt, 32), iv);
      decipher.setAuthTag(tag);
      return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
    } catch {
      throw new Error('Unable to decrypt: wrong key or corrupted data');
    }
  },

  // Both sides are hashed first: `timingSafeEqual` needs the same length, and the length stays hidden
  timingSafeEqual: (input: unknown, config: CryptoConfig) =>
    timingSafeEqual(sha256(toBuffer(input)), sha256(toBuffer(config?.compare, 'Compared value'))),

  jwtDecode: (input: unknown) => {
    const parts = toText(input).trim().split('.');
    if (parts.length !== 3) {
      throw new Error('Input is not a JWT');
    }
    try {
      const [header, payload] = parts
        .slice(0, 2)
        .map((part) => JSON.parse(Buffer.from(part, 'base64url').toString('utf8')));
      return { header, payload };
    } catch {
      throw new Error('Input is not a JWT');
    }
  },
};
