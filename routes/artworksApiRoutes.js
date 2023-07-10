const express = require('express');
const artworksApiRouter = express.Router();
const artworksApiController = require ('../controllers/artworksApiController');
const authMiddleware = require("../middlewares/authMiddleware");

//Route: "api/users/artworks"
//GETs
artworksApiRouter.get("/", authMiddleware.authCheck, artworksApiController); // Gets artworks (from project or from collection)
//POSTs
artworksApiRouter.post("/", authMiddleware.authCheck, artworksApiController);// Add artwork to a project (user)
//PUTs
artworksApiRouter.put("/", authMiddleware.authCheck, artworksApiController);// Edit artwork (user)
//DELETEs
artworksApiRouter.delete("/", authMiddleware.authCheck, artworksApiController); // Delete user's artwork (from project or from collection) (user)


module.exports = artworksApiRouter;