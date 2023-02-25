import axios from "axios";
import { getAuthHeader, cacheTokens, clearTokensCache } from "../utils/authUtils";

const apiUrl = import.meta.env.VITE_API_URL;

export const getDrafts = async () => {
  try {
    const { data, status } = await axios.get(apiUrl + "/draft", { headers: getAuthHeader() });

    cacheTokens(data.tokens.idToken, data.tokens.refreshToken);

    return { data: data.drafts, status };
  } catch (error) {
    clearTokensCache();
    return { data: error.response.data, status: error.response.status };
  }
};

export const postDraft = async (draft) => {
  try {
    const { data, status } = await axios.post(
      `${apiUrl}/draft`,
      {
        content: draft,
      },
      { headers: getAuthHeader() }
    );

    cacheTokens(data.tokens.idToken, data.tokens.refreshToken);

    return { data, status };
  } catch (error) {
    clearTokensCache();
    return { data: error.response.data, status: error.response.status };
  }
};
