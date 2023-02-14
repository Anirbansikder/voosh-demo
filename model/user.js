const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }, //for now not mandatory
    phoneNumber: { type: Number, required: true, unique : true }, // For Phone Number
    orders: [{ orderName: { type: String }, total: { type: Number } }], // List Of Orders
    password : {type : String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSchema", UserSchema);