const artworks = require("../models/artworks"); //model from SQL DB
const ArtworkDetails = require('../models/artworksDetails');  //model from NoSQL DB


//GETs
// get user's artworks from project or collection:
const getUserArtworks = async (req,res) => {
    const projectId = req.params.project_id;
    let {user_id} = req.decoded.data;

    if(projectId){ //all artworks in a project
        try {
            console.log("project_id passed in the url: ", projectId);
            let data = await artworks.getAllArtworksIDsFromProject(projectId);
            let artworksDetailsIds = data.map(item => item.artwork_mongo_id);
            if (!artworksDetailsIds[0]){
                res.status(204).json({
                    "success": true,
                    "message": "There are no artworks in this project",
                    "data": ""
                });
            } else {
                //let artworksDetails = await ArtworksDetails.find({ '_id': { $in: artworksDetailsIds } });
                let artworksDetails = await ArtworkDetails.find().where("_id").in(artworksDetailsIds).exec(); 
                res.status(200).json({
                    "success": true,
                    "message": `Artworks details provided: ${artworksDetails}`,
                    "data":artworksDetails
                });
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(400).json({
                "success": false,
                "message": `Error: ${error}`,
                "data": ""
            });
        }

    } else { //all artworks of a user's collection
        try {
            console.log("project_id not provided in url");
            let data = await artworks.getAllArtworksIDsFromUser(user_id);
            let artworksDetailsIds = data.map(item => item.artwork_mongo_id);
            if (!artworksDetailsIds[0]){
                res.status(204).json({
                    "success": true,
                    "message": `There are no artworks in the user's collection (user_id: ${user_id})`,
                    "data": ""
                });
            } else {
                //let artworksDetails = await ArtworksDetails.find({ '_id': { $in: artworksDetailsIds } });
                let artworksDetails = await ArtworkDetails.find().where("_id").in(artworksDetailsIds).exec(); 
                res.status(200).json({
                    "success": true,
                    "message": `Artworks details provided: ${artworksDetails}`,
                    "data":artworksDetails
                });
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(400).json({
                "success": false,
                "message": `Error: ${error}`,
                "data": ""
            });
        }
    }
}

//POSTs
//Add artwork to a project (user)
const addArtworkToProject = async(req,res) => {
    let {user_id} = req.decoded.data;
    let {projectId, artworkMongoId} = req.body;
    try {
        let savedInfo = await artworks.addArtworkToProject(projectId, artworkMongoId);
        console.log(savedInfo);
        res.status(201).json({
            "success": true,
            "message": `Artwork (id: ${artworkMongoId}) added to project: ${projectId}`,
            "data": savedInfo
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(400).json({
            "success": false,
            "message": `Error: ${error}`,
            "data": ""
        });
    }
}

//DELETEs
// Delete user's artwork from project (user)
const deleteFavorite = async(req, res) => {
    let {user_id} = req.decoded.data;
    let {projectId,artworkId} = req.body;
    try {
        let deletedInfo = await artworks.deleteArtworkFromProject(projectId,artworkId);
        console.log(deletedInfo)
        res.status(200).json({
            "success": true,
            "message": `Artwork (id: ${artworkId}) deleted from project(id: ${projectId})`,
            "data":deletedInfo
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(400).json({
            "success": false,
            "message": `Error: ${error}`,
            "data": ""
        });
    }
};






module.exports = {
    getUserArtworks,
    addArtworkToProject,
    deleteFavorite
}