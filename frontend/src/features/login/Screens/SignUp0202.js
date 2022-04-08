import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { SvgXml } from "react-native-svg";
import { TextInput } from "react-native-gesture-handler";
import backButtonWhite from "../../../../assets/Buttons/backButtonWhite";
import { LoginBg } from "../Component/LoginBg";
import { LoginButton } from "../Component/LoginButton";

export const SignUp0202 = ({ navigation, route }) => {
  const { userInfo, setUserInfo } = route.params;

  const handleName = (e) => {
    setUserInfo((state) => {
      return { ...state, name: e };
    });
  };

  const nextButton = async () => {
    // 이름 입력받음
    // SignUp0203로 넘어감
    navigation.navigate("SignUp0203", { userInfo, setUserInfo });
  };

  return (
    <>
      <LoginBg>
        {/* 뒤로가기 버튼 */}
        <View style={styles.container1}>
          <TouchableOpacity
            style={{ right: 140, bottom: 40 }}
            onPress={() => navigation.goBack()}
          >
            <SvgXml xml={backButtonWhite} width={20} height={20} />
          </TouchableOpacity>
        </View>

        {/* Main 안내 문구 */}
        <View style={styles.container2}>
          <Text style={styles.mainText}>이름이 뭐에요?</Text>
        </View>

        {/* 유저 입력창 */}
        <View style={styles.container3}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#02B5AA"
              placeholder=""
              onChangeText={(name) => handleName(name)}
              value={userInfo.name}
            ></TextInput>
          </View>
          <LoginButton
            style={{ marginTop: 100 }}
            value="다 음"
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
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container3: {
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  mainText: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    color: "white",
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    fontSize: 20,
  },

  input: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    color: "white",
    fontFamily: theme.fonts.body,
  },
});
