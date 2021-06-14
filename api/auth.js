const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const isEmail = require("validator/lib/isEmail");

router.post("/", async (req, res) => {
  const { email, password } = req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid email");
  if (password.length < 6)
    return res.status(401).send("Password must be at least 6 characters");
  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const isPassword = bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).send("Invalid credentials");
    }

    const payload = {
      userId: user._id,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(200).json(token);
      }
    );
  } catch (error) {}
});

module.exports = router;
