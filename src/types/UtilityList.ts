import type { Fields } from '../utils/fields';

export type UtilityItem = {
  // typed options of the function, saved under the key of its category (see `storageKey`)
  fields?: Fields;
  description?: string;
  docs?: string;
  canSplitBooleanOutputs?: boolean;
  forceSplitBooleanOutputs?: boolean;
  inverseReturnValue?: boolean;
  mainValue?: {
    label?: string;
  };
  label?: string;
  addNodeIdToConfigArgs?: boolean;
};

export type UtilityCategory = {
  [key: string]: UtilityItem;
};

export type UtilityList = {
  [key: string]: UtilityCategory;
};
