import LOCAL_HOST from "../local.js";
import axios from "axios";

export const postLike = async (areaPk, placePk, dropPk, setIsLiked) => {
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${areaPk}/places/${placePk}/drops/${dropPk}/like`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY2MDIzNTI1MiwiZXhwIjoxNjYyODI3MjUyfQ.grypUueNcNkbFevK6UcU8I-y5xyJLuww1d1oZ9yBMy4",
      },
      data: {},
    }
  )
    .then((res) => {
      console.log(res.data.msg);
    })
    .catch((e) => console.log(e));
};
