const SubCategory = require('../models/sub-category-model')

const create = (data) => new SubCategory(data).save()

const findAll = (filter) => SubCategory.find(filter).populate('category').exec()

const findOne = (filter) => SubCategory.findOne(filter).exec()

const findOnePopulated = (filter) => SubCategory.findOne(filter).populate('category').exec()

const update = (filter, data) =>
    SubCategory.findOneAndUpdate(filter, { $set: data }, { new: true }).populate('category').exec()

const findAndDelete = (filter) => SubCategory.findOneAndDelete(filter).exec()

module.exports = { create, findAll, findOne, findOnePopulated, update, findAndDelete }
