const mongoose = require('mongoose');
require('../utils/db_mongo');


// Artworks details schema
const objectSchema = {
    artwork_info: {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        media: {
            type: String,
            required: true
        },
        front_image: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        year: {
            type: Number
        },
        dimensions: {
            type: String
        },
        medium_display: {
            type: String
        },
        other_images: {
            type: Array
        },
        coord: {
            lat: {
                type: String,
            },
            lon: {
                type: String,
            }
        }
    },
    is_public: {
        type: Boolean,
        required: true
    },
    creator_id: {
        type: String,
        required: true
    }
}
// create schema
const artworkDetailsSchema = mongoose.Schema(objectSchema);

// create model using schema
const ArtworkDetails = mongoose.model('ArtworkDetails', artworkDetailsSchema);

// document example
const newArtworkDetails = new ArtworkDetails({
    artwork_info: {
        title: "Corona de espinas",
        author: "Fernando Higueras",
        description: "Edificio brutalista ... etc",
        year: 1967,
        media: "Architecture",
        dimensions: "",
        medium_display: "Concrete ... etc",
        front_image: "https://imagenes.elpais.com/resizer/JQsyd7NrjOYA_0MvxiLW-J4Y8SI=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/IX6OUJ6QDVA7RAUTPXOHBMQCWE.jpg",
        other_images: [
            "https://media.revistaad.es/photos/640749956aafe8c03dbd1316/4:3/w_1440,h_1080,c_limit/espinas.color%202.jpg",
            "https://www.metalocus.es/sites/default/files/styles/mopis_news_gallery_deskop/public/metalocus-coronadeespinas-ohm16-28.jpg?itok=DMo_vogc",
            "https://www.madridiario.es/fotos/noticias/64/c0/1a/d3/125475.jpg",
            "https://uploads-ssl.webflow.com/63bc34cf1e70243326769491/641b85b93ee14ef4e2c539c8_corona-de-espinas-arquitectura-vista-desde-la-primera-planta.jpeg"
        ],
        coord: {
            lat: "1.23456",
            lon: "1.23456"
        }
    },
    is_public: true,
    creator_id: "yuweywlk18723hv42kjfw6aiuwh"
})



//newArtworkDetails.save().then((data)=>console.log(data));

module.exports = ArtworkDetails;
