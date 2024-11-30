import { keys } from 'radash';
import { docsFromRadash } from '../docs';

export const objectUtilities = {
  getKeys: {
    fn: keys,
    docs: docsFromRadash('object/keys'),
  },
};
