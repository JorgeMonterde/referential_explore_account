const usersQueries = {
    getAllUsers:`SELECT 
        user_id, 
        email, 
        hashed_password, 
        user_name, 
        admin, 
        first_name, 
        surname
    FROM public.users;`,
    getUserById:`SELECT 
        user_id, 
        email, 
        hashed_password, 
        user_name, 
        admin, 
        first_name, 
        surname
    FROM public.users
    WHERE user_id = $1`,
    getUserByEmail:`SELECT 
        user_id, 
        email, 
        hashed_password, 
        user_name, 
        admin, 
        first_name, 
        surname,
        logged
    FROM public.users
    WHERE email = $1`,
    createUser:`INSERT INTO users(
        email, 
        hashed_password, 
        user_name, 
        admin, 
        first_name, 
        surname,
        logged)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    updateUser:`
    UPDATE users
    SET email=$2, 
        hashed_password=$3, 
        user_name=$4, 
        first_name=$5, 
        surname=$6
    WHERE user_id=$1;`,
    updateUserPassword:`
    UPDATE users
    SET hashed_password=$2
    WHERE email=$1;`,
    deleteUser:`
    DELETE FROM users
    WHERE user_id=$1;`,
    loggedTrue:`
    UPDATE users
    SET logged = true
    WHERE email=$1;`,
    loggedFalse:`
    UPDATE users
    SET logged = false
    WHERE email=$1;`,
}

module.exports = usersQueries;