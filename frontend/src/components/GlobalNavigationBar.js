import React, { useState } from "react";

import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import backButton from "../../assets/Buttons/backButton";

import { SafeArea } from "./utility/safe-area.component";
import EditButton from "../../assets/Buttons/EditButton";
import { TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { Text } from "./typography/text.component";
import { EditModal } from "../features/detail/component/EditModal";

export const GNB = ({ navigation, place = {} }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Container>
      <LinearGradient
        colors={["#7358ff", "#c16eff"]}
        style={{
          height: "100%",
        }}
        end={{ x: 0.99, y: 0.99 }}
        start={{ x: 0.01, y: 0.01 }}
        locations={[0.1, 1.0]}
      >
        <SafeArea>
          <GNBButtonPart>
            <TouchableOpacity
              style={{ marginLeft: 20, marginTop: 8, flex: 1 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <SvgXml xml={backButton} width={26} height={26}></SvgXml>
            </TouchableOpacity>
            <GNBButtonPart2>
              <TouchableOpacity
                style={{ marginRight: 20, marginTop: 8 }}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <SvgXml xml={EditButton} width={26} height={26}></SvgXml>
              </TouchableOpacity>
            </GNBButtonPart2>
          </GNBButtonPart>
          <GNBPlaceName>
            <Text variant="place">{place.name}</Text>
            <Text variant="place">{place.address}</Text>
          </GNBPlaceName>
          <EditModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          ></EditModal>
        </SafeArea>
      </LinearGradient>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 25%;
`;

const GNBButtonPart = styled.View`
  width: 100%;
  flex-direction: row;
`;
const GNBButtonPart2 = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const GNBPlaceName = styled.Text`
  margin-left: 20;
  margin-top: 14;
`;
