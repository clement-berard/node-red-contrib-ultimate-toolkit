import type { NodeEditorDefinition } from '@keload/node-red-dxp/editor';
import { initSelect, jqSelector, resolveSelector, watchInput } from '@keload/node-red-dxp/editor/dom-helper';
import { title } from 'radash';
import { categories, getDocsFromFunction, getFunctionsFromCategory } from '../../../common/all';
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
      categories.map((v) => ({ value: v, text: title(v) })),
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
      jqSelector('.fn-docs').addClass('hidden');
      const docs = getDocsFromFunction(category as string, currentFunction as string);
      if (docs) {
        jqSelector('.fn-docs').html(docs).removeClass('hidden');
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
