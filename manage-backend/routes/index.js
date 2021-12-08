const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, TaskModel } = require("../db");
const router = express.Router();

// save tasks
router.post("/savetasks", (req, res) => {
  const userid = req.cookies.userid;
  const { columns } = req.body;
  if (!userid) {
    return res.send({ code: 1, msg: "Login to your account" });
  }
  TaskModel.findOneAndUpdate(
    { userid: userid },
    { columns: columns },
    { new: true },
    (err, task) => {
      if (err) {
        res.send({ code: 1, msg: "Failed to save tasks" });
      } else {
        res.send({ code: 0 });
      }
    }
  );
});
router.post("/saveproject", (req, res) => {
  const userid = req.cookies.userid;
  const { name } = req.body;
  if (!userid) {
    return res.send({ code: 1, msg: "Login to your account" });
  }
  TaskModel.findOneAndUpdate(
    { userid: userid },
    { name: name },
    { new: true },
    (err, task) => {
      if (err) {
        const task = new UserModel({ userid, name, columns: {} });
        task.save((err, task) => {
          if (err) {
            res.send("save task err");
          } else {
            res.send({ code: 0 });
          }
        });
      } else {
        res.send({ code: 0 });
      }
    }
  );
});

// get utasks
router.get("/gettasks", function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({ code: 1, msg: "Login to your account" });
  }
  TaskModel.findOne({ userid: userid }, {}, function (error, task) {
    if (task) {
      res.send({ code: 0, data: task });
    } else {
      res.send({ code: 1, msg: "Failed to load tasks" });
    }
  });
});
