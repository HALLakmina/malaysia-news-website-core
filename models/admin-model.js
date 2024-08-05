const mongoose = require('mongoose')
const schema = mongoose.Schema;

const adminSchema = new schema({
    firstName: { type: String, required : true},
    lastName: { type: String, required : true},
    email: { type: String, required : true},
    password: { type: String, required : true},
    createdBy: { type : String, required : false },
    updatedBy: { type : String, required : false },
    
}, { timestamps: true })

const admin = mongoose.model("admin", adminSchema)
module.exports = admin