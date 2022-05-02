const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/jpeg': 'jpg',
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const type = MIME_TYPES[file.mimetype];
      callback(null ,name + Date.now() + '.' + type);
    }
});

const multerMiddleware = multer({storage: storage, limits: {fileSize: process.env.MAX_UPLOAD}}).single('media')

module.exports = { multerMiddleware , MIME_TYPES }