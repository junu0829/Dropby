import axios from "axios";
import LOCAL_HOST from "../local.js";

export const likeDrop = async (areaPk, placePk, dropPk) => {
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${areaPk}/places/${placePk}/drops/${dropPk}/like`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY2MDIzNTI1MiwiZXhwIjoxNjYyODI3MjUyfQ.grypUueNcNkbFevK6UcU8I-y5xyJLuww1d1oZ9yBMy4",
      },
    }
  )
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => console.log(e));
};
