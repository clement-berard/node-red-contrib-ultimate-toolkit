import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import { initSelect, watchInput } from '@keload/node-red-dxp/editor/dom-helper';
import { title } from 'radash';
import { categories, getFunctionsFromCategory } from '../../../common/all';
import type { NodeMainProps } from '../types';

const Main = createEditorNode<NodeEditorProps<NodeMainProps>>({
  category: 'ultimate-toolkit',
  color: '#8EA3A6',
  defaults: {
    name: { value: '' },
    entry: { value: 'payload', required: true },
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

    handleSelectFunction(this.category, this.function);

    watchInput(['$category'], ([category]) => {
      handleSelectFunction(category);
    });
  },
});

export default Main;
