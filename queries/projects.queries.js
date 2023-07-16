const projectsQueries = {
    addProject:`INSERT INTO projects(
        user_id,
        title,
        specification)
    VALUES ($1, $2, $3)`,
    deleteProject:`DELETE FROM projects
    WHERE project_id=$1`,
    getAllProjects:`SELECT project_id,
    title,
    specification
    FROM public.projects
    WHERE user_id = $1`,
    updateProject:`
    UPDATE projects
    SET title=$2, 
    specification=$3,
    WHERE project_id=$1;`
}

module.exports = projectsQueries;



