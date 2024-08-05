const Files = require('../models/files-model')

const create = async (data, userId) => {
    try{        
        const createdBy = userId;
        const updatedBy = createdBy;
        const newFile = new Files({ ...data, createdBy, updatedBy});
        await newFile.save();
        return newFile;        
    }catch(err){
        throw err;
    }
}

const findById = async (id)=>{
    try{
        const news = await Files.findOne({_id:id}).exec()
        return  news        
    }
    catch(error){
        throw error
    }
}

const deleteById = async (id, userId) => {
    try{
        const deleteFile = await Files.findOneAndDelete(
            { _id: id }
        ).exec();
        return deleteFile
    }catch(err){
        throw err;
    }
}

module.exports = { 
    create,
    findById,
    deleteById
}