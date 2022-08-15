import LOCAL_HOST from "../local.js";
import axios from "axios";

// api로 polygon 좌표들 받아오기
// 하나하나 그리기.
//lat : 위아래, lon : 좌우, 왼쪽 위부터 1번, 반시계 방향으로 돌리기.
// 받아진 api 예시.

export const getPlaceData = async (activePolygon, setPlaceList) => {
  await axios(`http://${LOCAL_HOST}:3000/areas/${activePolygon}/places`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      setPlaceList(res.data.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
