const contactUsRepository = require('../repositories/contact-us-repository')

const create = (data) => contactUsRepository.create(data)

module.exports = { create }
