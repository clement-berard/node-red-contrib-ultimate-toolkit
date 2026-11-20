import { describe, expect, it } from 'vitest';
import { cryptoUtilities } from '../crypto-utilities';

const config = (values: Record<string, unknown> = {}) => values as any;

describe('cryptoUtilities', () => {
  describe('hash', () => {
    it('hashes with sha256 in hex by default', () => {
      expect(cryptoUtilities.hash('abc', config())).toBe(
        'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
      );
    });

    it('uses the algorithm and the encoding', () => {
      expect(cryptoUtilities.hash('abc', config({ algorithm: 'md5' }))).toBe('900150983cd24fb0d6963f7d28e17f72');
      expect(cryptoUtilities.hash('abc', config({ algorithm: 'md5', encoding: 'base64' }))).toBe(
        'kAFQmDzST7DWlj99KOF/cg==',
      );
    });

    it('accepts a Buffer and rejects anything else', () => {
      expect(cryptoUtilities.hash(Buffer.from('abc'), config())).toBe(cryptoUtilities.hash('abc', config()));
      expect(() => cryptoUtilities.hash(42, config())).toThrow('Input must be a string or a Buffer');
    });

    it('throws on an unknown algorithm or encoding', () => {
      expect(() => cryptoUtilities.hash('abc', config({ algorithm: 'nope' }))).toThrow();
      expect(() => cryptoUtilities.hash('abc', config({ encoding: 'nope' }))).toThrow('Unknown encoding "nope"');
    });
  });

  describe('hmac', () => {
    it('signs with the key', () => {
      expect(cryptoUtilities.hmac('The quick brown fox jumps over the lazy dog', config({ key: 'key' }))).toBe(
        'f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8',
      );
    });

    it('requires a key', () => {
      expect(() => cryptoUtilities.hmac('a', config())).toThrow('Key is required');
      expect(() => cryptoUtilities.hmac('a', config({ key: '' }))).toThrow('Key is required');
    });
  });

  describe('random', () => {
    it('randomBytes returns the requested size in the chosen encoding', () => {
      expect(cryptoUtilities.randomBytes(null, config({ size: '16' }))).toMatch(/^[0-9a-f]{32}$/);
      expect(cryptoUtilities.randomBytes(null, config({ size: '3', encoding: 'base64' }))).toHaveLength(4);
      expect(cryptoUtilities.randomBytes(null, config())).toHaveLength(32);
    });

    it('randomBytes validates the size', () => {
      expect(() => cryptoUtilities.randomBytes(null, config({ size: '0' }))).toThrow('Size must be between');
      expect(() => cryptoUtilities.randomBytes(null, config({ size: '5000' }))).toThrow('Size must be between');
      expect(() => cryptoUtilities.randomBytes(null, config({ size: 'abc' }))).toThrow('Size must be an integer');
      expect(() => cryptoUtilities.randomBytes(null, config({ size: '' }))).toThrow('Size must be an integer');
    });

    it('randomInt stays in [min, max)', () => {
      for (let index = 0; index < 50; index++) {
        const value = cryptoUtilities.randomInt(null, config({ min: '5', max: '8' }));
        expect(value).toBeGreaterThanOrEqual(5);
        expect(value).toBeLessThan(8);
      }
    });

    it('randomInt validates the bounds', () => {
      expect(() => cryptoUtilities.randomInt(null, config({ min: '5', max: '5' }))).toThrow(
        'Min must be lower than Max',
      );
      expect(() => cryptoUtilities.randomInt(null, config({ min: 'a', max: '5' }))).toThrow('Min must be an integer');
    });

    it('randomUUID returns a UUID v4', () => {
      expect(cryptoUtilities.randomUUID()).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      );
    });
  });

  describe('base64 and hex', () => {
    const bytes = Buffer.from([0xfb, 0xff]);

    it('base64Encode handles both variants', () => {
      expect(cryptoUtilities.base64Encode('hello', config())).toBe('aGVsbG8=');
      expect(cryptoUtilities.base64Encode(bytes, config())).toBe('+/8=');
      expect(cryptoUtilities.base64Encode(bytes, config({ variant: 'base64url' }))).toBe('-_8');
    });

    it('base64Decode reads both variants', () => {
      expect(cryptoUtilities.base64Decode('aGVsbG8=')).toBe('hello');
      expect(cryptoUtilities.base64Decode('aGVsbG8')).toBe('hello');
      expect(cryptoUtilities.base64Decode(cryptoUtilities.base64Encode('é-?>', config({ variant: 'base64url' })))).toBe(
        'é-?>',
      );
      expect(() => cryptoUtilities.base64Decode(1)).toThrow('Input must be a string');
    });

    it('hex round trip', () => {
      expect(cryptoUtilities.hexEncode('hi')).toBe('6869');
      expect(cryptoUtilities.hexDecode('6869')).toBe('hi');
      expect(cryptoUtilities.hexDecode(' 6869 ')).toBe('hi');
    });

    it('hexDecode rejects invalid hexadecimal', () => {
      expect(() => cryptoUtilities.hexDecode('abc')).toThrow('Input is not valid hexadecimal');
      expect(() => cryptoUtilities.hexDecode('zz')).toThrow('Input is not valid hexadecimal');
    });
  });

  describe('encrypt and decrypt', () => {
    const key = config({ key: 'correct horse battery staple' });

    it('round trips', async () => {
      const encrypted = await cryptoUtilities.encrypt('secret message', key);
      expect(encrypted).not.toContain('secret');
      await expect(cryptoUtilities.decrypt(encrypted, key)).resolves.toBe('secret message');
    });

    it('uses a new salt and IV for every message', async () => {
      expect(await cryptoUtilities.encrypt('a', key)).not.toBe(await cryptoUtilities.encrypt('a', key));
    });

    it('fails with a wrong key or corrupted data', async () => {
      const encrypted = await cryptoUtilities.encrypt('a', key);
      await expect(cryptoUtilities.decrypt(encrypted, config({ key: 'other' }))).rejects.toThrow(
        'Unable to decrypt: wrong key or corrupted data',
      );
      const corrupted = Buffer.from(encrypted, 'base64');
      corrupted[corrupted.length - 1] ^= 1;
      await expect(cryptoUtilities.decrypt(corrupted.toString('base64'), key)).rejects.toThrow('Unable to decrypt');
    });

    it('rejects a payload that is too short, a missing key and a non string input', async () => {
      await expect(cryptoUtilities.decrypt('abcd', key)).rejects.toThrow('Input is not an encrypted payload');
      await expect(cryptoUtilities.encrypt('a', config())).rejects.toThrow('Key is required');
      await expect(cryptoUtilities.decrypt(1, key)).rejects.toThrow('Input must be a string');
    });
  });

  describe('timingSafeEqual', () => {
    it('compares the payload with the compared value', () => {
      expect(cryptoUtilities.timingSafeEqual('token', config({ compare: 'token' }))).toBe(true);
      expect(cryptoUtilities.timingSafeEqual('token', config({ compare: 'tokeN' }))).toBe(false);
      expect(cryptoUtilities.timingSafeEqual('token', config({ compare: 'a much longer value' }))).toBe(false);
    });

    it('requires a string or a Buffer on both sides', () => {
      expect(() => cryptoUtilities.timingSafeEqual('a', config())).toThrow(
        'Compared value must be a string or a Buffer',
      );
      expect(() => cryptoUtilities.timingSafeEqual(1, config({ compare: 'a' }))).toThrow(
        'Input must be a string or a Buffer',
      );
    });
  });

  describe('jwtDecode', () => {
    const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url');

    it('returns the header and the payload without checking the signature', () => {
      const token = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: '1', name: 'Zoé' })}.anything`;
      expect(cryptoUtilities.jwtDecode(token)).toEqual({
        header: { alg: 'HS256', typ: 'JWT' },
        payload: { sub: '1', name: 'Zoé' },
      });
    });

    it('rejects what is not a JWT', () => {
      expect(() => cryptoUtilities.jwtDecode('a.b')).toThrow('Input is not a JWT');
      expect(() => cryptoUtilities.jwtDecode('a.b.c')).toThrow('Input is not a JWT');
      expect(() => cryptoUtilities.jwtDecode(1)).toThrow('Input must be a string');
    });
  });
});
