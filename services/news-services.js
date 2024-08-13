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

const findByQueryWithPagination = async (search, isNotAdmin, category, language, pagination, sort) => {
    try{
        const isDisableQuery = isNotAdmin ? {isDisable: false}:{}
        const categoryQuery = category ? {category: category}:{}
        const languageQuery = language ? {language: language}:{}
        const news = await NEWS.find({...search, ...isDisableQuery,  ...categoryQuery, ...languageQuery})
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

const newsCount = async (isNotAdmin)=>{
    try{
        const isDisableQuery = isNotAdmin ? {isDisable: false}:{}
        const count =  await NEWS.countDocuments({...isDisableQuery}).exec()
        return count
    }
    catch(error){
        throw error
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
    newsCount,
    updateById,
    deleteById
}