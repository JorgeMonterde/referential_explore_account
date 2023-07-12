const express = require('express');
const usersApiRouter = express.Router();
const usersApiController = require ('../controllers/usersApiController');
const authMiddleware = require("../middlewares/authMiddleware")

//Route: "api/users/user"
//GETs
usersApiRouter.get("/", authMiddleware.isUserLoggedCheck, usersApiController.getUserInfo); // Gets user's info
//POSTs
usersApiRouter.post("/", usersApiController.createUser);// Create user
//PUTs
usersApiRouter.put("/", authMiddleware.authCheck, usersApiController.editUserProfile); // Edit user profile (user and admin)
//DELETEs
usersApiRouter.delete("/:id?", usersApiController.deleteUser); // Delete a user from DDBB (admin)


module.exports = usersApiRouter;