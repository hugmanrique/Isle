import { bold, cyan, yellow, redBright } from 'colorette';

const prefixes = {
  info: bold(cyan('INFO')),
  warn: bold(yellow('WARN')),
  error: bold(redBright('ERROR'))
};

/**
 * Prints a nicely formatted message to the console.
 *
 * @param {String} prefix - the log entry prefix
 * @param {String} message - the log entry message
 */
function printMessage(prefix, message) {
  console.log(`Lyra ${prefix} ${message}`);
}

export const info = message => printMessage(prefixes.info, message);
export const warn = message => printMessage(prefixes.warn, message);
export const error = message => printMessage(prefixes.error, message);
