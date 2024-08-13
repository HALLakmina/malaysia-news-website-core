const mongoose = require('mongoose');
const schema = mongoose.Schema

const newsSchema = new schema({
    topic:{type:'String', required: true},
    description:{type:'String', required: true},
    category:{type:'String', required: true},
    language:{type:'String', required: true},
    image: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'files'
            },
    isDisable: {type:'Boolean', required: false, default: false},
    video_link:{type:"String", required: false, default:''},
    createdBy: { type : String, required : false },
    updatedBy: { type : String, required : false },
},{timestamps: true})

const news = mongoose.model('news', newsSchema)
module.exports = news