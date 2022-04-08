import React, { useState } from "react";
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
import { TextInput } from "react-native-gesture-handler";
import backButtonWhite from "../../../../../assets/Buttons/backButtonWhite";
import signUpNextButton from "../../../../../assets/Buttons/signUpNextButton";
import { AutoFocus } from "expo-camera/build/Camera.types";
import { LoginBg } from "../../Component/LoginBg";
import { LoginButton } from "../../Component/LoginButton";

export const SignUp0201 = ({ navigation, route }) => {
  // 전화번호, 이메일을 구분하는 method state
  const [code, setCode] = useState("");
  // 이전 스크린에서 method, input받아오기
  const { method, input } = route.params;
  const handleCode = (e) => {
    setCode(e);
  };

  const nextButton = async () => {
    // 인증 코드 입력받음
    // 코드 확인하고, signUp0202로 넘어감
    console.log("nextbutton 작동!");

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

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#02B5AA"
              placeholder="인증 코드 6자리"
              onChangeText={(code) => handleCode(code)}
              value={code}
            ></TextInput>
          </View>
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
});
