const Category = require('../models/category-model')

const create = (data) => new Category(data).save()

const getAllCategories = () => Category.find().exec()

const findCategory = (filter) => Category.findOne(filter).exec()

const findSubCategoryByCategory = (filter) => Category.findOne(filter).exec()

const updateCategory = (filter, data) =>
    Category.findOneAndUpdate(filter, data, { new: true }).exec()

const createSubCategory = (filter, subCategory) =>
    Category.findOneAndUpdate(filter, { $push: { sub_categorys: subCategory } }, { new: true }).exec()

const updateSubCategoryByCategory = (filter, data) =>
    Category.findOneAndUpdate(filter, {
        $set: {
            'sub_categorys.$.lable': data.lable,
            'sub_categorys.$.value': data.value,
            'sub_categorys.$.updatedBy': data.updatedBy
        }
    }, { new: true }).exec()

const findCategoryAndDelete = (filter) => Category.findOneAndDelete(filter).exec()

const deleteSubCategoryByCategory = (filter, subCategory) =>
    Category.findOneAndUpdate(filter, { $pull: { sub_categorys: { value: subCategory } } }, { new: true }).exec()

module.exports = {
    create,
    getAllCategories,
    findCategory,
    findSubCategoryByCategory,
    updateCategory,
    createSubCategory,
    updateSubCategoryByCategory,
    findCategoryAndDelete,
    deleteSubCategoryByCategory
}
