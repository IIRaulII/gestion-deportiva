const { Team, Player } = require('../models');

// @desc    Obtener todos los equipos
// @route   GET /api/teams
// @access  Public
const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().populate('players', 'name surname number position');
    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener un equipo por ID
// @route   GET /api/teams/:id
// @access  Public
const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id).populate('players');
    
    if (!team) {
      const error = new Error('Equipo no encontrado');
      error.status = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear un nuevo equipo
// @route   POST /api/teams
// @access  Public
const createTeam = async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({
      success: true,
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar un equipo
// @route   PUT /api/teams/:id
// @access  Public
const updateTeam = async (req, res, next) => {
  try {
    const updates = req.body;
    const existingTeam = await Team.findById(req.params.id);
    
    if (!existingTeam) {
      const error = new Error('Equipo no encontrado');
      error.status = 404;
      throw error;
    }
    
    if (!updates.players) {
      updates.players = existingTeam.players;
    }
    
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).populate('players');
    
    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar un equipo
// @route   DELETE /api/teams/:id
// @access  Public
const deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      const error = new Error('Equipo no encontrado');
      error.status = 404;
      throw error;
    }
    
    await Player.updateMany(
      { team: req.params.id },
      { $unset: { team: 1 } }
    );
    
    await Team.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Añadir un jugador a un equipo
// @route   POST /api/teams/:id/players/:playerId
// @access  Public
const addPlayerToTeam = async (req, res, next) => {
  try {
    const { id, playerId } = req.params;
    
    const team = await Team.findById(id);
    if (!team) {
      const error = new Error('Equipo no encontrado');
      error.status = 404;
      throw error;
    }
    
    const player = await Player.findById(playerId);
    if (!player) {
      const error = new Error('Jugador no encontrado');
      error.status = 404;
      throw error;
    }
    
    if (team.players.includes(playerId)) {
      const error = new Error('El jugador ya pertenece a este equipo');
      error.status = 400;
      throw error;
    }
    
    team.players.push(playerId);
    await team.save();
    
    player.team = id;
    await player.save();
    
    const updatedTeam = await Team.findById(id).populate('players');
    
    res.status(200).json({
      success: true,
      data: updatedTeam,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar un jugador de un equipo
// @route   DELETE /api/teams/:id/players/:playerId
// @access  Public
const removePlayerFromTeam = async (req, res, next) => {
  try {
    const { id, playerId } = req.params;
    
    const team = await Team.findById(id);
    if (!team) {
      const error = new Error('Equipo no encontrado');
      error.status = 404;
      throw error;
    }
    
    const player = await Player.findById(playerId);
    if (!player) {
      const error = new Error('Jugador no encontrado');
      error.status = 404;
      throw error;
    }
    
    if (!team.players.includes(playerId)) {
      const error = new Error('El jugador no pertenece a este equipo');
      error.status = 400;
      throw error;
    }
    
    team.players = team.players.filter(
      player => player.toString() !== playerId
    );
    await team.save();
    
    await Player.findByIdAndUpdate(playerId, { $unset: { team: 1 } });
    
    const updatedTeam = await Team.findById(id).populate('players');
    
    res.status(200).json({
      success: true,
      data: updatedTeam,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  addPlayerToTeam,
  removePlayerFromTeam,
}; 