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
import Checkbox from "expo-checkbox";
import whiteBackButton from "../../../../../assets/whiteBackButton";

//backButton Resource 통일 필요

import { LoginBg } from "../../Component/LoginBg";
import { LoginButton } from "../../Component/LoginButton";

export const SignIn0204 = ({ navigation, route }) => {
  // 화면 오갈때마다 키보드 띄우기

  // 전화번호, 이메일을 구분하는 method state
  const { method, input } = route.params;

  const [userIDList, setUserIDList] = useState([
    { id: "Dk45687646351", nickname: "김동민" },
    { id: "하나와영", nickname: "김동민" },
  ]);
  const [isChecked, setChecked] = useState(userIDList[0].id);
  const [IDSelected, setIDSelected] = useState(userIDList[0].id);
  const IDSelectedTransformed = `${IDSelected}님으로 로그인`;
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
          <Text style={styles.mainText}>계정 선택</Text>

          <View style={{ height: 30 }}></View>
          {method ? (
            <>
              <Text style={styles.DetailText}>
                전화번호 +82{input}번이 여러 계정에 연결되어
              </Text>
              <Text style={styles.DetailText}>
                있습니다. 로그인할 계정을 선택하세요.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.DetailText}>
                이메일주소 {input}에 여러 계정이 연결되어
              </Text>
              <Text style={styles.DetailText}>
                있습니다. 로그인할 계정을 선택하세요.
              </Text>
            </>
          )}
          <View style={{ height: 30 }}></View>
        </View>

        {/* 유저 입력창 */}
        <View style={styles.container3}>
          {userIDList.map((userInfo, i) => {
            return (
              <View style={styles.IDContainer}>
                <View style={styles.IDSubContainer}>
                  <Text style={styles.IDText}>{userInfo.id}</Text>
                  <Text style={styles.NickNameText}>{userInfo.nickname}</Text>
                </View>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={() => {
                    setIDSelected(userInfo.id);
                    setChecked(userInfo.id);
                  }}
                  color={isChecked == userInfo.id ? "#85AF72" : "#B4B4B4"}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.container4}>
          {/* <CloudBg /> */}
          <LoginButton
            style={{ zIndex: 999, bottom: 100 }}
            value={IDSelected}
            onPress={nextButton}
            width={300}
            height={43}
          />
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
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container4: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  IDContainer: {
    zIndex: 999,
    width: "60%",
    flexDirection: "row",
    marginTop: 15,
  },
  IDSubContainer: {},
  mainText: {
    color: "white",
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    fontSize: 30,
    justifyContent: "center",
  },

  IDText: {
    color: "white",
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    fontSize: 13,
    justifyContent: "center",
    marginTop: 10,
  },
  NickNameText: {
    color: "white",
    fontFamily: theme.fonts.body,
    fontWeight: "700",
    fontSize: 13,
    justifyContent: "center",
    marginTop: 1,
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
  checkbox: {
    alignSelf: "center",

    position: "absolute",
    top: 10,
    right: 0,
    width: 30,
    height: 30,
    borderColor: "white",
    borderRadius: 50,
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
