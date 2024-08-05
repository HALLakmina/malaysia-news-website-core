const Jimp = require('jimp');
 
const thumbnailImage = async (imagePath, imageName) =>{
    const image = await Jimp.read(imagePath);

    image.resize(300, Jimp.AUTO).quality(100).write(`../file-storage/uploads/thumbnail_Images/${imageName}`)

    return image;
}
 
module.exports = {thumbnailImage}