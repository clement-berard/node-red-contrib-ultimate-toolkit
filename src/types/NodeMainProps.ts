import type { EditorNodeProperties } from 'node-red';
import type { OutputRule } from './OutputRule';

export interface NodeMainProps extends EditorNodeProperties {
  entry: string;
  entryType: string;
  outputProps: OutputRule[];
  category: string;
  function: string;
  mainValue: string;
  outputs: number;
  splitBooleanOutputs: boolean;
  inverseReturnValue: boolean;
}
