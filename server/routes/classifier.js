const express = require("express");
const router = express.Router();
const cohere = require("cohere-ai");
const examples = require("../data/examples.json");
cohere.init("pjFc7Ok7EfAykYNWQDwj2j7tDk5WPjk7UVMunS4f");

const { db } = require("../firebase");

router.post("/", async function (req, res) {
  try {
    // Get email draft
    let email = req.body.content.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g);
    email = email.filter(String);

    // get classification from cohere
    const response = await cohere.classify({
      model: "large",
      inputs: email,
      examples: examples,
    });

    // compute neutrality score
    var neutral_score = 0;
    arr = response.body.classifications;
    for (let i = 0; i < arr.length; i += 1) {
      neutral_score += arr[i].labels.neutral.confidence;
    }
    var neutral_average = neutral_score / arr.length;

    // save data in data base
    await db.collection("drafts").doc().set({
      classifications: response.body.classifications,
      score: neutral_average,
      userId: req.user.userId,
    });

    // send response
    res.status(200).send({
      classifications: response.body.classifications,
      score: neutral_average,
      tokens: {
        idToken: req.user.idToken,
        refreshToken: req.user.refreshToken,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message:
        "Something unexpected happened in the classification process. Please try again.",
    });
  }
});

router.get("/", async function (req, res) {
  try {
    // get drafts by user from database
    const snapshot = await db
      .collection("drafts")
      .where("userId", "==", req.user.userId)
      .get();
    let drafts = [];
    snapshot.forEach((doc) => {
      drafts.push(doc.data());
    });
    res.status(200).send({
      drafts,
      tokens: {
        idToken: req.user.idToken,
        refreshToken: req.user.refreshToken,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Unable to fetch drafts! Please try again later.",
    });
  }
});
module.exports = router;
