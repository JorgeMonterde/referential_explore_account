const artworksQueries = {
    addArtworkToProject:`INSERT INTO artworks(
        project_id,
        artwork_id,
        artwork_mongo_id)
    VALUES ($1, $2, $3)`,
    deleteArtworkFromProject:`DELETE FROM artworks
    WHERE project_id=$1 AND artwork_id=$2`,
    getAllArtworksIDsFromProject:`SELECT artwork_id,
        artwork_mongo_id
    FROM public.artworks
    WHERE project_id = $1`,
    getAllArtworksFromUser:`SELECT user_id,
        project_id,
        artwork_id,
        artwork_mongo_id
    FROM public.users
    INNER JOIN public.projects
    ON public.users.user_id = public.projects.user_id
    INNER JOIN public.artworks
    ON public.projects.project_id = public.artworks.project_id
    WHERE user_id = $1`
}

module.exports = artworksQueries;

