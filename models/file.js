var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fileSchema = new Schema({
    url:{
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: false
    },
});

const File = mongoose.model("file",fileSchema);
module.exports = File;