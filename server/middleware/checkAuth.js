const firebase = require("firebase-admin");
const { refresh } = require("../utils/authUtils");

async function checkAuth(req, res, next) {
  try {
    if (!req.headers?.authorization) {
      return res.status(401).send({ message: "Login required." });
    }

    const splitAuthHeader = req.headers.authorization.split(" ");

    if (splitAuthHeader.length < 3) {
      return res.status(401).send({ message: "Login required." });
    }

    // Get token from auth header
    const idToken = splitAuthHeader[1];
    const refreshToken = splitAuthHeader[2];

    // get decoded information from token
    const decodedToken = await firebase.auth().verifyIdToken(idToken);

    // refresh the tokens
    const newTokens = await refresh(refreshToken);

    // add user info from token to request object for endpoints to access
    req.user = {
      userId: decodedToken.user_id,
      email: decodedToken.email,
      idToken: newTokens.id_token,
      refreshToken: newTokens.refresh_token,
    };

    next();
  } catch (e) {
    console.error(e);
    return res.status(401).send({ message: "Login required." });
  }
}

module.exports = checkAuth;
