module.exports = {
  example: async (req, res) => {
    res.json({
      success: true,
      status: 200,
      message: 'example private response',
      data: {},
    });
  },
};
