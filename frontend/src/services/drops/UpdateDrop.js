import LOCAL_HOST from "../local.js";
import axios from "axios";
import { Alert } from "react-native";

export const UpdateDrop = async (areapk, placePk, dropPk, frm) => {
  // await axios(
  //   `http://${LOCAL_HOST}:3000/${areapk}/${placePk}/drops/${dropPk}`,
  //   {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY2MDIzNTI1MiwiZXhwIjoxNjYyODI3MjUyfQ.grypUueNcNkbFevK6UcU8I-y5xyJLuww1d1oZ9yBMy4`,
  //     },
  //     data: {
  //       frm,
  //     },
  //   }
  // )
  //   .then((res) => {
  //     Alert.alert("수정 완료했습니다");
  //   })
  //   .catch((e) => console.log(e));

  fetch(`http://${LOCAL_HOST}:3000/${areapk}/${placePk}/drops/${dropPk}`, {
    method: "PUT",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY2MDIzNTI1MiwiZXhwIjoxNjYyODI3MjUyfQ.grypUueNcNkbFevK6UcU8I-y5xyJLuww1d1oZ9yBMy4",
    },
    body: frm,
  })
    .then(() => {
      Alert.alert("수정 완료했습니다");
    })
    .catch((e) => console.log(e));
};
