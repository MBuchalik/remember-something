/**
 * Log a message.
 */
function logDefault(str) {
  console.log(str);
}

/**
 * Log an error message.
 */
function logError(str) {
  // For the colors see https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
  const red = '\x1b[91m';
  const reset = '\x1b[0m';

  console.error(red + str + reset);
}

module.exports = {
  logDefault,
  logError,
};
