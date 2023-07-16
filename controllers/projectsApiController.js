const projects = require("../models/projects");


//GETs
// get projects Ids with user id:
const getUserProjectsIds = async (req,res) => {
    try {
        let {user_id} = req.decoded.data;
        let data = await projects.getAllProjects(user_id);
        if (!data[0]){
            console.log("There are no projects");
            res.status(200).json({
                "success": true,
                "message": "There are no projects",
                "data": data,
                "auth":true
            });
        } else {
            //let projectIdArr = data.map(item => item.project_id);
            console.log("Array of projects: ", data);
            res.status(200).json({
                "success": true,
                "message": `Projects supplied`,
                "data": data,
                "auth":true
            });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(400).json({
            "success": false,
            "message": `Error: ${error}`,
            "data": "",
            "auth":true
        });
    }
}

//POSTs
//save project to list (user)
const createProject = async(req,res) => {
    let {user_id} = req.decoded.data;
    let {title, specification} = req.body;
    try {
        let savedInfo = await projects.addProject(user_id, title, specification); 

        res.status(200).json({
            "success": true,
            "message": `user id:${user_id} created a new project with title:${title}`,
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
        let {user_id} = req.decoded.data;
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
    let {user_id} = req.decoded.data;
    let {id_project} = req.body;
    try {
        let deletedInfo = await projects.deleteProject(id_project);
        console.log(deletedInfo)
        res.status(200).json({
            "success": true,
            "message": `user id:${user_id} deleted project with id:${id_project}`,
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