const mongoose = require('mongoose');
const { Team, Player } = require('../api/models');
require('dotenv').config();
const connectDB = require('../config/db');

// Datos semilla para equipos
const teamsData = [
  {
    name: 'FC Barcelona',
    city: 'Barcelona',
    foundedYear: 1899,
    logo: 'barcelona-logo.png',
    coach: 'Xavi Hernández',
    stadium: 'Camp Nou',
    players: []
  },
  {
    name: 'Real Madrid CF',
    city: 'Madrid',
    foundedYear: 1902,
    logo: 'madrid-logo.png',
    coach: 'Carlo Ancelotti',
    stadium: 'Santiago Bernabéu',
    players: []
  },
  {
    name: 'Atlético de Madrid',
    city: 'Madrid',
    foundedYear: 1903,
    logo: 'atletico-logo.png',
    coach: 'Diego Simeone',
    stadium: 'Metropolitano',
    players: []
  }
];

// Datos semilla para jugadores
const playersData = [
  {
    name: 'Lionel',
    surname: 'Messi',
    number: 10,
    position: 'Delantero',
    birthdate: new Date('1987-06-24'),
    nationality: 'Argentina',
    height: 170,
    weight: 72,
    photo: 'messi.png'
  },
  {
    name: 'Vinícius',
    surname: 'Júnior',
    number: 7,
    position: 'Delantero',
    birthdate: new Date('2000-07-12'),
    nationality: 'Brasil',
    height: 176,
    weight: 73,
    photo: 'vinicius.png'
  },
  {
    name: 'Antoine',
    surname: 'Griezmann',
    number: 7,
    position: 'Delantero',
    birthdate: new Date('1991-03-21'),
    nationality: 'Francia',
    height: 176,
    weight: 73,
    photo: 'griezmann.png'
  },
  {
    name: 'Frenkie',
    surname: 'de Jong',
    number: 21,
    position: 'Centrocampista',
    birthdate: new Date('1997-05-12'),
    nationality: 'Países Bajos',
    height: 180,
    weight: 74,
    photo: 'dejong.png'
  },
  {
    name: 'Thibaut',
    surname: 'Courtois',
    number: 1,
    position: 'Portero',
    birthdate: new Date('1992-05-11'),
    nationality: 'Bélgica',
    height: 199,
    weight: 96,
    photo: 'courtois.png'
  },
  {
    name: 'Jan',
    surname: 'Oblak',
    number: 13,
    position: 'Portero',
    birthdate: new Date('1993-01-07'),
    nationality: 'Eslovenia',
    height: 188,
    weight: 87,
    photo: 'oblak.png'
  }
];

// Función para importar datos
const importData = async () => {
  try {
    await connectDB();
    
    // Limpiar la base de datos
    await Team.deleteMany();
    await Player.deleteMany();
    
    // Insertar equipos
    const createdTeams = await Team.create(teamsData);
    console.log(`${createdTeams.length} equipos creados`);
    
    // Asignar equipos a jugadores y guardarlos
    const barcelona = createdTeams[0]._id;
    const madrid = createdTeams[1]._id;
    const atletico = createdTeams[2]._id;
    
    // Añadir referencias de equipos a jugadores
    const playersWithTeams = [
      { ...playersData[0], team: barcelona },  // Messi - Barcelona
      { ...playersData[1], team: madrid },     // Vinícius - Real Madrid
      { ...playersData[2], team: atletico },   // Griezmann - Atlético
      { ...playersData[3], team: barcelona },  // De Jong - Barcelona
      { ...playersData[4], team: madrid },     // Courtois - Real Madrid
      { ...playersData[5], team: atletico }    // Oblak - Atlético
    ];
    
    // Crear jugadores
    const createdPlayers = await Player.create(playersWithTeams);
    console.log(`${createdPlayers.length} jugadores creados`);
    
    // Actualizar referencias de jugadores en equipos
    await Team.findByIdAndUpdate(
      barcelona,
      { $push: { players: { $each: [createdPlayers[0]._id, createdPlayers[3]._id] } } }
    );
    
    await Team.findByIdAndUpdate(
      madrid,
      { $push: { players: { $each: [createdPlayers[1]._id, createdPlayers[4]._id] } } }
    );
    
    await Team.findByIdAndUpdate(
      atletico,
      { $push: { players: { $each: [createdPlayers[2]._id, createdPlayers[5]._id] } } }
    );
    
    console.log('Relaciones entre equipos y jugadores establecidas correctamente');
    console.log('Datos importados exitosamente');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Función para eliminar datos
const deleteData = async () => {
  try {
    await connectDB();
    
    await Team.deleteMany();
    await Player.deleteMany();
    
    console.log('Datos eliminados exitosamente');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Determinar qué acción realizar basado en los argumentos
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
} 