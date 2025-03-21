const express = require('express');
const { playerController } = require('../controllers');

const router = express.Router();

// Rutas básicas CRUD para jugadores
router.route('/')
  .get(playerController.getPlayers)
  .post(playerController.createPlayer);

router.route('/:id')
  .get(playerController.getPlayerById)
  .put(playerController.updatePlayer)
  .delete(playerController.deletePlayer);

module.exports = router; 