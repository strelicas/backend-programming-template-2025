module.exports = (app) => {
  const gachaController = require('../components/controller/gachaController'); 

  // unruk gaca
  app.post('/gacha', gachaController.gacha);

  // untuk history
  app.get('/gacha/history/:userId', gachaController.history);

  // untuk reward
  app.get('/rewards', gachaController.getRewards);

  // untuk winner
  app.get('/winners', gachaController.winners);
};