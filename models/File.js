const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
  },

  tag: {
    type: String,
  },

  email: {
    type: String,
  },
});

const File = mongoose.model("file", fileSchema);

module.exports = File;
