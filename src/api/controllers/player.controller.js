const { Player, Team } = require('../models');

// @desc    Obtener todos los jugadores
// @route   GET /api/players
// @access  Public
const getPlayers = async (req, res, next) => {
  try {
    const players = await Player.find().populate('team', 'name city');
    res.status(200).json({
      success: true,
      count: players.length,
      data: players,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener un jugador por ID
// @route   GET /api/players/:id
// @access  Public
const getPlayerById = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id).populate('team');
    
    if (!player) {
      const error = new Error('Jugador no encontrado');
      error.status = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear un nuevo jugador
// @route   POST /api/players
// @access  Public
const createPlayer = async (req, res, next) => {
  try {
    if (req.body.team) {
      const team = await Team.findById(req.body.team);
      if (!team) {
        const error = new Error('Equipo no encontrado');
        error.status = 404;
        throw error;
      }
    }
    
    const player = await Player.create(req.body);
    
    if (req.body.team) {
      await Team.findByIdAndUpdate(
        req.body.team,
        { $push: { players: player._id } }
      );
    }
    
    res.status(201).json({
      success: true,
      data: player,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar un jugador
// @route   PUT /api/players/:id
// @access  Public
const updatePlayer = async (req, res, next) => {
  try {
    const updates = req.body;
    const player = await Player.findById(req.params.id);
    
    if (!player) {
      const error = new Error('Jugador no encontrado');
      error.status = 404;
      throw error;
    }
    
    if (updates.team && updates.team !== player.team?.toString()) {
      const newTeam = await Team.findById(updates.team);
      if (!newTeam) {
        const error = new Error('Equipo nuevo no encontrado');
        error.status = 404;
        throw error;
      }
      
      if (player.team) {
        await Team.findByIdAndUpdate(
          player.team,
          { $pull: { players: player._id } }
        );
      }
      
      await Team.findByIdAndUpdate(
        updates.team,
        { $addToSet: { players: player._id } }
      );
    } else if (updates.team === null && player.team) {
      await Team.findByIdAndUpdate(
        player.team,
        { $pull: { players: player._id } }
      );
    }
    
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).populate('team');
    
    res.status(200).json({
      success: true,
      data: updatedPlayer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar un jugador
// @route   DELETE /api/players/:id
// @access  Public
const deletePlayer = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id);
    
    if (!player) {
      const error = new Error('Jugador no encontrado');
      error.status = 404;
      throw error;
    }
    
    if (player.team) {
      await Team.findByIdAndUpdate(
        player.team,
        { $pull: { players: player._id } }
      );
    }
    
    await Player.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
}; 