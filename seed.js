require("dotenv").config();

const mongoose = require("mongoose");
const Reward = require("./src/models/Reward");


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
      { name: "Voucher Rp100k RP", quota: 100 },
      { name: "Pulsa Rp50k RP", quota: 500 }
    ]);

    console.log("Seed berhasil!");
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });