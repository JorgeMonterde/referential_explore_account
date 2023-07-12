const express = require('express');
const artworksApiRouter = express.Router();
const artworksApiController = require ('../controllers/artworksApiController');
const authMiddleware = require("../middlewares/authMiddleware");

//Route: "api/users/artwork"
//GETs
artworksApiRouter.get("/:project_id?", artworksApiController.getUserArtworks); // Gets artworks (from project or from collection)
//POSTs
artworksApiRouter.post("/", authMiddleware.authCheck, artworksApiController.addArtworkToProject);// Add artwork to a project (user)
//DELETEs
artworksApiRouter.delete("/", authMiddleware.authCheck, artworksApiController.deleteFavorite); // Delete user's artwork (from project or from collection) (user)


module.exports = artworksApiRouter;