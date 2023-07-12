const pool = require('../utils/db_pgsql');
const projectsQueries = require("../queries/projects.queries");


// Add a project to user's projects list (user)
const addProject = async(userId, projectId, title, specification) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(projectsQueries.addProject,[userId, projectId, title, specification]);
        result = data.rowCount;
        console.log("add project: ", result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

// Delete a project from user's projects list (user)
const deleteProject = async(projectId) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(projectsQueries.deleteProject,[projectId]);
        result = data.rowCount;
        if(result==0){
            console.log("Warning: user_id or project_id not found in SQL DDBB");
        }
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

// Get all projects ids
const getAllProjects = async(userId) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(projectsQueries.getAllProjects, [userId]);
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

// Update project info:
const updateUser = async(projectId, title, specification) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(projectsQueries.updateProject,
        [projectId, title, specification]);
        result = data.rowCount;
        console.log("project updated: ", result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};




module.exports = {
    addProject,
    deleteProject,
    getAllProjects,
    updateUser
}