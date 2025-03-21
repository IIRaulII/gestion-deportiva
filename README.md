# API de Gestión Deportiva

API REST desarrollada con Node.js, Express y MongoDB para la gestión de equipos deportivos y jugadores.

## Características

- Conexión a MongoDB Atlas mediante Mongoose
- Dos modelos relacionados: Equipos y Jugadores
- CRUD completo para ambos modelos
- Manejo de relaciones entre equipos y jugadores
- Semilla para poblar la base de datos con datos iniciales
- Manejo de errores centralizado

## Instalación

1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd gestion-deportiva
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
Edita el archivo `.env` con tus credenciales de MongoDB Atlas:
```
PORT=9090
MONGO_URI=mongodb+srv://tu_usuario:tu_password@tucluster.mongodb.net/gestion-deportiva?retryWrites=true&w=majority
NODE_ENV=development
```

## Uso

### Iniciar el servidor
```bash
# Modo producción
npm start

# Modo desarrollo con nodemon
npm run dev
```

### Cargar datos iniciales
```bash
# Importar datos semilla
npm run data:import

# Eliminar todos los datos
npm run data:destroy
```

## Endpoints de la API

### Equipos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/teams` | Obtener todos los equipos |
| GET | `/api/teams/:id` | Obtener un equipo por ID |
| POST | `/api/teams` | Crear un nuevo equipo |
| PUT | `/api/teams/:id` | Actualizar un equipo existente |
| DELETE | `/api/teams/:id` | Eliminar un equipo |
| POST | `/api/teams/:id/players/:playerId` | Añadir un jugador a un equipo |
| DELETE | `/api/teams/:id/players/:playerId` | Eliminar un jugador de un equipo |

#### Ejemplo de objeto equipo
```json
{
  "name": "FC Barcelona",
  "city": "Barcelona",
  "foundedYear": 1899,
  "logo": "barcelona-logo.png",
  "coach": "Xavi Hernández",
  "stadium": "Camp Nou",
  "players": ["60d21b4967d0d8992e610c85", "60d21b4967d0d8992e610c87"]
}
```

### Jugadores

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/players` | Obtener todos los jugadores |
| GET | `/api/players/:id` | Obtener un jugador por ID |
| POST | `/api/players` | Crear un nuevo jugador |
| PUT | `/api/players/:id` | Actualizar un jugador existente |
| DELETE | `/api/players/:id` | Eliminar un jugador |

#### Ejemplo de objeto jugador
```json
{
  "name": "Lionel",
  "surname": "Messi",
  "number": 10,
  "position": "Delantero",
  "birthdate": "1987-06-24T00:00:00.000Z",
  "nationality": "Argentina",
  "height": 170,
  "weight": 72,
  "photo": "messi.png",
  "team": "60d21b4967d0d8992e610c83"
}
```

## Características Especiales

### Gestión de Relaciones

- Al actualizar un equipo, el array de jugadores se mantiene si no se proporciona en la actualización
- Se evita la duplicación de jugadores en un equipo
- Al eliminar un equipo, se actualizan las referencias en los jugadores asociados
- Al cambiar un jugador de equipo, se actualizan las referencias en ambos equipos

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- CORS
- Morgan (logger)

## Licencia

Este proyecto está bajo la Licencia ISC. 