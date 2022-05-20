import LOCAL_HOST from "../local.js";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = async (email, password) => {
  const response = await axios(`http://${LOCAL_HOST}:3000/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      email,
      password,
    },
  })
    .then((res) => {
      const accessToken = res.data.data.tokens.access;
      const refreshToken = res.data.data.tokens.refresh;
      const nickname = res.data.data.userData.nickname;
      AsyncStorage.setItem("accessToken", accessToken);
      AsyncStorage.setItem("refreshToken", refreshToken);
      AsyncStorage.setItem("nickname", nickname);
      console.log("tokens saved in asyncstorage");
    })
    .catch((error) => {
      console.log(error.message);
    });

  return response;
};

export const signUp = async (nickname, email, password) => {
  const response = await axios(`http://${LOCAL_HOST}:3000/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      nickname,
      email,
      password,
    },
  })
    .then((res) => {
      console.log(res.data.data);
      const accessToken = res.data.data.tokens.access;
      const refreshToken = res.data.data.tokens.refresh;
      const nickname = res.data.data.userData.nickname;
      AsyncStorage.setItem("accessToken", accessToken);
      AsyncStorage.setItem("refreshToken", refreshToken);
      AsyncStorage.setItem("nickname", nickname);

      console.log("tokens saved in asyncstorage");
    })
    .catch((error) => {
      alert("회원가입 오류입니다");
      console.log(error.message);
    });

  return response;
};
