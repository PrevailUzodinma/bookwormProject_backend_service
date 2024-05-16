const mongoose = require("mongoose");
const User = require("./user.model");
const eBook = require("./ebook.model");

const savedebookSchema = new mongoose.Schema({
    ebookId:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ebook:{
        type: eBook.schema,
        ref: 'User',
        required: true,
    }
},     {
    timestamps: true
})

const Savedebook = mongoose.model("Savedebook", savedebookSchema);
module.exports = Savedebook