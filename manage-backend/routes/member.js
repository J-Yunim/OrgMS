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
      MemberModel.count(function (err, total) {
        if (total) {
          MemberModel.count({ title: "Chair" }, function (err, numChair) {
            if (total) {
              MemberModel.count({ title: "VC" }, function (err, numVC) {
                if (total) {
                  res.send({
                    code: 0,
                    data: { members, total, numChair, numVC },
                  });
                } else {
                  res.send({ code: 1, msg: error });
                }
              });
            } else {
              res.send({ code: 1, msg: error });
            }
          });
        } else {
          res.send({ code: 1, msg: error });
        }
      });
    } else {
      res.send({ code: 1, msg: error });
    }
  });
});

// save member list
router.post("/save", (req, res) => {
  const { name } = req.body;
  MemberModel.findOne({ name }, async (err, user) => {
    if (user) {
      res.send({ code: 1, msg: "Member already existed" });
    } else {
      const user = new MemberModel(req.body);
      user.save((err, user) => {
        if (err) {
          res.send({ msg: "save err", data: req.body });
        } else {
          res.send({ code: 0 });
        }
      });
    }
  });
});

// edit member
router.post("/edit", (req, res) => {
  console.log(req.body);
  const { member, id } = req.body;
  MemberModel.replaceOne({ _id: id }, { ...member }, async (err, user) => {
    if (user) {
      res.send({ code: 0 });
    } else {
      res.send({ code: 1, msg: "Member Not Found" });
    }
  });
});

module.exports = router;
