const mongoose = require("mongoose");
require('dotenv').config();

// DB on Atlas
// With this string you can enter throw Compass: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster0.lhlyvrl.mongodb.net/`
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster0.ej5bzwe.mongodb.net/`)
    .catch(error => handleError(error)); // Error handling recommended by documentation

const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("Estás conectado a MongoDB"));

module.exports = mongoose;

