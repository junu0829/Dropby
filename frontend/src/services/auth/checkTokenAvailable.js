import LOCAL_HOST from "../local.js";
import axios from "axios";
import { user } from "../user.js";

export const checkTokenAvailable = async (
  accessToken,
  refreshToken,
  naviMapFunc,
  setIsLoading
) => {
  const response = await axios(`http://${LOCAL_HOST}:3000/auth/token/refresh`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${refreshToken}`,
    },
  })
    .then((res) => {
      if (res.data.status != "No token valid. Re-login required.") {
        const accessToken = res.data.tokens.access;
        const refreshToken = res.data.tokens.refresh;
        user.setItemToAsync("accessToken", accessToken);
        user.setItemToAsync("refreshToken", refreshToken);
        naviMapFunc();
      } else {
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
