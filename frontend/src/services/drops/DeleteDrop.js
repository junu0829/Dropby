import LOCAL_HOST from "../local.js";
import axios from "axios";
import { Alert } from "react-native";
import { user } from "../user.js";

export const DeleteDrop = async (areapk, placePk, dropPk) => {
  await axios(
    `http://${LOCAL_HOST}:3000/${areapk}/${placePk}/drops/${dropPk}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY1NzUxODYzOSwiZXhwIjoxNjYwMTEwNjM5fQ.X2q6YnNQGgq85xdCAP7zodcGMG26h3uT2v3oglmAadM`,
      },
    }
  )
    .then((res) => {
      Alert.alert("삭제 완료했습니다");
    })
    .catch((e) => console.log(e));
};
