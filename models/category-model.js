const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema(
  {
    lable: { type: String, required: true },
    value: { type: String, required: true, unique: true},
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  {
    timestamps: true
  }
);

const categorySchema = new Schema(
  {
    lable: { type: String, required: true },
    value: { type: String, required: true, unique: true },
    sub_categorys: [subCategorySchema],
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("category", categorySchema);