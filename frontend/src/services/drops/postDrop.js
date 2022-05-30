import LOCAL_HOST from "../local.js";
import axios from "axios";
import { user } from "../user.js";

export const postDrop = async (area, placePk, name, content, selectedEmoji) => {
  user.getItemFromAsync();
  await axios(`http://${LOCAL_HOST}:3000/${area}/${placePk}/drops`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      "Content-Type": "multipart/form-data",
    },

    data: {
      image:
        "https://dropbyimg.s3.ap-northeast-2.amazonaws.com/1653220271350_%EF%BF%BDm%14t%20%EF%BF%BD%EF%BF%BD%20%08%EF%BF%BDpt0.png",
      title: "종합 테스트제목",
      content: "종합 테스트 내용",
      emojiSlug: "neutral_face",
      isPrivate: "true",
    },
  })
    .then((res) => {
      console.log(`${res.data.data.content} 내용으로 ${res.data.msg}!`);
    })
    .catch((e) => console.log(e));
};
