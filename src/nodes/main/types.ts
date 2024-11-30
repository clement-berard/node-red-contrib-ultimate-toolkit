import type { EditorNodeProperties } from 'node-red';

export interface NodeMainProps extends EditorNodeProperties {
  entry: string;
  category: string;
  function: string;
}
