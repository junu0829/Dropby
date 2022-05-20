import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { theme } from "../../../../infrastructure/theme";
import { SvgXml } from "react-native-svg";
import { TextInput } from "react-native-gesture-handler";
import backButtonWhite from "../../../../../assets/Buttons/backButtonWhite";
import { LoginBg } from "../../Component/LoginBg";
import { LoginButton } from "../../Component/LoginButton";
import { signUp } from "../../../../services/login/login";

export const SignUp0205 = ({ navigation, route }) => {
  const userInfo = route.params;

  const nextButton = () => {
    // 여기서 서버에 회원가입 정보 보내기. userInfo 에 object 형태로 모든 정보가 들어있음.
    signUp(userInfo.nickname, userInfo.email, userInfo.password);
    navigation.navigate("MapScreen");
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
          <Text style={styles.mainText}>
            두근두근, 드롭바이와{`\n`}여행을 떠나보실까요?
          </Text>
        </View>

        {/* 유저 입력창 */}
        <View style={styles.container3}>
          <LoginButton
            style={{ marginTop: 24 }}
            value="네!"
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
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container3: {
    flex: 3,
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
    fontSize: 24,
  },

  input: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    color: "white",
    fontFamily: theme.fonts.body,
  },
});
