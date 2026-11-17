import { getEditableListItems, initEditableList } from '@keload/node-red-dxp/editor/dom-helper';
import type { EditorWidgetTypedInputType, EditorWidgetTypedInputTypeDefinition } from 'node-red';
import type { OutputRule, OutputTargetType } from '../../../types/OutputRule';
import { DEFAULT_OUTPUT_RULE, getOutputRules } from '../../../utils/output-rules';

const LIST_SELECTOR = '$outputProps-container';

const TARGET_TYPES: EditorWidgetTypedInputType[] = ['msg', 'flow', 'global'];

const SOURCE_TYPES: (EditorWidgetTypedInputType | EditorWidgetTypedInputTypeDefinition)[] = [
  { value: 'result', label: 'result', hasValue: false },
  { value: 'input', label: 'input', hasValue: false },
  'msg',
  'flow',
  'global',
  'str',
  'num',
  'bool',
  'json',
  'jsonata',
  'env',
  'date',
];

// One line per rule, like the native change node: `target = source`
function addRow(row: JQuery, data: Partial<OutputRule>) {
  const rule: OutputRule = { ...DEFAULT_OUTPUT_RULE, target: '', ...data };
  const line = $('<div/>', { style: 'display:flex;align-items:baseline;gap:6px;' }).appendTo(row);

  const target = $('<input/>', { type: 'text', class: 'output-target' }).appendTo(line);
  target.typedInput({ types: TARGET_TYPES, default: rule.targetType });
  target.typedInput('value', rule.target);

  $('<span/>').text('=').appendTo(line);

  const source = $('<input/>', { type: 'text', class: 'output-source' }).appendTo(line);
  source.typedInput({ types: SOURCE_TYPES, default: rule.sourceType });
  source.typedInput('value', rule.source);
  // the source takes more room than the target
  source.next('.red-ui-typedInput-container').css('flex', '1.6 1 0%');
}

export function initOutputList(rules?: OutputRule[]) {
  initEditableList<OutputRule>({ selector: LIST_SELECTOR, items: getOutputRules(rules), addItem: addRow });
}

export function readOutputList(): OutputRule[] {
  const rules = getEditableListItems<OutputRule>(LIST_SELECTOR, (row) => {
    const target = row.find('.output-target');
    const source = row.find('.output-source');
    return {
      target: target.typedInput('value'),
      targetType: target.typedInput('type') as OutputTargetType,
      source: source.typedInput('value'),
      sourceType: source.typedInput('type'),
    };
  });
  return rules.length ? rules : [DEFAULT_OUTPUT_RULE];
}
