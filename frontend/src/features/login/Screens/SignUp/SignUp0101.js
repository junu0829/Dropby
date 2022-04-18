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
import { useFocusEffect } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { TextInput } from "react-native-gesture-handler";
import backButtonWhite from "../../../../../assets/Buttons/backButtonWhite";
import signUpNextButton from "../../../../../assets/Buttons/signUpNextButton";
import { AutoFocus } from "expo-camera/build/Camera.types";
import { LoginBg } from "../../Component/LoginBg";
import { LoginButton } from "../../Component/LoginButton";

export const SignUp0101 = ({ navigation }) => {
  // 전화번호, 이메일을 구분하는 method state
  const userInfo = {
    method: true,
    phoneNum: "",
    email: "",
    name: "",
    nickName: "",
    password: "",
  };
  const [method, setMethod] = useState(true);
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");

  const handlePhoneNum = (e) => {
    setPhoneNum(e);
  };

  const handleEmail = (e) => {
    setEmail(e);
  };

  // const nextButton = () => {
  //   if (userInfo.method) {
  //     // 전화번호 입력 받음.
  //     // 인증 코드 스크린에 입력된 전화번호 넘겨주기
  //     // 전화번호로 인증 코드 보내기
  //     navigation.navigate("SignUp0201", { userInfo, setUserInfo });
  //   } else {
  //     // 이메일 입력 받음.
  //     // 인증 코드 스크린에 입력된 이메일 넘겨주기
  //     // 이메일로 인증 코드 보내기
  //     navigation.navigate("SignUp0201", { userInfo, setUserInfo });
  //   }
  // };

  const nextButton = () => {
    if (phoneNum || email) {
      if (method) {
        userInfo.phoneNum = phoneNum;
        // 전화번호 입력 받음.
        // 인증 코드 스크린에 입력된 전화번호 넘겨주기
        // 전화번호로 인증 코드 보내기
        navigation.navigate("SignUp0201", userInfo);
      } else {
        userInfo.method = false;
        userInfo.email = email;
        // 이메일 입력 받음.
        // 인증 코드 스크린에 입력된 이메일 넘겨주기
        // 이메일로 인증 코드 보내기
        navigation.navigate("SignUp0201", userInfo);
      }
    } else {
      alert("회원정보를 입력하세요!");
    }
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
          <Text style={styles.mainText}>전화번호 또는 이메일 주소 입력</Text>
        </View>

        {/* 유저 입력창 */}
        <View style={styles.container3}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.methodButton}
              onPress={() => setMethod(true)}
            >
              <Text
                style={method ? styles.methodTextPressed : styles.methodText}
              >
                전화번호
              </Text>
            </Pressable>
            <Pressable
              style={styles.methodButton}
              onPress={() => setMethod(false)}
            >
              <Text
                style={method ? styles.methodText : styles.methodTextPressed}
              >
                이메일 주소
              </Text>
            </Pressable>
          </View>
          {method ? (
            <View style={styles.inputBox}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholderTextColor="#02B5AA"
                placeholder="KR+82"
                onChangeText={(phoneNum) => handlePhoneNum(phoneNum)}
                value={phoneNum}
              ></TextInput>
            </View>
          ) : (
            <View style={styles.inputBox}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholderTextColor="#02B5AA"
                placeholder="이메일 주소"
                onChangeText={(email) => handleEmail(email)}
                value={email}
              ></TextInput>
            </View>
          )}
          <LoginButton
            style={{ marginTop: 24 }}
            value="다 음"
            onPress={nextButton}
            width={300}
            height={43}
          />
          <View style={styles.subTextContainer}>
            <Text style={styles.subText}>
              보안 및 로그인 목적으로 Dropby에서 보내는
            </Text>
            <Text style={styles.subText}>
              SMS, email 알림을 수신할 수 있습니다.
            </Text>
          </View>
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
  buttonContainer: {
    flexDirection: "row",
  },
  mainText: {
    color: "white",
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    fontSize: 24,
    justifyContent: "center",
  },

  methodButton: {
    padding: 16,
  },
  methodText: {
    color: "white",
    opacity: 0.2,
  },
  methodTextPressed: {
    color: "white",
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
