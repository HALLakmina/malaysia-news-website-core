const mongoose = require("mongoose");
const schema = mongoose.Schema

const filesSchema = new schema({
    originalName: { type : String, required : true },
    storageName: { type: String, required: true },  
    thumbnailStorageName: { type: String, required: true },
    path: { type : String, required : true },  
    mimeType: { type : String, required : true },  
    size: { type: Number, required: true },
    createdBy: { type : String, required : false },
    updatedBy: { type : String, required : false },     
}, { timestamps: true } )

const files = mongoose.model("files", filesSchema);
module.exports = files;