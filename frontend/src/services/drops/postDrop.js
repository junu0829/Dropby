import LOCAL_HOST from "../local.js";
import axios from "axios";
import { user } from "../user.js";

export const postDrop = async (area, placePk, frm) => {
  user.getItemFromAsync();
  // await axios(`http://${LOCAL_HOST}:3000/${area}/${placePk}/drops`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY1Njk0MjA3MiwiZXhwIjoxNjU2OTQ1NjcyfQ.BXbTHVYjAASZCJDFttTL8EilgYJJgWRT3Wrx41DIPZc",
  //   },
  //   data: frm,
  // })
  //   .then((res) => {
  //     console.log(`${res.data.data.content} 내용으로 ${res.data.msg}!`);
  //   })
  //   .catch((e) => console.log(e));
  fetch(`http://${LOCAL_HOST}:3000/areas/${area}/places/${placePk}/drops`, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY1NzUxODYzOSwiZXhwIjoxNjYwMTEwNjM5fQ.X2q6YnNQGgq85xdCAP7zodcGMG26h3uT2v3oglmAadM",
    },
    body: frm,
  })
    .then((response) => response.json())
    .then((response) =>
      console.log(`${response.data.content} 내용으로 ${response.msg}!`)
    );
};
