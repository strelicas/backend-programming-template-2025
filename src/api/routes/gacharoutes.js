module.exports = (app) => {
  const gachaController = require('../components/controller/gachaController'); // ✅ FIX

  // 🎯 GACHA
  app.post('/gacha', gachaController.gacha);

  // 📜 HISTORY
  app.get('/gacha/history/:userId', gachaController.history);

  // 📊 REWARDS
  app.get('/rewards', gachaController.getRewards);

  // 🕵️ WINNERS
  app.get('/winners', gachaController.winners);
};