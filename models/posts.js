const { Schema, model } = require("mongoose");

const PostSchema = Schema({
  img: { type: Object },
  title: { type: String },
  desc: { type: String },
  date: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  state: {
    type: Boolean,
    default: true,
  },
});

PostSchema.methods.toJSON = function () {
  const { __v, _id, ...post } = this.toObject();
  post.uid = _id;
  return post;
};

module.exports = model("Post", PostSchema);
