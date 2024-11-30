import type { NodeEditorDefinition } from '@keload/node-red-dxp/editor';
import { initSelect, jqSelector, resolveSelector, watchInput } from '@keload/node-red-dxp/editor/dom-helper';
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
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-wrench',
  label: function () {
    return this.name || this.function || 'toolkit';
  },
  oneditprepare: function () {
    jqSelector('$entry').typedInput({
      types: ['msg', 'flow', 'global'],
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

    function handleSelectFunction(category?: string, currentFunction?: string | undefined) {
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

    function handleShowDocs(category?: string, currentFunction?: string | undefined) {
      //docs part
      jqSelector('.fn-docs').addClass('hidden');
      const docs = getDocsFromFunction(category as string, currentFunction as string);
      if (docs) {
        jqSelector('.fn-docs').html(docs).removeClass('hidden');
      }
      // additional values part
      jqSelector('.additionalMainValue').addClass('hidden');
      const fnDetails = getFunctionDetails(category as string, currentFunction as string);
      console.log('fnDetails', !!fnDetails?.mainValue);
      const hasMainValue = !!fnDetails?.mainValue;

      if (hasMainValue) {
        jqSelector('.additionalMainValue').removeClass('hidden');
        if (fnDetails?.mainValue?.label) {
          jqSelector('.additionalMainValue label').text(fnDetails.mainValue.label);
        }
      }
    }

    handleSelectFunction(this.category, this.function);
    handleShowDocs(this.category, this.function);

    watchInput(['$category'], ([category]) => {
      handleShowDocs(category, this.function);
      handleSelectFunction(category);
    });

    watchInput(['$function'], ([functionValue]) => {
      handleShowDocs(jqSelector('$category').val() as string, functionValue);
    });
  },
};

export default Main;
