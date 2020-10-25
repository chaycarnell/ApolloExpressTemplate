const { ForbiddenError } = require('apollo-server-express');
const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

/**
 * Validate a request user_id against the token user_id to authorize requests
 * @param {*} args request arguments
 * @param {*} ctx request context
 */
const authorize = (args, ctx) => {
  if (!authorizeUser(args.user_id, ctx.user_id))
    // Throw GraphQL forbidden error
    throw new ForbiddenError('UNAUTHORIZED');
  return;
};

// Initialise JWKS client using auth keystore address
const client = jwksClient({
  jwksUri: process.env.AUTH_KEY_STORE
});

/**
 * Get JWT signing key
 * @param {*} header
 * @param {*} callback
 */
const getKey = (header, callback) =>
  client.getSigningKey(header.kid, (_, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });

/**
 * Validates a JWT id_token against the auth server that issued it to the client
 * @param token JWT id_token to be validate against auth keystore
 */
const validateToken = async token => {
  if (!token) return null;
  const user = await new Promise(resolve => {
    jwt.verify(
      token,
      getKey,
      {
        issuer: process.env.AUTH_BASE_URL,
        algorithms: ['RS256']
      },
      (error, decoded) => {
        if (error) {
          resolve(null);
        }
        if (decoded) {
          resolve(decoded);
        }
      }
    );
  });
  return user;
};

// Validate requests for proctected express routes
const validateRequest = async (req, res, next) => {
  const token = req.headers.authorization || '';
  const decoded = await validateToken(token);
  if (!decoded) {
    return res.json({
      success: false,
      status: 401,
      message: 'Authentication failed',
      data: {}
    });
  } else {
    req.user = decoded;
    return next();
  }
};

module.exports = {
  authorize,
  validateToken,
  validateRequest
};
