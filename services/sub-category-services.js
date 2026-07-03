const subCategoryRepository = require('../repositories/sub-category-repository')
const categoryRepository = require('../repositories/category-repository')

const create = async (data, userId) => {
    const categoryExist = await categoryRepository.findCategory({ _id: data.category })
    if (!categoryExist) {
        throw new Error('CATEGORY_NOT_FOUND')
    }
    const isDuplicate = await subCategoryRepository.findOne({ value: data.value, category: data.category })
    if (isDuplicate) {
        throw new Error('CONFLICT')
    }
    const createdBy = userId
    const updatedBy = createdBy
    return subCategoryRepository.create({ ...data, createdBy, updatedBy })
}

const getAll = (categoryId) => {
    const filter = categoryId ? { category: categoryId } : {}
    return subCategoryRepository.findAll(filter)
}

const getById = (id) => subCategoryRepository.findOnePopulated({ _id: id })

const update = async (id, data, userId) => {
    const isExist = await subCategoryRepository.findOne({ _id: id })
    if (!isExist) {
        return null
    }
    if (data.value !== isExist.value) {
        const isDuplicate = await subCategoryRepository.findOne({ value: data.value, category: isExist.category })
        if (isDuplicate) {
            throw new Error('CONFLICT')
        }
    }
    const updatedBy = userId
    return subCategoryRepository.update({ _id: id }, { ...data, updatedBy })
}

const deleteById = (id) => subCategoryRepository.findAndDelete({ _id: id })

module.exports = { create, getAll, getById, update, deleteById }
