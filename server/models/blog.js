var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 2000,
      trim: true
    },
    body: {
      type: String,
      maxlength: 100000,
      trim: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    author: {
      type: String,
      maxlength: 32,
      trim: true
    },
    user:{
        type: ObjectId,
        ref: "User"
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Blog", blogSchema);
