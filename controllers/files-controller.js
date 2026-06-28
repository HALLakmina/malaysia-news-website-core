const fs = require('fs')

const responseUtils = require('../util/responseUtil')
const responseMessages = require('../util/responseMessages');
const { thumbnailImage } = require('../util/thumbnailImageGenerate');

const filesService = require('../services/files-services')

const uploadImage = async (req, res, next) => {
    try {
        await thumbnailImage(req.file.path, req.file.filename)
        const userId = req.user.id;
        const data = {
            originalName: req.file.originalname,
            storageName: `uploads/original_images/${req.file.filename}`,
            thumbnailStorageName: `uploads/thumbnail_Images/${req.file.filename}`,
            path: req.file.path,
            mimeType: req.file.mimetype,
            size: req.file.size,
        }
        const imageCollection = await filesService.create(data, userId);
        return responseUtils.createResponseWithJson(res, imageCollection)
    }
    catch (error) {
        return responseUtils.interServerErrorResponse(res)
    }
}

const deleteImage = async (req, res, next) => {
    try {
        const { _id, storageName, thumbnailStorageName } = req.body;
        const userId = req.user.id;
        const isFoundProgram = await filesService.findById(_id);
        if (!isFoundProgram) {
            return responseUtils.notFoundResponse(res, responseMessages.common.notFound('Image'));
        } else {
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

            return responseUtils.deleteResponse(res, responseMessages.common.deletedById('Image'));
        }
    } catch (error) {
        return responseUtils.interServerErrorResponse(res);
    }
}

module.exports = { uploadImage, deleteImage }
