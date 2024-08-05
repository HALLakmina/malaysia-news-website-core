var express = require('express');
var router = express.Router();

const { v4: uuidv4 } = require('uuid');
const multer  = require('multer')
const fs = require('fs')

const author = require('../middleware/author');
const Validator = require('../middleware/validator')

const responseUtils = require('../util/responseUtil')
const ValidatorConfig = require('../util/validatorConfig')
const responseMessages = require('../util/responseMessages');
const { thumbnailImage } = require('../util/thumbnailImageGenerate');

const filesService = require('../services/files-services')

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


router.post('/image-upload', author, upload.single('file'), async (req, res, next) => {
    try{
        await thumbnailImage(req.file.path, req.file.filename)
        const userId = req.user.id;
        const data = {
          originalName: req.file.originalname,
          storageName: `uploads/original_images/${req.file.filename}`,
          thumbnailStorageName:`uploads/thumbnail_Images/${req.file.filename}`,
          path: req.file.path,
          mimeType: req.file.mimetype,
          size: req.file.size,
        }
        const imageCollection = await filesService.create(data, userId);  
        return responseUtils.createResponseWithJson(res, imageCollection)
    }
    catch(error){
        return responseUtils.interServerErrorResponse(res)
    }
})

router.delete('/image-delete', author, async (req, res, next) => {
    try {
        const {_id, storageName, thumbnailStorageName} = req.body;
        const userId = req.user.id;
        const isFoundProgram = await filesService.findById(_id.$oid);
        if (!isFoundProgram) {
            return responseUtils.notFoundResponse(res,responseMessages.common.notFound('Image'));
        }else{
        await filesService.deleteById(_id.$oid, userId);
        await fs.unlink(`../file-storage/${storageName}`, (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete Original Image successfully.");
        })
        await fs.unlink(`../file-storage/${thumbnailStorageName}`, (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete Thumbnail Image successfully.");
        })


        return responseUtils.deleteResponse(res,responseMessages.common.deletedById('Image'));
        }

        
    } catch (error) {
        return responseUtils.interServerErrorResponse(res);
    }
    });

module.exports = router;