const express = require('express');
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./utils/auth.js");
require("dotenv").config();
const error404 = require('./middlewares/error404');

// Initialize server
const app = express();
const port = 3000;

//Passport and session
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// DDBB conection
require("./utils/db_mongo");

// Routes modules
const usersApiRoutes = require('./routes/usersApiRoutes');
const projectsApiRoutes = require('./routes/projectsApiRoutes');
const artworksApiRoutes = require('./routes/artworksApiRoutes');
const artworksDetailsApiRoutes = require('./routes/artworksDetailsApiRoutes.js');
const authRoutes = require('./routes/authRoutes');

// Middlewares
app.use(express.json()); // Enable data type to receive
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //Better access to cookies
app.use(cors({credentials: true, origin: process.env.FRONTEND_DOMAIN})) //Enable all CORS requests

//Routes 
app.use('/api/users/user',usersApiRoutes); // Users routes
app.use('/api/users/project',projectsApiRoutes); // Projects routes
app.use('/api/users/artworks',artworksApiRoutes); // Artworks routes
app.use('/api/artworks',artworksDetailsApiRoutes); // Artworks Details routes
app.use('/auth',authRoutes); // Auth routes

app.use(error404);

const server = app.listen(port, () => {
    console.log(`****Conected in port ${port}****`);
})

module.exports = server;

