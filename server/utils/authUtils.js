const { firebaseUrls } =  require('../firebase');
const axios = require("axios");

const login = async (email, password) => {
    const response = await axios.post(
      firebaseUrls.login,
      { email, password, returnSecureToken: true }
    );
  
    return response.data;
};

const refresh = async (refreshToken) => {
    const response = await axios.post(
      firebaseUrls.refresh,
      { grant_type: 'refresh_token', refresh_token: refreshToken }
    );

    return response.data;
};

module.exports = {
    login,
    refresh
}