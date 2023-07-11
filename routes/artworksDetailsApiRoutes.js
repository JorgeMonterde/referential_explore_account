const express = require('express');
const artworksDetailsApiRouter = express.Router();
const artworksDetailsApiController = require ('../controllers/artworksDetailsApiController');
const authMiddleware = require("../middlewares/authMiddleware")

//Route: "api/users/project"
//GETs
artworksDetailsApiRouter.get("/search", artworksDetailsApiController); // search artworks from the api (InstitueChicageAPI) (v2.0 -> ... or the user collection)
//POSTs
artworksDetailsApiRouter.post("/artwork", authMiddleware.authCheck, artworksDetailsApiController.createNewArtworkDetails);// create artwork (add artwork to MongoDB)
//PUTs
artworksDetailsApiRouter.put("/artwork", authMiddleware.authCheck, artworksDetailsApiController);// edit artwork info (when an artwork is added to a project the artwork is added to Mongo with a singular id, so the user can edit it)
//DELETEs
artworksDetailsApiRouter.delete("/artwork", authMiddleware.authCheck, artworksDetailsApiController); // delete artwork (only if user is authorized (creator or admin)


module.exports = artworksDetailsApiRouter;