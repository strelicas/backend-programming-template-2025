const Gacha = require('../../../models/history');
const Reward = require('../../../models/reward');

exports.gacha = async (req, res) => {
  try {
    const userId = req.body.userId;
    const today = new Date().toDateString();

    // cek limit 5x
    const count = await Gacha.countDocuments({ userId, date: today });

    if (count >= 5) {
      return res.status(400).json({
        message: "Limit gacha 5x per hari tercapai"
      });
    }

    // ambil reward tersedia
    const rewards = await Reward.find({
      $expr: { $lt: ["$claimed", "$quota"] }
    });

    let result = null;

    // random menang / kalah
    if (rewards.length > 0 && Math.random() < 0.5) {
      const randomReward =
        rewards[Math.floor(Math.random() * rewards.length)];

      randomReward.claimed += 1;
      await randomReward.save();

      result = randomReward.name;
    }

    // simpan history
    await Gacha.create({
      userId,
      date: today,
      reward: result
    });

    res.json({
      message: result ? "Selamat kamu menang!" : "Belum beruntung",
      reward: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📜 BONUS 1: HISTORY
exports.history = async (req, res) => {
  const data = await Gacha.find({ userId: req.params.userId });
  res.json(data);
};

// 📊 BONUS 2: SISA KUOTA
exports.getRewards = async (req, res) => {
  const rewards = await Reward.find();

  const result = rewards.map(r => ({
    name: r.name,
    remaining: r.quota - r.claimed
  }));

  res.json(result);
};

// 🕵️ BONUS 3: WINNERS (ANONYM)
function maskName(name) {
  return name.replace(/.(?=.{2})/g, "*");
}

exports.winners = async (req, res) => {
  const data = await Gacha.find({ reward: { $ne: null } });

  const result = data.map(d => ({
    user: maskName(d.userId),
    reward: d.reward
  }));

  res.json(result);
};