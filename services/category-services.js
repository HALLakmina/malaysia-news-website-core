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

const getCategory = (category) => categoryRepository.findCategory({ value: category })

const getSubCategories = async (category) => {
    const foundCategory = await categoryRepository.findCategory({ value: category })
    return foundCategory ? foundCategory.sub_categorys : null
}

const getSubCategory = async (category, subCategory) => {
    const foundCategory = await categoryRepository.findSubCategoryByCategory({ value: category, 'sub_categorys.value': subCategory })
    if (!foundCategory) return null
    return foundCategory.sub_categorys.find(s => s.value === subCategory) || null
}

const createSubCategory = async (category, data, userId) => {
    const isExist = await categoryRepository.findCategory({ value: category })
    if (!isExist) {
        return null
    }
    const createdBy = userId
    const updatedBy = createdBy
    const result = await categoryRepository.createSubCategory({ value: category }, { ...data, createdBy, updatedBy })
    if (!result) {
        throw new Error('CONFLICT')
    }
    return result
}

const updateCategory = async (category, data, userId) => {
    const isExist = await categoryRepository.findCategory({ value: category })
    if (!isExist) {
        return null
    }
    const updatedBy = userId
    return categoryRepository.updateCategory({ value: category }, { ...data, updatedBy })
}

const updateSubCategory = async (category, subCategory, data, userId) => {
    const isSubCategoryExist = await categoryRepository.findSubCategoryByCategory({ value: category, 'sub_categorys.value': subCategory })
    if (!isSubCategoryExist) {
        return null
    }
    if (data.value !== subCategory) {
        const isDuplicate = await categoryRepository.findSubCategoryByCategory({ value: category, 'sub_categorys.value': data.value })
        if (isDuplicate) {
            throw new Error('CONFLICT')
        }
    }
    const updatedBy = userId
    return categoryRepository.updateSubCategoryByCategory(
        { value: category, 'sub_categorys.value': subCategory },
        { ...data, updatedBy }
    )
}

const deleteCategory = (category) => categoryRepository.findCategoryAndDelete({ value: category })

const deleteSubCategory = (category, subCategory) =>
    categoryRepository.deleteSubCategoryByCategory({ value: category }, subCategory)

module.exports = {
    create,
    getAllCategory,
    getCategory,
    getSubCategories,
    getSubCategory,
    createSubCategory,
    updateCategory,
    updateSubCategory,
    deleteCategory,
    deleteSubCategory
}
