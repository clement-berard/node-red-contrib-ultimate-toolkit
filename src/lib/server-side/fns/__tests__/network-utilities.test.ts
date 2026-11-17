import { afterEach, describe, expect, it, vi } from 'vitest';
import { networkUtilities } from '../network-utilities';

describe('networkUtilities', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('ipVersion', () => {
    it('returns 4, 6 or 0', () => {
      expect(networkUtilities.ipVersion('127.0.0.1')).toBe(4);
      expect(networkUtilities.ipVersion('::1')).toBe(6);
      expect(networkUtilities.ipVersion('nope')).toBe(0);
    });
  });

  describe('networkInterfaces', () => {
    it('returns an object', () => {
      expect(typeof networkUtilities.networkInterfaces()).toBe('object');
    });
  });

  describe('ipInformation', () => {
    it('throws on an invalid IP', async () => {
      await expect(networkUtilities.ipInformation('nope')).rejects.toThrow('Invalid IP address');
    });

    it('queries the given IP', async () => {
      const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ query: '8.8.8.8' }) });
      vi.stubGlobal('fetch', fetchMock);
      await expect(networkUtilities.ipInformation('8.8.8.8')).resolves.toEqual({ query: '8.8.8.8' });
      expect(fetchMock).toHaveBeenCalledWith('http://ip-api.com/json/8.8.8.8', expect.anything());
    });

    it('throws on a non-ok response', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 429, json: async () => ({}) }));
      await expect(networkUtilities.ipInformation('8.8.8.8')).rejects.toThrow('IP lookup failed (HTTP 429)');
    });

    it('queries the caller IP when no input', async () => {
      const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
      vi.stubGlobal('fetch', fetchMock);
      await networkUtilities.ipInformation(undefined);
      expect(fetchMock).toHaveBeenCalledWith('http://ip-api.com/json/', expect.anything());
    });
  });
});
