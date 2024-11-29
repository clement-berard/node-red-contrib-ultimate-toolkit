import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import { tryit } from 'radash';
import { getFunctionDetails } from '../../common/all';
import type { NodeMainProps } from './types';

export default function (this: NodeControllerInst<NodeMainProps>, config: NodeControllerConfig<NodeMainProps>) {
  RED.nodes.createNode(this, config);

  this.on('input', async (msg) => {
    const innerPayload = msg.payload;
    const fnDetails = getFunctionDetails(config.category, config.function);
    const toCall = tryit(fnDetails.fn);
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
