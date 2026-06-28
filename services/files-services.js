const filesRepository = require('../repositories/files-repository')

const create = (data, userId) => {
    const createdBy = userId
    const updatedBy = createdBy
    return filesRepository.create({ ...data, createdBy, updatedBy })
}

const findById = (id) => filesRepository.findOne({ _id: id })

const deleteById = (id) => filesRepository.findOneAndDelete({ _id: id })

module.exports = {
    create,
    findById,
    deleteById
}
