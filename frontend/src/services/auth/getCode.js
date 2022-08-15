import LOCAL_HOST from "../local.js";

import axios from "axios";

export const signUp = async (address) => {
  const response = await axios(`http://${LOCAL_HOST}:3000/auth/email/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      email: address,
    },
  })
    .then((res) => {
 
    })
    .catch((error) => {
=
    });

  return response;
};
