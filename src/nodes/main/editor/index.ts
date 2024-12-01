import type { NodeEditorDefinition } from '@keload/node-red-dxp/editor';
import {
  addClassesOnSelectors,
  initSelect,
  jqSelector,
  resolveSelector,
  watchInput,
} from '@keload/node-red-dxp/editor/dom-helper';
import { title } from 'radash';
import { getCategories, getDocsFromFunction, getFunctionDetails, getFunctionsFromCategory } from '../../../common/list';
import type { NodeMainProps } from '../types';

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
    outputs: { value: 1 },
  },
  inputs: 1,
  outputs: 1,
  outputLabels: function (index) {
    if (this.outputs > 1) {
      return index === 0 ? 'True' : 'False';
    }
    return null;
  },
  icon: 'font-awesome/fa-wrench',
  label: function () {
    return this.name || this.function || 'toolkit';
  },
  oneditsave: function () {
    // @ts-ignore
    this.outputs = jqSelector('$splitBooleanOutputs').is(':checked') ? 2 : 1;
  },
  oneditprepare: function () {
    jqSelector('$entry').typedInput({
      types: ['msg', 'flow', 'global', 'str'],
      typeField: resolveSelector('$entryType'),
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
      addClassesOnSelectors(['.fn-docs', '.additionalMainValue', '.splitBooleanOutputs'], ['hidden']);
      //docs part
      const docs = fnDetails?.docs;
      if (docs) {
        jqSelector('.fn-docs').html(docs).removeClass('hidden');
      }
      // additional values part
      const hasMainValue = !!fnDetails?.mainValue;

      if (hasMainValue) {
        jqSelector('.additionalMainValue').removeClass('hidden');
        if (fnDetails?.mainValue?.label) {
          jqSelector('.additionalMainValue label').text(fnDetails.mainValue.label);
        }
      }
      // split boolean outputs
      const hasCanSplitBooleanOutputs = !!fnDetails?.canSplitBooleanOutputs;
      if (hasCanSplitBooleanOutputs) {
        jqSelector('.splitBooleanOutputs').removeClass('hidden');
      }
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
