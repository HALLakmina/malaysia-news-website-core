const Files = require('../models/files-model')

const create = (data) => new Files(data).save()

const findOne = (filter) => Files.findOne(filter).exec()

const findOneAndDelete = (filter) => Files.findOneAndDelete(filter).exec()

module.exports = {
    create,
    findOne,
    findOneAndDelete
}
