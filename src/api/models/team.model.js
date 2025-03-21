const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del equipo es obligatorio'],
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'La ciudad del equipo es obligatoria'],
      trim: true,
    },
    foundedYear: {
      type: Number,
      required: [true, 'El año de fundación es obligatorio'],
    },
    logo: {
      type: String,
      default: 'default-team-logo.png',
    },
    coach: {
      type: String,
      required: [true, 'El nombre del entrenador es obligatorio'],
      trim: true,
    },
    stadium: {
      type: String,
      required: [true, 'El nombre del estadio es obligatorio'],
      trim: true,
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team; 