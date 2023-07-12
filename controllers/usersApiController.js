const users = require("../models/users");


//GETs
//get user's info:
const getUserInfo = async (req,res) => {
    try {
        let {email} = req.decoded.data;
        let data = await users.getUserByEmail(email);
        res.status(200).json({
            "success": true,
            "message": `User info supplied: ${data}`,
            "data": data
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

//POSTs
//create user
const createUser = async (req,res) => {
    let {email, hashed_password, user_name, admin, firstname, surname} = req.body; // {email, password, user_name, admin, firstname, surname}
    try {
        // "user_id" is automatically added by SQL DDBB
        let logged = false;
        let createInfo = await users.createUser(email, hashed_password, user_name, admin, firstname, surname, logged);
        
        res.status(200).json({
            "success": true,
            "message": `User created: ${createInfo}`
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

//PUTs
// Edit user profile (user and admin)
const editUserProfile = async (req,res) => {
    try {
        let {id_user} = req.decoded.data;
        let {email, password, user_name, firstname, surname} = req.body;
        // If a field is not filled, do it with the current value
        if(email == ""){
            email = req.decoded.data.email;
        };
        if (password == "") {
            password = req.decoded.data.password;
        };
        if (user_name == "") {
            user_name = req.decoded.data.user_name;
        };
        if (firstname == "") {
            firstname = req.decoded.data.firstname;
        };
        if (surname == "") {
            surname = req.decoded.data.surname;
        };

        // "user_id" goes in "userInfo" to search the user row in the DDBB.
        let editedInfo = await users.updateUser(id_user, email, password, user_name, firstname, surname);

        res.status(200).json({
            "success": true,
            "message": `User profile updated`,
            "data": editedInfo
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}; 

//DELETEs
// Delete a user from DDBB (admin)
const deleteUser = async (req,res) => {
    let user_id = req.params.id; // delete by user by id
    try {
        let deleteInfo = await users.deleteUser(user_id);

        res.status(200).json({
            "success": true,
            "message": `User deleted`,
            "data": deleteInfo
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};



 
module.exports = {
    getUserInfo,
    createUser,
    editUserProfile,
    deleteUser
}