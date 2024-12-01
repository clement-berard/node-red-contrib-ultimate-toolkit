import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import { tryit } from 'radash';
import { getFunctionDetails } from '../../common/list';
import { listFunctions } from '../../common/list-functions';
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

    if (config.outputs === 2) {
      const outputs = [null, null];
      if (result === true) {
        outputs[0] = { ...msg, payload: result, ...commonReturn };
      } else if (result === false) {
        outputs[1] = { ...msg, payload: result, ...commonReturn };
      } else {
        this.warn('Payload must be true or false.');
      }
      this.send(outputs);
    } else {
      this.send({
        payload: result,
        ...commonReturn,
      });
    }
  });
}
