const mongoose = require('mongoose');
require('../utils/db_mongo');

// Artworks details schema
const objectSchema = {
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    artwork_info: {
        type: Date,
        required: true
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
const projectSchema = mongoose.Schema(objectSchema);

// create model using schema
const Project = mongoose.model('Project', projectSchema);

const newProject = new Project({
    "title": "Desarrollador Web",
    "date": '2023-06-27T19:23:07.948Z',
    "source": "manual",
    "budget": "Sueldazo",
    "desciption": 'no hay que hacer nada',
    "url": "none"
  });



// newProject.save().then((data)=>console.log(data));

module.exports = Project;
