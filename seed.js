require("dotenv").config();

const mongoose = require("mongoose");
const Reward = require("./src/models/Reward");

// 🔥 gabungkan connection + db name
const uri = `${process.env.DB_CONNECTION}/${process.env.DB_NAME}`;

console.log("Mongo URI:", uri);

mongoose.connect(uri)
  .then(async () => {
    console.log("MongoDB Connected (Seed)");

    await Reward.deleteMany();

    await Reward.insertMany([
      { name: "Emas 10 gram", quota: 1 },
      { name: "Smartphone X", quota: 5 },
      { name: "Smartwatch Y", quota: 10 },
      { name: "Voucher Rp100.000", quota: 100 },
      { name: "Pulsa Rp50.000", quota: 500 }
    ]);

    console.log("Seed berhasil!");
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });