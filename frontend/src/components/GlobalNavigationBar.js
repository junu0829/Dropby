import React, { useState } from "react";

import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import backButton from "../../assets/Buttons/backButton";

import { SafeArea } from "./utility/safe-area.component";
import EditButton from "../../assets/Buttons/EditButton";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { Text } from "./typography/text.component";
import { EditModal } from "../features/detail/component/EditModal";
import { theme } from "../infrastructure/theme";
import logo_main from "../../assets/Global/logo_main";
import btn_my from "../../assets/Buttons/btn_my";

export const GNB = ({
  navigation,
  goBack,
  title,
  subTitle,
  secondButton,
  showModal,
  modalVisible,
}) => {
  //GNB 우측 메뉴. 스크린에 따라서 메뉴, +, 전송 버튼으로 나뉜다.

  const titleDefault = goBack ? title.substr(title.length - 10, 10) : null;
  const titleFormer = goBack ? title.substring(0, title.length - 10) : null;
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
            {goBack ? (
              <TouchableOpacity
                style={{ marginLeft: 20, marginTop: 15, flex: 1 }}
                onPress={() => {
                  goBack();
                }}
              >
                <SvgXml xml={backButton} width={26} height={26}></SvgXml>
              </TouchableOpacity>
            ) : (
              <SvgXml
                xml={logo_main}
                width={125}
                height={34}
                style={{ marginLeft: 20, marginTop: 20, flex: 1 }}
              ></SvgXml>
            )}

            {/* GNB 우측 메뉴 이 부분이 스크린에 따라 바뀌어야 함. */}
            <GNBButtonPart2>
              {secondButton != null ? (
                <TouchableOpacity
                  style={{ marginRight: 20, marginTop: 8 }}
                  onPress={() => {
                    showModal();
                  }}
                >
                  <SvgXml xml={EditButton} width={26} height={26}></SvgXml>
                </TouchableOpacity>
              ) : !goBack ? (
                <TouchableOpacity
                  style={{ marginRight: 20, marginTop: 22 }}
                  onPress={() => {}}
                >
                  <SvgXml xml={btn_my} width={30} height={30}></SvgXml>
                </TouchableOpacity>
              ) : null}
            </GNBButtonPart2>
          </GNBButtonPart>
          {/* 여기 띄워야 하는 내용도 스크린에 따라서 많이 바뀐다. props로 넘겨야 할 듯. */}

          <GNBPlaceName>
            {goBack ? (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.titleYellow}>{titleFormer}</Text>
                <Text style={styles.title}>{titleDefault}</Text>
              </View>
            ) : null}
            <Text style={styles.subTitle}>{subTitle}</Text>
          </GNBPlaceName>
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
    fontSize: 17,
    color: "white",
    marginTop: 14,
  },
  titleYellow: {
    fontSize: 17,
    color: "#ffc34a",
    marginTop: 14,
  },
  subTitle: {
    fontSize: theme.fontSizes.caption,
    color: "white",
  },
});
