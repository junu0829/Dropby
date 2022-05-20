import LOCAL_HOST from "../local.js";
import axios from "axios";

export const postDrop = async (area, placePk, accessToken, content) => {
  await axios(`http://${LOCAL_HOST}:3000/${area}/${placePk}/drops`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      content,
    },
  })
    .then((res) => {
      console.log(`${res.data.data.content} 내용으로 ${res.data.msg}!`);
    })
    .catch((e) => console.log(e));
};
