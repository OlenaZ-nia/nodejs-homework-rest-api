const { HttpCode } = require('../../libs');

const getCurrentUser = async (req, res) => {
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      email: req.user.email,
      subscription: req.user.subscription,
    },
  })
}

module.exports = getCurrentUser;