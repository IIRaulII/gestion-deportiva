const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del jugador es obligatorio'],
      trim: true,
    },
    surname: {
      type: String,
      required: [true, 'El apellido del jugador es obligatorio'],
      trim: true,
    },
    number: {
      type: Number,
      required: [true, 'El número de camiseta es obligatorio'],
    },
    position: {
      type: String,
      required: [true, 'La posición del jugador es obligatoria'],
      enum: ['Portero', 'Defensa', 'Centrocampista', 'Delantero'],
    },
    birthdate: {
      type: Date,
      required: [true, 'La fecha de nacimiento es obligatoria'],
    },
    nationality: {
      type: String,
      required: [true, 'La nacionalidad es obligatoria'],
      trim: true,
    },
    height: {
      type: Number,
      required: [true, 'La altura es obligatoria'],
    },
    weight: {
      type: Number,
      required: [true, 'El peso es obligatorio'],
    },
    photo: {
      type: String,
      default: 'default-player.png',
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player; 