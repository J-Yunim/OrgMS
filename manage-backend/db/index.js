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

const MemberSchema = mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  email: { type: String, required: true },
});
const MemberModel = mongoose.model("member", MemberSchema);

exports.UserModel = UserModel;
exports.TaskModel = TaskModel;
exports.MemberModel = MemberModel;
