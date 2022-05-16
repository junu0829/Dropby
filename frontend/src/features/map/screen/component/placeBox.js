import {
  PlaceContainer,
  styles,
  PlaceNameContainer,
  PlaceContainer2,
  PlaceContainer3,
  SelectButtonContainer,
  BackButtonContainer,
  PlaceNameContainer2,
  ContainerEnd2,
} from "../map.screen.styles";

import React from "react";

import { View, TouchableOpacity } from "react-native";

import { SvgXml } from "react-native-svg";

//Components

import { Text } from "../../../../components/typography/text.component";

//assets
import Drops from "../../../../../assets/images/Drops";

import selectButton from "../../../../../assets/Buttons/selectButton";
import backButton2 from "../../../../../assets/Buttons/backButton2";
import PlacePlusIcon from "../../../../../assets/Buttons/PlacePlusIcon";

export const PlaceBox = ({
  navigation,
  selectedPlace = {},

  selectedPlaceName = {},
  activePolygon = {},
}) => {
  return (
    <PlaceContainer>
      <TouchableOpacity
        onPress={(item) => {
          navigation.navigate("PlaceFeedScreen");
        }}
      >
        <Text>게시판보기</Text>
      </TouchableOpacity>
      <View
        style={{
          bottom: 70,
          width: 50,
          height: 50,
          marginLeft: 5,
          Index: 5,
        }}
      ></View>

      <PlaceContainer2>
        <PlaceNameContainer>
          {
            <PlaceNameContainer2>
              <Text style={styles.placename}>{selectedPlaceName}</Text>
            </PlaceNameContainer2>
          }

          <Text style={styles.placeaddress}>주소</Text>
        </PlaceNameContainer>

        <ContainerEnd2>
          <TouchableOpacity style={styles.Drops}>
            <SvgXml xml={Drops} width={22} height={30} />
          </TouchableOpacity>
          <Text style={styles.drop}>0개 </Text>
        </ContainerEnd2>
      </PlaceContainer2>

      <PlaceContainer3>
        <SelectButtonContainer
          onPress={() => {
            navigation.navigate("WriteScreen", {
              selectedPlace,
              selectedPlaceName,
              activePolygon,
            });
          }}
        >
          <SvgXml xml={selectButton} width={170} height={32} />
        </SelectButtonContainer>
      </PlaceContainer3>
    </PlaceContainer>
  );
};
