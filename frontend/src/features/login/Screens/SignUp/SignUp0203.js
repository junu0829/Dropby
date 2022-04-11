import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { theme } from "../../../../infrastructure/theme";
import { SvgXml } from "react-native-svg";
import { TextInput } from "react-native-gesture-handler";
import backButtonWhite from "../../../../../assets/Buttons/backButtonWhite";
import { LoginBg } from "../../Component/LoginBg";
import { LoginButton } from "../../Component/LoginButton";

export const SignUp0203 = ({ navigation, route }) => {
  const { userInfo, setUserInfo } = route.params;

  const handleNickName = (e) => {
    setUserInfo((state) => {
      return { ...state, nickName: e };
    });
  };

  const nextButton = async () => {
    // 닉네임 입력받음. SignUp0204로 넘어감
    navigation.navigate("SignUp0204", { userInfo, setUserInfo });
  };

  // 화면 오갈때마다 키보드 띄우기

  const inputRef = React.createRef();

  useFocusEffect(
    React.useCallback(() => {
      inputRef.current.focus();
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [inputRef])
  );

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
          <Text style={styles.mainText}>
            {userInfo.name}님, 닉네임을 정해주세요
          </Text>
        </View>

        {/* 유저 입력창 */}
        <View style={styles.container3}>
          <View style={styles.inputBox}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholderTextColor="#02B5AA"
              placeholder=""
              onChangeText={(nickName) => handleNickName(nickName)}
              value={userInfo.nickName}
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
