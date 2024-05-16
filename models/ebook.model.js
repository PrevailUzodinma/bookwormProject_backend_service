const mongoose = require("mongoose");

const ebookSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    categories:{
        type: Array
    },
    author: {
        type: String
      },
      thumbnail: {
        type: String
      },
      url: {
        type: String
      }
})

const eBook = mongoose.model('eBook', ebookSchema);
module.exports = eBook;