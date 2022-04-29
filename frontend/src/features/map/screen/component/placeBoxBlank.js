import React from "react";

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

export const PlaceBoxBlank = (
  setWriteMode,
  setPressedLocation,
  location,
  map,
  LATITUDE_DELTA,
  LONGITUDE_DELTA
) => {
  return (
    <Container>
      <WriteButton
        style={{ opacity: 0.95 }}
        onPress={() => {
          setWriteMode(true);
          setPressedLocation({
            latitude: location[0],
            longitude: location[1],
          });
        }}
      >
        <SvgXml xml={write} width={56} height={65} />
      </WriteButton>

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
