const logger = {
  debug: (msg, context) =>
    console.log(
      `[DEBUG]: Timestamp: ${new Date().toISOString()}`,
      msg,
      context || ''
    ),
  info: (msg, context) =>
    console.log(
      `[INFO]: Timestamp: ${new Date().toISOString()}`,
      msg,
      context || ''
    ),
  warn: (msg, warning, context) =>
    console.log(
      `[WARN]: Timestamp: ${new Date().toISOString()}`,
      msg,
      'Warning: ',
      warning || '',
      'Context: ',
      context || ''
    ),
  error: (msg, context) =>
    console.error(
      `[ERROR]: Timestamp: ${new Date().toISOString()}`,
      msg,
      context || ''
    )
};

module.exports = logger;
