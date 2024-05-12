const User = require ("../models/user.model.js")
const bcrypt = require ("bcrypt")

const createUser = async (email, password) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedpassword = await bcrypt.hash(password, salt);
        const newUser = new User.create({
            email, 
            password: hashedpassword 
            //role,
        })
        return newUser;
    }catch(error){
        console.log("error occured while creating user", error)
    }
}

const findUserByEmail = async (userEmail) => {
    try {
        const user = await User.findOne({email: userEmail});
        return user
    }catch(error){
        console.log("error occured while finding a user by email", error)

    }
}

module.exports  = {createUser, findUserByEmail}