var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fileSchema = new Schema({
    size: {
        type: Number,
        required: false
    },
});

const File = mongoose.model("file",fileSchema);
module.exports = File;