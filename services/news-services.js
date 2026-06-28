const newsRepository = require('../repositories/news-repository')

const create = (data, userId) => {
    const createdBy = userId
    const updatedBy = createdBy
    return newsRepository.create({ ...data, createdBy, updatedBy })
}

const findByCategoryNotDisable = (category) =>
    newsRepository.findOne({ category, isDisable: false }, 'image')

const findByIdAll = (id) => newsRepository.findOne({ _id: id }, 'image')

const findByQueryWithPagination = (search, isNotAdmin, category, language, pagination, sort) => {
    const isDisableQuery = isNotAdmin ? { isDisable: false } : {}
    const categoryQuery = category ? { category } : {}
    const languageQuery = language ? { language } : {}
    return newsRepository.find(
        { ...search, ...isDisableQuery, ...categoryQuery, ...languageQuery },
        sort,
        pagination.skip,
        pagination.limit,
        'image'
    )
}

const newsCount = (isNotAdmin) => {
    const isDisableQuery = isNotAdmin ? { isDisable: false } : {}
    return newsRepository.countDocuments({ ...isDisableQuery })
}

const updateById = (id, data, userId) => {
    const updatedBy = userId
    return newsRepository.findOneAndUpdate({ _id: id }, { ...data, updatedBy })
}

const deleteById = (id) => newsRepository.findOneAndDelete({ _id: id })

module.exports = {
    create,
    findByCategoryNotDisable,
    findByIdAll,
    findByQueryWithPagination,
    newsCount,
    updateById,
    deleteById
}
