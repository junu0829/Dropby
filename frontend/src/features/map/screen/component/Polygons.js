import { Polygon } from "react-native-maps";

// api로 polygon 좌표들 받아오기
// 하나하나 그리기.

// 받아진 api 예시.
const APIresponse = {
  data: {
    Polygons: [
      {
        type: "Polygon",
        coordinates: [
          [
            37.586328, // this is longitude
            127.028815, // this is latitude
          ],
          [37.583628, 127.028933],
          [37.583628, 127.029451],
          [37.586328, 127.029361],
        ],
        id: 1,
      },
      {
        type: "Polygon",
        coordinates: [
          [
            122.18919, // this is longitude
            4.82948294, // this is latitude
          ],
          [124.17318, 5.9319319],
          [101.131191, 2.92492],
          [106.01010192, 4.492472492],
        ],
        id: 2,
      },
    ],
  },
};

// const polygon1 = APIresponse.data.Polygons[0].coordinates[0].map((coord) => {
//     const poly = [
//]
// }
// );
// console.log(polygon1);
export const Polygons = () => {
  return (
    <Polygon
      //lat : 위아래, lon : 좌우, 왼쪽 위부터 1번, 반시계 방향으로 돌리기.
      coordinates={[
        { latitude: 37.586328, longitude: 127.028815 },
        { latitude: 37.583628, longitude: 127.028933 },
        { latitude: 37.583634, longitude: 127.029451 },
        { latitude: 37.586328, longitude: 127.029361 },
      ]}
      fillColor={styles.fillColor}
      strokeColor={styles.strokeColor}
      strokeWidth={styles.strokeWidth}
    ></Polygon>
  );
};

const styles = {
  fillColor: "rgba(183, 132, 220, 0.36)",
  strokeColor: "rgba(174, 60, 255, 0.6)",
  strokeWidth: 2,
};
