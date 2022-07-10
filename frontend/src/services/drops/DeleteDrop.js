import LOCAL_HOST from "../local.js";
import axios from "axios";
import { Alert } from "react-native";

export const DeleteDrop = async (areapk, placePk, dropPk, accessToken) => {
  await axios(
    `http://${LOCAL_HOST}:3000/${areapk}/${placePk}/drops/${dropPk}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((res) => {
      Alert.alert("삭제 완료했습니다");
    })
    .catch((e) => console.log(e));
};
