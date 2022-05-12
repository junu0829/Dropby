import { useEffect, useState } from "react";
import { Polygon } from "react-native-maps";
import { polygonDatatest } from "../../../../services/maps/polygonData";

import { Dimensions } from "react-native";
import { Loading } from "../../../../components/Loading";

// 임시로 LATITUDE_DELTA, LONGITUDE_DELTA를 사용하기 위해 작성. 다른 파일로 옮길 것.
let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.004; //Very high zoom level, 아마 "몇 미터"를 나타내는 것 같다.
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const Polygons = ({
  map,
  activePolygon,
  setActivePolygon,
  activePolygonName,
  setActivePolygonName,
}) => {
  const [areaData, setAreaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    polygonDatatest(setAreaData);
    setIsLoading(false);
    console.log(areaData);
  }, []);
  //polygon 이 클릭되었을 때 해당 폴리곤의 위치로 맵뷰 옮기기
  const onPress = (polygon) => {
    map.current.animateToRegion({
      latitude: polygon.centerCorrdinates[0],
      longitude: polygon.centerCorrdinates[1],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    setActivePolygon(polygon.id);
    setActivePolygonName(polygon.name);
  };

  return isLoading ? (
    <></>
  ) : (
    <>
      {areaData.data.map((polygon) => (
        <Polygon
          coordinates={polygon.polygon.coordinates}
          fillColor={
            activePolygon == polygon.pk
              ? styles.activeFillColor
              : styles.fillColor
          }
          strokeColor={styles.strokeColor}
          strokeWidth={styles.strokeWidth}
          id={polygon.pk}
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
