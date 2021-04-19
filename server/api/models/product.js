const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  info: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
