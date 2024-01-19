const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  customerName: { type: String, required: true },
  userEmail: { type: String, required: true },
  customerCode: { type: String, required: true },
  band: { type: String, required: true },
  join_date: { type: Date, default: Date.now },
  contact: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  superwiser_emp_code: { type: String, required: true },
  emergency_contact: { type: Number, required: false },
  isDeleted: { type: Boolean, default: false },
  role_id: { type: Number, default: 2 },
  isActive: { type: Number, default: 1 }, // 1 for active, 0 for inactive
});

const User = model("User", userSchema);

module.exports = User;
