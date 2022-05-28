import React, { useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Pressable,
} from "react-native";
import { theme } from "../../../../infrastructure/theme";
import { SvgXml } from "react-native-svg";
import { TextInput } from "react-native-gesture-handler";
import whiteBackButton from "../../../../../assets/whiteBackButton";

//backButton Resource 통일 필요

import { LoginBg } from "../../Component/LoginBg";
import { LoginButton } from "../../Component/LoginButton";


export const SignIn0203 = ({ navigation, route }) => {
  const inputRef = React.createRef();

  // 화면 오갈때마다 키보드 띄우기

  // 전화번호, 이메일을 구분하는 method state
  const { method, input } = route.params;

  const nextButton = () => {};

  return (
    <>
      <LoginBg>
        {/* 뒤로가기 버튼 */}
        <View style={styles.container1}>
          {/* 뒤로가기 버튼 */}
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ alignSelf: "flex-start", position: "absolute", top: 30 }}
          >
            <SvgXml xml={whiteBackButton} width={50}></SvgXml>
          </TouchableOpacity>
        </View>

        {/* Main 안내 문구 */}
        <View style={styles.container2}>
          <Text style={styles.mainText}>저런</Text>

          <View style={{ height: 30 }}></View>
          {method ? (
            <>
              <Text style={styles.DetailText}>
                전화번호 +82{input}번에 연결되어 있는
              </Text>
              <Text style={styles.DetailText}>계정이 없습니다.</Text>
            </>
          ) : (
            <>
              <Text style={styles.DetailText}>
                이메일주소 {input}에 연결되어 있는
              </Text>
              <Text style={styles.DetailText}>계정이 없습니다.</Text>
            </>
          )}
        </View>

        {/* 유저 입력창 */}
        <View style={styles.container3}>
          <LoginButton
            style={{ marginTop: 60 }}
            value="계정이 없다면? 새로 만들기!"
            onPress={nextButton}
            width={300}
            height={43}
          />
        </View>
        <View style={styles.container4}>
          {/* <CloudBg /> */}
        </View>
      </LoginBg>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1.6,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container3: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container4: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  mainText: {
    color: "white",
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    fontSize: 40,
    justifyContent: "center",
  },

  subMainText: {
    color: "white",
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    fontSize: 20,
    justifyContent: "center",
    marginTop: 10,
  },
  DetailText: {
    color: "white",
    fontFamily: theme.fonts.body,
    fontWeight: "700",
    fontSize: 11,

    marginTop: 2,
  },
  methodButton: {
    padding: 16,
  },
  methodText: {
    color: "white",
    fontFamily: theme.fonts.bold,
    fontSize: 15,
    marginTop: 5,
  },
  inputBox: {
    backgroundColor: theme.colors.bg.white,
    width: 300,
    height: 38,
    opacity: 0.9,
    borderColor: theme.colors.bg.a,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
  },

  input: {
    fontSize: 14,
    left: 32,
    fontFamily: theme.fonts.body,
  },
  subTextContainer: {
    flex: 0,
    marginTop: 16,
    alignItems: "center",
  },
  subText: {
    color: "white",
    fontFamily: theme.fonts.body,
    fontSize: 10,
  },
});
