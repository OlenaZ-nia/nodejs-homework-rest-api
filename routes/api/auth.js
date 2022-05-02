const { Router } = require('express');

const { auth, users } = require('../../controllers');
const limiter = require('../../middlewares/rateLimit');
const guard = require('../../middlewares/guard');
const { userJoiSchema, schemaUpdateStatus, schemaVerifyUser } = require('../../models/userJoiSchema');
const { validateBody } = require('../../middlewares/validation');
const upload = require('../../middlewares/upload');
const {ctrlWrapper} = require('../../middlewares/handlerError');
const router = Router();

router.post('/signup', limiter(15*60*1000, 5), validateBody(userJoiSchema), ctrlWrapper(auth.registration))
router.post('/login', validateBody(userJoiSchema), ctrlWrapper(auth.login))
router.post('/verify', validateBody(schemaVerifyUser), ctrlWrapper(auth.reverifyUser))

router.get('/logout', guard, ctrlWrapper(auth.logout))

router.get('/current', guard, ctrlWrapper(users.getCurrentUser))
router.get('/verify/:verificationToken', ctrlWrapper(auth.verifyUser))

router.patch('/', guard, validateBody(schemaUpdateStatus), ctrlWrapper(users.updateSub))
router.patch('/avatars', guard, upload.single('avatar'), ctrlWrapper(users.avatar))

module.exports = router