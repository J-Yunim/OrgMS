const mongoose = require("mongoose");
// build schema
const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const UserModel = mongoose.model("user", UserSchema);

exports.UserModel = UserModel;
