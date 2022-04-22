const { update } = require('../../repository/users');
const { HttpCode } = require('../../libs');

const updateSub = async (req, res) => {
  const user = await update(req.user.id, req.body);
  return res.json({
    status: 'success',
    code: HttpCode.OK,
    message: 'subscribtion updated',
    data: {
      email: user.email,
      subscription: user.subscription,
    }
  })
}

module.exports = updateSub;