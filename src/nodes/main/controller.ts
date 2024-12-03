import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import { tryit } from 'radash';
import { getFunctionDetails } from '../../common/list';
import { listFunctions } from '../../common/list-functions';
import { splitBooleanOutputs } from './helpers/outputs';
import type { NodeMainProps } from './types';

export default function (this: NodeControllerInst<NodeMainProps>, config: NodeControllerConfig<NodeMainProps>) {
  RED.nodes.createNode(this, config);

  this.on('input', async (msg) => {
    const argsToCall = [];
    const innerPayload = RED.util.evaluateNodeProperty(config.entry, config.entryType, this, msg);
    argsToCall.push(innerPayload);
    const fnDetails = getFunctionDetails(config.category, config.function);
    if (fnDetails?.mainValue) {
      argsToCall.push(config.mainValue);
    }
    const matchedFunction = listFunctions[config.category][config.function];
    const toCall = tryit(matchedFunction);
    const [err, result] = await toCall(...argsToCall);
    if (err) {
      this.error(err, msg);
      return;
    }

    const commonReturn = {
      nodeParams: {
        callWith: argsToCall,
        callFunction: config.function,
      },
    };

    const resp = { ...msg, payload: result, ...commonReturn };

    if (config.splitBooleanOutputs) {
      const outputs = splitBooleanOutputs(result, resp);
      this.send(outputs);
    } else {
      this.send(resp);
    }
  });
}
