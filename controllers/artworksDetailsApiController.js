const artworks = require("../models/artworks"); //model from SQL DB
const ArtworkDetails = require('../models/artworksDetails');  //model from NoSQL DB
//import {searchArtworksFromExternalAPI} from "../utils/externalApiRequests";

//auxiliar function: ------------------------------> module.exports dont allow to nest imports from different files...?!
// get artworks from Art Institute of Chicago API:
async function getSearchResults(word){
    let artworkIds = [];
    let iiifUrlConfig;
    let searchResults = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${word}`)
        .then(res => res.json())
        .then(info => {
            info.data.forEach(item => artworkIds.push(item.id));
            iiifUrlConfig = info.config.iiif_url;
        });
    return {artworkIds, iiifUrlConfig};
};

async function getCompleteArtworkInfo(results){
    // Create endpoints: 
    let endpoint = "https://api.artic.edu/api/v1/artworks?ids=";
    await results.then(obj => {
        let {artworkIds} = obj;
        endpoint += artworkIds.toString();
    });
    let info = [];
    // Get:
    await fetch(endpoint).then(res => res.json())
        .then(item => {
            item.data.forEach(item => {
                info.push(item);
            })
        });
    return info;
};

async function getImagesSrc(artworkInfo, results){
    console.log(artworkInfo)
    let imageIdArr = [];
    await artworkInfo.then(info => {
        console.log(info)
        info.forEach(artwork => imageIdArr.push(artwork.image_id));
    });
    // "https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg"
    // Create image src:
    let iiifUrlConfig;
    await results.then(item => {
        iiifUrlConfig = item.iiifUrlConfig
    });
    for (let i in imageIdArr) {
        imageIdArr[i] = `${iiifUrlConfig}/${imageIdArr[i]}/full/843,/0/default.jpg`
    };
    return imageIdArr;
};

async function searchArtworksFromExternalAPI(word){
    try {
        // Get results brief Info:
        let results = await getSearchResults(word);
        // Get complete Info:
        let artworkInfo = await getCompleteArtworkInfo(results);  
        //Get images src:
        let imgSrcArr = await getImagesSrc(artworkInfo, results);
        // Set response
        let artworksDetails = [];
        for(let i=0; i<artworkInfo.length; i++){
            artworksDetails.push({"info": artworkInfo[i], "img": imgSrcArr[i]});
        }

        return artworksDetails;
    } catch (error){
        console.log(`Error: ${error}`)
    }
}



//GETs
// get artworks details searching by a word:
const searchArtworks = async (req,res) => {
    const word = req.params.search;
    try {
        let data = searchArtworksFromExternalAPI(word); //[{"info": artworkInfo[i], "img": imgSrcArr[i]}, {}, {}, ...]
        if (!data[0]){
            console.log("No artworks found :(");
            res.status(204).json({
                "success": false,
                "message": `No artworks found while searching by "${word}": ${data}`
            });
        } else {
            console.log("Artworks found: ", data);
            res.status(200).json({
                "success": true,
                "message": "Artworks info supplied",
                "data": data
            });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(400).json({
            "success": false,
            "message": `Could not search by word`,
            "data": error
        });
    }
}


//POSTs
//Add artwork details to database (user or admin)
const createNewArtworkDetails = async (req,res) => {
    console.log("Check new artwork details: ", req.body);
    let {artwork_info, is_public, creator_id} = req.body;
    let {title, author, description, year, media, dimensions, medium_display, front_image, other_images, coord} = artwork_info;
    try {
        const newArtworkDetails = new ArtworkDetails({
            "artwork_info": {
                title,
                author,
                description,
                year,
                media,
                dimensions,
                medium_display,
                front_image,
                other_images,
                coord
            },
            is_public,
            creator_id
        });
        const data = await newArtworkDetails.save();
        console.log(`Artwork details saved: ${data}`);
        res.status(201).json({
            "success": true,
            "message": `Artwork details created: ${data}`
        });
    }        
    
    catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({
            "success": false,
            "message": `Could not create new artwork details`,
            "data": error
        });
    }
}


//PUTs
// Edit artwork details (admin)
const editArtworkDetails = async (req, res) => {
    try {
        const artworkMongoId = req.body.data;
        const updatedDetails = req.body.data;
        const data = await ArtworkDetails.replaceOne({"_id": artworkMongoId}, updatedDetails);
        console.log("edit artwork details successfully: ", data);
        res.status(200).json({
            "success": true,
            "message": `Artwork details updated: ${data}`
        });

    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({
            "success": false,
            "message": `Could not update artwork details`,
            "data": error
        });
    }
}; 

//DELETEs
//Delete artwork details from DDBB (creator or admin)
const deleteArtworkDetails = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Project.deleteOne({_id : req.params.id});
        res.status(200).json(data);
        console.log(data);
    } catch (error) {
        res.status(404).json({
            "Error": `${error}`
        })
        console.log(error);
    }
};





module.exports = {
    searchArtworks,
    createNewArtworkDetails,
    editArtworkDetails,
    deleteArtworkDetails
}
