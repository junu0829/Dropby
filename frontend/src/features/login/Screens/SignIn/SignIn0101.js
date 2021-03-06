import React, { useState } from "react";

import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { theme } from "../../../../infrastructure/theme";

import { SvgXml } from "react-native-svg";

import googleLogin from "../../../../../assets/Buttons/googleLogin";

import { LoginBg } from "../../Component/LoginBg";
import { CloudBg } from "../../Component/CloudBg";

import { InputBox } from "../../Component/InputBox";
import { LoginButton } from "../../Component/LoginButton";
import { signIn } from "../../../../services/login/login";
import logo from "../../../../../assets/Global/logo";
import { SlideView } from "../../../../components/animations/slide.animation";

export const SignIn0101 = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handleEmail = (e) => {
    setEmail(e);
  };

  const nextButton = async () => {
    // 인증 코드 입력받음
    // 코드 확인하고, signUp0202로 넘어감
    signIn(email, password);
    navigation.navigate("MapScreen");
  };

  return (
    <>
      <LoginBg>
        <View style={styles.container2}>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ alignSelf: "flex-start", position: "absolute", top: 70 }}
          >
            <SvgXml xml={whiteBackButton} width={50}></SvgXml>
          </TouchableOpacity> */}
          {/* 아이콘 */}

          <SvgXml style={styles.logo} xml={logo} width={124.7} height={133.1} />
        </View>
        <View style={styles.container3}>
          {/* 이메일 비밀번호 입력란
          <InputBox
            placeholderText={"이메일주소"}
            handleWhat={handleEmail}
          ></InputBox>
          <InputBox
            placeholderText={"비밀번호"}
            handleWhat={handlePassword}
          ></InputBox>
        </View>

        <View style={styles.container4}>
          {///* 비밀번호 찾기 버튼 
          <TouchableOpacity
            style={{
              top: 14,
              zIndex: 999,
              position: "absolute",
            }}
            onPress={() => {
              navigation.navigate("SignIn0201");
            }}
          >
            <Text
              style={{
                color: theme.colors.bg.white,
                fontSize: 12,
                marginLeft: 150,
                fontWeight: "700",
              }}
            >
              비밀번호가 뭐였지?
            </Text>
          </TouchableOpacity>
          {///* 로그인 버튼 
          <LoginButton
            style={{ zIndex: 999, position: "absolute", top: 40 }}
            value="로그인"
            onPress={nextButton}
            width={280}
            height={41}
          ></LoginButton> */}

          {/* 소셜 로그인 버튼 */}
          <TouchableOpacity style={{ marginTop: 5, zIndex: 998 }}>
            <SvgXml xml={googleLogin} width={45} height={45} />
          </TouchableOpacity>
        </View>
        <CloudBg></CloudBg>
      </LoginBg>
    </>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 8.5,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 800,
  },
  container3: {
    flex: 6,
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 800,
  },
  container4: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 800,
  },
  logo: { marginBottom: 70 },
});
