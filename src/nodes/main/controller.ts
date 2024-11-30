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
    const [err, result] = toCall(...argsToCall);
    if (err) {
      this.error(err, msg);
      return;
    }

    this.send({
      payload: result,
    });
  });
}
