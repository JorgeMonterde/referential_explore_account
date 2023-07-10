const express = require('express');
const projectsApiRouter = express.Router();
const projectsApiController = require ('../controllers/projectsApiController');
const authMiddleware = require("../middlewares/authMiddleware")

//Route: "api/users/project"
//GETs
projectsApiRouter.get("/", authMiddleware.authCheck, projectsApiController.getUserProjectsIds); // Gets user's projects ids
//POSTs
projectsApiRouter.post("/", authMiddleware.authCheck, projectsApiController.createProject);// Create project (user)
//PUTs
projectsApiRouter.put("/", authMiddleware.authCheck, projectsApiController.editProjectInfo);// Edit project (user)
//DELETEs
projectsApiRouter.delete("/", authMiddleware.authCheck, projectsApiController.deleteProject); // Delete user's project from DDBB (user)


module.exports = projectsApiRouter;