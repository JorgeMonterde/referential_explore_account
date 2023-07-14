const express = require('express');
const authRouter = express.Router();
const authController = require ('../controllers/authController');
const authMiddleware = require("../middlewares/authMiddleware");

/* //Is user log in ?
authRouter.get('/check', authMiddleware.authCheck, authController); */

//GOOGLE - PASSPORT OAUTH
//Renders Google prompt with accounts
authRouter.get("/auth/google",authController.promptGoogleAccounts);
//Esta ruta tiene dos funciones, la primera es en caso de fallo nos redirecciona a /auth/failure, y la segunda, en caso de éxito realiza la función siguiente.
authRouter.get("/google/callBack", authController.redirectBecauseOfFailure, authController.createAndStoreTokenViaGoogle);
//Definimos una ruta en caso de que la autenticación falle.
authRouter.get('/auth/failure', authController.notifyOfAuthFailure);

//EMAIL AND PASSWORD AUTH
authRouter.post("/email/login", authMiddleware.checkEmailLogIn, authController.createAndStoreTokenViaEmail);
authRouter.post("/email/signup", authMiddleware.signUpUser, authController.createAndStoreTokenViaEmail);
authRouter.get("/email/recoverpassword/:email", authController.recoverPassword);
authRouter.put("/email/resetpassword", authController.resetPassword);

//LOGOUT
//If authCheck, destroy the session and the cookie
authRouter.get('/logout', authMiddleware.authCheck, authController.destroySessionAndClearCookies);


module.exports = authRouter