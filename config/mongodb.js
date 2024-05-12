const mongoose = require("mongoose") ;

const connectDb=()=>{
    try{
      mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    }catch(error){
        console.log(error);
        throw  error("Error connecting");
    }
}

export default connectDb;