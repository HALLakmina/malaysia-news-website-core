const NEWS = require('../models/news-model')

const create = (data) => new NEWS(data).save()

const findOne = (filter, populate) => NEWS.findOne(filter).populate(populate).exec()

const find = (filter, sort, skip, limit, populate) =>
    NEWS.find(filter).sort(sort).skip(skip).limit(limit).populate(populate).exec()

const countDocuments = (filter) => NEWS.countDocuments(filter).exec()

const findOneAndUpdate = (filter, data) =>
    NEWS.findOneAndUpdate(filter, data, { new: true }).exec()

const findOneAndDelete = (filter) => NEWS.findOneAndDelete(filter).exec()

module.exports = {
    create,
    findOne,
    find,
    countDocuments,
    findOneAndUpdate,
    findOneAndDelete
}
