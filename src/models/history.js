const mongoose = require("mongoose");

const gachaSchema = new mongoose.Schema({
  userId: String,
  date: String,
  reward: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("history", gachaSchema);
