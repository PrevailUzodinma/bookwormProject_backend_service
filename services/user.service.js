const User = require ("../models/user.model.js")
const bcrypt = require ("bcrypt")

const createUser = async (email, password) => {
    try {
        const hashedpassword = await  bcrypt.hash(password, 10);
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

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email});
        return user
    }catch(error){
        console.log("error occured while finding a user by email", error)
    }
}

module.exports  = {createUser, findUserByEmail}