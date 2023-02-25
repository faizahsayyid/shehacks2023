const express = require("express");
const router = express.Router();
const firebase = require("firebase-admin");
const { login } = require('../utils/authUtils')

router.post("/register", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await firebase.auth().createUser({ email, password });

    const { idToken, refreshToken } = await login(email, password);

    res.status(201).send({ idToken, userId: user.uid, refreshToken });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    const { idToken, refreshToken, localId } = await login(email, password);

    res.status(200).send({ idToken, refreshToken, userId: localId });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
