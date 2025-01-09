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
    if (fnDetails?.configArgs) {
      argsToCall.push(config[fnDetails?.configArgs]);
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

    const finalResult = fnDetails?.inverseReturnValue && config.inverseReturnValue ? !result : result;

    const resp = { ...msg, payload: finalResult, ...commonReturn };

    if (fnDetails?.canSplitBooleanOutputs && config.splitBooleanOutputs) {
      const outputs = splitBooleanOutputs(finalResult, resp);
      this.send(outputs);
    } else {
      this.send(resp);
    }
  });
}
