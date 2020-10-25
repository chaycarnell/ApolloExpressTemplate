// Error templates
const errorTypes = {
  UNAUTHENTICATED: { code: 401, message: 'UNAUTHENTICATED' },
  FORBIDDEN: { code: 403, message: 'FORBIDDEN' },
  UNKNOWN: { code: 500, message: 'UNKNOWN ERROR' }
};

// Derive error response from GraphQL error
const searchOriginalError = error => {
  if (error.originalError) {
    return searchOriginalError(error.originalError);
  }
  if (error.errors) {
    return error.errors.map(searchOriginalError)[0];
  }
  return JSON.parse(error);
};

// Handle errors
const errorHandler = error => {
  const getError = errorCode => {
    if (!errorTypes[errorCode]) {
      return errorTypes.UNKNOWN;
    }
    return errorTypes[errorCode];
  };
  // Derive the root error
  const rootError = error.message ? error : searchOriginalError(error);
  // Check if a GraphQL extension code is present for the error
  const extensionCode = rootError.extensions && rootError.extensions.code;
  // Get the corresponding error response from error templates
  const responseObject = getError(extensionCode);
  return {
    status: responseObject.code,
    message: responseObject.message
  };
};

module.exports = errorHandler;
