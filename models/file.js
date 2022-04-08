var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename: {
    type: String,
    required: [true, "file must have a name"],
  },
});

const File = mongoose.model("file", fileSchema);
module.exports = File;
