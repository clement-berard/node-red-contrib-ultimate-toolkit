import type { EditorNodeProperties } from 'node-red';

export interface NodeMainProps extends EditorNodeProperties {
  entry: string;
  entryType: string;
  category: string;
  function: string;
  mainValue: string;
  outputs: number;
  splitBooleanOutputs: boolean;
  inverseReturnValue: boolean;
}
