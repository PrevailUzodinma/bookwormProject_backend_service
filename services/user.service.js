const User = require ("../models/user.model.js")
const hashpassword = require ("../config/bcryptConfig.js")

const saveuser = async (email, password, role) => {
    try {
        const hashedpassword = await hashpassword (password);
        const newUser = new User({
            email, 
            password: hashedpassword,  
            role,
        })
        return newUser.save()
    }catch(error){
        console.log("error occured while saving a user", error)
    }
}
const findUserByEmail = async (email) => {
    try {
        const user =await User.findOne (email);
        return user
    }catch(error){
        console.log("error occured while finding a user by email", error)
    }
}

module.exports  = {saveuser, findUserByEmail}