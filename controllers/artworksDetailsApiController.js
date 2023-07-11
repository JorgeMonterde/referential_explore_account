const artworks = require("../models/artworks"); //model from SQL DB
const ArtworkDetails = require('../models/artworksDetails');  //model from NoSQL DB

//GETs


//POSTs  ----------------------->>> This controller is for the POST in routes /api/artworks!!!
//Add artwork to database (user or admin)
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
            msj: `ERROR: ${error}`
        });
    }
}


//PUTs

//DELETEs





module.exports = {
    createNewArtworkDetails,
    
}