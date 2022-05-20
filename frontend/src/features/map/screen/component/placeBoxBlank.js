import React from "react";
import LOCAL_HOST from "../../../../services/local";
import axios from "axios";

import { SvgXml } from "react-native-svg";

import {
  SearchContainer,
  Container,
  PlaceContainer,
  ContainerEnd,
  WriteButton,
  CurrentLocationButton,
} from "../map.screen.styles";

//assets

import write from "../../../../../assets/Buttons/write";
import currentLocation from "../../../../../assets/Buttons/currentLocation";

// {
//   latitude: 37.58441910526165,
//   longitude: 127.02587004750966,
// },
// {
//   latitude: 37.58412524996814,
//   longitude: 127.02602628618477,
// },
// {
//   latitude: 37.58473899704727,
//   longitude: 127.02733956277372,
// },
// {
//   latitude: 37.584999373067255,
//   longitude: 127.0271135866642,
// },

const data = {
  name: "과도1",
  pk: 5,
  polygon: {
    coordinates: [
      [37.58441910526165, 127.02587004750966],
      [37.58412524996814, 127.02602628618477],
      [37.58473899704727, 127.02733956277372],
      [37.584999373067255, 127.0271135866642],
      [37.58441910526165, 127.02587004750966],
    ],
    type: "Polygon",
  },
};

export const PlaceBoxBlank = (
  setWriteMode,
  setPressedLocation,
  location = {},
  map,
  LATITUDE_DELTA = {},
  LONGITUDE_DELTA = {}
) => {
  return (
    <Container>
      <ContainerEnd>
        <CurrentLocationButton
          style={{ opacity: 0.95 }}
          onPress={() => {
            map.current.animateToRegion({
              // 현재위치 버튼
              latitude: location[0],
              longitude: location[1],
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            });
            setPressedLocation({
              latitude: location[0],
              longitude: location[1],
            });
          }}
        >
          <SvgXml xml={currentLocation} width={50} height={50} />
        </CurrentLocationButton>
      </ContainerEnd>
    </Container>
  );
};
