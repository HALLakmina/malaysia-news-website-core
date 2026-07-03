const categoryRepository = require('../repositories/category-repository')

const create = async (data, userId) => {
    const isExist = await categoryRepository.findCategory({ value: data.value })
    if (isExist) {
        throw new Error('CONFLICT')
    }
    const createdBy = userId
    const updatedBy = createdBy
    return categoryRepository.create({ ...data, createdBy, updatedBy })
}

const getAllCategory = () => categoryRepository.getAllCategories()

const getCategory = (id) => categoryRepository.findCategory({ _id: id })

const updateCategory = async (id, data, userId) => {
    const isExist = await categoryRepository.findCategory({ _id: id })
    if (!isExist) {
        return null
    }
    if (data.value && data.value !== isExist.value) {
        const isDuplicate = await categoryRepository.findCategory({ value: data.value })
        if (isDuplicate) {
            throw new Error('CONFLICT')
        }
    }
    const updatedBy = userId
    return categoryRepository.updateCategory({ _id: id }, { ...data, updatedBy })
}

const deleteCategory = (id) => categoryRepository.findCategoryAndDelete({ _id: id })

module.exports = { create, getAllCategory, getCategory, updateCategory, deleteCategory }
