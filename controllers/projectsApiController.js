const projects = require("../models/projects");


//GETs
// get projects Ids with user id:
const getUserProjectsIds = async (req,res) => {
    try {
        let {id_user} = req.decoded.data;
        let data = await projects.getAllProjectsIds(id_user);
        if (!data[0]){
            console.log("There are no projects");
        } else {
            let projectIdArr = data.map(item => item.project_id);
            console.log("Array of projects ids: ", projectIdArr);
            res.status(200).json({
                "project_ids": projectIdArr,
                "msj": "Projects ids supplied"
            });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

//POSTs
//save project to list (user)
const createProject = async(req,res) => {
    let {id_user} = req.decoded.data;
    let {id_project} = req.body;
    try {
        let savedInfo = await projects.addProject(id_user, id_project);

        res.status(200).json({
            "project created": `user id:${id_user} created a new project with id:${id_project}`,
            "msj": "Project created"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

//PUTs
// Edit project info (user and admin)
const editProjectInfo = async (req,res) => {
    try {
        let {id_user} = req.decoded.data;
        let {projectId, title, specification} = req.body;
        // If a field is not filled, do it with the current value
        if(title == ""){
            title = req.decoded.data.title;
        };
        if (specification == "") {
            specification = req.decoded.data.specification;
        };
        

        // "user_id" goes in "userInfo" to search the user row in the DDBB.
        let editedInfo = await projects.updateProject(id_user, projectId, title, specification);

        res.status(200).json({
            "project_updated": editedInfo,
            "msj": "Project edited successfully"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}; 

//DELETEs
// Delete user's project from DDBB (user)
const deleteProject = async(req, res) => {
    let {id_user} = req.decoded.data;
    let {id_project} = req.body;
    try {
        let deletedInfo = await projects.deleteProject(id_user, id_project);
        console.log(deletedInfo)
        res.status(200).json({
            "deleted project": `user id:${id_user} deleted project with id:${id_project}`,
            "msj": "Project deleted from projects"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};




module.exports = {
    getUserProjectsIds,
    createProject,
    editProjectInfo,
    deleteProject
}