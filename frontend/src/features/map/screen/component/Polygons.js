import { useState } from "react";
import { Dimensions } from "react-native";
import { Polygon } from "react-native-maps";

// api로 polygon 좌표들 받아오기
// 하나하나 그리기.

//lat : 위아래, lon : 좌우, 왼쪽 위부터 1번, 반시계 방향으로 돌리기.

// 받아진 api 예시.
const APIresponse = {
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
const polygonNum = APIresponse.data.polygons.length;
for (i = 0; i < polygonNum; i++) {
  const polygonCoord = [];
  APIresponse.data.polygons[i].coordinates.map((coord) => {
    polygonCoord.push({ latitude: coord[0], longitude: coord[1] });
  });
  APIresponse.data.polygons[i].coordinates = polygonCoord;
}
// 여기까지 API 예시부터 데이터를 변환하는 작업. service 폴더로 옮기기

// 임시로 LATITUDE_DELTA, LONGITUDE_DELTA를 사용하기 위해 작성. 다른 파일로 옮길 것.
let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.004; //Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const Polygons = ({ map }) => {
  const [activePolygon, setActivePolygon] = useState(0);

  //polygon 이 클릭되었을 때 해당 폴리곤의 위치로 맵뷰 옮기기
  const onPress = (polygon) => {
    map.current.animateToRegion({
      latitude: polygon.centerCorrdinates[0],
      longitude: polygon.centerCorrdinates[1],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    setActivePolygon(polygon.id);
  };

  return (
    <>
      {APIresponse.data.polygons.map((polygon) => (
        <Polygon
          coordinates={polygon.coordinates}
          fillColor={
            activePolygon == polygon.id
              ? styles.activeFillColor
              : styles.fillColor
          }
          strokeColor={styles.strokeColor}
          strokeWidth={styles.strokeWidth}
          id={polygon.id}
          tappable={true}
          onPress={() => onPress(polygon)}
        ></Polygon>
      ))}
    </>
  );
};

const styles = {
  activeFillColor: "rgba(159, 25, 255, 0.5)",
  fillColor: "rgba(183, 132, 220, 0.4)",
  strokeColor: "rgba(174, 60, 255, 0.6)",
  strokeWidth: 2,
};
