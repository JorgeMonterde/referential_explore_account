const users = require("../models/users");


//GETs
//get user's info:
const getUserInfo = async (req,res) => {
    try {
        let {email} = req.decoded.data;
        let data = await users.getUserByEmail(email);
        res.status(200).json({
            "data": data,
            "msj": "User info supplied"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

//POSTs
//create user
const createUser = async (req,res) => {
    let {email, password, user_name, admin, firstname, surename} = req.body; // {email, password, user_name, admin, firstname, surename}
    try {
        // "user_id" is automatically added by SQL DDBB
        let logged = false;
        let createInfo = await users.createUser(email, password, user_name, admin, firstname, surename, logged);
        
        res.status(200).redirect("/login"); //It would be great to redirect to "/login" but it doesnt work
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

//PUTs
// Edit user profile (user and admin)
const editUserProfile = async (req,res) => {
    try {
        let {id_user} = req.decoded.data;
        let {email, password, userName, firstName, sureName} = req.body;
        // If a field is not filled, do it with the current value
        if(email == ""){
            email = req.decoded.data.email;
        };
        if (password == "") {
            password = req.decoded.data.password;
        };
        if (userName == "") {
            userName = req.decoded.data.user_name;
        };
        if (firstName == "") {
            firstName = req.decoded.data.firstname;
        };
        if (sureName == "") {
            sureName = req.decoded.data.surename;
        };

        // "user_id" goes in "userInfo" to search the user row in the DDBB.
        let editedInfo = await users.updateUser(id_user, email, password, userName, firstName, sureName);

        res.status(200).json({
            "items_updated": editedInfo,
            "msj": "Items edited successfully"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}; 

//DELETEs
// Delete a user from DDBB (admin)
const deleteUser = async (req,res) => {
    let {id_user} = req.body; // delete by user by id
    try {
        let deleteInfo = await users.deleteUser(id_user);

        res.status(200).json({
            "user deleted": deleteInfo,
            "msj": "User deleted successfully"
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