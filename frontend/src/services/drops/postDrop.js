import LOCAL_HOST from "../local.js";
import axios from "axios";
import { user } from "../user.js";

export const postDrop = async (area, placePk, content) => {
  user.getItemFromAsync();
  await axios(`http://${LOCAL_HOST}:3000/${area}/${placePk}/drops`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
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
