const projectsQueries = {
    addProject:`INSERT INTO projects(
        user_id,
        project_id,
        title,
        specification)
    VALUES ($1, $2, $3, $4)`,
    deleteProject:`DELETE FROM projects
    WHERE user_id=$1 AND project_id=$2`,
    getAllProjectsIDs:`SELECT project_id
    FROM public.projects
    WHERE user_id = $1`,
    updateProject:`
    UPDATE projects
    SET title=$2, 
    specification=$3,
    WHERE project_id=$1;`
}

module.exports = projectsQueries;



   