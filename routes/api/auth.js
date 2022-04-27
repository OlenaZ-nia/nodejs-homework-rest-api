const { Router } = require('express');

const { auth, users } = require('../../controllers');
const limiter = require('../../middlewares/rateLimit');
const guard = require('../../middlewares/guard');
const { userJoiSchema, schemaUpdateStatus } = require('../../models/userJoiSchema');
const { validateBody } = require('../../middlewares/validation');
const upload = require('../../middlewares/upload');
const {ctrlWrapper} = require('../../middlewares/handlerError');
const router = Router();

router.post('/signup', limiter(15*60*1000, 5), validateBody(userJoiSchema), ctrlWrapper(auth.registration))
router.post('/login', validateBody(userJoiSchema), ctrlWrapper(auth.login))
router.get('/logout', guard, ctrlWrapper(auth.logout))

router.get('/current', guard, ctrlWrapper(users.getCurrentUser))
router.patch('/', guard, validateBody(schemaUpdateStatus), ctrlWrapper(users.updateSub))
router.patch('/avatars', guard, upload.single('avatar'), ctrlWrapper(users.avatar))

module.exports = router