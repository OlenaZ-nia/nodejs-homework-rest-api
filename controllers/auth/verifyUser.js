const authService = require('../../services/auth');
const { HttpCode } = require('../../libs');

const verifyUser = async (req, res) => {
    const token = req.params.verificationToken;
    const user = await authService.verifyUser(token);

    return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { message: `Verification successful. Welcome ${user.email}`},
  })
}

module.exports = verifyUser;