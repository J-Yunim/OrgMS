const mongoose = require("mongoose");
// build schema
const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const UserModel = mongoose.model("user", UserSchema);

const TaskSchema = mongoose.Schema({
  userid: { type: String, required: true },
  name: { type: String, required: true },
  columns: { type: Object, require: true },
});
const TaskModel = mongoose.model("task", TaskSchema);

exports.UserModel = UserModel;
exports.TaskModel = TaskModel;
