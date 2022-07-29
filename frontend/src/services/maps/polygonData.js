import LOCAL_HOST from "../local.js";
import axios from "axios";

// api로 polygon 좌표들 받아오기
// 하나하나 그리기.
//lat : 위아래, lon : 좌우, 왼쪽 위부터 1번, 반시계 방향으로 돌리기.
// 받아진 api 예시.

export const getPolygonData = async (setAreaData) => {
  await axios(`http://${LOCAL_HOST}:3000/areas/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      const polygonNum = res.data.data.length;
      for (i = 0; i < polygonNum; i++) {
        const polygonCoord = [];
        // if (i == polygonNum - 1 || i == polygonNum - 2) {
        //   res.data.data[i].polygon.coordinates[0].map((coord) => {
        //     polygonCoord.push({ latitude: coord[1], longitude: coord[0] });
        //   });
        //   res.data.data[i].polygon.coordinates = polygonCoord;
        // } else {
        res.data.data[i].polygon.coordinates[0].map((coord) => {
          polygonCoord.push({ latitude: coord[0], longitude: coord[1] });
        });
        res.data.data[i].polygon.coordinates = polygonCoord;
        // }
      }
      setAreaData(res.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
