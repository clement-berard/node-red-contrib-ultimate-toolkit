import { describe, expect, it } from 'vitest';
import { nextNodeName } from '../next-node-name';

describe('nextNodeName', () => {
  it('starts at 1', () => {
    expect(nextNodeName('debug-kit', [])).toBe('debug-kit 1');
  });

  it('goes one above the highest number, ignoring other names', () => {
    expect(nextNodeName('debug-kit', ['debug-kit 1', 'debug-kit 4', 'debug-kit x', 'other 9', undefined, ''])).toBe(
      'debug-kit 5',
    );
  });
});
