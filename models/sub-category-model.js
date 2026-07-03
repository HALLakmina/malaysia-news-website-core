const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema({
    lable: { type: String, required: true },
    value: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("subcategory", subCategorySchema);
