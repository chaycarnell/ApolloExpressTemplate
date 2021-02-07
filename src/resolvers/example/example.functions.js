/**
 * Return an example response
 * @param {*} userId user id
 */
const exampleResponse = async ({ userId }) => ({
  sucess: true,
  message: `examle success ${userId}`,
});

module.exports = {
  exampleResponse,
};
