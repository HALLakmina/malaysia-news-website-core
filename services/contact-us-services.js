const ContactUs = require('../models/contact-us-models');

const create = async (data) => {
    try{
        const newContactUs = new ContactUs(data);
        await newContactUs.save();    
        return newContactUs;
    } catch(err){        
        throw err;
    }
}

module.exports = { create }