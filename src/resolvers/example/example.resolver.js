const { authorize } = require('@utils/auth');
const { exampleResponse } = require('./example.functions');

const resolver = {
  Query: {
    exampleQuery: async (obj, args, ctx) => {
      authorize(args, ctx);
      return exampleResponse({ userId: args.user_id });
    },
  },
  Mutation: {
    exampleMutation: async (obj, args, ctx) => {
      authorize(args, ctx);
      return exampleResponse({ userId: args.user_id });
    },
  },
};

exports.resolver = resolver;
