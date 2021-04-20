const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");

// signup
router.post("/signup", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "username exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "user created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch();
});

// login
router.post("/login", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: " Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id,
              role: user[0].role,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth sucessful",
            token: token,
          });
        }

        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//get users count
router.get("/count", (req, res, next) => {
  User.find()
    .select("email")
    .exec()
    .then((docs) => {
      var c = docs.length;
      res.status(200).json({
        count: c,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//get all users
router.get("/", checkAuth, (req, res, next) => {
  const { role } = req.userData;
  if (role === "admin") {
    User.find()
      .select("_id email username role")
      .exec()
      .then((docs) => {
        res.status(200).json({
          count: docs.length,
          users: docs.map((doc) => {
            return {
              id: doc._id,
              username: doc.username,
              email: doc.email,
              role: doc.role,
            };
          }),
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    res.status(405).json({
      message: "not authorized",
    });
  }
});

// delete user
router.delete("/:userId", checkAuth, (req, res, next) => {
  const { role } = req.userData;
  if (role === "admin") {
    const id = req.params.userId;
    User.deleteOne({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "user deleted",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    res.status(405).json({
      message: "not authorized",
    });
  }
});

module.exports = router;
