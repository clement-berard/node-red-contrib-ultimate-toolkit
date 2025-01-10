import type { EditorNodeProperties } from 'node-red';

type OrEmpty<T> = T | Record<any, any>;

export interface NodeMainProps extends EditorNodeProperties {
  entry: string;
  entryType: string;
  category: string;
  function: string;
  mainValue: string;
  outputs: number;
  splitBooleanOutputs: boolean;
  inverseReturnValue: boolean;
  dateUtilities: OrEmpty<{
    nowFormat: string;
    nowFormatToken?: string;
    rangeStartTime?: string;
    rangeEndTime?: string;
  }>;
}
