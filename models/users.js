const pool = require('../utils/db_pgsql');
const usersQueries = require('../queries/users.queries');


// This will be used when "admin" load "users view"
const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(usersQueries.getAllUsers);
        result = data.rows;
        console.log("get all users: ", result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

// get user by id:
const getUserById = async (userId) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(usersQueries.getUserById, [userId]);
        result = data.rows;
        console.log("get user by id: ", result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// get user by email:
const getUserByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(usersQueries.getUserByEmail, [email]);
        result = data.rows;
        console.log("get user by email: ", result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result[0]
}


// Create users when sign in:
const createUser = async(email, hashedPassword, userName, admin, firstName, surname, logged) => {
    let client, result;
    try{
        console.log("info from createUser: ", email, hashedPassword, userName, admin, firstName, surname, logged)
        client = await pool.connect();
        const data = await client.query(usersQueries.createUser,
            [email, hashedPassword, userName, admin, firstName, surname, logged]);
        result = data.rowCount;
        console.log("create user: ", result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

// Update user when someone edit his profile:
const updateUser = async(userId, email, hashedPassword, userName, firstName, surname) => {
    let client, result;
    try{
        client = await pool.connect();
        // Admin field is not here cause the user is not allowed to change it
        const data = await client.query(usersQueries.updateUser,
        [userId, email, hashedPassword, userName, firstName, surname]);
        result = data.rowCount;
        console.log("update user: ", result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

// Update user password
const updateUserPassword = async(email, hashedPassword) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(usersQueries.updateUserPassword,[email, hashedPassword]);
        result = data.rowCount;
        console.log(result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

// Delete user will be done by admin in "users view" and by the user himself:
const deleteUser = async(email) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(usersQueries.deleteUser,[email]);
        result = data.rowCount;
        console.log("delete user: ", result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};


// Change user logged in state:
//To true
const logInUserTrue = async(email) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(usersQueries.loggedTrue, [email]);
        result = data.rows;
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
//To true
const logInUserFalse = async(email) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(usersQueries.loggedFalse, [email]);
        result = data.rows;
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// createUser('admin@gmail.com', 'abc123', 'admin', true, 'john', 'doe');
// createUser('user@gmail.com', 'abc123', 'user', false, 'jane', 'dee');
// getAllUsers()
// getUsersById(6)
// updateUser(6, 'jane@gmail.com', 'abc123', false, 'jane', 'dee');
// deleteUser(4)
console.log("SQL DDBB Conected")



module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    updateUserPassword,
    deleteUser,
    logInUserTrue,
    logInUserFalse
}