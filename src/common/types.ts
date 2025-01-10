export type UtilityItem = {
  description?: string;
  docs?: string;
  canSplitBooleanOutputs?: boolean;
  forceSplitBooleanOutputs?: boolean;
  inverseReturnValue?: boolean;
  mainValue?: {
    label?: string;
  };
  label?: string;
  revealClasses?: string[];
  configArgs?: string;
};

export type UtilityCategory = {
  [key: string]: UtilityItem;
};

export type UtilityList = {
  [key: string]: UtilityCategory;
};
