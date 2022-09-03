import LOCAL_HOST from "../local.js";
import axios from "axios";

export const checkTokenAvailable = async (
  accessToken,
  refreshToken,
  naviMapFunc
) => {
  console.log(`accessToken : Bearer ${accessToken}`);
  console.log(`refreshToken : Bearer ${refreshToken}`);

  const response = await axios(`http://${LOCAL_HOST}:3000/auth/token/refresh`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${refreshToken}`,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error.status);
    });
  return response;
};

// if (res.data.tokens == null) {
// } else {
//   console.log(res.data.message);
//   const accessToken = res.data.data.tokens.access;
//   const refreshToken = res.data.data.tokens.refresh;
//   user.setItemToAsync("accessToken", accessToken);
//   user.setItemToAsync("refreshToken", refreshToken);
//   naviMapFunc();
// }
