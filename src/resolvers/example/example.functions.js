/**
 * Return an example response
 * @param {*} user_id user id
 */
const exampleResponse = async ({ user_id }) => {
  return { sucess: true, message: `examle success ${user_id}` };
};

module.exports = {
  exampleResponse
};
