import LOCAL_HOST from "../local.js";
import axios from "axios";

// api로 polygon 좌표들 받아오기
// 하나하나 그리기.
//lat : 위아래, lon : 좌우, 왼쪽 위부터 1번, 반시계 방향으로 돌리기.
// 받아진 api 예시.

export const polygonDatatest = async (setData) => {
  await axios(`http://${LOCAL_HOST}:3000/`, {
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
        res.data.data[i].polygon.coordinates[0].map((coord) => {
          polygonCoord.push({ latitude: coord[0], longitude: coord[1] });
        });
        res.data.data[i].polygon.coordinates = polygonCoord;
      }
      setData(res.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Api의 polygon coordinate 데이터 변환, type을 맞추기.
export const polygonData = {
  data: {
    polygonNum: 2,
    polygons: [
      {
        type: "Polygon",
        coordinates: [
          [
            37.586328, // this is latitude
            127.028815, // this is longitude
          ],
          [37.583628, 127.028933],
          [37.583628, 127.029451],
          [37.586328, 127.029361],
        ],
        id: 1,
        name: "좌참살",
        emoji: "이모티콘",
        centerCorrdinates: [37.585069, 127.029191],
      },
      {
        type: "Polygon",
        coordinates: [
          [37.586328, 127.029361],
          [37.583628, 127.029451],
          [37.583628, 127.029951],

          [37.584828, 127.030251],

          [37.586328, 127.029851],
        ],
        id: 2,
        name: "우참살",
        emoji: "이모티콘",
        centerCorrdinates: [37.585069, 127.029691],
      },
    ],
  },
};

// Api의 polygon coordinate 데이터 변환, type을 맞추기.

const polygonNum = polygonData.data.polygons.length;
for (i = 0; i < polygonNum; i++) {
  const polygonCoord = [];
  polygonData.data.polygons[i].coordinates.map((coord) => {
    polygonCoord.push({ latitude: coord[0], longitude: coord[1] });
  });
  polygonData.data.polygons[i].coordinates = polygonCoord;
}
