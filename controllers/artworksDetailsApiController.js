//import axios from "axios"; -----> some error with axios too??
const artworks = require("../models/artworks"); //model from SQL DB
const ArtworkDetails = require('../models/artworksDetails');  //model from NoSQL DB
//import {searchArtworksFromExternalAPI} from "../utils/externalApiRequests";


//auxiliar function: ------------------------------> "module.exports" dont allow to nest imports from different files...?!
// get artworks from Art Institute of Chicago API:
async function getSearchResults(word){
    console.log("1º: ", word)
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
    //console.log("2º: ", results)
    // Create endpoints: 
    let endpoint = "https://api.artic.edu/api/v1/artworks?ids=";
    let {artworkIds} = results;
        endpoint += artworkIds.toString();
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
    //console.log("3º: ", artworkInfo, results)
    let imageIdArr = [];
    artworkInfo.forEach(artwork => imageIdArr.push(artwork.image_id));
    // "https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg"
    // Create image src:

    let iiifUrlConfig = results.iiifUrlConfig;
    
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
    const search = req.params.search;
    console.log("search: ", search)
    try {
        let data = await searchArtworksFromExternalAPI(search); //[{"info": artworkInfo[i], "img": imgSrcArr[i]}, {}, {}, ...]
        if (!data[0]){
            console.log("Artworks not found :(");
            res.status(204).json({
                "success": true,
                "message": `No artworks found while searching by "${search}": ${data}`,
                "data":data
            });
        } else {
            //console.log("Artworks found: ", data);
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
            "message": `Error: ${error}`,
            "data": ""
        });
    }
}



//POSTs
//Add artwork details to database (user or admin)
const createNewArtworkDetails = async (req,res) => {
    console.log("Check new artwork details: ", req.body);
    let {artworkInfo, isPublic, creatorId} = req.body;
    let {title, author, description, year, media, dimensions, mediumDisplay, frontImage, otherImages, coord} = artworkInfo;
    try {
        const newArtworkDetails = new ArtworkDetails({
            "artwork_info": {
                "title": title,
                "author": author,
                "description": description,
                "year": year,
                "media": media,
                "dimensions": dimensions,
                "medium_display": mediumDisplay,
                "front_image": frontImage,
                "other_images": otherImages,
                "coord": coord
            },
            "is_public": isPublic,
            "creator_id": creatorId
        });
        const data = await newArtworkDetails.save();
        console.log(`Artwork details saved: ${data}`);
        res.status(201).json({
            "success": true,
            "message": `Artwork details created: ${data}`,
            "daya": data
        });

    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({
            "success": false,
            "message": `Error: ${error}`,
            "data": ""
        });
    }
}


//PUTs
// Edit artwork details (admin)
const editArtworkDetails = async (req, res) => {
    try {
        let {artworkMongoId, updatedDetails} = req.body;
        /* const data = await ArtworkDetails.replaceOne({"_id": artworkMongoId}, updatedDetails); */
        
        //fill uncomplete fields and set updated object:
        let prevDetails = await ArtworkDetails.findById(artworkMongoId).exec();
        let updatedArtworkInfo = updatedDetails.artwork_info;
        const infoFields = Object.keys(prevDetails.artwork_info);

        prevDetails = {...prevDetails.artwork_info, "artwork_info": updatedArtworkInfo} 
        for (let field of infoFields){
            if (!updatedArtworkInfo[field]){
                updatedArtworkInfo[`${field}`] = prevDetails[field];
                console.log("HEY", `updatedArtworkInfo[${field}]`, "HELLO", prevDetails[field]);
            }
        }
        updatedDetails = {
            "artwork_info": updatedArtworkInfo,
            "is_public": updatedDetails.is_public || prevDetails.is_public,
            "creator_id": updatedDetails.creator_id ||  prevDetails.creator_id
        }

        const data = await ArtworkDetails.findOneAndUpdate({"_id": artworkMongoId}, {$set: updatedDetails}, {new: true});
        res.status(200).json({
            "success": true,
            "message": `Artwork details updated: ${data}`,
            "data":data
        });

    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({
            "success": false,
            "message": `Error: ${error}`,
            "data": ""
        });
    }
}; 

//DELETEs
//Delete artwork details from DDBB (creator or admin)
const deleteArtworkDetails = async (req, res) => {
    try {
        const artworkDetailsId = req.params.id;
        const data = await ArtworkDetails.deleteOne({_id : artworkDetailsId});
        console.log(data);
        res.status(200).json({
            "success": true,
            "message": `Artwork details (id:${artworkDetailsId}) deleted: ${data}`,
            "data":data
        });
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({
            "success": false,
            "message": `Error: ${error}`,
            "data": ""
        });
    }
};





module.exports = {
    searchArtworks,
    createNewArtworkDetails,
    editArtworkDetails,
    deleteArtworkDetails
}
