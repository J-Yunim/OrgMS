const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, TaskModel } = require("../db");

const router = express.Router();

const filter = { password: 0, __v: 0 }; // 指定过滤的属性

router.get("/", (req, res) => {
  res.status(200).send("YEEEEES!!!!!!");
});

// register
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username }, async (err, user) => {
    if (user) {
      res.send({ code: 1, msg: "Username already existed" });
    } else {
      const user = new UserModel({ username, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user.save((err, user) => {
        if (err) {
          res.send("save err");
        } else {
          res.cookie("userid", user._id, { maxAge: 1000 * 3600 * 24 });
          const data = { username, _id: user._id };
          res.send({ code: 0, data });
        }
      });
    }
  });
});

// login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username }, async (err, user) => {
    if (user && bcrypt.compare(password, user.password)) {
      res.cookie("userid", user._id, { maxAge: 1000 * 3600 * 24 });
      const data = { username, _id: user._id };
      res.send({ code: 0, data });
    } else {
      res.send({ code: 1, msg: "Invalid username/password" });
    }
  });
});

module.exports = router;

// get user info
router.get("/user", function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({ code: 1, msg: "Login to your account" });
  }
  UserModel.findOne({ _id: userid }, filter, function (error, user) {
    if (user) {
      res.send({ code: 0, data: user });
    } else {
      res.clearCookie("userid");
      res.send({ code: 1, msg: "Login to your account" });
    }
  });
});

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
