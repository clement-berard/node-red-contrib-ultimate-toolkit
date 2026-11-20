import type { EditorNodeProperties } from 'node-red';

export interface NodeDebugKitProps extends EditorNodeProperties {
  showMsg: boolean;
  showFlow: boolean;
  showGlobal: boolean;
  showNode: boolean;
  showEnv: boolean;
  showMeta: boolean;
  // comma-separated msg/context keys left out of the log (e.g. "req,res")
  excludeKeys: string;
  maxDepth: number;
  target: 'sidebar' | 'console' | 'both';
  passthrough: boolean;
  showStatus: boolean;
  outputs: number;
}
