const multer = require('multer');
require('dotenv').config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_FOLDER);    // сохраняем в 'tmp'
    },
    filename: (req, file, cb) => {  // изминение имени файла
        cb(null, `${Date.now()} - ${file.originalname}`);
    },
})

const upload = multer({
    storage: storage, limits: { fileSize: 500000 }, fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
        return cb(null, true)
        }
        cb(new Error('Only images are allowed!'))
    }
})

module.exports = upload;