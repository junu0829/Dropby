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

export const SignIn0201 = ({ navigation }) => {
  const inputRef = React.createRef();

  // 화면 오갈때마다 키보드 띄우기

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

  // 전화번호, 이메일을 구분하는 method state
  const [method, setMethod] = useState(true);
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  // const [input, setInput] = useState("");
  const handlePhoneNum = (e) => {
    setPhoneNum(e);
  };

  const handleEmail = (e) => {
    setEmail(e);
  };

  const nextButton = () => {
    if (phoneNum || email) {
      if (method) {
        // 전화번호 입력 받음.
        // 인증 코드 스크린에 입력된 전화번호 넘겨주기
        // 전화번호로 인증 코드 보내기
        navigation.navigate("SignIn0202", { method, input: phoneNum });
      } else {
        // 이메일 입력 받음.
        // 인증 코드 스크린에 입력된 이메일 넘겨주기
        // 이메일로 인증 코드 보내기
        navigation.navigate("SignIn0202", { method, input: email });
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
          <Text style={styles.subMainText}>비밀번호를 잊으셨군요!</Text>
          <View style={{ height: 30 }}></View>
          {method ? (
            <>
              <Text style={styles.DetailText}>
                전화번호를 입력하면 계정에 다시 액세스할 수 있는
              </Text>
              <Text style={styles.DetailText}>로그인코드가 전송됩니다.</Text>
            </>
          ) : (
            <>
              <Text style={styles.DetailText}>
                사용자 이름 또는 이메일을 입력하면 다시 계정에
              </Text>
              <Text style={styles.DetailText}>
                로그인할 수 있는 링크를 보내드립니다.
              </Text>
            </>
          )}
        </View>

        {/* 유저 입력창 */}
        <View style={styles.container3}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.methodButton}
              onPress={() => setMethod(true)}
            >
              <Text style={[styles.methodText, { opacity: method ? 1 : 0.5 }]}>
                전화번호
              </Text>
            </Pressable>
            <Pressable
              style={styles.methodButton}
              onPress={() => setMethod(false)}
            >
              <Text style={[styles.methodText, { opacity: !method ? 1 : 0.5 }]}>
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
                keyboardType="numeric"
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
                keyboardType="email-address"
                onChangeText={(email) => handleEmail(email)}
                value={email}
              ></TextInput>
            </View>
          )}
          <LoginButton
            style={{ marginTop: 10 }}
            value="다 음"
            onPress={nextButton}
            width={300}
            height={43}
          />
          <View style={styles.subTextContainer}>
            <Text style={styles.subText}>도움이 더 필요하세요?</Text>
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
