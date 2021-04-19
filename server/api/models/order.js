const mongoose = require("mongoose");
const Product = require("./product");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  items: [
    {
      // quantity: Number,
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
  price: { type: Number, required: true },
  status: { type: String, default: "ordered" },
  token: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);
