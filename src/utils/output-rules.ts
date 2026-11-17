import type { OutputRule } from '../types/OutputRule';

// Historical behaviour: the result goes to msg.payload. Also used by nodes saved without any output rule
export const DEFAULT_OUTPUT_RULE: OutputRule = {
  target: 'payload',
  targetType: 'msg',
  source: '',
  sourceType: 'result',
};

export function getOutputRules(rules?: OutputRule[]): OutputRule[] {
  return rules?.length ? rules : [DEFAULT_OUTPUT_RULE];
}
