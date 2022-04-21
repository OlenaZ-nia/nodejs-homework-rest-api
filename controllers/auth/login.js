const authService = require('../../services/auth');
const { HttpCode } = require('../../libs');

const login = async (req, res) => {
  const token = await authService.login(req.body)
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { ...token },
  })
}

module.exports = login;