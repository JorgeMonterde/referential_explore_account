const pool = require('../utils/db_pgsql');
const artworksQueries = require("../queries/artworks.queries");


// Get all artworks ids from a project
const getAllArtworksIDsFromProject = async(projectId) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(artworksQueries.getAllArtworksIDsFromProject, [projectId]);
        result = data.rows;
        console.log(result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

// Get all artworks ids from a user
const getAllArtworksIDsFromUser = async(projectId) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(artworksQueries.getAllArtworksFromUser, [projectId]);
        result = data.rows;
        console.log(result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

// Add an artwork to a user's project (user)
const addArtworkToProject = async(projectId, artworkId, artwork_mongoId) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(artworksQueries.addArtworkToProject,[projectId, artworkId, artwork_mongoId]);
        result = data.rowCount;
        console.log("add artwork: ", result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

// Delete an artwork from a user's project (user)
const deleteArtworkFromProject = async(projectId,artworkId) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(artworksQueries.deleteArtworkFromProject,[projectId,artworkId]);
        result = data.rowCount;
        if(result==0){
            console.log("Warning: project_id or artwork_id not found in SQL DDBB");
        }
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};





module.exports = {
    getAllArtworksIDsFromProject,
    getAllArtworksIDsFromUser,
    addArtworkToProject,
    deleteArtworkFromProject
}