const Category = require('../models/category-model')

const create = (data) => new Category(data).save()

const getAllCategories = () => Category.find().exec()

const findCategory = (filter) => Category.findOne(filter).exec()

const updateCategory = (filter, data) =>
    Category.findOneAndUpdate(filter, { $set: data }, { new: true }).exec()

const findCategoryAndDelete = (filter) => Category.findOneAndDelete(filter).exec()

module.exports = { create, getAllCategories, findCategory, updateCategory, findCategoryAndDelete }
