const mongoose = require("mongoose");

const _expense = mongoose.Schema({
  handler_id: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  group_name: {
    typr: String,
  },
  group_member: [
    {
      fr_name: String,
    },
  ],
  date: {
    type: Date,
  },
});

const expense = mongoose.model("expense", _expense);

module.exports = expense;
