const NEWS = require('../models/news-model')

const create = async (data, userId)=>{
    try{
        const createdBy = userId
        const updatedBy = createdBy
        const newNEWS = new NEWS({...data, createdBy, updatedBy})
        await newNEWS.save()
        return newNEWS
    }
    catch(error){
        throw error
    }
}


const findByCategoryNotDisable = async (category)=>{
    try{
        const news = await NEWS.findOne({category:category, isDisable:false}).populate('image').exec()
        return  news        
    }
    catch(error){
        throw error
    }
}

const findByIdAll = async (id)=>{
    try{
        const news = await NEWS.findOne({_id:id}).populate('image').exec()
        return  news        
    }
    catch(error){
        throw error
    }
}

const findByQueryWithPagination = async (search, category, language, pagination, sort) => {
    try{        
        const news = await NEWS.find({...search, isDisable: false, category: category, language:language})
                                        .sort(sort)
                                        .skip(pagination.skip)
                                        .limit(pagination.limit)
                                        .populate('image')
                                        .exec()        
        return news
    }catch(err){
        throw err;
    }
}

const updateById = async(id, data, userId) => {
    try{
        const updatedBy = userId;
        const updateNEWS = await NEWS.findOneAndUpdate(
            { _id: id },
            { ...data, updatedBy },
            { new: true }
        ).exec();
        return updateNEWS;
    }catch(err){
        throw err;
    }
}

const deleteById = async (id, userId) => {
    try{
        const deleteNEWS = await NEWS.findOneAndDelete(
            { _id: id }
        ).exec();
        return deleteNEWS
    }catch(err){
        throw err;
    }
}

module.exports = {
    create,
    findByCategoryNotDisable,
    findByIdAll,
    findByQueryWithPagination,
    updateById,
    deleteById
}