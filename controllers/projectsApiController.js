const projects = require("../models/projects");


//GETs
// get projects Ids with user id:
const getUserProjectsIds = async (req,res) => {
    try {
        let {id_user} = req.decoded.data;
        let data = await projects.getAllProjects(id_user);
        if (!data[0]){
            console.log("There are no projects");
        } else {
            //let projectIdArr = data.map(item => item.project_id);
            console.log("Array of projects: ", data);
            res.status(200).json({
                "success": true,
                "message": `Projects ids supplied`,
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
//save project to list (user)
const createProject = async(req,res) => {
    let {id_user} = req.decoded.data;
    let {id_project, title, specification} = req.body;
    try {
        let savedInfo = await projects.addProject(id_user, id_project, title, specification); 

        res.status(200).json({
            "success": true,
            "message": `user id:${id_user} created a new project with id:${id_project}`,
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

//PUTs
// Edit project info (user and admin)
const editProjectInfo = async (req,res) => {
    try {
        let {id_user} = req.decoded.data;
        let {projectId, title, specification} = req.body;
        // If a field is not filled, do it with the current value:
        // get previous project info and paste it on the empty fields

        

        // "user_id" goes in "userInfo" to search the user row in the DDBB.
        let editedInfo = await projects.updateProject(projectId, title, specification);

        res.status(200).json({
            "success": true,
            "message": "project info updated",
            "data": editedInfo
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

//DELETEs
// Delete user's project from DDBB (user)
const deleteProject = async(req, res) => {
    let {id_user} = req.decoded.data;
    let {id_project} = req.body;
    try {
        let deletedInfo = await projects.deleteProject(id_project);
        console.log(deletedInfo)
        res.status(200).json({
            "success": true,
            "message": `user id:${id_user} deleted project with id:${id_project}`,
            "data": deletedInfo
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
    getUserProjectsIds,
    createProject,
    editProjectInfo,
    deleteProject
}