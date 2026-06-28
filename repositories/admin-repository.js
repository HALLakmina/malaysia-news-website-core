const Admin = require('../models/admin-model')

const create = (data) => new Admin(data).save()

const findOne = (filter) => Admin.findOne(filter)

module.exports = {
    create,
    findOne
}
