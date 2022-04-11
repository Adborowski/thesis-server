var mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "file must have a name"],
  },
  data: {
    type: String,
    required: [true, "file must have data"],
  },
  id: {
    type: String,
    required: [true, "file must have id"],
  },
});

const File = mongoose.model("file", fileSchema, "images");
module.exports = File;
