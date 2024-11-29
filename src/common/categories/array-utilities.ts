import { toggle } from 'radash';
import { docsFromRadash } from '../docs';

export const arrayUtilities = {
  toggle: {
    fn: toggle,
    docs: docsFromRadash('array/toggle'),
  },
};
