export function splitBooleanOutputs(conditionTerm: unknown, msg: unknown): object[] {
  const outputs = [null, null];
  if (conditionTerm === true) {
    outputs[0] = msg;
  } else if (conditionTerm === false) {
    outputs[1] = msg;
  } else {
    console.warn('Payload must be true or false.');
  }

  return outputs;
}
