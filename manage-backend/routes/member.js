const express = require("express");
const { MemberModel } = require("../db");

const router = express.Router();

// get member list
router.get("/get", function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({ code: 1, msg: "Login to your account" });
  }
  MemberModel.find({}, {}, function (error, members) {
    if (members) {
      res.send({ code: 0, data: members });
    } else {
      res.send({ code: 1, msg: error });
    }
  });
});

// save member list
router.post("/save", (req, res) => {
  const { body } = req;
  const { name } = req.body;
  MemberModel.findOne({ name }, async (err, user) => {
    if (user) {
      res.send({ code: 1, msg: "Member already existed" });
    } else {
      const user = new MemberModel(body);
      user.save((err, user) => {
        if (err) {
          res.send({ msg: "save err", data: body });
        } else {
          res.send({ code: 0 });
        }
      });
    }
  });
});

module.exports = router;
