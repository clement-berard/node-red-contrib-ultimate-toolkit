import { describe, expect, it } from 'vitest';
import { DEFAULT_OUTPUT_RULE, getOutputRules } from './output-rules';

describe('getOutputRules', () => {
  it('falls back to msg.payload = result when there is no rule', () => {
    expect(getOutputRules(undefined)).toEqual([DEFAULT_OUTPUT_RULE]);
    expect(getOutputRules([])).toEqual([DEFAULT_OUTPUT_RULE]);
    expect(DEFAULT_OUTPUT_RULE).toMatchObject({ target: 'payload', targetType: 'msg', sourceType: 'result' });
  });

  it('keeps the given rules', () => {
    const rules = [{ target: 'topic', targetType: 'msg' as const, source: 'a', sourceType: 'str' }];
    expect(getOutputRules(rules)).toBe(rules);
  });
});
