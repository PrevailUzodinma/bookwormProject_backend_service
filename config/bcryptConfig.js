const bcrypt =require("bcryptjs")
const User = require("../models/user.model.js")

const hashpassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)
        return hashedpassword
    }catch(error){
        console.log ("error while harshing password" , error)
    }
    
}
const comparepassword = async (email, password) => {
    try {
        const user = await User.findOne({email})
        const match = await bcrypt.compare(password, user.password)
        return match
    }catch(error){
        console.log ("error occured while comparing password", error)
    }
}

module.exports = { comparepassword, hashpassword}