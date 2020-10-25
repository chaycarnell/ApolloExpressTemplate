// Handles logging at different stages of apollo server lifecycle events
const LoggingPlugin = {
  requestDidStart({ request, logger }) {
    if (request.operationName !== 'IntrospectionQuery')
      logger.info(`[REQUEST]: Operation: ${request.operationName}`, {
        operationName: request.operationName
      });
    return {
      // Handle logging errors encountered
      didEncounterErrors({ errors }) {
        logger.error(`[ERROR]: Operation: ${request.operationName}`, {
          operationName: request.operationName,
          errors
        });
      }
    };
  }
};

module.exports = LoggingPlugin;
