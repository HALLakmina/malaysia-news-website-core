var express = require('express');
var router = express.Router();

const { v4: uuidv4 } = require('uuid');
const multer  = require('multer')

const author = require('../middleware/author');

const filesController = require('../controllers/files-controller')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../file-storage/uploads/original_images');
    },
    filename: function(req, file, cb) {
      const fileExtension =  file ? file?.originalname?.split('.').pop() : '';
      cb(null, `${uuidv4()}.${fileExtension}`);
    }
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }
  });


router.post('/image-upload', author, upload.single('file'), filesController.uploadImage)

const deleteFile = multer({
     dest: '../file-storage/uploads/original_images'
  });

router.patch('/image-delete', author, deleteFile.single('file'), filesController.deleteImage);

module.exports = router;
