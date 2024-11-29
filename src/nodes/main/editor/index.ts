import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import {
  addClassesOnSelectors,
  initSelect,
  jqSelector,
  removeClassesOnSelectors,
  watchInput,
} from '@keload/node-red-dxp/editor/dom-helper';
import type { EditorNodeDef } from 'node-red';
import { title } from 'radash';
import { categories, getDocsFromFunction, getFunctionsFromCategory } from '../../../common/all';
import type { NodeMainProps } from '../types';

const Main: EditorNodeDef<NodeMainProps> = {
  category: 'toolkit',
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

    function handleShowDocs(category?: string, currentFunction?: string | undefined) {
      addClassesOnSelectors(['.fn-docs'], ['hidden']);
      const docs = getDocsFromFunction(category as string, currentFunction as string);
      if (docs) {
        document.querySelector('.fn-docs').innerHTML = docs;
        removeClassesOnSelectors(['.fn-docs'], ['hidden']);
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
