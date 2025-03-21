const express = require('express');
const teamRoutes = require('./team.routes');
const playerRoutes = require('./player.routes');

const router = express.Router();

// Prefijos de rutas
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);

module.exports = router; 