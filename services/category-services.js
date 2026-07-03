const categoryRepository = require('../repositories/category-repository')

const create = (data, userId) => {
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

const createSubCategory = async (category, data, userId) => {
    const isExist = await categoryRepository.findCategory({ value: category })
    if (!isExist) {
        return null
    }
    const createdBy = userId
    const updatedBy = createdBy
    return categoryRepository.createSubCategory({ value: category }, { ...data, createdBy, updatedBy })
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
    createSubCategory,
    updateCategory,
    updateSubCategory,
    deleteCategory,
    deleteSubCategory
}
