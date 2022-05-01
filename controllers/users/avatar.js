const { HttpCode } = require('../../libs');
const AvatarService = require('../../services/avatar/avatarService');
const LocalStorage = require('../../services/avatar/local-storage');
// const CloudStorage = require('../../services/avatar/cloud-storage');

const avatar = async (req, res, next) => {
    const avatarService = new AvatarService(LocalStorage, req.file, req.user);
    // const avatarService = new AvatarService(CloudStorage, req.file, req.user);
    const urlOfAvatar = await avatarService.update();
    res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { avatarURL: urlOfAvatar },
        message: 'Avatar updated'
    })
}

module.exports = avatar;