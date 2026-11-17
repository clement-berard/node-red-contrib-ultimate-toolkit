import type { NodeEditorDefinition } from '@keload/node-red-dxp/editor';
import {
  applyTypedInput,
  getFormValues,
  initSelect,
  isCheckboxChecked,
  jqSelector,
  setFormValues,
  watchInput,
} from '@keload/node-red-dxp/editor/dom-helper';
import { title } from 'radash';
import { getCategories, getFunctionDetails, getFunctionsFromCategory } from '../../../lib/client-side';
import type { NodeMainProps } from '../../../types/NodeMainProps';

// Categories having dedicated fields (`configArgs` in list.ts): one entry per category, nothing else to wire
const CONFIG_CATEGORIES = ['arrayUtilities', 'mathUtilities', 'dateUtilities', 'tools', 'asyncUtilities'] as const;

const Main: NodeEditorDefinition<NodeMainProps> = {
  category: 'toolkit',
  color: '#8EA3A6',
  paletteLabel: 'toolkit',
  defaults: {
    name: { value: '' },
    entry: { value: 'payload', required: true },
    entryType: { value: 'msg', required: true },
    category: { value: '', required: true },
    function: { value: '', required: true },
    mainValue: { value: '' },
    splitBooleanOutputs: { value: false },
    inverseReturnValue: { value: false },
    ...(Object.fromEntries(CONFIG_CATEGORIES.map((category) => [category, { value: {} }])) as Record<
      (typeof CONFIG_CATEGORIES)[number],
      { value: object }
    >),
    outputs: { value: 1 },
  },
  inputs: 1,
  outputs: 1,
  outputLabels: function (index) {
    if (this.outputs > 1) {
      return index === 0 ? 'True' : 'False';
    }
    return undefined;
  },
  icon: 'font-awesome/fa-wrench',
  label: function () {
    return this.name || `${this.inverseReturnValue ? '!' : ''}${this.function}` || 'toolkit';
  },
  oneditsave: function () {
    const { forceSplitBooleanOutputs = false } = getFunctionDetails(
      jqSelector('$category').val() as string,
      jqSelector('$function').val() as string,
    );
    this.outputs = isCheckboxChecked('$splitBooleanOutputs') || forceSplitBooleanOutputs ? 2 : 1;
    for (const category of CONFIG_CATEGORIES) {
      this[category] = getFormValues(category);
    }
  },
  oneditprepare: function () {
    for (const category of CONFIG_CATEGORIES) {
      setFormValues(category, this[category]);
    }

    applyTypedInput({
      selector: '$entry',
      types: ['msg', 'flow', 'global', 'str', 'json', 'jsonata', 'env'],
    });

    initSelect(
      '$category',
      getCategories.map((v) => ({ value: v, text: title(v) })),
      {
        selected: this.category,
        emptyValue: ' ',
      },
    );

    function populateSelectFunction(category?: string, currentFunction?: string | undefined) {
      const options = category ? getFunctionsFromCategory(category) : [];
      initSelect(
        '$function',
        options.map(({ key, label }) => ({ value: key, text: label })),
        {
          selected: currentFunction,
          emptyValue: ' ',
        },
      );
    }

    function handleShowDivs(category?: string, currentFunction?: string | undefined) {
      // get details
      const fnDetails = getFunctionDetails(category as string, currentFunction as string);
      // force hide optionals fields
      jqSelector('.extra-field').addClass('hidden!');
      //docs part
      const docs = fnDetails?.nodeDocs;
      if (docs.replace(/(<br>|\n)/g, '').trim()) {
        jqSelector('.fn-docs')
          .html(docs.replace(/^(<br\s*\/?>|\n)+|(<br\s*\/?>|\n)+$/g, ''))
          .removeClass('hidden!');
      }
      // additional values part
      const hasMainValue = !!fnDetails?.mainValue;

      if (hasMainValue) {
        jqSelector('.additionalMainValue').removeClass('hidden!');
        if (fnDetails?.mainValue?.label) {
          jqSelector('.additionalMainValue label')
            .text(fnDetails.mainValue.label)
            .attr('title', fnDetails.mainValue.label);
        }
      }
      // split boolean outputs
      const hasCanSplitBooleanOutputs = !!fnDetails?.canSplitBooleanOutputs;
      if (hasCanSplitBooleanOutputs) {
        jqSelector('.splitBooleanOutputs').removeClass('hidden!');
      } else {
        jqSelector('$splitBooleanOutputs').prop('checked', false);
      }
      // inverse boolean value
      const hasInverseReturnValue = !!fnDetails?.inverseReturnValue;
      if (hasInverseReturnValue) {
        jqSelector('.inverseReturnValue').removeClass('hidden!');
      } else {
        jqSelector('$inverseReturnValue').prop('checked', false);
      }
      // reveal classes
      const revealClassesSelectors = (fnDetails?.revealClasses || []).map((c) => `.${c}`).join(',');
      $(revealClassesSelectors).removeClass('hidden!');
    }

    populateSelectFunction(this.category, this.function);
    handleShowDivs(this.category, this.function);

    watchInput(['$category'], ([category]) => {
      handleShowDivs(category, this.function);
      populateSelectFunction(category);
    });

    watchInput(['$function'], ([functionValue]) => {
      handleShowDivs(jqSelector('$category').val() as string, functionValue);
    });
  },
};

export default Main;
