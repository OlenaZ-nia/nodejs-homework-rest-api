const authService = require('../../services/auth');
const { HttpCode } = require('../../libs');

const logout = async (req, res) => {
  await authService.logout(req.user.id)
  return res.status(HttpCode.NO_CONTENT).json()
}

module.exports = logout;