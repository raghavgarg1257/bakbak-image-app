import config from './config';


// globals variables
export const globals = {};


// enabling default globals
(function configure() {
  try {
    globals.config = config;
    return true;
  } catch (e) {
    return false;
  }
}());


// to set custom values in globals
export function setGlobals(data = {}) {
  try {
    if (data && typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => { globals[key] = value; });
      return true;
    }
    throw new Error('invalid data given');
  } catch (e) {
    return false;
  }
}
