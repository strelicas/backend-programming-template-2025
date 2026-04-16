const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  name: String,
  quota: Number,
  claimed: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Reward", rewardSchema);