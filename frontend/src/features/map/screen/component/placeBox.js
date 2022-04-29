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

export const PlaceBox = (
  setWriteMode,
  pressedAddressName,
  pressedAddress,
  navigation,
  pressedLocation
) => {
  return (
    <PlaceContainer>
      <View
        style={{
          bottom: 70,
          width: 50,
          height: 50,
          marginLeft: 5,
          Index: 5,
        }}
      >
        {
          <TouchableOpacity onPress={() => {}}>
            <SvgXml xml={PlacePlusIcon} width={40} height={40} />
          </TouchableOpacity>
        }
      </View>
      <PlaceContainer2>
        <BackButtonContainer
          onPress={() => {
            setWriteMode(false);
          }}
        >
          <SvgXml xml={backButton2} width={50} height={50} />
        </BackButtonContainer>
        <PlaceNameContainer>
          {
            <PlaceNameContainer2>
              <Text style={styles.placename}>{pressedAddressName}</Text>
            </PlaceNameContainer2>
          }

          <Text style={styles.placeaddress}>{pressedAddress}</Text>
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
            navigation.navigate("WriteScreen", [
              { pressedAddress },
              { pressedAddressName },
              { pressedLocation },
            ]);
          }}
        >
          <SvgXml xml={selectButton} width={170} height={32} />
        </SelectButtonContainer>
      </PlaceContainer3>
    </PlaceContainer>
  );
};
