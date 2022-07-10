import LOCAL_HOST from "../local.js";
import axios from "axios";
import { Alert } from "react-native";

export const UpdateDrop = async (
  areapk,
  placePk,
  dropPk,
  accessToken,
  content
) => {
  await axios(
    `http://${LOCAL_HOST}:3000/${areapk}/${placePk}/drops/${dropPk}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        content,
      },
    }
  )
    .then((res) => {
      Alert.alert("수정 완료했습니다");
    })
    .catch((e) => console.log(e));
};
