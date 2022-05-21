import React, { useState } from "react";

import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import backButton from "../../assets/Buttons/backButton";

import { SafeArea } from "./utility/safe-area.component";
import EditButton from "../../assets/Buttons/EditButton";
import { StyleSheet, TouchableOpacity, ViewPropTypes } from "react-native";
import { SvgXml } from "react-native-svg";
import { Text } from "./typography/text.component";
import { EditModal } from "../features/detail/component/EditModal";
import { theme } from "../infrastructure/theme";

export const GNB = ({ navigation, goBack, secondButton, title, subTitle }) => {
  //GNB 우측 메뉴. 스크린에 따라서 메뉴, +, 전송 버튼으로 나뉜다.
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Container>
      <LinearGradient
        colors={["#7358ff", "#c16eff"]}
        style={{
          height: "25%",
        }}
        start={{ x: 0.01, y: 0.01 }}
        end={{ x: 0.99, y: 0.99 }}
        locations={[0.1, 1.0]}
      >
        <SafeArea>
          <GNBButtonPart>
            {goBack === null ? null : (
              <TouchableOpacity
                style={{ marginLeft: 20, marginTop: 8, flex: 1 }}
                onPress={() => {
                  goBack();
                }}
              >
                <SvgXml xml={backButton} width={26} height={26}></SvgXml>
              </TouchableOpacity>
            )}
            {/* GNB 우측 메뉴 이 부분이 스크린에 따라 바뀌어야 함. */}
            <GNBButtonPart2>
              {secondButton === null ? null : (
                <TouchableOpacity
                  style={{ marginRight: 20, marginTop: 8 }}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <SvgXml xml={EditButton} width={26} height={26}></SvgXml>
                </TouchableOpacity>
              )}
            </GNBButtonPart2>
          </GNBButtonPart>
          {/* 여기 띄워야 하는 내용도 스크린에 따라서 많이 바뀐다. props로 넘겨야 할 듯. */}
          <GNBPlaceName>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
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
  height: 100%;
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

const GNBPlaceName = styled.View`
  margin-left: 20;
  margin-top: 8;
`;
const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSizes.title,
    color: "white",
  },
  subTitle: {
    fontSize: theme.fontSizes.caption,
    color: "white",
  },
});
