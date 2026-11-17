export type OutputTargetType = 'msg' | 'flow' | 'global';

// One line of the "Output properties" list: `target` (msg property, flow or global variable) = source
export type OutputRule = {
  target: string;
  targetType: OutputTargetType;
  // `result` (value computed by the function) and `input` (value read from the Input Data field) take no value,
  // any other type is a Node-RED typedInput type evaluated against the incoming message
  source: string;
  sourceType: string;
};
