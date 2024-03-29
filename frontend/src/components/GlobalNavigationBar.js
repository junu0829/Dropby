import React, { useState } from "react";

import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import backButton from "../../assets/Buttons/backButton";

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
import btn_add_locate from "../../assets/Buttons/btn_add_locate";
import { ExpandView } from "./animations/expand.animation";
import { FadeInView } from "./animations/fade.animation";
import { user } from "../services/user";

export const GNB = ({
  navigation,
  goBack,
  title,
  subTitle,
  secondButton,
  showModal,
  selectedPlace,
  activePolygon,
  modalVisible,
  mode,
  place,
  dropCount,
}) => {
  //GNB 우측 메뉴. 스크린에 따라서 메뉴, +, 전송 버튼으로 나뉜다.

  const titleDefault = goBack ? title.substr(title.length - 10, 10) : null;
  const titleFormer = goBack ? title.substring(0, title.length - 10) : null;
  return (
    <>
      {mode != "areaFeed" &&
      mode != "placeFeed" &&
      mode != "detailView" &&
      mode != "selectEmoji" ? (
        <GNBButtonPart>
          {goBack ? (
            <TouchableOpacity
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
              style={{ marginTop: 10, flex: 1 }}
            ></SvgXml>
          )}

          {/* GNB 우측 메뉴 이 부분이 스크린에 따라 바뀌어야 함. */}
          <GNBButtonPart2>
            {secondButton != null ? (
              <TouchableOpacity
                style={{ marginRight: 30, marginTop: 8 }}
                onPress={() => {
                  showModal();
                }}
              >
                <SvgXml xml={EditButton} width={26} height={26}></SvgXml>
              </TouchableOpacity>
            ) : !goBack ? (
              // 맵스크린 오른쪽 위 mypage 버튼을 '로그아웃' 버튼으로 임시 설정함. 누르면 Token 초기화.
              <TouchableOpacity
                style={{ marginRight: 40, marginTop: 22 }}
                onPress={() => {
                  user.clearAll();
                }}
              >
                <SvgXml xml={btn_my} width={30} height={30}></SvgXml>
              </TouchableOpacity>
            ) : activePolygon && selectedPlace ? (
              <TouchableOpacity
                style={{ marginRight: 40, marginTop: 8 }}
                onPress={() => {
                  navigation.navigate("WriteScreen", {
                    selectedPlace,
                    activePolygon,
                  });
                }}
              >
                <SvgXml xml={btn_add_locate} width={36} height={36}></SvgXml>
              </TouchableOpacity>
            ) : null}
          </GNBButtonPart2>
        </GNBButtonPart>
      ) : null}
      <Container>
        <LinearGradient
          colors={["#7358ff", "#c16eff"]}
          style={{
            height: "25%",
            top: -30,
            paddingTop: "22%",
            paddingLeft: 5,
          }}
          start={{ x: 0.01, y: 0.01 }}
          end={{ x: 0.99, y: 0.99 }}
          locations={[0.1, 1.0]}
        >
          {/* 여기 띄워야 하는 내용도 스크린에 따라서 많이 바뀐다. props로 넘겨야 할 듯. */}

          <GNBPlaceName>
            {selectedPlace == null && activePolygon != null ? (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.titleYellow}>{titleFormer}</Text>
                <Text style={styles.title}>{titleDefault}</Text>
              </View>
            ) : activePolygon && selectedPlace ? (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.title}>{title}</Text>
              </View>
            ) : mode == "areaFeed" ? (
              <FadeInView duration={2000}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>
                    {title} 구역에 {dropCount}개의 글이 있습니다
                  </Text>
                </View>
              </FadeInView>
            ) : mode == "placeFeed" ? (
              <>
                <FadeInView duration={2000}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.title, { bottom: 10 }]}>{title}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.address, { bottom: 10 }]}>
                      주소입니다
                    </Text>
                  </View>
                </FadeInView>
              </>
            ) : mode == "detailView" ? (
              <>
                <FadeInView duration={2000}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.title, { bottom: 20 }]}>{title}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.address, { bottom: 20 }]}>
                      주소입니다
                    </Text>
                  </View>
                </FadeInView>
              </>
            ) : mode == "selectEmoji" ? (
              <FadeInView duration={2000}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>이모지 선택</Text>
                </View>
              </FadeInView>
            ) : null}

            <Text style={styles.subTitle}>{subTitle}</Text>
          </GNBPlaceName>
        </LinearGradient>
      </Container>
    </>
  );
};

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

const GNBButtonPart = styled.View`
  width: 100%;
  flex-direction: row;
  left: 25;
  top: 50;
  z-index: 999;
  padding: 10px;
  position: absolute;
`;
const GNBButtonPart2 = styled.View`
  flex: 1;
  flex-direction: row;

  justify-content: flex-end;
`;

const GNBPlaceName = styled.View`
  top: 35;
  left: 30;
`;
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "white",
  },
  titleYellow: {
    fontSize: 17,
    color: "#ffc34a",
    // marginTop: 20,
  },
  subTitle: {
    fontSize: theme.fontSizes.caption,
    color: "white",
    marginTop: 15,
  },
  address: {
    fontSize: 13,
    color: "white",
    marginTop: 5,
  },
});
