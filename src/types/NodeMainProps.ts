import type { EditorNodeProperties } from 'node-red';
import type { OutputRule } from './OutputRule';

type OrEmpty<T> = T | Record<any, any>;

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
  arrayUtilities: OrEmpty<{
    property?: string;
    direction?: 'asc' | 'desc';
  }>;
  mathUtilities: OrEmpty<{
    min?: string;
    max?: string;
  }>;
  dateUtilities: OrEmpty<{
    nowFormat: string;
    nowFormatToken?: string;
    rangeStartTime?: string;
    rangeEndTime?: string;
  }>;
  tools: OrEmpty<{
    cyclicCounter?: {
      maxCount: number;
      nodeId: string;
      resetDelay?: number;
    };
  }>;
  parsers: OrEmpty<{
    action?: 'auto' | 'parse' | 'stringify';
    pretty?: boolean;
  }>;
  asyncUtilities: OrEmpty<{
    milliseconds?: string;
  }>;
}
