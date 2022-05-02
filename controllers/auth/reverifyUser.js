const authService = require('../../services/auth');
const { HttpCode } = require('../../libs');

const reverifyUser = async (req, res) => {
  const { email } = req.body;
  await authService.reverifyUser(email);

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
      data: { 
        message: 'Verification email sent'
    },
  })
}

module.exports = reverifyUser;