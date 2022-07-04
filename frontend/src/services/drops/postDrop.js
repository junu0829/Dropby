import LOCAL_HOST from "../local.js";
import axios from "axios";
import { user } from "../user.js";

export const postDrop = async (area, placePk, frm) => {
  console.log(frm);
  user.getItemFromAsync();
  await axios(`http://${LOCAL_HOST}:3000/${area}/${placePk}/drops`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY1Njg1ODA4MywiZXhwIjoxNjU2ODYxNjgzfQ._BukPlG1U-TJRnXBOXbz7k8J4nSN_cFHayx3NrAU2Sk",
      "Content-Type": "multipart/form-data",
    },

    data: frm,
  })
    .then((res) => {
      console.log(`${res.data.data.content} 내용으로 ${res.data.msg}!`);
    })
    .catch((e) => console.log(e));
};
