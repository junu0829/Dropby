import React, { useState, useRef } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Pressable,
} from "react-native";
import { theme } from "../../../../infrastructure/theme";
import { SvgXml } from "react-native-svg";

import whiteBackButton from "../../../../../assets/whiteBackButton";

import { LoginBg } from "../../Component/LoginBg";
import { LoginButton } from "../../Component/LoginButton";
import { CertificationCode } from "../../Component/CertificationCode";

export const SignIn0202 = ({ navigation, route }) => {
  const [value, setValue] = useState("");

  // 전화번호, 이메일을 구분하는 method state
  // 이전 스크린에서 method, input받아오기
  const { method, input } = route.params;

  const nextButton = () => {
    if (input) {
      if (method) {
        // 전화번호 입력 받음.
        // 인증 코드 스크린에 입력된 전화번호 넘겨주기
        // 전화번호로 인증 코드 보내기
        navigation.navigate("SignIn0204", { method, input });
      } else {
        // 이메일 입력 받음.
        // 인증 코드 스크린에 입력된 이메일 넘겨주기
        // 이메일로 인증 코드 보내기
        navigation.navigate("SignIn0204", { method, input });
      }
    } else {
      alert("회원정보를 입력하세요!");
    }
  };
  return (
    <>
      <LoginBg>
        {/* 뒤로가기 버튼 */}
        <View style={styles.container1}>
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
          <Text style={styles.mainText}>
            {input}
            <Text>으로</Text>
          </Text>
          <Text style={styles.mainText}>전송된 인증 코드를 입력하세요</Text>
        </View>

        {/* 유저 입력창 */}
        <View style={styles.container3}>
          <View style={styles.buttonContainer}>
            {/* method에 따라 전화번호 변경, 이메일 주소 변경 으로 다르게 나타남 */}
            {method ? (
              <Pressable
                style={styles.methodButton}
                onPress={() => navigation.navigate("SignUp0101")}
              >
                <Text style={styles.methodText}>전화번호 변경</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.methodButton}
                onPress={() => navigation.navigate("SignUp0101")}
              >
                <Text style={styles.methodText}>이메일 주소 변경</Text>
              </Pressable>
            )}

            <Text style={styles.methodTextBasic}> 또는 </Text>
            <Pressable
              style={styles.methodButton}
              // 인증 코드 재전송 함수로 변경하기
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.methodText}>인증 코드 재전송</Text>
            </Pressable>
          </View>

          <CertificationCode
            navigation={navigation}
            value={value}
            setValue={setValue}
          />
          <LoginButton
            style={{ marginTop: 24 }}
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

  buttonContainer: {
    flexDirection: "row",
    margin: 12,
  },
  methodButton: {},

  methodTextBasic: {
    color: "white",
  },
  methodText: {
    color: "#68B8F2",
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
  root: { flex: 1, padding: 20 },

  title: { textAlign: "center", fontSize: 30 },
});
