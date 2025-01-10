import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import { splitBooleanOutputs } from '@keload/node-red-dxp/utils/controller';
import { tryit } from 'radash';
import { getFunctionDetails } from '../../lib/client-side';
import { listFunctions } from '../../lib/server-side';
import type { NodeMainProps } from '../../types/NodeMainProps';

// Main Node-RED node controller
// Handles the node's initialization and message processing
export default function (this: NodeControllerInst<NodeMainProps>, config: NodeControllerConfig<NodeMainProps>) {
  RED.nodes.createNode(this, config);

  // Event handler for incoming messages
  this.on('input', async (msg) => {
    const argsToCall = [];
    // Evaluate the input value based on node configuration
    const innerPayload = RED.util.evaluateNodeProperty(config.entry, config.entryType, this, msg);
    argsToCall.push(innerPayload);

    // Get function metadata and prepare additional arguments if needed
    const fnDetails = getFunctionDetails(config.category, config.function);
    if (fnDetails?.mainValue) {
      argsToCall.push(config.mainValue);
    }
    if (fnDetails?.configArgs) {
      argsToCall.push(config[fnDetails?.configArgs]);
    }

    // Get and prepare the actual function to be executed
    const matchedFunction = listFunctions[config.category][config.function];
    const toCall = tryit(matchedFunction);

    // Execute the function with error handling
    const [err, result] = await toCall(...argsToCall);
    if (err) {
      this.error(err, msg);
      this.status({ fill: 'red', shape: 'ring', text: 'Error' });
      return;
    }

    // Clear node status on success
    this.status({});

    // Prepare metadata about the function call
    const commonReturn = {
      nodeParams: {
        callWith: argsToCall,
        callFunction: config.function,
      },
    };

    // Handle result inversion if configured
    const finalResult = fnDetails?.inverseReturnValue && config.inverseReturnValue ? !result : result;

    // Prepare the final response object
    const resp = { ...msg, payload: finalResult, ...commonReturn };

    // Route the output based on configuration and result type
    if ((fnDetails?.canSplitBooleanOutputs && config.splitBooleanOutputs) || fnDetails?.forceSplitBooleanOutputs) {
      const outputs = splitBooleanOutputs(finalResult, resp);
      this.send(outputs);
    } else {
      this.send(resp);
    }
  });
}
