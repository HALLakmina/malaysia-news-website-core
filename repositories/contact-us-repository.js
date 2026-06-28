const ContactUs = require('../models/contact-us-models')

const create = (data) => new ContactUs(data).save()

module.exports = {
    create
}
