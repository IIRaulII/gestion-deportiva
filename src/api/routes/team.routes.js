const express = require('express');
const { teamController } = require('../controllers');

const router = express.Router();

// Rutas básicas CRUD para equipos
router.route('/')
  .get(teamController.getTeams)
  .post(teamController.createTeam);

router.route('/:id')
  .get(teamController.getTeamById)
  .put(teamController.updateTeam)
  .delete(teamController.deleteTeam);

// Rutas para gestionar jugadores dentro de un equipo
router.route('/:id/players/:playerId')
  .post(teamController.addPlayerToTeam)
  .delete(teamController.removePlayerFromTeam);

module.exports = router; 