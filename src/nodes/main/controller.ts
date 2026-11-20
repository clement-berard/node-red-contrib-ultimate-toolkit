import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import { evaluateNodeProperty, splitBooleanOutputs } from '@keload/node-red-dxp/utils/controller';
import { attemptAsync, isPlainObject } from 'es-toolkit';
import type { NodeMessage } from 'node-red';
import { getFunctionDetails } from '../../lib/client-side';
import { listFunctions as serverSideFunctions } from '../../lib/server-side';
import { tools } from '../../lib/server-side/fns/tools';
import type { NodeMainProps } from '../../types/NodeMainProps';
import { resolveTypedFields } from '../../utils/fields';
import { getOutputRules } from '../../utils/output-rules';

// Main Node-RED node controller
// Handles the node's initialization and message processing
export default function (this: NodeControllerInst<NodeMainProps>, config: NodeControllerConfig<NodeMainProps>) {
  RED.nodes.createNode(this, config);

  // Event handler for incoming messages
  this.on('input', async (msg, send, done) => {
    // Everything runs inside attemptAsync: a bad entry or an unknown category/function is reported like any other error
    const [err, outputs] = await attemptAsync(async () => {
      const argsToCall: unknown[] = [];
      // Evaluate the input value based on node configuration
      const [, innerPayload] = await evaluateNodeProperty({
        msg,
        type: config.entryType,
        node: this,
        value: config.entry,
      });

      argsToCall.push(innerPayload);

      // Get function metadata and prepare additional arguments if needed
      const fnDetails = getFunctionDetails(config.category, config.function);
      if (fnDetails?.mainValue) {
        argsToCall.push(config.mainValue);
      }
      if (fnDetails?.configKey) {
        const extraArgs = (config as unknown as Record<string, unknown>)[fnDetails.configKey];

        // Copy to avoid mutating the node configuration shared by every message; typed fields are evaluated first
        const resolved =
          fnDetails.fields && isPlainObject(extraArgs)
            ? await resolveTypedFields(fnDetails.fields, extraArgs, async (type, value) => {
                const [evalErr, evaluated] = await evaluateNodeProperty({ msg, type, node: this, value });
                if (evalErr) {
                  throw evalErr;
                }
                return evaluated;
              })
            : extraArgs;
        argsToCall.push(
          isPlainObject(resolved) && fnDetails?.addNodeIdToConfigArgs ? { ...resolved, nodeId: this.id } : resolved,
        );
      }

      // Get and prepare the actual function to be executed
      const matchedServerFunction = (
        serverSideFunctions as Record<string, Record<string, (...args: unknown[]) => unknown>>
      )[config.category]?.[config.function];

      if (!matchedServerFunction) {
        throw new Error(`Unknown function "${config.category}.${config.function}"`);
      }

      const result = await matchedServerFunction(...argsToCall);

      // Handle result inversion if configured
      const finalResult = fnDetails?.inverseReturnValue && config.inverseReturnValue ? !result : result;

      // Prepare the final response object, with metadata about the function call
      const resp = {
        ...msg,
        nodeParams: {
          callWith: argsToCall,
          callFunction: config.function,
        },
      };

      // One rule per line of the "Output properties" list; sources are evaluated against the incoming message
      for (const rule of getOutputRules(config.outputProps)) {
        if (!rule.target?.trim()) {
          throw new Error('Output property must not be empty');
        }

        let value: unknown;
        if (rule.sourceType === 'result') {
          value = finalResult;
        } else if (rule.sourceType === 'input') {
          value = innerPayload;
        } else {
          const [evalErr, evaluated] = await evaluateNodeProperty({
            msg,
            type: rule.sourceType,
            node: this,
            value: rule.source,
          });
          if (evalErr) {
            throw evalErr;
          }
          value = evaluated;
        }

        if (rule.targetType === 'msg') {
          RED.util.setMessageProperty(resp, rule.target, value, true);
        } else if (rule.targetType === 'flow' || rule.targetType === 'global') {
          this.context()[rule.targetType].set(rule.target, value);
        } else {
          throw new Error(`Unsupported output type "${rule.targetType}"`);
        }
      }

      // Route the output based on configuration and result type
      if ((fnDetails?.canSplitBooleanOutputs && config.splitBooleanOutputs) || fnDetails?.forceSplitBooleanOutputs) {
        return splitBooleanOutputs(Boolean(finalResult), resp) as (NodeMessage | null)[];
      }
      return resp;
    });

    if (err) {
      this.status({ fill: 'red', shape: 'ring', text: 'Error' });
      done(err as Error);
      return;
    }

    // Clear node status on success
    this.status({});
    send(outputs as NodeMessage | (NodeMessage | null)[]);
    done();
  });

  this.on('close', () => {
    tools.clearCounter();
  });
}
