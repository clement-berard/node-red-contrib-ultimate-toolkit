import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import { tryit } from 'radash';
import { getFunctionDetails } from '../../common/all';
import { getServerFn } from '../../common/server-fn';
import type { NodeMainProps } from './types';

export default function (this: NodeControllerInst<NodeMainProps>, config: NodeControllerConfig<NodeMainProps>) {
  RED.nodes.createNode(this, config);

  this.on('input', async (msg) => {
    const innerPayload = RED.util.evaluateNodeProperty(config.entry, config.entryType, this, msg);
    const fnDetails = getFunctionDetails(config.category, config.function);
    const toCall = fnDetails.server ? tryit(getServerFn(config.category, config.function).fn) : tryit(fnDetails.fn);
    const [err, result] = toCall(innerPayload);
    if (err) {
      this.error(err, msg);
      return;
    }

    this.send({
      payload: result,
    });
  });
}
